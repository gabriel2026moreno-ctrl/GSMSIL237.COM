/*
 * GSMSIL237 — catálogo demonstrativo.
 * Sem apostas, depósitos ou saques reais.
 */
const games = [
  {name:"Fortune Snake",category:"Slots",filter:"Popular",icon:"🐍",bg:"linear-gradient(145deg,#ff78b9,#6737d7)",desc:"Prévia demonstrativa com tema de cobra."},
  {name:"Fortune Dragon",category:"Slots",filter:"Popular",icon:"🐉",bg:"linear-gradient(145deg,#ffd85c,#fa654d)",desc:"Prévia demonstrativa com tema de dragão."},
  {name:"Fortune Tiger",category:"Slots",filter:"Popular",icon:"🐯",bg:"linear-gradient(145deg,#ffbd38,#ef4a42)",desc:"Prévia demonstrativa com tema de tigre."},
  {name:"Fortune Ox",category:"Slots",filter:"Popular",icon:"🐂",bg:"linear-gradient(145deg,#ffb83e,#a83228)",desc:"Prévia demonstrativa com tema de boi."},
  {name:"Fortune Rabbit",category:"Slots",filter:"Recente",icon:"🐰",bg:"linear-gradient(145deg,#ffc5ef,#8e5bd8)",desc:"Prévia demonstrativa com tema de coelho."},
  {name:"Fortune Mouse",category:"Slots",filter:"Recente",icon:"🐭",bg:"linear-gradient(145deg,#ffe66d,#ff914d)",desc:"Prévia demonstrativa com tema de rato."},
  {name:"Dragon Hatch",category:"Aventura",filter:"Popular",icon:"🥚",bg:"linear-gradient(145deg,#ff9758,#a62ed1)",desc:"Prévia demonstrativa de aventura."},
  {name:"Hip Hop Panda",category:"Aventura",filter:"Recente",icon:"🐼",bg:"linear-gradient(145deg,#a3e8ff,#6a58d7)",desc:"Prévia demonstrativa com tema de panda."},
  {name:"Shaolin Soccer",category:"Esportes",filter:"Recente",icon:"⚽",bg:"linear-gradient(145deg,#9bf4c1,#3b84ed)",desc:"Prévia demonstrativa com tema esportivo."}
];


const grid = document.getElementById("games-grid");
const search = document.getElementById("search");
const empty = document.getElementById("empty-message");
const dialog = document.getElementById("game-dialog");
let category = "Todos";
let filter = "Todos";

function renderGames() {
  const term = search.value.trim().toLocaleLowerCase("pt-BR");
  const results = games.filter(game => {
    const matchesText = (game.name + " " + game.category)
      .toLocaleLowerCase("pt-BR").includes(term);
    const matchesCategory = category === "Todos" || game.category === category;
    const matchesFilter = filter === "Todos" || game.filter === filter;
    return matchesText && matchesCategory && matchesFilter;
  });

  grid.replaceChildren();
  results.forEach(game => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "game-card";
    card.setAttribute("aria-label", "Ver prévia de " + game.name);

    const art = document.createElement("div");
    art.className = "game-art";
    art.style.setProperty("--art-bg", game.bg);

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "DEMO";

    const emoji = document.createElement("span");
    emoji.textContent = game.icon;
    emoji.setAttribute("aria-hidden", "true");

    const info = document.createElement("div");
    info.className = "game-info";

    const title = document.createElement("strong");
    title.textContent = game.name;

    const subtitle = document.createElement("span");
    subtitle.textContent = "Demonstrativo · " + game.category;

    art.append(tag, emoji);
    info.append(title, subtitle);
    card.append(art, info);
    card.addEventListener("click", () => openPreview(game));
    grid.appendChild(card);
  });

  empty.hidden = results.length > 0;
}

function openPreview(game) {
  document.getElementById("dialogIcon").textContent = game.icon;
  document.getElementById("dialogTitle").textContent = game.name;
  document.getElementById("dialogDescription").textContent = game.desc;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    alert(game.name + "\n" + game.desc +
      "\nIntegração oficial ainda não configurada.");
  }
}

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    category = button.dataset.category;
    document.querySelectorAll(".category").forEach(item => {
      item.classList.toggle("active", item === button);
    });
    renderGames();
  });
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(item => {
      item.classList.toggle("active", item === button);
    });
    renderGames();
  });
});

search.addEventListener("input", renderGames);
document.getElementById("closeDialog").addEventListener("click", () => dialog.close());
document.getElementById("okDialog").addEventListener("click", () => dialog.close());

document.getElementById("menuButton").addEventListener("click", () => {
  document.getElementById("sidebar").scrollIntoView({
    behavior: "smooth", block: "center"
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
renderGames();

/*
 * Futura integração:
 * a abertura de jogos deve passar por um backend seguro,
 * usando credenciais fornecidas oficialmente pelo fornecedor.
 * Nunca coloque tokens secretos neste arquivo público.
 */
