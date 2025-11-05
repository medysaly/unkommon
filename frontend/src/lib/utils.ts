import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to create page URLs
export function createPageUrl(pageName: string): string {
  const urlMap: Record<string, string> = {
    'Home': '/',
    'AIReceptionist': '/ai-receptionist',
    'SpeedToLead': '/speed-to-lead',
    'AIBookingSystem': '/ai-booking-system',
    'SocialMediaBot': '/social-media-bot',
    'ExecutiveAssistant': '/executive-assistant',
    'CompanyKnowledgeBot': '/company-knowledge-bot',
    'ContentFactory': '/content-factory',
    'LinkedInAutomation': '/linkedin-automation',
    'SEORankTracker': '/seo-rank-tracker',
    'DHLTrackingBot': '/dhl-tracking-bot',
    'AgentLibrary': '/agent-library',
    'About': '/about',
    'Contact': '/contact',
  };
  
  return urlMap[pageName] || '/';
}
