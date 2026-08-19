import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API_URL = "http://localhost:3000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is already logged in
  // The browser automatically sends the HttpOnly cookie.
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch(`${API_URL}/me`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to get current user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  // LOGIN
  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    setUser(data.user);

    return data;
  };

  // SIGNUP
  const signup = async (userData) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }

    setUser(data.user);

    return data;
  };

  // LOGOUT
  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
    }
  };
  
  const updateUser = (updatedFields) => {
    setUser((prev) => (prev ? { ...prev, ...updatedFields } : prev));
   };

  return (
    <AuthContext.Provider
        value={{ user, loading, login, signup, logout, updateUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};