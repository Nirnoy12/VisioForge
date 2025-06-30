// AI Service for text-to-image generation
// Completely free service using multiple fallback APIs
export interface GenerationOptions {
  style: string;
  resolution: string;
  steps?: number;
  guidance?: number;
}

export interface GeneratedContent {
  type: 'image';
  url: string;
  prompt: string;
  timestamp: string;
  blob?: Blob;
  model?: string;
}

class AIService {
  private readonly freeImageAPIs = [
    {
      name: 'Pollinations.ai',
      endpoint: 'https://image.pollinations.ai/prompt',
      type: 'url'
    },
    {
      name: 'Hugging Face (Free)',
      endpoint: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
      type: 'api'
    }
  ];

  private enhancePrompt(prompt: string, style: string): string {
    const baseEnhancements = {
      realistic: 'photorealistic, high quality, detailed, 8k resolution, professional photography',
      anime: 'anime style, manga, cel shading, vibrant colors, studio ghibli style',
      artistic: 'artistic, painterly, masterpiece, fine art, oil painting, canvas',
      cyberpunk: 'cyberpunk, neon lights, futuristic, sci-fi, blade runner style, dark atmosphere',
      fantasy: 'fantasy art, magical, ethereal, mystical, enchanted, fairy tale',
      minimalist: 'minimalist, clean, simple, modern design, geometric, abstract'
    };

    const enhancement = baseEnhancements[style as keyof typeof baseEnhancements] || 'high quality, detailed';
    return `${prompt}, ${enhancement}`;
  }

  private async generateWithPollinations(prompt: string, options: GenerationOptions): Promise<GeneratedContent> {
    try {
      const enhancedPrompt = this.enhancePrompt(prompt, options.style);
      const encodedPrompt = encodeURIComponent(enhancedPrompt);
      const [width, height] = options.resolution.split('x').map(Number);
      
      // Add random seed for variety
      const seed = Math.floor(Math.random() * 1000000);
      const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&enhance=true&nologo=true`;
      
      // Create a promise that resolves when image loads
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = async () => {
          try {
            // Convert image to blob for download functionality
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            
            canvas.toBlob((blob) => {
              if (blob) {
                const objectUrl = URL.createObjectURL(blob);
                resolve({
                  type: 'image',
                  url: objectUrl,
                  prompt: enhancedPrompt,
                  timestamp: new Date().toLocaleString(),
                  blob,
                  model: 'Pollinations.ai (Free)'
                });
              } else {
                // Fallback to direct URL if blob creation fails
                resolve({
                  type: 'image',
                  url: url,
                  prompt: enhancedPrompt,
                  timestamp: new Date().toLocaleString(),
                  model: 'Pollinations.ai (Free)'
                });
              }
            }, 'image/png');
          } catch (error) {
            // Fallback to direct URL
            resolve({
              type: 'image',
              url: url,
              prompt: enhancedPrompt,
              timestamp: new Date().toLocaleString(),
              model: 'Pollinations.ai (Free)'
            });
          }
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load generated image'));
        };
        
        img.src = url;
      });
    } catch (error) {
      console.error('Pollinations generation error:', error);
      throw new Error('Image generation failed. Please try again.');
    }
  }

  private async generateWithHuggingFaceFree(prompt: string, options: GenerationOptions): Promise<GeneratedContent> {
    try {
      const enhancedPrompt = this.enhancePrompt(prompt, options.style);
      const [width, height] = options.resolution.split('x').map(Number);
      
      const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: enhancedPrompt,
          parameters: {
            num_inference_steps: Math.min(options.steps || 20, 20), // Limit steps for free tier
            guidance_scale: options.guidance || 7.5,
            width: Math.min(width, 512), // Limit resolution for free tier
            height: Math.min(height, 512)
          }
        })
      });

      if (!response.ok) {
        if (response.status === 503) {
          throw new Error('Model is currently loading, please try again in a moment');
        }
        throw new Error(`Generation failed with status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      return {
        type: 'image',
        url,
        prompt: enhancedPrompt,
        timestamp: new Date().toLocaleString(),
        blob,
        model: 'Stable Diffusion 2.1 (Free)'
      };
    } catch (error) {
      console.error('Hugging Face free generation error:', error);
      throw error;
    }
  }

  async generateImage(prompt: string, options: GenerationOptions): Promise<GeneratedContent> {
    // Try multiple free services in order of preference
    const services = [
      () => this.generateWithPollinations(prompt, options),
      () => this.generateWithHuggingFaceFree(prompt, options)
    ];

    for (let i = 0; i < services.length; i++) {
      try {
        console.log(`Trying image generation service ${i + 1}...`);
        return await services[i]();
      } catch (error) {
        console.warn(`Service ${i + 1} failed:`, error);
        if (i === services.length - 1) {
          throw new Error('All image generation services are currently unavailable. Please try again later.');
        }
      }
    }

    throw new Error('Image generation failed');
  }

  async generate(prompt: string, mode: 'image', options: GenerationOptions): Promise<GeneratedContent> {
    if (!prompt.trim()) {
      throw new Error('Please enter a prompt to generate content');
    }

    try {
      return await this.generateImage(prompt, options);
    } catch (error) {
      console.error('Generation failed:', error);
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  }
}

export const aiService = new AIService();