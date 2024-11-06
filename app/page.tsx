// Home.js

import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-5 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Welcome to Quiz Craft
          </h1>
          <p className="text-lg md:text-xl mb-8">
            The ultimate platform for students and teachers to create, take, and
            analyze exams efficiently.
          </p>
          <div className="space-x-4">
            <Link href={`/sign-up`}>
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg shadow-lg font-semibold transition duration-300 hover:bg-gray-200">
                Get Started
              </button>
            </Link>
            <Link href={`/sign-in`}>
              <button className="px-8 py-3 bg-transparent border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Features
          </h2>
          <p className="text-gray-600 mt-4">
            ExamHub simplifies the process for students and teachers with these
            key features:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Create Mock Exams
            </h3>
            <p className="text-gray-700">
              Teachers can easily create and customize mock exams, with options
              for question difficulty and topics.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Track Progress
            </h3>
            <p className="text-gray-700">
              Students can enroll in courses, take exams, and track their
              progress over time, comparing scores and feedback.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              AI-Driven Analysis
            </h3>
            <p className="text-gray-700">
              Get instant feedback and scoring, powered by AI, to help you
              improve with each mock exam you attempt.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 py-16 px-5 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to ace your exams?
          </h2>
          <p className="text-lg mb-8">
            Join Quiz Craft today and start mastering your subjects with
            confidence.
          </p>
          <Link href="/dashboard">
            <button className="px-10 py-4 bg-orange-500 text-white rounded-lg font-semibold transition duration-300 hover:bg-orange-600">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 text-center text-gray-600 mt-12">
        <p>
          &copy; {new Date().getFullYear()} Quiz Craft. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
