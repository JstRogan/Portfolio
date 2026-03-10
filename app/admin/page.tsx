import { isAdminAuthed } from '@/server/admin-auth';
import { getAllPortfolioData } from '@/server/portfolio-repo';
import { AdminLogin } from '@/components/admin/admin-login';
import { AdminDashboard } from '@/components/admin/admin-dashboard';

export default async function AdminPage() {
  if (!(await isAdminAuthed())) return <AdminLogin />;
  const { projects, messages, experience } = await getAllPortfolioData();
  return <AdminDashboard projects={projects} messages={messages} experience={experience} />;
}
