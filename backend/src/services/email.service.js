import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Account Verification',
    html: `
      <h1>Account Verification</h1>
      <p>Click the link below to verify your account</p>
      <a href="${process.env.PROD_URL}/auth/verify/${token}">Verify Account</a>
    `
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}