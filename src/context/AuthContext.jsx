import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/apiClient";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      // Fetch user profile from backend
      API.get("/auth/me")
        .then((res) => {
          setCurrentUser(res.data.data.user);
        })
        .catch(() => {
          // if token is invalid/expired
          localStorage.removeItem("token");
          setToken(null);
          setCurrentUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const { user, token } = res.data.data;

      setCurrentUser(user);
      setToken(token);
      localStorage.setItem("token", token);

      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await API.post("/auth/signup", { name, email, password });
      const { user, token } = res.data.data;

      setCurrentUser(user);
      setToken(token);
      localStorage.setItem("token", token);

      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

  const value = {
    currentUser,
    token,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
