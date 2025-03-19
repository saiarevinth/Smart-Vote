import { useNavigate } from 'react-router-dom';
import { Vote, ShieldCheck, UserCheck, Brain } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-white-500 to-green-100 relative pb-16">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-12">
          <div className="flex items-center space-x-4">
            <Vote size={48} className="text-orange-500" />
            <h1 className="text-5xl font-bold text-gray-800">Smart Voting System</h1>
          </div>
          
          <div className="max-w-3xl text-center">
            <p className="text-xl text-gray-600 mb-8">
              Welcome to the future of voting. A secure, transparent, and efficient way to make your voice heard.
              Powered by AI assistance and protected by advanced verification systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <ShieldCheck className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Voting</h3>
                <p className="text-gray-600">State-of-the-art security measures to ensure your vote remains confidential and tamper-proof.</p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <UserCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Verified Access</h3>
                <p className="text-gray-600">Multi-step verification process to maintain electoral integrity and prevent fraud.</p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-lg">
                <Brain className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-3">AI Assistance</h3>
                <p className="text-gray-600">Get expert guidance on voting procedures and electoral processes from our AI advisor.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Register to Vote
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              >
                Voter Login
              </button>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => navigate('/admin/login')}
                className="text-gray-600 hover:text-orange-500 transition duration-300"
              >
                Admin Access →
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-center py-4">
        <p> 2025 Smart Voting System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;