import { createContext, useState, type ReactNode, useEffect } from 'react';
import API from '../services/apiUser';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 // Exemple de login: adapta-ho segons la teva API
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
       const res = await API.post('/auth/login', { email, password_hash: password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err: unknown) {
      interface APIError {
        response?: {
          data?: {
            error?: string;
          };
        };
      }
      if (typeof err === 'object' && err !== null && 'response' in err && typeof (err as APIError).response === 'object') {
        setError((err as APIError).response?.data?.error || "No s'ha pogut iniciar sessió");
      } else {
        setError("No s'ha pogut iniciar sessió");
      }
    } finally {
      setLoading(false);
    }
  };
 // Logout neteja usuari i token
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Quan carrega l'app, intentar recuperar usuari guardat
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      // Opcional: podries validar token o fer refresh aquí si vols
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;