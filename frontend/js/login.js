const loginForm = document.getElementById("loginForm");
const loginCorreo = document.getElementById("loginCorreo");
const loginPassword = document.getElementById("loginPassword");
const loginMensaje = document.getElementById("loginMensaje");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const credenciales = {
    correo: loginCorreo.value,
    password: loginPassword.value
  };

  try {
    const respuesta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credenciales)
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      loginMensaje.innerText = data.error;
      loginMensaje.style.color = "red";
      return;
    }

    loginMensaje.innerText = "Login exitoso ✅";
    loginMensaje.style.color = "green";

    console.log("Usuario logueado:", data.usuario);

  } catch (error) {
    loginMensaje.innerText = "Error del servidor";
    loginMensaje.style.color = "red";
  }
});
