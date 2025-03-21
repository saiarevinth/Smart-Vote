import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { auth } from '../firebase';

const API_BASE_URL = 'https://f63c-103-93-195-194.ngrok-free.app/api';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const mobile = state?.mobile || '';

  useEffect(() => {
    if (!mobile) {
      toast.error('No mobile number provided. Please login again.');
      navigate('/login');
      return;
    }
    sendOTP();
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [mobile, navigate]);

  const sendOTP = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/send-otp/`,
        { phone_number: `+91${mobile}` },
        {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (response.status === 200) {
        startCountdown();
        toast.success('OTP sent successfully!');
      }
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      const errorMessage = error.response?.data?.message || 'Failed to send OTP. Please try again.';
      toast.error(errorMessage);
    }
  };

  const startCountdown = () => {
    setResendDisabled(true);
    setCountdown(30);
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = async () => {
    if (!/^\d{6}$/.test(otp)) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      // Check if user is still authenticated
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error('Session expired. Please login again.');
        navigate('/login');
        return;
      }

      toast.success('OTP verified successfully!');
      // Add a small delay before navigation to show the success message
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1000);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Verify OTP</h2>
        <p className="mt-2 text-center text-gray-600">
          Sent to ******{mobile.slice(-3)}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="000000"
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="text-center">
              <button
                onClick={sendOTP}
                disabled={resendDisabled}
                className="text-sm text-orange-600 hover:text-orange-500 disabled:text-gray-400"
              >
                {resendDisabled ? `Resend in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP; 