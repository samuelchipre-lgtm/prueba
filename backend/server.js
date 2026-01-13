const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());          // Permite conexiones desde cualquier frontend
app.use(express.json());  // Permite recibir JSON en POST

// "Base de datos" temporal en memoria
let usuarios = [];

// Endpoint de registro
app.post("/register", (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const nuevoUsuario = {
    id: Date.now(),
    nombre,
    correo,
    password
  };

  usuarios.push(nuevoUsuario);

  console.log("Usuarios registrados:", usuarios);

  res.status(201).json({
    mensaje: "Usuario registrado correctamente",
    usuario: nuevoUsuario
  });
});

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// LOGIN
app.post("/login", (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({
      error: "Correo y contraseña obligatorios"
    });
  }

  const usuario = usuarios.find(u => u.correo === correo);

  if (!usuario) {
    return res.status(401).json({
      error: "Usuario no encontrado"
    });
  }

  if (usuario.password !== password) {
    return res.status(401).json({
      error: "Contraseña incorrecta"
    });
  }

  res.json({
    mensaje: "Login exitoso",
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo
    }
  });
});
