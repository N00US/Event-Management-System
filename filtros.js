document.addEventListener("DOMContentLoaded", () => {
  // Obtener elementos del DOM relacionados con los filtros y la cuadrícula de eventos
  const searchInput = document.getElementById("searchInput"); // Campo de búsqueda por texto
  const filterCategory = document.getElementById("filterCategory"); // Filtro de categorías
  const filterMonth = document.getElementById("filterMonth"); // Nuevo filtro para meses
  const sortOption = document.getElementById("sortOption"); // Filtro para ordenar
  const gridEventos = document.querySelector(".grid-eventos"); // Contenedor de los eventos

  // Elementos del modal para mostrar detalles del evento
  const modal = document.getElementById("eventModal"); // Modal para mostrar detalles
  const modalTitle = document.getElementById("modalTitle"); // Título del modal
  const modalBody = document.getElementById("modalBody"); // Cuerpo del modal
  const closeModal = document.getElementById("closeModal"); // Botón de cerrar modal

  // Guardamos una copia de los eventos originales que están en el DOM
  const allEvents = Array.from(gridEventos.querySelectorAll(".evento"));

  // Función para aplicar los filtros
  function applyFilters() {
    const searchText = searchInput.value.toLowerCase().trim(); // Texto de búsqueda
    const category = filterCategory.value; // Valor seleccionado del filtro de categoría
    const month = filterMonth.value; // Valor seleccionado del filtro de mes
    const sortBy = sortOption.value; // Opción seleccionada para ordenar

    // Filtrar eventos según los criterios
    let filtered = allEvents.filter(ev => {
      const name = ev.dataset.nombre.toLowerCase(); // Nombre del evento
      const cat = ev.dataset.categoria; // Categoría del evento
      const dateValue = ev.dataset.fecha; // Fecha del evento (YYYY-MM-DD)
      const eventMonth = dateValue.split("-")[1]; // Obtenemos el mes de la fecha

      // Comprobamos que cada filtro se cumpla
      const textMatch = name.includes(searchText); // Coincidencia con el texto de búsqueda
      const catMatch = category === "" || cat === category; // Coincidencia con la categoría
      const monthMatch = month === "" || eventMonth === month; // Coincidencia con el mes

      return textMatch && catMatch && monthMatch; // Todos los filtros deben cumplirse
    });

    // Ordenar los eventos según la opción seleccionada
    filtered.sort((a, b) => {
      if (sortBy === "recientes") {
        return new Date(b.dataset.fecha) - new Date(a.dataset.fecha); // Orden por fecha más reciente
      }
      if (sortBy === "participantes") {
        return parseInt(b.dataset.asistentes) - parseInt(a.dataset.asistentes); // Orden por participantes
      }
      if (sortBy === "az") {
        return a.dataset.nombre.localeCompare(b.dataset.nombre); // Orden alfabético (A-Z)
      }
      return 0; // Sin ordenar si no coincide con ninguna opción
    });

    // Re-renderizar la cuadrícula de eventos
    gridEventos.innerHTML = ""; // Limpiar la cuadrícula antes de volver a llenarla

    // Si no hay eventos filtrados, mostrar un mensaje
    if (filtered.length === 0) {
      const noResults = document.createElement("p");
      noResults.textContent = "No se encontraron eventos."; // Mensaje de no resultados
      noResults.style.gridColumn = "1 / -1"; // Hacer que ocupe toda la fila de la cuadrícula
      gridEventos.appendChild(noResults);
      return;
    }

    // Mostrar los eventos filtrados
    filtered.forEach(ev => {
      gridEventos.appendChild(ev);

      // Asignar evento al botón de detalles de cada evento
      const btnDetails = ev.querySelector(".btn-details");
      btnDetails.onclick = () => {
        showDetails(ev); // Mostrar detalles al hacer clic en el botón
      };
    });
  }

  // Función para mostrar el modal con la información del evento
  function showDetails(ev) {
    modalTitle.textContent = ev.dataset.nombre; // Establecer el título del modal

    // Clonamos la información del evento para mostrarla en el modal
    const detailsHtml = `
      <p><strong>Categoría:</strong> ${ev.dataset.categoria}</p>
      <p><strong>Fecha Completa:</strong> ${ev.dataset.fecha}</p>
      ${ev.querySelector(".meta").outerHTML} <!-- Incluimos la meta información -->
      <div style="margin-top:1rem; border-top:1px solid #eee; padding-top:1rem;">
        ${ev.querySelector("p:nth-of-type(4)") ? ev.querySelector("p:nth-of-type(4)").textContent : "Sin descripción adicional."}
      </div>
    `;
    
    modalBody.innerHTML = detailsHtml; // Insertar la información en el cuerpo del modal
    modal.classList.remove("hidden"); // Mostrar el modal
  }

  // Eventos de cierre del modal
  if(closeModal) {
    closeModal.onclick = () => modal.classList.add("hidden"); // Cerrar el modal al hacer clic en el botón de cerrar
  }
  
  // Cerrar el modal si se hace clic fuera de él
  window.onclick = (e) => {
    if (e.target == modal) modal.classList.add("hidden");
  };

  // Escuchar los cambios en los filtros y aplicar los cambios
  searchInput.addEventListener("input", applyFilters); // Buscar por texto
  filterCategory.addEventListener("change", applyFilters); // Filtrar por categoría
  filterMonth.addEventListener("change", applyFilters); // Filtrar por mes (nuevo)
  sortOption.addEventListener("change", applyFilters); // Ordenar eventos

  // Inicialización para aplicar los filtros al cargar la página
  applyFilters();
});




