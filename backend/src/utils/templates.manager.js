export const verifyEmailTemplate = (token) => `
  <h1 style="color: #333">Verificación de cuenta</h1>
  <h2>Estimado usuario,</h2>
  <p><b>!! Gracias !!</b> por registrarte en nuestro sitio web 😁. <br/> Para completar el proceso de verificación de tu cuenta, haz clic en el siguiente enlace ⬇️:</p>
  <a href="${process.env.PROD_URL}/auth/verify/${token}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 4px;">Verificar Cuenta</a>
  <p>Si no has solicitado la creación de esta cuenta, puedes ignorar este correo.</p>
  <p>Saludos👋,</p>
  <p><strong>Images Cloud</strong></p>
`;

export const verifiedEmailTemplate =`
  <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
    <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center;">
      <h1 style="color: #333;">Images Cloud</h1>
      <p style="color: #666;">Tu email ha sido verificado. Puedes cerrar esta ventana.</p>
    </div>
  </div>
`;