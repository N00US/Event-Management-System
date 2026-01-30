document.addEventListener("DOMContentLoaded", () => {

  // --- Variables de los elementos del formulario ---
  const form = document.getElementById("formRegistro"); // Formulario de registro
  const tipoRadios = document.getElementsByName("tipo"); // Radios para seleccionar el tipo de participante (Ponente o Asistente)
  const datosPonente = document.getElementById("datosPonente"); // Campos exclusivos para Ponentes
  const datosAsistente = document.getElementById("datosAsistente"); // Campos exclusivos para Asistentes
  const feedback = document.getElementById("formFeedback"); // Área de retroalimentación al enviar el formulario

  // Campos generales del formulario
  const eventoSelect = document.getElementById("evento"); // Selección del evento
  const nombreInput = document.getElementById("nombre"); // Campo para el nombre
  const emailInput = document.getElementById("email"); // Campo para el email
  const telefonoInput = document.getElementById("telefono"); // Campo para el teléfono
  const empresaInput = document.getElementById("empresa"); // Campo para la empresa
  const paisInput = document.getElementById("pais"); // Campo para el país

  // Campos exclusivos para los Ponentes
  const tituloPonencia = document.getElementById("tituloPonencia"); // Título de la ponencia
  const duracionPonencia = document.getElementById("duracionPonencia"); // Duración de la ponencia
  const bioPonente = document.getElementById("bioPonente"); // Biografía del ponente
  const requerimientosTecnicos = document.getElementById("requerimientosTecnicos"); // Requerimientos técnicos de la ponencia
  const redesSociales = document.getElementById("redesSociales"); // Redes sociales del ponente

  // Campos exclusivos para los Asistentes
  const nivelExperiencia = document.getElementById("nivelExperiencia"); // Nivel de experiencia
  const areasInteres = document.getElementById("areasInteres"); // Áreas de interés
  const requiereCertificado = document.getElementById("requiereCertificado"); // Si requiere certificado

  const btnReset = document.getElementById("btnReset"); // Botón para resetear el formulario

  // --- Función para limpiar la validación visual de los campos ---
  function clearValidation(el) {
    el.classList.remove("valid"); // Elimina la clase 'valid'
    el.classList.remove("invalid"); // Elimina la clase 'invalid'
  }

  // --- Mostrar u ocultar campos según el tipo de participante ---
  tipoRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "Ponente" && radio.checked) {
        // Si el usuario selecciona "Ponente", mostramos los campos correspondientes y ocultamos los de Asistente
        datosPonente.classList.remove("hidden");
        datosAsistente.classList.add("hidden");
        // Los campos de ponente son obligatorios
        [tituloPonencia, duracionPonencia, bioPonente, requerimientosTecnicos, redesSociales].forEach(el => el.required = true);
        // Los campos de asistente no son obligatorios
        [nivelExperiencia, areasInteres, requiereCertificado].forEach(el => el.required = false);
      } else if (radio.value === "Asistente" && radio.checked) {
        // Si el usuario selecciona "Asistente", mostramos los campos correspondientes y ocultamos los de Ponente
        datosAsistente.classList.remove("hidden");
        datosPonente.classList.add("hidden");
        // Los campos de asistente son obligatorios
        [nivelExperiencia, areasInteres, requiereCertificado].forEach(el => el.required = true);
        // Los campos de ponente no son obligatorios
        [tituloPonencia, duracionPonencia, bioPonente, requerimientosTecnicos, redesSociales].forEach(el => el.required = false);
      }
    });
  });

  // --- Validaciones en tiempo real ---

  // Validación del campo evento
  eventoSelect.addEventListener("change", () => {
    clearValidation(eventoSelect);
    if (eventoSelect.value) eventoSelect.classList.add("valid"); // Si se selecciona un evento, es válido
  });

  // Validación del campo nombre
  nombreInput.addEventListener("input", () => {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/; // Expresión regular para solo letras y espacios
    clearValidation(nombreInput);
    // Si el nombre es válido, se marca como válido, si no, como inválido
    nombreInput.classList.toggle("valid", regex.test(nombreInput.value));
    nombreInput.classList.toggle("invalid", !regex.test(nombreInput.value));
  });

  // Validación del campo email
  emailInput.addEventListener("input", () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar un correo electrónico
    clearValidation(emailInput);
    // Si el correo es válido, se marca como válido, si no, como inválido
    emailInput.classList.toggle("valid", regex.test(emailInput.value));
    emailInput.classList.toggle("invalid", !regex.test(emailInput.value));
  });

  // Validación del campo teléfono
  telefonoInput.addEventListener("input", () => {
    clearValidation(telefonoInput);
    if (telefonoInput.value.trim() !== "") {
      telefonoInput.classList.add("valid"); // Si hay un valor, es válido
    } else {
      telefonoInput.classList.add("invalid"); // Si no hay valor, es inválido
    }
  });

  // Validación del campo empresa
  empresaInput.addEventListener("input", () => {
    clearValidation(empresaInput);
    if (empresaInput.value.trim() !== "") empresaInput.classList.add("valid"); // Si hay un valor, es válido
    else empresaInput.classList.add("invalid"); // Si no hay valor, es inválido
  });

  // Validación del campo país
  paisInput.addEventListener("input", () => {
    clearValidation(paisInput);
    if (paisInput.value.trim() !== "") paisInput.classList.add("valid"); // Si hay un valor, es válido
    else paisInput.classList.add("invalid"); // Si no hay valor, es inválido
  });

  // --- Función de validación genérica para los campos de ponente y asistente ---
  function validateField(el) {
    clearValidation(el);
    if (el.value.trim() !== "") {
      el.classList.add("valid");
      return true; // Si el campo tiene valor, es válido
    } else {
      el.classList.add("invalid");
      return false; // Si el campo está vacío, es inválido
    }
  }

  // Aplicamos validación en tiempo real a los campos de Ponente y Asistente
  [tituloPonencia, duracionPonencia, bioPonente,
   requerimientosTecnicos, redesSociales,
   nivelExperiencia, areasInteres, requiereCertificado].forEach(el => {
    el.addEventListener("input", () => validateField(el));
  });

  // --- Envío del formulario ---
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Previene el envío por defecto del formulario
    feedback.style.display = "none"; // Oculta el feedback

    let valido = true; // Bandera para verificar si todos los campos son válidos

    // Validaciones generales para los campos
    if (!validateField(eventoSelect)) valido = false;
    if (!validateField(nombreInput)) valido = false;
    if (!validateField(emailInput)) valido = false;
    if (!validateField(telefonoInput)) valido = false;
    if (!validateField(empresaInput)) valido = false;
    if (!validateField(paisInput)) valido = false;

    const esPonente = Array.from(tipoRadios).some(r => r.checked && r.value === "Ponente"); // Verifica si el tipo seleccionado es Ponente
    const esAsistente = Array.from(tipoRadios).some(r => r.checked && r.value === "Asistente"); // Verifica si el tipo seleccionado es Asistente

    // Validación específica para Ponente
    if (esPonente) {
      [tituloPonencia, duracionPonencia, bioPonente, requerimientosTecnicos, redesSociales].forEach(el => {
        if (!validateField(el)) valido = false; // Si algún campo de Ponente es inválido, la bandera se establece a false
      });
    }

    // Validación específica para Asistente
    if (esAsistente) {
      [nivelExperiencia, areasInteres, requiereCertificado].forEach(el => {
        if (!validateField(el)) valido = false; // Si algún campo de Asistente es inválido, la bandera se establece a false
      });
    }

    // Si todos los campos son válidos, mostramos el feedback
    if (valido) {
      feedback.style.display = "block";
    }
  });

  // --- Botón Reset ---
  btnReset.addEventListener("click", () => {
    form.reset(); // Resetea el formulario
    feedback.style.display = "none"; // Oculta el feedback
    // Limpia todas las validaciones
    [eventoSelect, nombreInput, emailInput, telefonoInput, empresaInput, paisInput,
     tituloPonencia, duracionPonencia, bioPonente, requerimientosTecnicos, redesSociales,
     nivelExperiencia, areasInteres, requiereCertificado].forEach(el => clearValidation(el));
    // Oculta los campos de Ponente y Asistente
    datosPonente.classList.add("hidden");
    datosAsistente.classList.add("hidden");
  });

});




