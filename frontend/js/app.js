//controlamos el submit//

const formulario=document.getElementById("formulario");
const nombre=document.getElementById("nombre");
const mensaje1=document.getElementById("mensaje1");
const correo=document.getElementById("correo");
const mensaje2=document.getElementById("mensaje2");
const password=document.getElementById("password");
const mensaje3=document.getElementById("mensaje3");
const boton=document.getElementById("boton");
const loader = document.getElementById("loader");
let usuarios = [];



  //nombre//

  function validarnombre()
  {
  
   if(nombre.value.trim().length<3){
     mensaje1.innerText="el nombre debe tener ninimo 3 letras";
     mensaje1.style.color="red";
     nombre.style.border = "2px solid red";
     return false;
   }
   else{
     mensaje1.innerText="formulario good";
     mensaje1.style.color="green";
     nombre.style.border = "2px solid green";
     return true;
    }
   }


  //correo// 
  function validarcorreo(){

    if(correo.value.trim().length===0 || !correo.value.includes("@")|| !correo.value.includes(".") )
   {
      mensaje2.innerText="esta vacio o invalido debe tener @ y .";
      mensaje2.style.color="red";
      correo.style.border = "2px solid red";
       return false;
      
   }
   else{
        mensaje2.innerText="correo good";
        mensaje2.style.color="green";
        correo.style.border = "2px solid green";
        return true;
      }
    }

  //password// 
  function validarpassword(){

  
   if(password.value.trim().length<6){
     mensaje3.innerText="la contraseña es invalida";
     mensaje3.style.color="red";
     password.style.border = "2px solid red";
     return false;

   }
   else{
    mensaje3.innerText="correo good";
    mensaje3.style.color="green";
    password.style.border = "2px solid green";
     return true;

    }
   }

   function validarformulario(){

  const nombreok=validarnombre();
  const correook=validarcorreo();
  const passwordok=validarpassword();
  
    if(nombreok && correook && passwordok )
  {
    boton.disabled=false;
   
  }else{

    boton.disabled=true;
  }
  }
 



nombre.addEventListener("input", (event) => {
  console.log(event.target.value);
  validarformulario();
});
correo.addEventListener("input", validarformulario);
password.addEventListener("input", validarformulario);

  
  
  
//controla el boton submit//
    formulario.addEventListener("submit",  async (event) =>{
  event.preventDefault();

if(!validarnombre() || !validarcorreo() || !validarpassword()){
  return ;
}

  console.log("listo para enviar");
     // Agregar usuario a la tabla

 
   
    let usuario={
        id: Date.now(),
        nombre: nombre.value,
        correo: correo.value,
        password: password.value
      };
    
      
  boton.disabled = true;
  loader.classList.remove("hidden");
  const textoOriginal = boton.innerText;
  boton.innerText = "Enviando...";
      
    try {
    const respuesta = await fetch("http://localhost:3000/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(usuario)
    });

    if (!respuesta.ok) {
      throw new Error("Error al enviar los datos");
    }

    const data = await respuesta.json();
    console.log("Respuesta del servidor:", data);

    alert("Usuario registrado con éxito ");
    formulario.reset();
    nombre.focus();
  } catch (error) {
    console.error(error);
    alert("Error al registrar usuario ");
  }

  finally {
    // 🔓 Pase lo que pase, el botón vuelve
    boton.disabled = false;
    loader.classList.add("hidden");
    boton.innerText = textoOriginal;
  }




//valida que no se ejecute las validaciones default del submit, valida que todos las datos esten ok//
//creamos el objeto para luego guardarl os datos //
});

 function guardarEnLocalStorage() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
 
function cargarUsuarios() {
  const datos = localStorage.getItem("usuarios");
  if (datos) {
    usuarios = JSON.parse(datos).map(u => ({
      ...u,
      id: Number(u.id) //  convertir id a número
    }));
    mostrarUsuarios();
  }
}

//esta funcion muestra lo usuarios registrados, que estan en el storage//
function mostrarUsuarios() {
  tablaUsuarios.innerHTML = "";

  usuarios.forEach(usuario => {
    agregarUsuario(usuario);
  });
}


//aqui se crea la tabla  y se muestran, que provienen del storage // 



const tablaUsuarios = document.getElementById("tablaUsuarios").getElementsByTagName("tbody")[0];

function agregarUsuario(usuario) {
  const fila = document.createElement("tr");
  fila.dataset.id = usuario.id;

  const celdaNombre = document.createElement("td");
  celdaNombre.innerText = usuario.nombre;

  const celdaCorreo = document.createElement("td");
  celdaCorreo.innerText = usuario.correo;

  const celdaPassword = document.createElement("td");
  celdaPassword.innerText = usuario.password.slice(0,1) + "********";

  const accionesUsuarios = document.createElement("td");
  const botonEliminar = document.createElement("button");
  botonEliminar.innerText = "Eliminar";
  botonEliminar.classList.add("btn-eliminar");

  accionesUsuarios.appendChild(botonEliminar);

  fila.appendChild(celdaNombre);
  fila.appendChild(celdaCorreo);
  fila.appendChild(celdaPassword);
  fila.appendChild(accionesUsuarios);

  tablaUsuarios.appendChild(fila);
}
//xd
//aqui se programa el evento para eliminar el registro//
tablaUsuarios.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const fila = e.target.closest("tr");
    const id = Number(fila.dataset.id);

    // Eliminar del array
    usuarios = usuarios.filter(u => u.id !== id);

    // Guardar en localStorage
    guardarEnLocalStorage();

    // Volver a pintar la tabla
    mostrarUsuarios();
  }
});



cargarUsuarios(); 