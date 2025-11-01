
import React, { createContext, useState, ReactNode } from 'react';
import { AuthContextType, User, UserRole } from '../types';
import { apiService } from '../services/apiService';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (name: string, role: UserRole) => {
    try {
      const loggedInUser = await apiService.login(name, role);
      setUser(loggedInUser);
    } catch (error) {
      console.error("Login failed:", error);
      // In a real app, you might set an error state here
    }
  };

  const logout = () => {
    setUser(null);
  };
  
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
