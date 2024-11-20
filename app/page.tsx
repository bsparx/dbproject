import Link from "next/link";
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  SparklesIcon, 
  RocketLaunchIcon 
} from "@heroicons/react/24/solid";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24 px-5 text-center">
        {/* Subtle Background Shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto z-10">
          <div className="mb-8 inline-block bg-white/10 px-4 py-2 rounded-full text-sm tracking-wide">
            New: Enhanced AI-Powered Learning 🚀
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Quiz Craft
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-gray-100">
            Transform your learning experience with AI-driven exam preparation and personalized progress tracking.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/sign-up" className="group">
              <button className="px-10 py-3.5 bg-white text-blue-700 font-bold rounded-xl shadow-xl transition duration-300 
                hover:bg-blue-50 hover:shadow-2xl group-hover:scale-105">
                Get Started
              </button>
            </Link>
            <Link href="/sign-in" className="group">
              <button className="px-10 py-3.5 border-2 border-white/30 text-white font-bold rounded-xl backdrop-blur-sm 
                transition duration-300 hover:bg-white/10 hover:border-white/50 
                group-hover:scale-105">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Quiz Craft is designed to revolutionize your learning journey with cutting-edge tools and intelligent insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              Icon: BookOpenIcon,
              title: "Create Mock Exams",
              description: "Craft customized exams with intelligent question generation and difficulty levels.",
              color: "text-blue-500"
            },
            {
              Icon: ChartBarIcon,
              title: "Track Progress",
              description: "Comprehensive performance analytics and personalized learning recommendations.",
              color: "text-green-500"
            },
            {
              Icon: SparklesIcon,
              title: "AI-Driven Analysis",
              description: "Instant, intelligent feedback to accelerate your learning and exam preparation.",
              color: "text-purple-500"
            }
          ].map(({ Icon, title, description, color }, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-100 p-8 rounded-2xl shadow-lg hover:shadow-xl 
              transition duration-300 transform hover:-translate-y-2 text-center"
            >
              <div className={`mb-5 w-16 h-16 mx-auto ${color} bg-opacity-10 rounded-full flex items-center justify-center`}>
                <Icon className={`w-8 h-8 ${color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-5 text-center">
        <div className="max-w-3xl mx-auto">
          <RocketLaunchIcon className="w-16 h-16 mx-auto mb-6 text-white animate-bounce" />
          <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg mb-10 text-gray-100 max-w-2xl mx-auto">
            Join thousands of students who are mastering their subjects with Quiz Craft's intelligent exam preparation platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard" className="group">
              <button className="px-12 py-4 bg-white text-indigo-700 font-bold rounded-xl 
                shadow-xl transition duration-300 hover:bg-gray-100 
                group-hover:scale-105">
                Explore Dashboard
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-center text-gray-300">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Quiz Craft. All rights reserved.
        </p>
        <div className="mt-4 space-x-4 text-sm">
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
}