const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Usuario temporal para guardar los datos (simulación)
let usuarios = [];

// Ruta de registro
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Encriptar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10);

  // Guardar el usuario (simulado, aún sin base de datos)
  usuarios.push({ name, email, password: hashedPassword });

  console.log('Usuario registrado:', { name, email });
  res.redirect('/login');
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Buscar al usuario en el array temporal
  const user = usuarios.find(u => u.email === email);

  if (!user) {
    return res.status(400).send('Usuario no encontrado');
  }

  // Comparar la contraseña
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Contraseña incorrecta');
  }

  // Redirigir al usuario a la página de bienvenida
  res.redirect('/welcome');
});

// Ruta GET para mostrar el formulario de registro
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

// Ruta GET para mostrar el formulario de inicio de sesión
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Ruta GET para mostrar la página de bienvenida
app.get('/welcome', (req, res) => {
  res.sendFile(__dirname + '/public/welcome.html');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
