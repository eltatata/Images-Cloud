import { Resend } from 'resend';
import { verifyEmailTemplate } from '../utils/templates.manager.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const { data, error } = await resend.emails.send({
    from: 'Images Cloud <onboarding@resend.dev>',
    to: [email],
    subject: 'Verificacion de Cuenta',
    html: verifyEmailTemplate(token)
  });

  if (error) throw new Error(error);
}