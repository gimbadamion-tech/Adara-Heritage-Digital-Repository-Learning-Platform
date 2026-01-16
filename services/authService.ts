
import { User, UserRole } from '../types';

const STORAGE_KEY = 'adara_auth_user';

export const authService = {
  login: (email: string, name: string, village: string): User => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      village,
      role: email.includes('admin') ? UserRole.ADMIN : UserRole.USER
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },
  
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },
  
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  }
};
