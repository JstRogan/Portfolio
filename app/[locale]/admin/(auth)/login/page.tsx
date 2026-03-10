'use client';

import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useI18n } from '@/hooks/use-i18n';
import { useRouter } from '@/i18n/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
});

type Values = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { identifier: '', password: '' } });

  const onSubmit = async (values: Values) => {
    setError(null);
    const res = await signIn('credentials', { identifier: values.identifier, password: values.password, redirect: false });
    if (!res || res.error) return setError('Invalid credentials');
    router.replace('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-purple-500/10 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none transition-colors duration-700" />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full max-w-sm relative z-10">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-lg mb-4">
              <span className="font-mono font-bold text-white dark:text-black">M</span>
            </div>
            <CardTitle>{t('admin.login.title')}</CardTitle>
            <CardDescription>{t('admin.login.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="identifier">{t('admin.login.identifier')}</Label>
                <Input id="identifier" autoComplete="username" {...form.register('identifier')} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">{t('admin.login.password')}</Label>
                <Input id="password" type="password" autoComplete="current-password" {...form.register('password')} />
              </div>
              {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
              <Button type="submit" className="w-full" size="lg" variant="primary" shape="soft" disabled={form.formState.isSubmitting}>
                {t('admin.login.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

