import React, { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

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
      // Aquí trucaràs a la teva API per fer login i obtenir usuari/token
      // Exemple fictici:
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      // Suposem que data.user és l'usuari retornat
      setUser(data.user);
      // Opcional: guarda el token al localStorage o cookie
    } catch (err: any) {
      setError(err.message || 'Error en fer login');
    } finally {
      setLoading(false);
    }
  };

  // Exemple de logout
  const logout = () => {
    setUser(null);
    // També esborra token si el tens guardat
  };

  // Exemple: carregar usuari de sessió guardada quan carrega l'app
  useEffect(() => {
    // Per exemple, recuperar usuari/token de localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
