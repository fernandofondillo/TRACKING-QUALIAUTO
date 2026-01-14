import { redirect } from 'next/navigation';

export default function Home() {
  // For demo purposes, we redirect to admin dashboard
  // Usually this would check auth session
  redirect('/dashboard/admin');
}
