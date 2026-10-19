/* GSMSIL237 — catálogo demonstrativo.
   Sem apostas, depósitos ou saques reais. */
'use strict';

const games = [
  { name: 'Fortune Snake', category: 'Slots', icon: '🐍', color: '#6737d7', desc: 'Demonstração com tema de cobra.' },
  { name: 'Fortune Dragon', category: 'Slots', icon: '🐉', color: '#fa654d', desc: 'Demonstração com tema de dragão.' },
  { name: 'Fortune Tiger', category: 'Slots', icon: '🐯', color: '#ef4a42', desc: 'Demonstração com tema de tigre.' },
  { name: 'Fortune Ox', category: 'Slots', icon: '🐂', color: '#a83228', desc: 'Demonstração com tema de boi.' },
  { name: 'Fortune Rabbit', category: 'Slots', icon: '🐰', color: '#8e5bd8', desc: 'Demonstração com tema de coelho.' },
  { name: 'Fortune Mouse', category: 'Slots', icon: '🐭', color: '#ff914d', desc: 'Demonstração com tema de rato.' },
  { name: 'Dragon Hatch', category: 'Aventura', icon: '🥚', color: '#a62ed1', desc: 'Demonstração de aventura.' },
  { name: 'Hip Hop Panda', category: 'Aventura', icon: '🐼', color: '#6a58d7', desc: 'Demonstração com tema de panda.' },
  { name: 'Shaolin Soccer', category: 'Esportes', icon: '⚽', color: '#3b84ed', desc: 'Demonstração com tema esportivo.' }
];

function getElement(...ids) {
  for (const id of ids) {
    const element = document.getElementById(id);
    if (element) return element;
  }
  return null;
}

const grid = getElement('games-grid', 'gameGrid');
const search = getElement('search', 'searchInput');
const empty = getElement('empty-message', 'emptyState');
const dialog = getElement('game-dialog', 'gameDialog');
const dialogContent = getElement('dialog-content');

let selectedCategory = 'Todos';
let selectedFilter = 'Todos';

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function renderGames() {
  if (!grid) {
    console.error('GSMSIL237: não encontrei a grade de jogos no HTML.');
    return;
  }

  const query = normalize(search ? search.value : '');

  const results = games.filter(game => {
    const matchesSearch = normalize(
      game.name + ' ' + game.category + ' ' + game.desc
    ).includes(query);

    const category = normalize(selectedCategory);
    const matchesCategory =
      !category ||
      category === 'todos' ||
      category === 'tudo' ||
      category === 'all' ||
      (['fortune', 'slot', 'slots'].includes(category)
        ? game.category === 'Slots'
        : normalize(game.category) === category);

    const filter = normalize(selectedFilter);
    const matchesFilter =
      !filter ||
      ['todos', 'tudo', 'all'].includes(filter) ||
      normalize(game.category) === filter;

    return matchesSearch && matchesCategory && matchesFilter;
  });

  grid.replaceChildren();

  results.forEach(game => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'game-card';
    card.setAttribute('aria-label', 'Ver ' + game.name);

    const art = document.createElement('div');
    art.className = 'game-art';
    art.style.background = game.color;
    art.style.minHeight = '120px';
    art.style.display = 'flex';
    art.style.alignItems = 'center';
    art.style.justifyContent = 'center';
    art.style.flexDirection = 'column';

    const emoji = document.createElement('span');
    emoji.className = 'emoji';
    emoji.textContent = game.icon;
    emoji.style.fontSize = '52px';

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = 'DEMO';

    art.append(tag, emoji);

    const info = document.createElement('div');
    info.className = 'game-info';

    const title = document.createElement('strong');
    title.textContent = game.name;

    const subtitle = document.createElement('span');
    subtitle.textContent = game.category;

    info.append(title, subtitle);
    card.append(art, info);

    card.addEventListener('click', () => openPreview(game));
    grid.appendChild(card);
  });

  if (empty) {
    empty.hidden = results.length > 0;
  }
}

function openPreview(game) {
  if (dialog && dialogContent &&
      typeof dialog.showModal === 'function') {
    dialogContent.replaceChildren();

    const icon = document.createElement('div');
    icon.className = 'preview-icon';
    icon.textContent = game.icon;

    const title = document.createElement('h2');
    title.textContent = game.name;

    const description = document.createElement('p');
    description.textContent = game.desc;

    const note = document.createElement('p');
    note.textContent =
      'Modo demonstrativo. Não há apostas ou transações reais.';

    dialogContent.append(icon, title, description, note);
    dialog.showModal();
  } else {
    alert(game.name + '\n' + game.desc +
      '\n\nModo demonstrativo.');
  }
}

document.querySelectorAll('.category').forEach(button => {
  button.addEventListener('click', () => {
    selectedCategory =
      button.dataset.category || button.textContent;
    document.querySelectorAll('.category').forEach(item => {
      item.classList.toggle('active', item === button);
    });
    renderGames();
  });
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    selectedFilter =
      button.dataset.filter || button.textContent;

    // Filtros de popularidade não estão configurados neste catálogo.
    // Selecionar um filtro visual não deve esconder todos os jogos.
    selectedFilter = 'Todos';

    document.querySelectorAll('.filter').forEach(item => {
      item.classList.toggle('active', item === button);
    });
    renderGames();
  });
});

if (search) {
  search.addEventListener('input', renderGames);
}

const closeButton = getElement('dialog-close', 'closeDialog');
if (closeButton && dialog) {
  closeButton.addEventListener('click', () => dialog.close());
}

if (dialog) {
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}

const okButton = getElement('okDialog', 'dialog-ok');
if (okButton && dialog) {
  okButton.addEventListener('click', () => dialog.close());
}

// Carrega os cartões assim que o arquivo é executado.
renderGames();
