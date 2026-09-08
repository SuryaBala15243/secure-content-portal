import { redirect } from 'next/navigation';
import { supabaseServer } from '../../lib/auth';
import AdminClient from './admin-client';
export default async function Admin(){const supabase=await supabaseServer();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect('/login');const {data:profile}=await supabase.from('profiles').select('role,name,email').eq('id',user.id).single();if(profile?.role!=='ADMIN')redirect('/viewer');const {data:items}=await supabase.from('content').select('*').order('created_at',{ascending:false});return <AdminClient items={items||[]}/>}
