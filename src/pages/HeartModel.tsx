import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  ZoomIn,
  Rotate3d,
  Maximize2,
  Mic,
  Keyboard,
  Hand
} from 'lucide-react';
import Chatbot from '../components/Chatbot';

function HeartModel() {
  const navigate = useNavigate();
  const [activeInput, setActiveInput] = useState<'voice' | 'text' | 'sign' | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'sign'>('text');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <button
        onClick={() => navigate('/biology')}
        className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-[#4A90E2] transition-colors duration-300"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Biology</span>
      </button>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-['Poppins'] font-bold text-gray-900 mb-6">Human Heart - 3D Model</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* AR Viewer */}
          <div className="lg:w-3/5">
            <div className="bg-gray-100 rounded-lg overflow-hidden relative">
              <div className="aspect-video w-full h-full">
                <iframe 
                  title="Realistic Human Heart"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  src="https://sketchfab.com/models/3f8072336ce94d18b3d0d055a1ece089/embed"
                />
              </div>
              <div className="absolute bottom-4 right-4 flex space-x-2">
                <button className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                  <ZoomIn className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                  <Rotate3d className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                  <Maximize2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <span>Model by </span>
              <a 
                href="https://sketchfab.com/neshallads" 
                target="_blank" 
                rel="nofollow"
                className="text-[#1CAAD9] font-semibold hover:underline"
              >
                neshallads
              </a>
              <span> on </span>
              <a 
                href="https://sketchfab.com" 
                target="_blank" 
                rel="nofollow"
                className="text-[#1CAAD9] font-semibold hover:underline"
              >
                Sketchfab
              </a>
            </div>
          </div>

          {/* Chatbot Panel */}
          <div className="lg:w-2/5 flex flex-col">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveInput('voice')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                  activeInput === 'voice'
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Mic className="h-5 w-5" />
                <span>Voice</span>
              </button>
              <button
                onClick={() => setActiveInput('text')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                  activeInput === 'text'
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Keyboard className="h-5 w-5" />
                <span>Text</span>
              </button>
              <button
                onClick={() => setActiveInput('sign')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                  activeInput === 'sign'
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Hand className="h-5 w-5" />
                <span>Sign</span>
              </button>
            </div>

            <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden">
              <Chatbot context="human heart 3D model" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeartModel;