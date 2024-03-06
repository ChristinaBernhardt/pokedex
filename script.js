let currentPokemon;
let amountPokemon = 10;
let pokemonCollection = [];
let pokemonsLoaded = 0;
let colors = {
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
  document.getElementById("buttonLoadPokemon").disabled=true;
  document.getElementById("pokedexCollectionContainer").style.display = "none";
  document.getElementById("loadingCircle").style.display = "block";
  for (let i = pokemonsLoaded; i < pokemonsLoaded + amountPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    pokemonCollection.push(currentPokemon);
  }
  renderPokemonCards();

  document.getElementById("loadingCircle").style.display = "none";
  document.getElementById("pokedexCollectionContainer").style.display = "flex";
  document.getElementById("buttonLoadPokemon").disabled=false;
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
  if (pokemon.types.length > 0) {
    typesHtml = pokemon.types
      .map(
        (type) =>
          `<div class="type rounded-pill" style="background-color: ${color};">${type.type.name}</div>`
      )
      .join("");
  }

  return /*html*/ `
  <div class="pokedex-card"  onclick="openPokemonDetail(${i})">  
      <h1 class="h1-pokemon-name">
          ${pokemon.name}
      </h1>
      <img src="${pokemon.sprites.other.home.front_shiny}">      
      <div class="types">${typesHtml}</div>    
  </div>
  `;
}

function getPokemonColor(pokemon) {
  let type = pokemon["types"][0].type.name;
  let color = colors[type];
  return color;
}

function newChart(baseExperience, height, weight) {
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["i", "B", "H", "W"],
      datasets: [
        {
          axis: "y",
          label: "Pokemon Stats",
          data: [baseExperience, height, weight],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 205, 86)",
            "rgb(54, 162, 235)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 205, 86)",
            "rgb(54, 162, 235)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function openPokemonDetail(i) {
    document.getElementById("backgroundForDetailard").classList.remove("d-none");
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
  newChart(pokemon.base_experience, pokemon.height, pokemon.weight);
}

function generateHtmlForDetailCard(i, pokemon, color) {
  return /*html*/ `
      <div class="pokedex-card-detail-wrapper" style="background-color: ${color};">
        <div class="detail-header-icon">                
                <img class="header-icon" src="./img/left.png" id="arrow-left-icon" onclick="showPreviousPokemon(${i})">    
                <img class="header-icon"src="./img/right.png" id="arrow-right-icon" onclick="showNextPokemon(${i})">            
                <img class="header-icon"src="./img/close.png" onclick="hidePokemonDetail()">                
        </div>
        <div class="detail-pokemon-image">
            <h1 class="h1-pokemon-name">
                ${pokemon["name"]}
            </h1>
            <p># ${pokemon["id"]}</p>
            <img class="detail-image" src = "${pokemon["sprites"]["other"]["official-artwork"]["front_shiny"]}">    
            <div>About</div>
            <div>Weight: ${pokemon["weight"]}</div>
            <div>Height: ${pokemon["height"]}</div>
         
            <canvas class="my-chart" id="myChart"></canvas>
        </div>
        <div>
</div>
           
      </div>        
    `;
}

function hidePokemonDetail() {
  document.getElementById("backgroundForDetailard").classList.add("d-none");
}

function showNextPokemon(i) {
  let nextIndex = (i + 1 + pokemonCollection.length) % pokemonCollection.length;
  openPokemonDetail(nextIndex);
}

function showPreviousPokemon(i) {
  let previousIndex =
    (i - 1 + pokemonCollection.length) % pokemonCollection.length;
  openPokemonDetail(previousIndex);
}

function newSearch() {
  document.getElementById("search_pokemon").value = "";
  renderPokemonCards();
}

function showPokemon() {
  let search_pokemon = document
    .getElementById("search_pokemon")
    .value.toLowerCase();
  console.log(search_pokemon);
  let pokedexCollectionContainerSearch = document.getElementById(
    "pokedexCollectionContainer"
  );
  pokedexCollectionContainerSearch.innerHTML = "";
  for (let i = 0; i < pokemonCollection.length; i++) {
    let onePokemon = pokemonCollection[i];
    let pokemon = pokemonCollection[i].name;
    let pokemonName = pokemon.toLowerCase();
    if (pokemonName.toLowerCase().includes(search_pokemon)) {
      let color = getPokemonColor(onePokemon);
      getPokemonColor(onePokemon);

      pokedexCollectionContainerSearch.innerHTML += generateHtmlPokemonCards(
        i,
        onePokemon,
        color
      );
    }
  }
}
