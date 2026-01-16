
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  village: string;
  role: UserRole;
  isVerified?: boolean;
}

export interface HeritageItem {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'text' | 'image';
  url: string;
  village: string;
  author: string;
  timestamp: number;
}

export interface Ancestor {
  id: string;
  relation: string;
  name: string;
  village: string;
}

export interface LineageData {
  father?: Ancestor;
  mother?: Ancestor;
  paternalGrandFather?: Ancestor;
  paternalGrandMother?: Ancestor;
  maternalGrandFather?: Ancestor;
  maternalGrandMother?: Ancestor;
}

export interface CommunityMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  village: string;
}
