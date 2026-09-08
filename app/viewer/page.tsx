import { redirect } from 'next/navigation';
import { supabaseServer } from '../../lib/auth';
import ViewerClient from './viewer-client';

export default async function Viewer() {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, name, email')
    .eq('id', user.id)
    .single();

  console.log('USER ID:', user.id);
  console.log('PROFILE:', profile);
  console.log('PROFILE ERROR:', profileError);

  const { data: items, error: itemsError } = await supabase
    .from('content')
    .select('id, title, description, category, type, created_at')
    .order('created_at', { ascending: false });

  console.log('CONTENT:', items);
  console.log('CONTENT ERROR:', itemsError);

  const safeProfile = profile || {
    role: 'VIEWER',
    name: user.user_metadata?.full_name || user.email,
    email: user.email,
  };

  return (
    <ViewerClient
      user={safeProfile}
      items={items || []}
    />
  );
}