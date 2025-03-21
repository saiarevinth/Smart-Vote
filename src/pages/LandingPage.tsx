"use client"

import { useState, useEffect } from "react"
import { Vote, ShieldCheck, UserCheck, Brain, ChevronRight, ArrowRight, MessageCircle, X } from "lucide-react"
import { useMobile } from "../hooks/use-mobile"

export default function LandingPage() {
  const isMobile = useMobile()
  const [scrolled, setScrolled] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! I'm your Smart Voting assistant. How can I help you today?" },
  ])
  const [userInput, setUserInput] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobileCheck, setIsMobile] = useState(false)

  // Handle navigation
  const navigate = (path: string) => {
    window.location.href = path
  }

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", checkIfMobile)

    // Initial check
    checkIfMobile()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Handle chatbot messages
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userInput.trim()) return

    // Add user message
    setChatMessages([...chatMessages, { sender: "user", text: userInput }])

    // Simulate bot response based on user input
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have information about that yet."

      const input = userInput.toLowerCase()
      if (input.includes("register") || input.includes("sign up")) {
        botResponse =
          "To register as a voter, click the 'Register to Vote' button and fill out the required information. An admin will verify your details before you can access the voting system."
      } else if (input.includes("login") || input.includes("sign in")) {
        botResponse =
          "You can log in using the 'Voter Login' button once your registration has been approved by an admin."
      } else if (input.includes("vote") || input.includes("candidate")) {
        botResponse =
          "After logging in, you'll be able to view candidate information and cast your vote. Once submitted, your vote will be securely locked and cannot be changed."
      } else if (input.includes("admin")) {
        botResponse =
          "Admin access is restricted to authorized personnel. Admins are responsible for verifying voter registrations and managing the voting system."
      } else if (input.includes("secure") || input.includes("security")) {
        botResponse =
          "Our system uses state-of-the-art encryption and verification processes to ensure the security and integrity of all votes."
      } else if (input.includes("hello") || input.includes("hi")) {
        botResponse = "Hello! How can I help you with the Smart Voting System today?"
      }

      setChatMessages((prev) => [...prev, { sender: "bot", text: botResponse }])
    }, 1000)

    setUserInput("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 via-white to-green-50 relative">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-gray-800">SmartVote</span>
            </div>

            <nav className={`${isMobile ? "hidden" : "flex"} items-center space-x-8`}>
              <a href="#features" className="text-gray-600 hover:text-orange-500 transition">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-orange-500 transition">
                How It Works
              </a>
              <a href="#faq" className="text-gray-600 hover:text-orange-500 transition">
                FAQ
              </a>
              <button
                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => navigate("/signup")}
              >
                Register
              </button>
            </nav>

            <button
              className={`${isMobile ? "block" : "hidden"} p-2`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && isMobile && (
            <div className="mt-4 py-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-orange-500 transition">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-600 hover:text-orange-500 transition">
                  How It Works
                </a>
                <a href="#faq" className="text-gray-600 hover:text-orange-500 transition">
                  FAQ
                </a>
                <button
                  className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-lg transition-colors w-full"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors w-full"
                  onClick={() => navigate("/signup")}
                >
                  Register
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              {/* Logo */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex items-center justify-center shadow-xl transform rotate-45">
                      <div className="absolute inset-0 rounded-full bg-white opacity-20"></div>
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center transform -rotate-45">
                        <Vote className="h-10 w-10 text-[#FF9933]" />
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#FF9933] to-[#138808] bg-clip-text text-transparent">SmartVote</h2>
                    <p className="text-sm text-gray-600">Digital Democracy Platform</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-600 font-medium text-sm mb-4">
                <span className="mr-2">🔒</span>
                <span>Secure • Transparent • Efficient</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight max-w-4xl">
                The Future of  <span className="text-orange-500">Democratic</span> Participation is Here
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl">
                Welcome to the Smart Voting System. A secure, transparent, and efficient way to make your voice heard,
                powered by AI assistance and protected by advanced verification systems.
              </p>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg shadow-lg shadow-orange-200 transition-all duration-300 hover:translate-y-[-2px] flex items-center"
                  onClick={() => navigate("/signup")}
                >
                  Register to Vote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  className="border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white px-8 py-4 rounded-lg text-lg transition-all duration-300"
                  onClick={() => navigate("/login")}
                >
                  Voter Login
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Smart Voting System?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform combines cutting-edge technology with user-friendly design to revolutionize the voting
                experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Secure Voting Card */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] overflow-hidden">
                <div className="p-6">
                  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Secure Voting</h3>
                  <p className="text-gray-600 text-base">
                    State-of-the-art encryption and blockchain technology ensure your vote remains confidential and
                    tamper-proof. Our system provides end-to-end verification while maintaining ballot secrecy.
                  </p>
                </div>
              </div>
              
              {/* Verified Access Card */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] overflow-hidden">
                <div className="p-6">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <UserCheck className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Verified Access</h3>
                  <p className="text-gray-600 text-base">
                    Our multi-step verification process maintains electoral integrity and prevents fraud. Biometric
                    authentication, identity verification, and secure access codes ensure only eligible voters
                    participate.
                  </p>
                </div>
              </div>

              {/* AI Assistance Card */}
              <div className="rounded-xl border border-gray-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px] overflow-hidden">
                <div className="p-6">
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">AI Assistance</h3>
                  <p className="text-gray-600 text-base">
                    Get expert guidance on voting procedures and electoral processes from our AI advisor. Our
                    intelligent system helps you understand ballot measures and provides unbiased information about
                    candidates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - Updated with new workflow */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our streamlined process makes voting secure, accessible, and efficient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                {
                  step: "01",
                  title: "Register",
                  description:
                    "Complete the registration form with your personal information and identification documents.",
                  color: "orange",
                },
                {
                  step: "02",
                  title: "Verification",
                  description: "System performs initial verification of your documents and eligibility to vote.",
                  color: "yellow",
                },
                {
                  step: "03",
                  title: "Admin Approval",
                  description: "An administrator reviews and approves your registration after verification.",
                  color: "green",
                },
                {
                  step: "04",
                  title: "Login & Vote",
                  description: "Once approved, log in to access your ballot and select your candidate.",
                  color: "blue",
                },
                {
                  step: "05",
                  title: "Vote Locked",
                  description: "Your vote is securely recorded and cannot be altered after submission.",
                  color: "purple",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className={`w-16 h-16 rounded-full bg-${item.color}-100 flex items-center justify-center mb-6 mx-auto`}
                  >
                    <span className={`text-xl font-bold text-${item.color}-500`}>{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{item.title}</h3>
                  <p className="text-gray-600 text-center">{item.description}</p>

                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-gray-200">
                      <div className="absolute right-0 top-[-4px] w-3 h-3 rotate-45 border-t-2 border-r-2 border-gray-200"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our Smart Voting System.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How do I register to vote?",
                  answer: "Click the 'Register to Vote' button and fill out the registration form with your personal information and identification documents. An admin will verify your details before you can access the voting system."
                },
                {
                  question: "Is my vote secure?",
                  answer: "Yes, our system uses state-of-the-art encryption and blockchain technology to ensure your vote remains confidential and tamper-proof. We provide end-to-end verification while maintaining ballot secrecy."
                },
                {
                  question: "What happens after I submit my vote?",
                  answer: "Your vote is immediately encrypted and recorded on the blockchain. Once submitted, your vote cannot be altered or changed. The system maintains a transparent record while protecting voter privacy."
                },
                {
                  question: "How long does the verification process take?",
                  answer: "The initial verification process typically takes 24-48 hours. Once approved, you'll receive an email notification with instructions to log in and access your ballot."
                },
                {
                  question: "Can I change my vote after submission?",
                  answer: "No, votes cannot be changed after submission to maintain the integrity of the voting process. This is a security feature to prevent tampering and ensure fair elections."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Admin Section - New */}
        <section id="admin" className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Admin Portal</h2>
                  <p className="text-xl mb-6 text-gray-300">
                    Our comprehensive admin dashboard provides election officials with powerful tools to manage the
                    voting process.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Verify and approve voter registrations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Monitor voting activity in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Generate detailed reports and analytics</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span>Manage candidate information and ballot design</span>
                    </li>
                  </ul>
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg transition-all duration-300 flex items-center"
                    onClick={() => navigate("/admin/login")}
                  >
                    Admin Login
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-green-500 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Voting Experience?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join millions of citizens who have already embraced the future of democratic participation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg shadow-lg transition-all duration-300"
                  onClick={() => navigate("/signup")}
                >
                  Register Now
                </button>
              <button
                  className="border-2 border-white text-white hover:bg-white hover:text-green-500 px-8 py-4 rounded-lg text-lg transition-all duration-300"
                  onClick={() => navigate("/demo")}
              >
                  Watch Demo
              </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Vote className="h-8 w-8 text-orange-400" />
                <span className="text-xl font-bold">SmartVote</span>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing democratic participation through secure, transparent, and efficient voting technology.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-white transition">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#admin" className="text-gray-400 hover:text-white transition">
                    Admin Portal
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mt-1"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mt-1"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-gray-400">support@smartvote.com</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 mt-1"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-gray-400">123 Democracy Ave, Civic City, 10001</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Smart Voting System. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="text-gray-400 hover:text-white transition mx-2">
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition mx-2">
                Terms of Service
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition mx-2">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className={`fixed ${showChatbot ? "bottom-6" : "bottom-20"} right-6 z-50 transition-all duration-300`}>
        {showChatbot ? (
          <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden border border-gray-200">
            <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Voting Assistant</h3>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-4 ${msg.sender === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.sender === "user" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        ) : (
          <button
            onClick={() => setShowChatbot(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        )}
      </div>
      
      {/* Admin Access Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded-lg shadow-lg flex items-center transition-colors"
          onClick={() => navigate("/admin/login")}
        >
          Admin Access
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

