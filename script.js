let currentPokemon;

function init(){
    loadPokemon();
    renderPokemonInfo();
}

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/charmander";
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log("loaded pokmon", currentPokemon);
  renderPokemonInfo();
}

function renderPokemonInfo() {
  document.getElementById("pokemonName").innerHTML = currentPokemon["name"];
  document.getElementById("pokemonPic").src = currentPokemon["sprites"]["other"]["official-artwork"]["front_shiny"];
  document.getElementById("pokemonID").innerHTML = `# ${(currentPokemon["id"])}`;
 
}
