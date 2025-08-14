
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  try {
    // Sign up the admin user using Supabase auth
    const { data, error } = await supabase.auth.signUp({
      email: 'admin@example.com',
      password: 'admin123',
      options: {
        emailRedirectTo: `${window.location.origin}/admin`
      }
    });

    if (error) {
      console.error('Error creating admin user:', error);
      return { success: false, error: error.message };
    }

    if (data.user) {
      // Update the user's profile to admin role
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ 
          id: data.user.id, 
          email: 'admin@example.com', 
          role: 'admin' 
        });

      if (profileError) {
        console.error('Error updating profile:', profileError);
        return { success: false, error: profileError.message };
      }

      console.log('Admin user created successfully');
      return { success: true, user: data.user };
    }

    return { success: false, error: 'No user returned from signup' };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};
