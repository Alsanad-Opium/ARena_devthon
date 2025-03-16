import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Mic, 
  Camera, 
  BookmarkIcon, 
  UserCircle,
} from 'lucide-react';

const subjects = [
  {
    id: 1,
    name: 'Biology',
    description: 'Explore human anatomy and cellular structures in 3D',
    icon: '🧬',
    hasAR: true,
    path: '/biology'
  },
  {
    id: 2,
    name: 'Physics',
    description: 'Understand mechanics and wave motion through AR models',
    icon: '⚡',
    hasAR: true,
    path: '/physics'
  },
  {
    id: 3,
    name: 'Chemistry',
    description: 'Visualize molecular structures and reactions',
    icon: '⚗️',
    hasAR: true,
    path: '/chemistry'
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-[#4A90E2]" />
              <span className="text-xl font-semibold font-['Poppins']">EduAR</span>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A90E2] transition-all duration-300"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
                  <Mic className="h-5 w-5 text-gray-400 hover:text-[#4A90E2] cursor-pointer transition-colors duration-300" />
                  <Camera className="h-5 w-5 text-gray-400 hover:text-[#4A90E2] cursor-pointer transition-colors duration-300" />
                </div>
              </div>
            </div>

            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-[#4A90E2] transition-colors duration-300">Topics</a>
              <BookmarkIcon className="h-6 w-6 text-gray-600 hover:text-[#4A90E2] cursor-pointer transition-colors duration-300" />
              <UserCircle className="h-6 w-6 text-gray-600 hover:text-[#4A90E2] cursor-pointer transition-colors duration-300" />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Subject Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-['Poppins'] font-bold text-gray-900 mb-6">Explore Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                onClick={() => navigate(subject.path)}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-4">{subject.icon}</div>
                  {subject.hasAR && (
                    <span className="bg-[#50C878] text-white text-xs px-2 py-1 rounded-full">
                      AR Available
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-['Poppins'] font-semibold mb-2">{subject.name}</h3>
                <p className="text-gray-600 font-['Inter']">{subject.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;