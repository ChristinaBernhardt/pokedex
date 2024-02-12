let currentPokemon;
let amountPokemon = 20;
let pokemonCollection = [];
let pokemonsLoaded = 0;
const colors = {
  normal: "rgb(164,172,175)",
  fire: "rgb(253,125,36)",
  water: "rgb(69,146,196)",
  electric: "rgb(238,213,53)",
  grass: "rgb(155,204,80)",
  ice: "rgb(81,196,231)",
  fighting: "rgb(213,103,35)",
  poison: "rgb(185,127,201)",
  ground: "rgb(247,222,63)",
  flying: "rgb(61,199,239)",
  psychic: "rgb(243,102,185)",
  bug: "rgb(131,167,81)",
  rock: "rgb(163,140,33)",
  ghost: "rgb(123,98,163)",
  dragon: "rgb(241,110,87)",
  dark: "rgb(112,112,112)",
  steel: "rgb(158,183,184)",
  fairy: "rgb(253,185,233)",
};

async function init() {
  loadPokemons();
}

async function loadPokemons() {
  for (let i = 0; i < amountPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    pokemonCollection.push(currentPokemon);
  }
  renderPokemonCards();
}

async function loadMorePokemons() {
  for (let i = pokemonsLoaded; i < pokemonsLoaded + 5; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    pokemonCollection.push(currentPokemon);
  }
  renderPokemonCards();
}

function renderPokemonCards() {
  let pokedexCollectionContainer = document.getElementById(
    "pokedexCollectionContainer"
  );
  pokedexCollectionContainer.innerHTML = "";
  for (let i = 0; i < pokemonCollection.length; i++) {
    let pokemon = pokemonCollection[i];
    let color = getPokemonColor(pokemon);
    pokedexCollectionContainer.innerHTML += generateHtmlPokemonCards(
      i,
      pokemon,
      color
    );
  }
  pokemonsLoaded = document.getElementById(
    "pokedexCollectionContainer"
  ).childElementCount;
}

function generateHtmlPokemonCards(i, pokemon, color) {
  return `
  <div class="pokedex-card"  onclick="openPokemonDetail(${i})">   
      <h1 class="h1-pokemon-name">
          ${pokemon["name"]}
      </h1>
          <img src = "${pokemon["sprites"]["other"]["home"]["front_shiny"]}">       
      <div class="type" style="background-color: ${color};"> ${pokemon["types"][0].type.name}</div>
  </div>
  `;
}

function getPokemonColor(pokemon) {
  // wir erstellen uns eine Hilfsfunktion, damit die Variablen sich nicht wiederholen
  let type = pokemon["types"][0].type.name; // wir holen uns den ersten Typ Namen des Pokemons im Feld 0 des Arrays types
  let color = colors[type]; // aus dem Json colors holen wir uns den Farbcode welcher zum Typ gehÃ¶rt und gebe den Wert zurÃ¼ck
  return color;
}

function openPokemonDetail(i) {
  document.getElementById("backgroundForDetailard").classList.remove("d-none");
  document
    .getElementById("backgroundForDetailard")
    .classList.add("background-for-detail-card");
  let containerForDetailCard = document.getElementById(
    "backgroundForDetailard"
  );
  containerForDetailCard.innerHTML = "";
  let pokemon = pokemonCollection[i];
  let firstType = pokemon.types[0].type.name;
  let color = colors[firstType];
  containerForDetailCard.innerHTML = generateHtmlForDetailCard(
    i,
    pokemon,
    color
  );
  executeFunctions(pokemon, i);
}

function generateHtmlForDetailCard(i, pokemon, color) {
  return /*html*/`
      <div class="pokedex-card-detail-wrapper" style="background-color: ${color};">
        <div class="detail-header-icon">                
                <img src="./img/left.png" id="arrow-left-icon" onclick="showPreviousPokemon(${i})">    
                <img src="./img/right.png" id="arrow-right-icon" onclick="showNextPokemon(${i})">             
                <img src="./img/close.png" onclick="hidePokemonDetail()" >                
        </div>

        <div class="detail-pokemon-image">
            <h1 class="h1-pokemon-name">
                ${pokemon["name"]}
            </h1>
            <p># ${pokemon["id"]}</p>
            <img class="detail-image" src = "${pokemon["sprites"]["other"]["official-artwork"]["front_shiny"]}">                  
        </div>        
    </div>   
    `;
}
function hidePokemonDetail() {
  document.getElementById("background-for-detail-card").classList.add("d-none");
  document
    .getElementById("background-for-detail-card")
    .classList.remove("background-for-detail-card");
}

function showNextPokemon(i) {
  i++;
  openPokemonDetail(i);
  if (i == pokemonCollection.length - 1) {
    document.getElementById("arrow-right-icon").classList.add("d-none");
  }
}

function showPreviousPokemon(i) {
  i--;
  openPokemonDetail(i);
  if (i == 0) {
    document.getElementById("arrow-left-icon").classList.add("d-none");
  }
}
