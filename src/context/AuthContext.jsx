import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USERS_KEY = 'auth_users';
const SESSION_KEY = 'auth_session';

const ADMIN = { name: 'Admin', email: 'admin', password: 'admin' };

const loadUsers = () => {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const loadSession = () => {
  try {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession);

  const login = (email, password) => {
    const users = [...loadUsers(), ADMIN];
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password' };
    const session = { name: found.name, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const register = (name, email, password) => {
    const users = loadUsers();
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, { name, email, password }]));
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const getUsers = () => loadUsers();

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, getUsers }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
