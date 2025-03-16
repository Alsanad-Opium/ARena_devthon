import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const topics = [
  {
    id: 1,
    name: 'Human Heart',
    description: 'Explore the structure and function of the human heart in 3D',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&q=80&w=800',
    path: '/biology/heart'
  },
  // Add more biology topics here
];

function Biology() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-[#4A90E2] transition-colors duration-300"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Subjects</span>
      </button>

      <h1 className="text-4xl font-['Poppins'] font-bold text-gray-900 mb-8">Biology Topics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => navigate(topic.path)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
          >
            <img
              src={topic.image}
              alt={topic.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-['Poppins'] font-semibold mb-2">{topic.name}</h3>
              <p className="text-gray-600 font-['Inter']">{topic.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Biology;