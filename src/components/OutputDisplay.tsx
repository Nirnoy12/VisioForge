import React, { useState } from 'react';
import { Download, Share2, Heart, RotateCcw, Maximize2, AlertTriangle, CheckCircle, Sparkles, Eye, Copy } from 'lucide-react';

interface OutputDisplayProps {
  isGenerating: boolean;
  generatedContent: {
    type: 'image';
    url: string;
    prompt: string;
    timestamp: string;
    blob?: Blob;
    model?: string;
  } | null;
  error?: string;
}

export default function OutputDisplay({ isGenerating, generatedContent, error }: OutputDisplayProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = async () => {
    if (!generatedContent) return;
    
    setIsDownloading(true);
    try {
      if (generatedContent.blob) {
        const url = URL.createObjectURL(generatedContent.blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `visioforge-artwork-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        const response = await fetch(generatedContent.url);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `visioforge-artwork-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try right-clicking the image and selecting "Save as..."');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!generatedContent) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my AI-generated artwork!',
          text: `Created with VisioForge (FREE): "${generatedContent.prompt}"`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      navigator.clipboard.writeText(`Check out my AI-generated artwork: "${generatedContent.prompt}" - Created with VisioForge (100% FREE!)`);
      alert('Link copied to clipboard!');
    }
  };

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  if (error) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-sm transition-colors duration-300">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 px-6 py-4 border-b border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 dark:bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-300">Generation Failed</h3>
              <p className="text-sm text-red-700 dark:text-red-400">Something went wrong</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <div className="w-full h-80 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl flex items-center justify-center mb-6 border-2 border-dashed border-red-300 dark:border-red-700">
            <div className="space-y-4 max-w-md">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-red-500 dark:text-red-400" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-red-700 dark:text-red-300">Unable to Generate Image</p>
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Please try again with a different prompt or wait a moment for the AI service to become available</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 dark:hover:from-red-700 dark:hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-sm transition-colors duration-300">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-6 py-4 border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300">Creating Your Artwork</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">AI is working its magic...</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <div className="relative w-full h-80 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-xl flex items-center justify-center mb-6 overflow-hidden border border-slate-200 dark:border-slate-700">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-indigo-100/50 to-purple-100/50 dark:from-blue-800/20 dark:via-indigo-800/20 dark:to-purple-800/20 rounded-xl animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-slate-700/20 to-transparent animate-shimmer"></div>
            <div className="relative space-y-6">
              <div className="w-20 h-20 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="space-y-3">
                <p className="text-xl font-semibold text-slate-800 dark:text-slate-200">🎨 Crafting your masterpiece...</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">This typically takes 10-30 seconds</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <Sparkles className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                  <span>Powered by advanced AI models</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500 h-3 rounded-full animate-progress"></div>
            </div>
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>Processing with AI models...</span>
              <span>Almost ready!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!generatedContent) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-sm transition-colors duration-300">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 px-6 py-4 border-b border-slate-200 dark:border-slate-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-slate-400 dark:bg-slate-600 rounded-lg flex items-center justify-center shadow-lg">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Your Artwork Preview</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Generated images will appear here</p>
            </div>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <div className="w-full h-80 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl flex items-center justify-center mb-6 border-2 border-dashed border-slate-300 dark:border-slate-600">
            <div className="space-y-4 max-w-md">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto">
                <Maximize2 className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Ready to Create Amazing Art</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Enter a detailed prompt and click generate to see your AI artwork come to life</p>
                <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 dark:text-slate-500">
                  <CheckCircle className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                  <span>100% Free • No limits • Professional quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden backdrop-blur-sm transition-colors duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 px-6 py-4 border-b border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-500 dark:bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300">Artwork Generated</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Ready for download</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-xs font-medium px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-700">
                FREE
              </div>
              {generatedContent.model && (
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs font-medium px-2 py-1 rounded-full border border-blue-200 dark:border-blue-700">
                  {generatedContent.model}
                </div>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400">{generatedContent.timestamp}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Prompt Display */}
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="flex items-start space-x-3">
              <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Generated from prompt:</p>
                <p className="text-sm text-slate-800 dark:text-slate-200 italic leading-relaxed">"{generatedContent.prompt}"</p>
              </div>
            </div>
          </div>

          {/* Image Display */}
          <div className="relative group mb-6">
            <img
              src={generatedContent.url}
              alt="AI Generated artwork"
              className="w-full h-80 object-cover rounded-xl shadow-lg border border-slate-200 dark:border-slate-600"
              onError={(e) => {
                console.error('Image failed to load');
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk3YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIGZhaWxlZCB0byBsb2FkPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button 
                onClick={handleFullscreen}
                className="bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 p-3 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-all shadow-lg border border-slate-200 dark:border-slate-600"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all border ${
                  isLiked 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 border-slate-200 dark:border-slate-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Loved' : 'Love it'}</span>
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all border border-slate-200 dark:border-slate-600"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Create New</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-all border border-slate-200 dark:border-slate-600"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Downloading...' : 'Download FREE'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setIsFullscreen(false)}>
          <div className="relative max-w-full max-h-full">
            <img
              src={generatedContent.url}
              alt="AI Generated artwork - Fullscreen"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-600"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}