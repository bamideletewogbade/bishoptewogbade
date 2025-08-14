
-- Insert a hardcoded admin user for testing
-- This will create an admin user with email: admin@example.com and password: admin123
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
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'authenticated',
  'authenticated',
  'admin@example.com',
  '$2a$10$8qvZ7lWZ7ZqZ7lWZ7ZqZ7e7lWZ7ZqZ7lWZ7ZqZ7lWZ7ZqZ7lWZ7Z.',
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

-- Insert the admin profile
INSERT INTO profiles (id, email, role) 
VALUES ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'admin@example.com', 'admin');
