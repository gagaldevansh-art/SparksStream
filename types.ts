
export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  IDEATION = 'IDEATION',
  CREATOR = 'CREATOR',
  ANALYTICS = 'ANALYTICS',
  COLLAB = 'COLLAB',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  role: 'GUEST' | 'CREATOR' | 'ADMIN';
  avatar?: string;
}

export interface SocialPost {
  id: string;
  content: string;
  platform: string;
  viralityScore: number;
  hashtags: string[];
  status: 'Draft' | 'Scheduled' | 'Posted';
  scheduledDate?: string;
  imagePrompt?: string;
}

export interface Idea {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface VibeCheckResult {
  persona: string;
  viralityScore: number; // 0-100
  sentiment: string;
  constructiveFeedback: string;
  suggestedHashtags: string[];
  visualPrompt: string;
  tone: string;
  optimizedCaption: string;
}

export interface Collaborator {
  id: string;
  name: string;
  handle: string;
  niche: string;
  followerCount: string;
  engagementRate: string;
  matchScore: number;
  reason: string;
  collabIdea: string;
  tier: 'Free' | 'Paid' | 'Premium';
  price: number; // Cost to connect in USD
}

export const MOCK_POSTS: SocialPost[] = [
  {
    id: '1',
    content: "Study tip: Don't just read, teach it to a rubber duck! 🦆 #StudyHacks",
    platform: "Instagram",
    viralityScore: 85,
    hashtags: ["#StudyHacks", "#StudentLife", "#Productivity"],
    status: 'Posted',
    scheduledDate: '2023-10-25'
  },
  {
    id: '2',
    content: "Pov: You have an assignment due at 11:59pm and it's 11:58pm. 🫠",
    platform: "TikTok",
    viralityScore: 92,
    hashtags: ["#StudentProblems", "#CollegeLife", "#Relatable"],
    status: 'Scheduled',
    scheduledDate: '2023-11-02'
  }
];
