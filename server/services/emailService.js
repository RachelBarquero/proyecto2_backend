const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "luisalejandrosln@gmail.com",
        pass: "byvdvmxkcltrtedl"
    }
});

const sendEmail = async (to) => {
    try {
        // Verificar datos obligatorios
        if (!to) {
            throw new Error("Faltan datos obligatorios.");
        }

        const mailOptions = {
            from: "luisalejandrosln@gmail.com",
            to,
            subject:"Verificación de cuenta Tubekids",
            text: 'Ingrese a este link para verificar su cuenta: http://localhost:3000/login'
        };

        // Llamar a la función de envío de correo electrónico
        await transporter.sendMail(mailOptions);
        
        console.log("Correo electrónico enviado correctamente.");
        return "Correo electrónico enviado correctamente.";
    } catch (error) {
        console.error("Error al enviar el correo electrónico:", error.message);
        console.log("Correo electrónico enviado incorrectamente.", error.message);
        throw error;
    }
};

module.exports = sendEmail;
