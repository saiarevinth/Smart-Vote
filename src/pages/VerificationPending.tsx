import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import toast from 'react-hot-toast';

const VerificationPending = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else if (user.emailVerified) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user, {
          url: window.location.origin + '/login',
        });
        toast.success('Verification email resent! Please check your inbox.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 via-white-500 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Email Verification Required
        </h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. Please check your
          inbox and click the link to verify your account.
        </p>
        <button
          onClick={handleResendVerification}
          disabled={loading}
          className={`w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Sending...' : 'Resend Verification Email'}
        </button>
        <p className="mt-4 text-sm text-gray-500">
          Already verified?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-orange-500 hover:text-orange-600"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerificationPending; 