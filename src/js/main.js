const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');
const pokemonForm = document.querySelector('.form');
const pokemonInput = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let currentPokemon = 1;

// Pegar o Pokemon na Api

async function searchPokemon(pokemon) {
  try {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(apiResponse.status === 200) {
      const pokemondata = await apiResponse.json();
      return pokemondata;
    }
  } catch (error) {
    console.log("Error: ", error);
  }
}

// Renderizar o pokemon na página

async function renderPokemon(pokemon) {
  try {
    pokemonName.innerHTML = "Loading...";
    pokemonId.innerHTML = '';
    const pokemonDatas = await searchPokemon(pokemon);

    if(!pokemonDatas) throw new Error("Pokemon Not Found");

    pokemonImg.style.display = "block";
    pokemonName.innerHTML = pokemonDatas.name;
    pokemonId.innerHTML = pokemonDatas.id;
    pokemonImg.src = pokemonDatas['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    currentPokemon = pokemonDatas.id;

  } catch (error) {
    pokemonImg.style.display = "none";
    pokemonName.innerHTML = "Not Found";
    pokemonId.innerHTML = '';
  }
}

// Events Listener

  // Procurar pokemon pelo nome ou id

pokemonForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const pokemonSubmit = pokemonInput.value.toLowerCase();
  renderPokemon(pokemonSubmit);
});


  // Botão de Anterior

buttonPrev.addEventListener('click', () => {
  if(currentPokemon > 1) {
    currentPokemon -= 1;
    renderPokemon(currentPokemon);
  }
});

  // Botão de Próximo

buttonNext.addEventListener('click', () => {
  currentPokemon += 1;
  renderPokemon(currentPokemon);
});

renderPokemon(currentPokemon);
