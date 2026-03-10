'use client';

import type { Experience, Message, Project } from '@/lib/types';
import { AdminShell } from '@/components/admin/admin-shell';
import { ProjectsEditor } from '@/components/admin/projects-editor';
import { MessagesEditor } from '@/components/admin/messages-editor';
import { ExperienceEditor } from '@/components/admin/experience-editor';
import { setAdminUi, useAdminUi } from '@/store/admin-ui';

export function AdminDashboard(props: { projects: Project[]; messages: Message[]; experience: Experience[] }) {
  const tab = useAdminUi((s) => s.tab);

  return (
    <AdminShell tab={tab} onTab={(t) => setAdminUi((s) => ({ ...s, tab: t }))}>
      {tab === 'projects' ? <ProjectsEditor projects={props.projects} /> : null}
      {tab === 'messages' ? <MessagesEditor messages={props.messages} /> : null}
      {tab === 'experience' ? <ExperienceEditor experience={props.experience} /> : null}
    </AdminShell>
  );
}
