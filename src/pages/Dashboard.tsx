import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import PartyCard from '../components/PartyCard';
import { VoteCard } from '../components/VoteCard';
import { VoteStats } from '../components/VoteStats';
import { parties } from '../types/party';
import { CLOUDINARY_CONFIG } from '../config/cloudinary';
import { UserCircle, LogOut, Image as ImageIcon, XCircle } from 'lucide-react';

interface UserData {
  fullName: string;
  hasVoted: boolean;
  votedFor?: string;
  aadharNumber: string;
  aadharImageUrl: string;
}

const getOptimizedImageUrl = (url: string) => {
  // Extract public ID from Cloudinary URL
  const splitUrl = url.split('/');
  const publicIdWithExt = splitUrl[splitUrl.length - 1];
  const publicId = publicIdWithExt.split('.')[0];

  // Construct optimized URL with transformations
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/c_scale,w_300,q_auto,f_auto/${publicId}`;
};

const Dashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('parties');
  const [showAadharImage, setShowAadharImage] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await getDoc(doc(db, 'voters', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome{userData?.fullName ? `, ${userData.fullName}` : ''}!
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Browse political parties, cast your vote, and view live voting statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="mb-6">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('parties')}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === 'parties'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  Political Parties
                </button>
                <button
                  onClick={() => setActiveTab('vote')}
                  className={`px-3 py-2 rounded-md ${
                    activeTab === 'vote'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  Vote
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              {activeTab === 'parties' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Political Parties</h3>
                    <p className="text-sm text-gray-600">Click on a party card to learn more</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {parties.map((party) => (
                      <PartyCard key={party.id} party={party} />
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'vote' && (
                <div>
                  <VoteCard hasVoted={userData?.hasVoted || false} />
                  {userData?.hasVoted && userData?.votedFor && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        You voted for: {parties.find(p => p.id === userData.votedFor)?.name}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Aadhar Card Display Section */}
          {/* <div className="lg:col-span-1">
            <h3 className="text-lg font-medium text-gray-900">Aadhar Card</h3>
            <div className="mt-3">
              {showAadharImage ? (
                <div className="relative">
                  <div className="max-w-xs mx-auto">
                    <img
                      src={getOptimizedImageUrl(userData?.aadharImageUrl || '')}
                      alt="Aadhar Card"
                      className="w-full h-auto rounded-lg shadow-lg"
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
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
          </div> */}

          {/* Voting Statistics Sidebar */}
          <div className="lg:col-span-1">
            <VoteStats />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;