require("dotenv").config();  
const nodemailer = require('nodemailer')  
const { MAILER_PASSWORD } = process.env

const sendEmail = async(email) =>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth:{
            user: 'doggygo.noreply@gmail.com', 
            pass: MAILER_PASSWORD 
        }
    })   

    const mailOptions ={
        from: 'doggygo.noreply@gmail.com', 
        to: email, 
        subject: '¡Bienvenido a GOGGYGO! Confirmación de registro exitoso.',  
        text: '¡Gracias por unirte a GOGGYGO! Estamos encantados de que te hayas registrado y te damos la más cordial bienvenida a nuestra comunidad dedicada a encontrar tu pasiador favorito.',
    }  

    try { 
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado:', info.messageId);
        
    } catch (error) { 
        console.error('Error al enviar el correo:', error);
        
    }
}   

module.exports = sendEmail
