import React from 'react';
import { Settings2, Palette, Zap, Monitor, Sliders } from 'lucide-react';
import { GenerationOptions } from '../services/aiService';

interface GenerationControlsProps {
  options: GenerationOptions;
  onOptionsChange: (newOptions: Partial<GenerationOptions>) => void;
}

export default function GenerationControls({ options, onOptionsChange }: GenerationControlsProps) {
  const styles = [
    { id: 'realistic', name: 'Realistic', emoji: '📷', desc: 'Photorealistic images' },
    { id: 'anime', name: 'Anime', emoji: '🎌', desc: 'Japanese animation style' },
    { id: 'artistic', name: 'Artistic', emoji: '🎨', desc: 'Painterly and creative' },
    { id: 'cyberpunk', name: 'Cyberpunk', emoji: '🌃', desc: 'Futuristic neon aesthetic' },
    { id: 'fantasy', name: 'Fantasy', emoji: '🧙‍♂️', desc: 'Magical and mystical' },
    { id: 'minimalist', name: 'Minimalist', emoji: '⚪', desc: 'Clean and simple' }
  ];

  const resolutions = [
    { value: '512x512', label: '512×512', desc: 'Square (Fast)' },
    { value: '768x768', label: '768×768', desc: 'Square (HD)' },
    { value: '1024x1024', label: '1024×1024', desc: 'Square (Ultra)' },
    { value: '1280x720', label: '1280×720', desc: 'Landscape (HD)' },
    { value: '1920x1080', label: '1920×1080', desc: 'Landscape (4K)' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-sm transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 px-6 py-4 border-b border-slate-200 dark:border-slate-600">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
            <Settings2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Generation Settings</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Fine-tune your AI artwork</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Art Style Selection */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Palette className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Art Style</label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {styles.map((styleOption) => (
              <button
                key={styleOption.id}
                onClick={() => onOptionsChange({ style: styleOption.id })}
                className={`p-4 rounded-xl border-2 transition-all text-left group ${
                  options.style === styleOption.id
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 shadow-lg'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{styleOption.emoji}</span>
                  <div>
                    <div className={`font-medium text-sm ${
                      options.style === styleOption.id ? 'text-blue-900 dark:text-blue-300' : 'text-slate-900 dark:text-slate-100'
                    }`}>
                      {styleOption.name}
                    </div>
                    <div className={`text-xs ${
                      options.style === styleOption.id ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {styleOption.desc}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Resolution */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Monitor className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Resolution</label>
          </div>
          <div className="space-y-2">
            {resolutions.map((res) => (
              <button
                key={res.value}
                onClick={() => onOptionsChange({ resolution: res.value })}
                className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                  options.resolution === res.value
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`font-medium text-sm ${
                      options.resolution === res.value ? 'text-blue-900 dark:text-blue-300' : 'text-slate-900 dark:text-slate-100'
                    }`}>
                      {res.label}
                    </div>
                    <div className={`text-xs ${
                      options.resolution === res.value ? 'text-blue-700 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {res.desc}
                    </div>
                  </div>
                  {options.resolution === res.value && (
                    <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Sliders className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <label className="text-sm font-semibold text-slate-900 dark:text-slate-100">Advanced Settings</label>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Inference Steps</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600">
                  {options.steps}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={options.steps}
                onChange={(e) => onOptionsChange({ steps: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>Fast (10)</span>
                <span>Quality (100)</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Guidance Scale</span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-600">
                  {options.guidance}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={options.guidance}
                onChange={(e) => onOptionsChange({ guidance: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>Creative (1)</span>
                <span>Precise (20)</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Model Info */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <div className="text-sm">
              <p className="text-emerald-900 dark:text-emerald-300 font-medium mb-2">Active AI Models</p>
              <ul className="text-emerald-800 dark:text-emerald-400 space-y-1">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"></div>
                  <span>Stable Diffusion XL (Primary)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"></div>
                  <span>Pollinations.ai (Backup)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"></div>
                  <span>Hugging Face Models</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}