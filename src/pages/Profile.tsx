import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

interface UserData {
  username: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  guardianName: string;
  maritalStatus: string;
  address: string;
  pincode: string;
  district: string;
  state: string;
  mobile: string;
  email: string;
  aadharNumber: string;
  aadharImageUrl?: string;
  hasVoted: boolean;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }

        const userDoc = await getDoc(doc(db, 'voters', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
          setError('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-500">{error || 'Failed to load profile'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-orange-500 px-6 py-4">
              <div className="flex items-center">
                <UserCircle className="h-12 w-12 text-white" />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-white">{userData.fullName}</h1>
                  <p className="text-orange-100">Voter Profile</p>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {/* Aadhar Card Section */}
              {userData.aadharImageUrl && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Aadhar Card</h2>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={userData.aadharImageUrl}
                      alt="Aadhar Card"
                      className="w-full max-w-2xl mx-auto"
                    />
                  </div>
                </div>
              )}

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Full Name</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.fullName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Gender</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.gender}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Guardian's Name</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.guardianName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Marital Status</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.maritalStatus}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Mobile Number</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.mobile}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Address</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.address}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">District</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.district}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">State</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.state}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Pincode</label>
                      <p className="mt-1 text-lg text-gray-900">{userData.pincode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Voter Status */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Voter Status</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full ${userData.hasVoted ? 'bg-green-500' : 'bg-yellow-500'} mr-2`}></div>
                    <p className="text-lg text-gray-900">
                      {userData.hasVoted ? 'You have cast your vote' : 'You have not voted yet'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
