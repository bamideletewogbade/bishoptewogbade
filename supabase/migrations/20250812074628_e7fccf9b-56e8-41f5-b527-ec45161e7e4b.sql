
-- Create admin user and set up admin functionality
-- First, let's update the handle_new_user function to create an admin user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    new.id, 
    new.email,
    CASE WHEN new.email = 'admin@portfolio.com' THEN 'admin'::user_role ELSE 'user'::user_role END
  );
  RETURN new;
END;
$function$;

-- Insert the admin user directly (with a known password)
-- Note: This will create a user with email 'admin@portfolio.com' and password 'admin123'
-- You should change this password after first login
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@portfolio.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Create the admin profile for the user we just created
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'::user_role 
FROM auth.users 
WHERE email = 'admin@portfolio.com'
ON CONFLICT (id) DO NOTHING;
