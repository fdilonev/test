const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

const DAYS = [
  'Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'
];

function setDate() {
  const now = new Date();
  const day = DAYS[now.getDay()];
  const num = now.getDate();
  const month = MONTHS[now.getMonth()];
  const year = now.getFullYear();
  document.getElementById('date').textContent = `${day}, ${num} de ${month} de ${year}`;
  document.getElementById('build-time').textContent = now.toLocaleString('es-ES');
}

function renderDeployments() {
  const deploys = [
    { label: 'v2.4.1 — Autenticación', status: 'success', tag: 'Exitoso' },
    { label: 'v2.4.0 — API Gateway', status: 'success', tag: 'Exitoso' },
    { label: 'v2.3.9 — Hotfix chat', status: 'success', tag: 'Exitoso' },
    { label: 'v2.3.8 — WebSockets', status: 'pending', tag: 'En curso' },
    { label: 'v2.3.7 — Base de datos', status: 'failure', tag: 'Fallido' },
  ];

  const container = document.getElementById('deployments');
  container.innerHTML = deploys.map(d => `
    <div class="ticker-row">
      <span class="label">${d.label}</span>
      <span class="status ${d.status}">${d.tag}</span>
    </div>
  `).join('');
}

function renderBranchHealth() {
  const branches = [
    { label: 'main', status: 'synced', tag: 'Sincronizada' },
    { label: 'development', status: 'behind', tag: '3 detrás' },
    { label: 'feature/auth', status: 'synced', tag: 'Sincronizada' },
    { label: 'feature/chat-v2', status: 'behind', tag: '7 detrás' },
    { label: 'hotfix/login', status: 'diverged', tag: 'Divergente' },
  ];

  const container = document.getElementById('branch-health');
  container.innerHTML = branches.map(b => `
    <div class="ticker-row">
      <span class="label">${b.label}</span>
      <span class="status ${b.status}">${b.tag}</span>
    </div>
  `).join('');
}

setDate();
renderDeployments();
renderBranchHealth();
