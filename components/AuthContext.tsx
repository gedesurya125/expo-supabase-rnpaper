import React from 'react';
import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import { Alert, AppState } from 'react-native';

interface SignProps {
  email: string;
  password: string;
}

interface InSessionLoginInfoProps {
  email: string;
  pin: string;
}

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh().catch((err) => {
      console.log('error starting the auto refresh', err);
    });
  } else {
    supabase.auth.stopAutoRefresh().catch((err) => {
      console.log('error stopping the auto refresh', err);
    });
  }
});

const AuthContext = React.createContext<{
  signInWithEmail: (data: SignProps) => Promise<void>;
  signUpWithEmail: (data: SignProps) => void;
  signOut: () => void;
  session?: Session | null;
  loading: boolean;
  inSessionLoginInfo: {
    email: string;
    pin: string;
  };
  handleInSessionLogin: ({ email, pin }: InSessionLoginInfoProps) => void;
  isSessionExist: boolean;
}>({
  signInWithEmail: () => new Promise(() => {}),
  signUpWithEmail: () => null,
  signOut: () => null,
  session: null,
  loading: false,
  inSessionLoginInfo: { email: '', pin: '' },
  handleInSessionLogin: () => {},
  isSessionExist: false
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <AuthContextProvider />');
    }
  }

  return value;
}

export function AuthContextProvider(props: React.PropsWithChildren) {
  const [loading, setLoading] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);
  const [inSessionLoginInfo, setInSessionLoginInfo] = React.useState({
    email: '',
    pin: ''
  });

  async function signInWithEmail({ email, password }: SignProps) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail({ email, password }: SignProps) {
    setLoading(true);
    const {
      data: { session },
      error
    } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  const handleInSessionLogin = ({ email, pin }: InSessionLoginInfoProps) => {
    setInSessionLoginInfo({ email, pin });
  };

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInWithEmail,
        signUpWithEmail,
        signOut: () => {
          supabase.auth.signOut();
        },
        session,
        loading,
        inSessionLoginInfo,
        handleInSessionLogin,
        isSessionExist: !!session && !!session?.user
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
