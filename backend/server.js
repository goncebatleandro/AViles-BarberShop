const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Configuración de Nodemailer para Gmail
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "esekiellesekiel@gmail.com", // Tu email
        pass: "jmxobjgnysjhocsl" // Contraseña de aplicación
    }
});

// Verificar la conexión
transporter.verify(function(error, success) {
    if (error) {
        console.log("Error de verificación:", error);
    } else {
        console.log("Servidor listo para enviar emails");
    }
});

app.post("/enviar-correo", async (req, res) => {
    const { nombre, email, celular, dni, fecha, hora, servicio, mensaje } = req.body;

    const mailOptions = {
        from: '"Aviles Barbershop" <esekiellesekiel@gmail.com>',
        to: "esekiellesekiel@gmail.com",
        replyTo: email,
        subject: `Nueva reserva de ${nombre}`,
        html: `
            <h2>Nueva reserva en Aviles Barbershop</h2>
            <p><strong>Cliente:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Celular:</strong> ${celular}</p>
            <p><strong>DNI:</strong> ${dni}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Hora:</strong> ${hora}</p>
            <p><strong>Servicio:</strong> ${servicio}</p>
            <p><strong>Mensaje adicional:</strong> ${mensaje || 'No hay mensaje adicional'}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ 
            success: true, 
            message: "Reserva enviada con éxito" 
        });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error al enviar el correo",
            error: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});