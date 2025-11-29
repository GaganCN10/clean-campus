import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminUser');
    
    if (token && adminData) {
      setAdmin(JSON.parse(adminData));
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Mock login - replace with actual API call
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const adminData = {
          id: '1',
          username: 'admin',
          email: 'admin@college.edu',
          role: 'admin'
        };
        
        localStorage.setItem('adminToken', 'demo-token');
        localStorage.setItem('adminUser', JSON.stringify(adminData));
        setAdmin(adminData);
        return { success: true };
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdmin(null);
  };

  const value = {
    admin,
    login,
    logout,
    isAuthenticated: !!admin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};