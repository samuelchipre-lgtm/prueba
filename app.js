rios.appendChild(botonEliminar);

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
