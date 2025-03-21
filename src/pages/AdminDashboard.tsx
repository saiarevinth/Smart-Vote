import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { UserSquare, CheckCircle, XCircle, LogOut, Image as ImageIcon } from 'lucide-react';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';
import { VoteStats } from '../components/VoteStats';

const getOptimizedImageUrl = (url: string) => {
  // Extract public ID from Cloudinary URL
  const splitUrl = url.split('/');
  const publicIdWithExt = splitUrl[splitUrl.length - 1];
  const publicId = publicIdWithExt.split('.')[0];

  // Construct optimized URL with transformations
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/c_scale,w_400,q_auto,f_auto/${publicId}`;
};

interface User {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string;
  age: number;
  aadharNumber: string;
  aadharImageUrl: string;
  isVerified: boolean;
  hasVoted: boolean;
  createdAt: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAadharImage, setShowAadharImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin authentication
    const isAdmin = sessionStorage.getItem('adminAuthenticated');
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'voters');
      const querySnapshot = await getDocs(usersRef);
      
      const fetchedUsers: User[] = [];
      querySnapshot.forEach((doc) => {
        fetchedUsers.push({
          id: doc.id,
          ...doc.data(),
        } as User);
      });

      setUsers(fetchedUsers.sort((a, b) => 
        a.isVerified === b.isVerified ? 0 : a.isVerified ? 1 : -1
      ));
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (userId: string, verify: boolean) => {
    try {
      const userRef = doc(db, 'voters', userId);
      await updateDoc(userRef, {
        isVerified: verify
      });

      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isVerified: verify } : user
      ));

      toast.success(`User ${verify ? 'verified' : 'unverified'} successfully`);
      setShowUserModal(false);
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user verification status');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const UserDetailsModal = ({ user }: { user: User }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full m-4">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-900">User Details</h3>
            <button
              onClick={() => {
                setShowUserModal(false);
                setShowAadharImage(false);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="mt-1">{user.fullName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="mt-1">
                {user.age} years old
                {user.age < 18 && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Underage
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date of Birth</p>
              <p className="mt-1">{new Date(user.dateOfBirth).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Aadhar Number</p>
              <p className="mt-1">{user.aadharNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Aadhar Card Image</p>
              <div className="mt-2">
                {showAadharImage ? (
                  <div className="relative">
                    <div className="max-w-sm mx-auto">
                      <img
                        src={getOptimizedImageUrl(user.aadharImageUrl)}
                        alt="Aadhar Card"
                        className="w-full h-auto rounded-lg shadow-lg"
                        style={{ maxHeight: '250px', objectFit: 'contain' }}
                        loading="lazy"
                      />
                    </div>
                    <button
                      onClick={() => setShowAadharImage(false)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg"
                    >
                      <XCircle className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAadharImage(true)}
                    className="flex items-center text-orange-600 hover:text-orange-700"
                  >
                    <ImageIcon className="h-5 w-5 mr-1" />
                    View Aadhar Card
                  </button>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Verification Status</p>
              <p className="mt-1 flex items-center">
                {user.isVerified ? (
                  <span className="text-green-600 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-1" />
                    Verified
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <XCircle className="h-5 w-5 mr-1" />
                    Not Verified
                  </span>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Voting Status</p>
              <p className="mt-1">{user.hasVoted ? 'Has voted' : 'Has not voted'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Registration Date</p>
              <p className="mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowUserModal(false);
                setShowAadharImage(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            {!user.isVerified && (
              <button
                onClick={() => handleVerifyUser(user.id, true)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
              >
                Verify User
              </button>
            )}
            {user.isVerified && (
              <button
                onClick={() => handleVerifyUser(user.id, false)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Revoke Verification
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const unverifiedUsers = users.filter(user => !user.isVerified);
  const verifiedUsers = users.filter(user => user.isVerified);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-500">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-orange-50"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Unverified Users Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Unverified Users ({unverifiedUsers.length})
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {unverifiedUsers.map((user) => (
                <li key={user.id}>
                  <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                    <div className="flex items-center">
                      <UserSquare className="h-8 w-8 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleVerifyUser(user.id, true)}
                        className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {unverifiedUsers.length === 0 && (
                <li className="px-4 py-4 text-center text-gray-500">
                  No unverified users
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Verified Users Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Verified Users ({verifiedUsers.length})
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {verifiedUsers.map((user) => (
                <li key={user.id}>
                  <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                    <div className="flex items-center">
                      <UserSquare className="h-8 w-8 text-gray-400" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-600 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        Verified
                      </span>
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {verifiedUsers.length === 0 && (
                <li className="px-4 py-4 text-center text-gray-500">
                  No verified users
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>

      {/* User Details Modal */}
      {showUserModal && selectedUser && <UserDetailsModal user={selectedUser} />}
      <div className="lg:col-span-1 px-8 sm:px-32 lg:px-62">
  <VoteStats />
</div>
    </div>
  );
};

export default AdminDashboard;
