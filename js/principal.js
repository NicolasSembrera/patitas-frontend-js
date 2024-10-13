window.addEventListener("load", function () {
  const msgSuccess = document.getElementById("msgSuccess");
  const btnCerrarSesion = this.document.getElementById("btnCerrarSesion");

  // recuperar nombre de usuario
  const result = JSON.parse(window.localStorage.getItem("result"));
  mostrarAlerta(result.nombreUsuario);

   
  //CierreSesion
  btnCerrarSesion.addEventListener("click", function () {

    var data = {
        tipoDocumento: "",
        numeroDocumento: "",
    };
    
    data = JSON.parse(window.localStorage.getItem("otrosDatos"));
    const numeroDocumento = data.numeroDocumento;
    const tipoDocumento = data.tipoDocumento;

    logout(tipoDocumento, numeroDocumento);
  });
});

function mostrarAlerta(mensaje) {
  msgSuccess.innerHTML = mensaje;
  msgSuccess.style.display = "block";
}

function ocultarAlerta() {
  msgSuccess.innerHTML = "";
  msgSuccess.style.display = "none";
}

function obtenerFechaActual() {
  const fecha = new Date();

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();

  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
}

async function logout(tipoDocumento, numeroDocumento) {
  const url = "http://localhost:8085/login/log_out";
  const data = {
    tipoDocumento: tipoDocumento,
    numeroDocumento: numeroDocumento,
    FechaCierre: obtenerFechaActual(),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      mostrarAlerta("Error: Ocurrió un problema en el cierre de Sesion");
      throw new Error(`Error: ${response.statusText}`);
    }

    localStorage.setItem("cerrar", "Cierre de Sesión Exitoso");
    window.location.replace("indice.html");

  } catch (error) {
    console.error('Error: Ocurrió un problema al cerrar Sesión. ', error);
    mostrarAlerta('Error: Ocurrió un problema al cerrar Sesión.');
  }
}
