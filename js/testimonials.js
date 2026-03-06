const testimonials = [
  {
    text: "Cartagena me robó el corazón. Las calles empedradas, los balcones llenos de flores y la brisa del Caribe… no hay nada igual.",
    author: "María López",
    origin: "Ciudad de México, México"
  },
  {
    text: "El Valle del Cocora es como caminar dentro de un sueño. Las palmas de cera entre la niebla son algo que nunca voy a olvidar.",
    author: "James Carter",
    origin: "Austin, Texas"
  },
  {
    text: "La gente colombiana es lo mejor del viaje. En cada pueblo me recibieron como familia. Volveré mil veces.",
    author: "Ana Beatriz Silva",
    origin: "São Paulo, Brasil"
  },
  {
    text: "Caño Cristales realmente parece pintado a mano. Las fotos no le hacen justicia, hay que vivirlo.",
    author: "Pierre Dupont",
    origin: "Lyon, Francia"
  },
  {
    text: "San Andrés tiene el mar más azul que he visto. El snorkel en Johnny Cay fue la mejor experiencia de mi vida.",
    author: "Laura Fernández",
    origin: "Buenos Aires, Argentina"
  },
  {
    text: "Subir los 740 escalones de la Piedra del Peñol vale cada gota de sudor. La vista desde arriba es impresionante.",
    author: "Tobias Müller",
    origin: "Berlín, Alemania"
  }
];

function renderTestimonials() {
  const grid = document.getElementById("testimonials");
  if (!grid) return;
  grid.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <p class="testimonial-text">"${t.text}"</p>
      <p class="testimonial-author">${t.author}</p>
      <p class="testimonial-origin">${t.origin}</p>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderTestimonials);
