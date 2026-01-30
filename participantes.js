document.addEventListener("DOMContentLoaded", () => {

  // --- Buscador global de eventos ---
  const searchEventos = document.getElementById("search-eventos"); // Obtiene el campo de búsqueda global
  const gridEventos = document.getElementById("grid-eventos"); // Obtiene el contenedor donde se mostrarán los eventos
  const allEventos = Array.from(gridEventos.querySelectorAll(".evento")); // Crea un array con todos los eventos disponibles en la cuadrícula

  // Añade un "event listener" al campo de búsqueda para filtrar los eventos
  searchEventos.addEventListener("input", () => {
    const filter = searchEventos.value.toLowerCase(); // Convierte el texto de búsqueda a minúsculas
    allEventos.forEach(ev => {
      // Muestra u oculta los eventos según si el nombre del evento coincide con el texto de búsqueda
      ev.style.display = ev.dataset.nombre.toLowerCase().includes(filter) ? "" : "none";
    });
  });

  // --- Tabs y búsqueda interna por evento ---
  // Recorre todos los eventos y les asigna funcionalidades específicas de pestañas y búsqueda
  allEventos.forEach(ev => {
    const tabLinks = ev.querySelectorAll(".tab-link"); // Encuentra todas las pestañas dentro del evento
    const tabContents = ev.querySelectorAll(".tab-content"); // Encuentra todos los contenidos asociados a las pestañas

    // Asigna un evento click a cada botón de pestaña
    tabLinks.forEach(btn => {
      btn.addEventListener("click", () => {
        // Elimina la clase 'active' de todas las pestañas
        tabLinks.forEach(b => b.classList.remove("active"));
        // Añade la clase 'active' a la pestaña seleccionada
        btn.classList.add("active");
        const tab = btn.getAttribute("data-tab"); // Obtiene el ID de la pestaña asociada
        // Muestra el contenido correspondiente a la pestaña seleccionada
        tabContents.forEach(c => c.style.display = c.id === tab ? "block" : "none");
      });
    });

    // --- Buscador interno para asistentes ---
    const searchAsistentes = ev.querySelector(".search-asistentes"); // Encuentra el campo de búsqueda de asistentes dentro del evento
    if (searchAsistentes) {
      // Añade un event listener para filtrar las filas de la tabla de asistentes
      searchAsistentes.addEventListener("input", () => {
        const filter = searchAsistentes.value.toLowerCase(); // Convierte el texto de búsqueda a minúsculas
        // Recorre todas las filas de la tabla y muestra u oculta aquellas que coincidan con el filtro
        ev.querySelectorAll("tbody tr").forEach(row => {
          row.style.display = Array.from(row.cells).some(cell => cell.textContent.toLowerCase().includes(filter)) ? '' : 'none';
        });
      });
    }

    // --- Buscador interno para ponentes ---
    const searchPonentes = ev.querySelector(".search-ponentes"); // Encuentra el campo de búsqueda de ponentes dentro del evento
    if (searchPonentes) {
      // Añade un event listener para filtrar las filas de la tabla de ponentes
      searchPonentes.addEventListener("input", () => {
        const filter = searchPonentes.value.toLowerCase(); // Convierte el texto de búsqueda a minúsculas
        // Recorre todas las filas de la tabla y muestra u oculta aquellas que coincidan con el filtro
        ev.querySelectorAll("tbody tr").forEach(row => {
          row.style.display = Array.from(row.cells).some(cell => cell.textContent.toLowerCase().includes(filter)) ? '' : 'none';
        });
      });
    }

    // --- Inicialización de gráficos para cada evento ---
    // Busca todos los elementos canvas que contienen gráficos dentro del evento
    ev.querySelectorAll(".estadisticas-graficos canvas").forEach(canvas => {
      // Inicializa un gráfico de tipo Chart.js según la clase del canvas
      new Chart(canvas.getContext("2d"), {
        type: canvas.classList.contains("grafico-nivel") ? "pie" : // Si la clase es 'grafico-nivel', usa gráfico de tipo 'pie'
              canvas.classList.contains("grafico-pais") ? "bar" : // Si la clase es 'grafico-pais', usa gráfico de tipo 'bar'
              canvas.classList.contains("grafico-ratio") ? "doughnut" : "line", // Si la clase es 'grafico-ratio', usa gráfico de tipo 'doughnut', de lo contrario usa 'line'
        data: {
          // Define las etiquetas del gráfico dependiendo de la clase del canvas
          labels: canvas.classList.contains("grafico-nivel") ? ['Principiante','Intermedio','Avanzado'] :
                  canvas.classList.contains("grafico-pais") ? ['España','México','Colombia','Chile'] :
                  canvas.classList.contains("grafico-ratio") ? ['Asistentes','Ponentes'] :
                  ['2026-01-15','2026-01-16','2026-01-17','2026-01-18'],
          datasets: [{
            // Define el label (nombre de la serie) según el tipo de gráfico
            label: canvas.classList.contains("grafico-nivel") ? 'Nivel de Experiencia' :
                   canvas.classList.contains("grafico-pais") ? 'Participantes por País' :
                   canvas.classList.contains("grafico-ratio") ? 'Ratio Asistentes/Ponentes' :
                   'Registros por Día',
            // Define los datos a mostrar en el gráfico dependiendo de la clase del canvas
            data: canvas.classList.contains("grafico-nivel") ? [30,50,40] :
                  canvas.classList.contains("grafico-pais") ? [40,30,25,25] :
                  canvas.classList.contains("grafico-ratio") ? [120,8] :
                  [10,25,40,45],
            // Define los colores de fondo del gráfico según la clase del canvas
            backgroundColor: canvas.classList.contains("grafico-nivel") ? ['#0077cc','#28a745','#ffc107'] :
                             canvas.classList.contains("grafico-pais") ? '#0077cc' :
                             canvas.classList.contains("grafico-ratio") ? ['#28a745','#0077cc'] :
                             'rgba(0,119,204,0.2)',
            // Define los colores del borde del gráfico
            borderColor: canvas.classList.contains("grafico-registros") ? '#0077cc' : undefined,
            // Si el gráfico debe tener relleno (en gráficos de tipo 'line')
            fill: canvas.classList.contains("grafico-registros"),
            // Controla la suavidad de la curva en los gráficos 'line'
            tension: 0.3
          }]
        }
      });
    });
  });

});


