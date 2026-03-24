import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to create page URLs
export function createPageUrl(pageName: string): string {
  const urlMap: Record<string, string> = {
    'Home': '/',
    'Solutions': '/solutions',
    'HowItWorks': '/how-it-works',
    'About': '/about',
    'Contact': '/contact',
    // Legacy aliases — old product pages redirect to /solutions
    'AIReceptionist': '/solutions',
    'SpeedToLead': '/solutions',
    'AIBookingSystem': '/solutions',
    'AgentLibrary': '/solutions',
  };

  return urlMap[pageName] || '/';
}
