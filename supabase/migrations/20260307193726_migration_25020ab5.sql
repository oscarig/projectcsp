-- Create a function to call the welcome email Edge Function
CREATE OR REPLACE FUNCTION send_welcome_email()
RETURNS TRIGGER AS $$
DECLARE
  function_url TEXT;
  service_role_key TEXT;
BEGIN
  -- Get the Supabase project URL from settings
  -- This will be called via HTTP request to the Edge Function
  
  -- For now, we'll use pg_notify to trigger the email asynchronously
  -- This keeps the user registration fast
  PERFORM pg_notify(
    'new_user_registered',
    json_build_object(
      'user_id', NEW.id,
      'email', NEW.email,
      'role', NEW.role,
      'full_name', NEW.full_name
    )::text
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to send welcome email after profile is created
DROP TRIGGER IF EXISTS on_profile_created_send_email ON profiles;
CREATE TRIGGER on_profile_created_send_email
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION send_welcome_email();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres, anon, authenticated, service_role;