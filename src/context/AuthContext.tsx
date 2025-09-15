import { createContext, useState, type ReactNode, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (
          parsedUser &&
          parsedUser.id &&
          parsedUser.name &&
          parsedUser.email
        ) {
          setUser(parsedUser);
        } else {
          console.warn("Usuari mal format (estructura inválida).");
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch {
        console.warn("Usuari mal format al localStorage (parse error).");
        setUser(null);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Permet tancar sessió globalment
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
