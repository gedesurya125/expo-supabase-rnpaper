import React from 'react';
import { useSession } from '@/components/AuthContext';
import { supabase } from './supabase';

type UserInformation = {
  username: string;
  website: string;
  avatar_url: string;
  full_name: string;
  pin: number;
};

export const useCurrentUser = () => {
  const { session } = useSession();

  const [currentUser, setCurrentUser] = React.useState<UserInformation | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getAndSetCurrentUserIfExist = async () => {
      if (!session?.user) {
        return;
        // throw new Error('No user on the session!');
      }

      const response = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name, pin`)
        .eq('id', session?.user.id)
        .single();
      if (response?.error && response?.status !== 406) {
        throw response?.error;
      }
      setCurrentUser(response?.data);
      setLoading(false);
    };
    getAndSetCurrentUserIfExist();
  }, [session]);

  return { currentUser, hasPin: !!currentUser?.pin, loading };
};

export const getCurrentUser = async () =>
  await supabase.auth
    .getSession()
    .then(({ data: { session } }) => {
      return supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name, pin`)
        .eq('id', session?.user.id)
        .single()
        .then((res) => res?.data);
    })
    .catch((err: any) => {
      console.log('error when getting current user', err);
    });
