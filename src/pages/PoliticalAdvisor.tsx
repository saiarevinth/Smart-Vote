import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';

const PoliticalAdvisor = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Political Advisor</h2>
          <p className="mt-1 text-sm text-gray-600">
            Get expert guidance on voting procedures, party information, and electoral processes.
            Our AI-powered advisor helps you make informed decisions while maintaining complete neutrality.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">How can I help you?</h3>
              <p className="mt-2 text-sm text-gray-600">
                Ask me about:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• Voting procedures and requirements</li>
                <li>• Political party information and policies</li>
                <li>• Electoral process and systems</li>
                <li>• Voter rights and responsibilities</li>
                <li>• Democratic principles and governance</li>
              </ul>
            </div>
            <ChatBot />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PoliticalAdvisor;
