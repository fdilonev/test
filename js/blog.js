const UNSPLASH_KEY = 'u7ZbjUd8kemsMPjh_g0StuPu4ayeoBeJiDj1Rw21ink';

const PLACES = [
  { name: 'Cartagena de Indias', tag: 'Costa Caribe', query: 'cartagena colombia',
    desc: 'Ciudad amurallada llena de historia colonial, calles de colores vibrantes y atardeceres sobre el mar Caribe.' },
  { name: 'Valle de Cocora', tag: 'Eje Cafetero', query: 'cocora valley colombia',
    desc: 'Hogar de las palmas de cera más altas del mundo, rodeadas de niebla y montañas verdes.' },
  { name: 'Caño Cristales', tag: 'Meta', query: 'cano cristales colombia',
    desc: 'El «río de los cinco colores» — un fenómeno natural único donde el agua se pinta de rojo, amarillo y verde.' },
  { name: 'Guatapé', tag: 'Antioquia', query: 'guatape colombia',
    desc: 'Pueblo de zócalos coloridos con la famosa Piedra del Peñol y vistas panorámicas del embalse.' },
  { name: 'Ciudad Perdida', tag: 'Sierra Nevada', query: 'ciudad perdida colombia',
    desc: 'Ruinas ancestrales escondidas en la selva, más antiguas que Machu Picchu, accesibles solo a pie.' },
  { name: 'San Andrés', tag: 'Islas', query: 'san andres island colombia',
    desc: 'Mar de siete colores, arrecifes de coral y la cultura raizal del Caribe colombiano.' },
];

async function fetchImage(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    const data = await res.json();
    if (data.results && data.results[0]) {
      return {
        url: data.results[0].urls.regular,
        credit: data.results[0].user.name
      };
    }
  } catch (e) { console.log('Unsplash error:', e); }
  return { url: '', credit: '' };
}

async function renderPlaces() {
  const grid = document.getElementById('places-grid');

  const cards = await Promise.all(PLACES.map(async (place, i) => {
    const img = await fetchImage(place.query);
    return `
      <div class="card" style="animation-delay: ${i * .1}s">
        ${img.url ? `<img class="card-img" src="${img.url}" alt="${place.name}" loading="lazy">` : ''}
        <div class="card-body">
          <span class="card-tag">${place.tag}</span>
          <h3 class="card-title">${place.name}</h3>
          <p class="card-desc">${place.desc}</p>
        </div>
        ${img.credit ? `<div class="card-footer"><span>📷 ${img.credit}</span><span>Unsplash</span></div>` : ''}
      </div>
    `;
  }));

  grid.innerHTML = cards.join('');
}

function setBuildInfo() {
  const el = document.getElementById('build-info');
  el.textContent = `Última compilación: ${new Date().toLocaleString('es-CO')}`;
}

renderPlaces();
setBuildInfo();
