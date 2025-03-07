import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { useSubscriptionStore } from '../store/subscriptionStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: {
        getItem: (key) => sessionStorage.getItem(key),
        setItem: (key, value) => sessionStorage.setItem(key, value),
        removeItem: (key) => sessionStorage.removeItem(key)
      }
    },
    global: {
      headers: {
        'x-application-name': 'parking-app'
      }
    }
  }
);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const location = useLocation();
  const fetchSubscriptionStatus = useSubscriptionStore(state => state.fetchSubscriptionStatus);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          useAuthStore.setState({ user: session.user, loading: false });
          await fetchSubscriptionStatus();
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [fetchSubscriptionStatus]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 