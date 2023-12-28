import nodemailer from 'nodemailer';
//esta info de var se saca de mailtrap, como plataforma de prueba de envios de emails

const emailOlvidePassword = async (datos) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    //Enviar email
    const {email, nombre, token} = datos;
    const info =  await transport.sendMail({
        from: 'APV - Administrador de Pacientes de Veterinaria',
        to: email,
        subject: 'Reestablece tu password',
        text: 'Reestablece tu password',
        html: `<p>Hola: ${nombre}, has solicitado reestablecer password.</p>
            <p>Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a> </p>

            <p>Si vos no creaste esta cuenta, podes ignorar este mensaje</p>
            
        `,
    });

    console.log('Mensaje enviado: %s', info.messageId)
}

export default emailOlvidePassword;