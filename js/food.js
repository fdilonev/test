const FOOD_KEY = 'u7ZbjUd8kemsMPjh_g0StuPu4ayeoBeJiDj1Rw21ink';

const FOODS = [
  { name: 'Bandeja Paisa', tag: 'Antioquia', query: 'bandeja paisa colombian food',
    desc: 'El plato más emblemático: frijoles, arroz, carne molida, chicharrón, huevo frito, plátano maduro, chorizo, aguacate y arepa.' },
  { name: 'Ajiaco Bogotano', tag: 'Bogotá', query: 'ajiaco colombian soup',
    desc: 'Sopa espesa de tres tipos de papa, pollo, maíz y guascas. El alma de la cocina capitalina.' },
  { name: 'Ceviche de Camarón', tag: 'Costa Caribe', query: 'colombian ceviche shrimp',
    desc: 'Camarones frescos marinados en limón con cebolla morada, cilantro y un toque de ají.' },
  { name: 'Empanadas', tag: 'Valle del Cauca', query: 'colombian empanadas',
    desc: 'Crujientes por fuera, rellenas de papa y carne. El snack callejero perfecto con ají casero.' },
  { name: 'Arepa de Huevo', tag: 'Costa Caribe', query: 'arepa de huevo colombian',
    desc: 'Arepa frita rellena de huevo entero. Una obra maestra del street food caribeño.' },
  { name: 'Sancocho', tag: 'Tradición Nacional', query: 'sancocho colombian stew',
    desc: 'El guiso que une a las familias: yuca, plátano, papa, maíz y carne cocinados a fuego lento por horas.' },
];

async function fetchFoodImage(query) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${FOOD_KEY}` } }
    );
    const data = await res.json();
    if (data.results?.[0]) {
      return { url: data.results[0].urls.regular, credit: data.results[0].user.name };
    }
  } catch (e) { console.log('Unsplash error:', e); }
  return { url: '', credit: '' };
}

async function renderFood() {
  const grid = document.getElementById('food-grid');
  if (!grid) return;

  const cards = await Promise.all(FOODS.map(async (food, i) => {
    const img = await fetchFoodImage(food.query);
    return `
      <div class="card" style="animation-delay: ${i * .1}s">
        ${img.url ? `<img class="card-img" src="${img.url}" alt="${food.name}" loading="lazy">` : ''}
        <div class="card-body">
          <span class="card-tag">${food.tag}</span>
          <h3 class="card-title">${food.name}</h3>
          <p class="card-desc">${food.desc}</p>
        </div>
        ${img.credit ? `<div class="card-footer"><span>📷 ${img.credit}</span><span>Unsplash</span></div>` : ''}
      </div>
    `;
  }));

  grid.innerHTML = cards.join('');
}

renderFood();
