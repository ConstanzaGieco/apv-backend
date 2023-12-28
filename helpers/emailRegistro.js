import nodemailer from 'nodemailer';
//esta info de var se saca de mailtrap, como plataforma de prueba de envios de emails

const emailRegistro = async (datos) => {
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
        subject: 'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en APV',
        html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
            <p>Tu cuenta ya está lista, sólo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a> </p>

            <p>Si vos no creaste esta cuenta, podes ignorar este mensaje</p>
            
        `,
    });

    console.log('Mensaje enviado: %s', info.messageId)
}

export default emailRegistro;