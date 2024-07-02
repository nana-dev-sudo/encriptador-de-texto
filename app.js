// configuración de variables
const mensaje = document.getElementById("texto");
const mensajeProcesado = document.getElementById("texto_procesado");
let textoProcesado = "";

const areaVisualizacion = document.querySelector(".mostrar-texto__contenido--principal");
const areaMensajeProcesado = document.querySelector(".mostrar-texto__contenido--procesado");
const inputErrorIcon = document.querySelector(".input-error__icon");
const inputErrorP = document.querySelector(".input-error__p");

const encriptarBtn = document.getElementById("encriptar");
const desencriptarBtn = document.getElementById("desencriptar");
const copiarBtn = document.getElementById("copiar-contenido");


// configuración de eventListeners
encriptarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  encriptarTexto();
});

desencriptarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  desencriptarTexto();
});

copiarBtn.addEventListener("click", (e) => {
  e.preventDefault();
  portapapeles();
});


// funcion encriptador del texto entrante
const encriptarTexto = () => {
  let texto = mensaje.value.trim();

  if (texto === "") {
    inputErrorP.innerText = "El mensaje no puede estar vacío.";
    areaVisualizacion.classList.remove("invisible");
    areaMensajeProcesado.classList.add("invisible");
    mostrarError();
  }

  else {
    inputErrorP.innerText = "Solo letras minúsculas y sin acentos";

    for (let i = 0; i < texto.length; i++) {
      
      if((texto[i] < "a" || texto[i] > "z") && texto[i] !== " ") {
        mostrarError();
        return;
      } else if ((texto.length === 1 && texto === " ") || texto.replace(/ /g, "") === "") {
        areaVisualizacion.classList.remove("invisible");
        areaMensajeProcesado.classList.add("invisible");
        return;
      }

      switch (texto[i]) {
        case "a":
          textoProcesado += "ai";
          break;
        case "e":
          textoProcesado += "enter";
          break;
        case "i":
          textoProcesado += "imes";
          break;
        case "o":
          textoProcesado += "ober";
          break;
        case "u":
          textoProcesado += "ufat";
          break;
        default:
          textoProcesado += texto[i];
          break;
      }
    }

    inputErrorIcon.style.color = "var(--color-neutro)";
    inputErrorP.style.color = "var(--color-neutro)";

    areaVisualizacion.classList.add("invisible");
    areaMensajeProcesado.classList.remove("invisible");
    mensajeProcesado.innerHTML = textoProcesado;

    mensaje.value = "";
  }
    
  return;
};


// funcion desencriptador del texto entrante
const desencriptarTexto = () => {
  let texto = mensaje.value.trim();

  if (texto === "") {
   inputErrorP.innerText = "El mensaje no puede estar vacío."
   areaVisualizacion.classList.remove("invisible");
   areaMensajeProcesado.classList.add("invisible");
   mostrarError();
    return;
  }
  else {
    inputErrorP.innerText = "Solo letras minúsculas y sin acentos";

    if ((texto < "a" || texto > "z") && texto !== " ") {
      mostrarError();
      return;
    } else if (
      (texto.length === 1 && texto === " ") ||
      texto.replace(/ /g, "") === ""
    ) {
      areaVisualizacion.classList.remove("invisible");
      areaMensajeProcesado.classList.add("invisible");
      return;
    }

    let textoProcesado = texto
      .replace(/ai/g, "a")
      .replace(/enter/g, "e")
      .replace(/imes/g, "i")
      .replace(/ober/g, "o")
      .replace(/ufat/g, "u");

    inputErrorIcon.style.color = "var(--color-neutro)";
    inputErrorP.style.color = "var(--color-neutro)";

    areaVisualizacion.classList.add("invisible");
    areaMensajeProcesado.classList.remove("invisible");
    mensajeProcesado.innerHTML = textoProcesado;

    mensaje.value = "";
  }

  return;
};


// función para mostrar el error
const mostrarError = () => {
  inputErrorIcon.style.color = "#ff0000";
  inputErrorP.style.color = "#ff0000";
};


// función que copia al portapapeles local el valor dentro de la caja
const portapapeles = () => {
  navigator.clipboard.writeText(mensajeProcesado.value);
  textoProcesado = "";
  areaVisualizacion.classList.remove("invisible");
  areaMensajeProcesado.classList.add("invisible");
};


// función para ajustar la altura del contenedor del texto procesado
const ajustarAltura = () => {
  mensajeProcesado.style.height = "auto";
  mensajeProcesado.style.height = `${mensajeProcesado.scrollHeight}px`;
};

mensajeProcesado.addEventListener("input", ajustarAltura);
