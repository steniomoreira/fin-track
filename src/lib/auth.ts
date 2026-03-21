import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { Resend } from 'resend';

import { db } from './prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ url }) => {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // PROD => no-reply@seudominio.com
        to: 'steniomoreiradev@gmail.com', // PROD => { user.email }
        subject: 'Redefinição de senha',
        html: `
          <p>Olá,</p>
          <p>Clique no link abaixo para redefinir sua senha:</p>
          <a href="${url}">${url}</a>
          <p>O link expira em 1 hora.</p>
        `,
      });
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh if older than 1 day
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
