"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import AuthButton from "./components/AuthButton"
import AuthModal from "./components/AuthModal"
import ClientOnly from "./components/HydrationBoundary"
import { useUser } from "./contexts/UserContext"

export default function Home() {
  const { user, setUser } = useUser()
  const [isMounted, setIsMounted] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('job')
  const [selectedMentor, setSelectedMentor] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleLogout = () => {
    setUser(null)
  }

  // Prevent hydration mismatch - use mounted flag for user-dependent content
  const displayName = isMounted ? (user ? user.name : "Guest") : "Guest"

  const careers = [
    { id: 1, title: 'Software Engineer', match: 96, category: 'job', icon: '💻', salary: '$120K-$180K' },
    { id: 2, title: 'Network Engineer', match: 86, category: 'job', icon: '🌐', salary: '$100K-$160K' },
  ]

  const resources = [
    { id: 1, title: 'Python Programming', icon: '🐍', type: ['Courses', 'Articles', 'Videos'], learners: '10K+' },
    { id: 2, title: 'Web Development', icon: '🌐', type: ['Courses', 'Articles', 'Videos'], learners: '25K+' },
    { id: 3, title: 'Mobile App Developer', icon: '📱', type: ['Courses', 'Articles', 'Videos'], learners: '15K+' },
  ]

  const mentors = [
    { id: 1, name: 'Nazim Uddin', role: 'Software Engineer', rating: 4.0, reviews: 250, recommended: true, image: 'A' },
    { id: 2, name: 'Khalil Ahmed', role: 'Network Engineer', rating: 4.6, reviews: 85, recommended: true, image: 'P' },
    { id: 3, name: 'Nazrul Islam', role: 'Android Developer', rating: 3.6, reviews: 63, recommended: true, image: 'R' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 text-2xl font-bold">
            <div className="relative">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-75"></div> */}
              <div className="relative bg-white px-1 py-2 text-blue-600">🚀</div>
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CareerLeader</span>
          </div>
          <nav className="flex gap-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
            <Link href="#careers" className="text-gray-700 hover:text-blue-600 font-medium transition">Explore Careers</Link>
            <Link href="#mentors" className="text-gray-700 hover:text-blue-600 font-medium transition">Mentors</Link>
            {isMounted && user?.type === 'admin' && (
              <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-medium transition">⚙️ Admin</Link>
            )}
            <button className="relative text-gray-700 hover:text-blue-600 transition">
              🔔
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">1</span>
            </button>
            <AuthButton onOpenAuth={() => setIsAuthOpen(true)} onLogout={handleLogout} />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">Welcome to Career Leader!</div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Ideal Career</span> Path
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">Discover personalized career recommendations based on your personality, interests, and goals in just 5 minutes.</p>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              🚀 Take Assessment Now
            </Link>
          </div>
          <div className="text-center relative">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative text-9xl bg-gradient-to-br from-blue-100 to-indigo-100 p-12 rounded-3xl">👨‍💼</div>
            </div>
          </div>
        </div>
      </section>

      {/* Greeting & Feature Cards */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Hello, {displayName}! 👋
          </h2>
          <p className="text-lg text-gray-600 mt-2">Ready to discover your future?</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
            <div className="relative">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Complete Assessment</h3>
              <p className="text-gray-600 mb-6">Take a 5-minute personality & interest test to find careers that fit you.</p>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition">Start Now</button>
            </div>
          </div>
          <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
            <div className="relative">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Recommended Careers</h3>
              <p className="text-gray-600 mb-6">Get personalized career suggestions based on your assessment.</p>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition">View Careers</button>
            </div>
          </div>
          <div className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition"></div>
            <div className="relative">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Track Your Progress</h3>
              <p className="text-gray-600 mb-6">Monitor your skill development and career progress.</p>
              <div className="flex items-center gap-4">
                <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition">View</button>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Recommendations */}
      <section id="careers" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Career Recommendations</h2>
          <p className="text-gray-600">Explore careers that match your profile</p>
        </div>
        <div className="flex gap-3 mb-8">
          {['job', 'higher_study', 'entrepreneurship'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab === 'job' ? '💼 Job' : tab === 'higher_study' ? '🎓 Higher Study' : '🚀 Entrepreneurship'}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {careers.map(career => (
            <div key={career.id} className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition"></div>
              <div className="relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-6xl mb-3">{career.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900">{career.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">{career.salary}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 font-bold px-4 py-2 rounded-xl text-lg">{career.match}%</div>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
                      style={{ width: `${career.match}%` } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 rounded-lg font-bold shadow-md hover:shadow-lg transition">✓ Interested</button>
                  <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 rounded-lg font-bold transition">View Details →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Resources & Mentors */}
      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-3 gap-12">
        {/* Learning Resources */}
        <div className="lg:col-span-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Learning Resources</h2>
            <Link href="#" className="text-blue-600 hover:text-blue-700 font-bold text-sm">See All →</Link>
          </div>
          <div className="space-y-4">
            {resources.map(resource => (
              <div key={resource.id} className="group bg-white rounded-xl p-5 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                <div className="text-4xl mb-3 group-hover:scale-110 transition">{resource.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg">{resource.title}</h3>
                <div className="flex gap-2 mt-3 text-xs font-medium text-gray-600">
                  {resource.type.map((t) => (
                    <span key={`${resource.id}-${t}`} className="bg-gray-100 px-2 py-1 rounded">• {t}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">👥 {resource.learners} learners</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mentors */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Mentors for You</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mentors.map(mentor => (
              <div 
                key={mentor.id}
                className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition"></div>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition">
                    {mentor.image}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{mentor.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{mentor.role}</p>
                  <div className="flex justify-center items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
                    <span className="text-xs text-gray-600 ml-2">{mentor.rating} • {mentor.reviews}</span>
                  </div>
                  {mentor.recommended && (
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                      ⭐ Highly Recommended
                    </div>
                  )}
                  <button 
                    onClick={() => setSelectedMentor(mentor)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition">
                    👁 View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 text-center text-gray-600 mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-gray-900">Career Leader</span>
          </div>
          <p className="text-sm mb-4">Discover your ideal career path based on your personality and interests.</p>
          <p className="text-xs text-gray-500">Career Leader © 2026. All rights reserved.</p>
        </div>
      </footer>

      {/* Auth Modal - Rendered at page level for full-page blur */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Mentor Profile Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ✕
            </button>

            {/* Mentor Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {selectedMentor.image}
            </div>

            {/* Mentor Info */}
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">{selectedMentor.name}</h2>
            <p className="text-gray-600 text-center mb-1">{selectedMentor.role}</p>

            {/* Rating */}
            <div className="flex justify-center items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-lg">★</span>
              ))}
              <span className="text-sm text-gray-600 ml-2">{selectedMentor.rating} ({selectedMentor.reviews} reviews)</span>
            </div>

            {/* Badge */}
            {selectedMentor.recommended && (
              <div className="text-center mb-6">
                <span className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 text-xs font-bold px-4 py-2 rounded-full">
                  ⭐ Highly Recommended
                </span>
              </div>
            )}

            {/* About Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                Experienced mentor with years of expertise in {selectedMentor.role.toLowerCase()}. 
                Available for mentoring, career guidance, and technical discussions.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{selectedMentor.reviews}+</p>
                <p className="text-xs text-gray-600">Reviews</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">500+</p>
                <p className="text-xs text-gray-600">Students</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">95%</p>
                <p className="text-xs text-gray-600">Satisfaction</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedMentor(null)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition">
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
