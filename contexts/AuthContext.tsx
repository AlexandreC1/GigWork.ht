
import React, { createContext, useState, ReactNode } from 'react';
import { AuthContextType, User, UserRole } from '../types';
import { USERS } from '../constants';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, role: UserRole) => {
    // This is a mock login. In a real app, you'd authenticate against a server.
    let foundUser = USERS.find(u => u.name.toLowerCase() === name.toLowerCase() && u.role === role);
    
    if (!foundUser) {
       // Create a new mock user if not found
       foundUser = {
           id: `user-${Date.now()}`,
           name: name,
           role: role,
           avatar: `https://picsum.photos/seed/${name}/200/200`,
           rating: 0,
           reviewsCount: 0,
           skills: role === UserRole.Worker ? ['New Skill 1', 'New Skill 2'] : undefined,
           moncashId: role === UserRole.Worker ? '509-zz-zzzz' : undefined,
       };
    }
    setUser(foundUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
