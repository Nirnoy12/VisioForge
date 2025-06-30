import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import PromptInput from './components/PromptInput';
import GenerationControls from './components/GenerationControls';
import OutputDisplay from './components/OutputDisplay';
import { aiService, GeneratedContent, GenerationOptions } from './services/aiService';

function AppContent() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string>('');
  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>({
    style: 'realistic',
    resolution: '1024x1024',
    steps: 20,
    guidance: 7.5
  });

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true);
    setError('');
    setGeneratedContent(null);
    
    try {
      const result = await aiService.generate(prompt, 'image', generationOptions);
      setGeneratedContent(result);
    } catch (error) {
      console.error('Generation failed:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptionsChange = (newOptions: Partial<GenerationOptions>) => {
    setGenerationOptions(prev => ({ ...prev, ...newOptions }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-800 rounded-full mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-3"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">AI-Powered • 100% Free • No Limits</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-slate-100 dark:via-blue-100 dark:to-slate-100 bg-clip-text text-transparent">
              Create Stunning
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              AI Artwork
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12">
            Transform your imagination into breathtaking visuals with our advanced AI image generator. 
            Professional quality, unlimited creativity, completely free.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">∞</div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Unlimited Generations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">4K</div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Ultra High Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">0$</div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Always Free</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 mb-16">
          {/* Left Column - Controls */}
          <div className="xl:col-span-2 space-y-6">
            <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
            <GenerationControls 
              options={generationOptions}
              onOptionsChange={handleOptionsChange}
            />
          </div>

          {/* Right Column - Output */}
          <div className="xl:col-span-3">
            <OutputDisplay 
              isGenerating={isGenerating} 
              generatedContent={generatedContent}
              error={error}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Professional AI Art Generation
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powered by state-of-the-art AI models, delivering gallery-quality results every time
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Ultra High Quality</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Generate images up to 4K resolution with incredible detail and clarity</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Multiple Art Styles</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">From photorealistic to anime, fantasy to minimalist - every style perfected</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Lightning Fast</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Advanced optimization delivers professional results in seconds, not minutes</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">Privacy First</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">No account required, no data stored. Your creativity stays completely private</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;