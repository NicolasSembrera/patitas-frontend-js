/**
 * Se ejecuta cuando la pagina ha cargado completamente (DOM, CSS, JS, Images, etc.)
 * En caso desees ejecutar el JS a penas se haya cargado el DOM, puedes usar:
 * -> document.addEventListener('DOMContentLoaded', {});
 * -> De lo contrario en la importación del script utilizar el atributo "defer"
 */
window.addEventListener("load", function () {
  // recuperar controles del formulario
  const tipoDocumento = document.getElementById("tipoDocumento");
  const numeroDocumento = document.getElementById("numeroDocumento");
  const password = document.getElementById("password");
  const btnIngresar = document.getElementById("btnIngresar");
  const msgError = document.getElementById("msgError");

  if (window.localStorage.getItem("cerrar") !== null) {
    this.alert(window.localStorage.getItem("cerrar"));
    window.localStorage.removeItem("cerrar")
  }

  // implementar listener
  btnIngresar.addEventListener("click", function () {
    // validar campos de entrada
    if (
      tipoDocumento.value === null ||
      tipoDocumento.value.trim() === "" ||
      numeroDocumento.value === null ||
      numeroDocumento.value.trim() === "" ||
      password.value === null ||
      password.value.trim() === ""
    ) {
      mostrarAlerta("Error: Debe completar correctamente sus credenciales");
      return;
    }
    ocultarAlerta();
    autenticar();
  });
});

function mostrarAlerta(mensaje) {
  msgError.innerHTML = mensaje;
  msgError.style.display = "block";
}

function ocultarAlerta() {
  msgError.innerHTML = "";
  msgError.style.display = "none";
}

async function autenticar() {
  const url = "http://localhost:8085/login/autenticar-async";
  const data = {
    tipoDocumento: tipoDocumento.value,
    numeroDocumento: numeroDocumento.value,
    password: password.value,
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
      mostrarAlerta("Error: Ocurrió un problema en la autenticación1");
      throw new Error(`Error: ${response.statusText}`);
    }

    // validar respuesta
    const result = await response.json();
    console.log("Respuesta del servidor:", result);

    if (result.codigo === "00") {
      localStorage.setItem("result", JSON.stringify(result));

      const datos = {
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
      };

      localStorage.setItem("otrosDatos", JSON.stringify(datos));
      window.location.replace("principal.html");
    } else {
      mostrarAlerta(result.mensaje);
    }
  } catch (error) {
    console.error("Error: Ocurrió un problema en la autenticación. ", error);
    mostrarAlerta("Error: Ocurrió un problema en la autenticación");
  }
}
