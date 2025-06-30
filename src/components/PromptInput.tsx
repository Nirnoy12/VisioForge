import React, { useState } from 'react';
import { Sparkles, Wand2, Shuffle, RotateCcw, Zap, Info, Copy } from 'lucide-react';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export default function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const examplePrompts = [
    "A majestic dragon soaring through aurora-lit clouds at midnight",
    "Cyberpunk cityscape with neon reflections in rain-soaked streets", 
    "Ethereal forest fairy dancing among glowing mushrooms",
    "Futuristic spaceship emerging from a colorful nebula",
    "Serene Japanese garden with cherry blossoms in moonlight",
    "Steampunk airship floating above Victorian London",
    "Underwater city with bioluminescent coral architecture",
    "Ancient wizard casting spells in a crystal cave",
    "Phoenix rising from flames in a mystical forest",
    "Astronaut discovering alien flowers on Mars",
    "Time traveler standing in a portal between two worlds",
    "Majestic castle floating in the clouds at sunset"
  ];

  const enhancePrompt = () => {
    const enhancements = [
      "ultra detailed, 8K resolution, cinematic lighting, masterpiece quality",
      "photorealistic, highly detailed, professional photography, award winning", 
      "digital art, concept art, trending on artstation, highly detailed",
      "cinematic composition, dramatic lighting, hyperrealistic, stunning detail",
      "vibrant colors, sharp focus, perfect composition, artistic masterpiece"
    ];
    
    const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    const enhanced = `${prompt}, ${randomEnhancement}`;
    setPrompt(enhanced);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const getRandomPrompt = () => {
    const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
    setPrompt(randomPrompt);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-sm transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 px-6 py-4 border-b border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Create AI Art</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">Describe your vision in detail</p>
            </div>
          </div>
          <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-700">
            FREE
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Service Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6 backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-blue-900 dark:text-blue-300 font-medium mb-1">🚀 Professional AI Generation</p>
              <p className="text-blue-800 dark:text-blue-400">
                Powered by Stable Diffusion and Pollinations.ai. No signup required, unlimited generations.
                Typical generation time: 10-30 seconds.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Describe your artwork
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A breathtaking landscape with mountains and a serene lake at golden hour..."
                className="w-full h-32 px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-700 focus:bg-white dark:focus:bg-slate-600"
                disabled={isGenerating}
                maxLength={500}
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600">
                {prompt.length}/500
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={enhancePrompt}
              disabled={!prompt.trim() || isGenerating}
              className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-500 dark:hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Wand2 className="w-4 h-4" />
              <span>Enhance</span>
            </button>
            
            <button
              type="button"
              onClick={getRandomPrompt}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-4 py-2 text-sm bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 dark:hover:from-emerald-500 dark:hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Shuffle className="w-4 h-4" />
              <span>Random</span>
            </button>
            
            <button
              type="button"
              onClick={() => setPrompt('')}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-slate-200 dark:border-slate-600"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:via-indigo-600 dark:hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating your masterpiece...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Generate AI Art - FREE</span>
              </div>
            )}
          </button>
        </form>

        {/* Example Prompts */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400" />
            Creative Inspiration
          </h3>
          <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                disabled={isGenerating}
                className="text-left p-3 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-slate-900 dark:hover:text-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed group border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
              >
                <div className="flex items-start space-x-2">
                  <Copy className="w-3 h-3 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 dark:text-slate-500" />
                  <span className="leading-relaxed">{example}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}