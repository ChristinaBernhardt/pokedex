let currentPokemon;
let amountPokemon = 30;
let pokemonCollection = [];
let pokemonsLoaded = 0; //???
let color = {
  normal: "#A8A77A",
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

async function loadMorePokemons(){
    for (let i = pokemonsLoaded; i < pokemonsLoaded + 5; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemonCollection.push(currentPokemon);
      }
      renderPokemonCards();
    }



function renderPokemonCards() {
  let pokedexCollectionContainer = document.getElementById('pokedexCollectionContainer');
  pokedexCollectionContainer.innerHTML = '';
  for (let i = 0; i < pokemonCollection.length; i++) {
    let pokemon = pokemonCollection[i];
    pokedexCollectionContainer.innerHTML += generateHtmlPokemonCards(i, pokemon); 
  }
  pokemonsLoaded = document.getElementById('pokedexCollectionContainer').childElementCount; 
 }

function generateHtmlPokemonCards(i, pokemon) {
  return `
  <div class="pokedex-card" style="background-color: ${color};" onclick="openPokemonDetail(${i})">   
      <h1 class="h1-pokemon-name">
          ${pokemon['name']}
      </h1>
      <p># ${pokemon['id']}</p>
      <img src = "${pokemon['sprites']['other']['home']['front_shiny']}">              
  </div>
  `;
}