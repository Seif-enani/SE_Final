import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types/user';
import { dummyUsers } from '../data/users';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!currentUser;

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = dummyUsers.find(
          (u) => u.email === email && u.password === password
        );
        
        if (user) {
          // Remove password from stored user object
          const { password, ...secureUser } = user;
          setCurrentUser(secureUser as User);
          localStorage.setItem('currentUser', JSON.stringify(secureUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, we would send this to an API
        // For now, just simulate success
        resolve(true);
      }, 800);
    });
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};