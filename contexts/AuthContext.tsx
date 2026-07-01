import React, { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { AuthContextType, Permission, User, UserRole } from '../types';
import { apiService } from '../services/apiService';

export const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_STORAGE_KEY = 'gigwork.session';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.Customer]: ['booking:create', 'booking:manage-own'],
  [UserRole.Worker]: ['gig:create', 'gig:update-own', 'gig:delete-own', 'booking:manage-own', 'stats:view-own'],
  [UserRole.Admin]: ['stats:view-platform', 'security:view', 'booking:manage-own'],
};

const loadSession = (): User | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(loadSession);

  const login = useCallback(async (name: string, role: UserRole) => {
    const loggedInUser = await apiService.login(name, role);
    const nextUser = { ...loggedInUser, permissions: ROLE_PERMISSIONS[loggedInUser.role] };
    setUser(nextUser);
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    const nextUser = { ...updatedUser, permissions: updatedUser.permissions || ROLE_PERMISSIONS[updatedUser.role] };
    setUser(nextUser);
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(nextUser));
  }, []);

  const hasPermission = useCallback((permission: Permission) => {
    return Boolean(user?.permissions?.includes(permission));
  }, [user]);

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated: Boolean(user),
    hasPermission,
    login,
    logout,
    updateUser,
  }), [user, hasPermission, login, logout, updateUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
