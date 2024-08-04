import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const { data, error } = await resend.emails.send({
    from: 'Images Cloud <onboarding@resend.dev>',
    to: [email],
    subject: 'Verificacion de Cuenta',
    html: `
      <h1 style="color: #333">Verificación de cuenta</h1>
      <h2>Estimado usuario,</h2>
      <p><b>!! Gracias !!</b> por registrarte en nuestro sitio web 😁. <br/> Para completar el proceso de verificación de tu cuenta, haz clic en el siguiente enlace ⬇️:</p>
      <a href="${process.env.PROD_URL}/auth/verify/${token}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 4px;">Verify Account</a>
      <p>Si no has solicitado la creación de esta cuenta, puedes ignorar este correo.</p>
      <p>Saludos👋,</p>
      <p><strong>Images Cloud</strong></p>
    `
  });

  if (error) throw new Error(error);
}