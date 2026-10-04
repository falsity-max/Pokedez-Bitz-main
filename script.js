//============================================
//POKEDEX SPA
//API: https:pokeapi.co
// ============================================

//================================
//URL BASE
//================================

  const URL = "https://pokeapi.co/api/v2/pokemon"

  //==============================
  //VARIABLES
  //==============================

  let offset = 0;
  const limite = 30;

   //==============================
   //ELEMENTOS DEL DOM
   //==============================

   const pokemonContainer = documento.getElmentBYTd("pokemoncontainer")
   const detailContainer = document.getElementById("detailContainer")

   const previousBtn = document.getElementById("previosBtn")
   const nextBtn = document.getElementById(nextBtn)

   const searchInput = document.getElementById(searchInput)
   const searchButton = document.getElementById(searchButton)

   const loading = document.getElementById(loading)
   const errorMessage = document.getElementById(errorMenssage)

   const pokemonCounter = document.getElementById(pokemonCounter)

   //============================
   //LOADING
   //===========================

   function mostrarLoading() {
       loading.classList.remove("hidden");
   }

   function ocultarloading()  {
       loading.classList.add("hidden");
   }

   //==========================
   //ERROR
   //=========================

   function mostrarError(texto = "Pokemon no encntrado") {
    
    errorMessage.texteContent = texto;

    errorMessage.classList.remove("hidden");

    setTimeout(() =>  {

   errorMessage.classList.add("hidden") 

  }, 2500)

   }

  //=========================
  //OBTENER LISTA
 //=========================

  async function cargarpokemon() {

       mostrarLoading();

       pokemonContainer.innerHTML = "";

       try {

           const respuesta = await fetch(

             `${URL}?offset=${offset}&limit=${limite}`

             (;

           conts datos = await respuesta . jason();

         pokemonCounter.texcotent =
           `${datos.results.length} Pokémon`;

         for(conts pokemon of datos.results) {

          conts respuestaPokemon = await fetch(pokemon.url);

           conts info  = await respuestaPokemon.json();

           crearCard(info);

         }

    } catch  (error) {

         mostrarError("Error cargando la pokedex");

     }

     ocultarLoding(); 

}

// ==============================
// TARJETAS
// ==============================

function crearCard(pokemon){

  conts card = document.createElement("article");

  card.classLit.add("card");

  card.innerHTML = `

  <img src="${pokemon.sprites.other["official-artwork"].front_default}"
             alt="${pokemon.name}">

<div class="card-body">

            <p class="id">

                #${pokemon.id}

            </p>

            <h3>

                ${capitalizar(pokemon.name)}

            </h3>

            <span class="tipo ${pokemon.types[0].type.name}">

                ${capitalizar(pokemon.types[0].type.name)}

            </span>

            <button>

                Ver Información

            </button>

        </div>

    `;

  card.querySelector("button")
      .addEventListener("click", () => {

          mostrarDetalle(pokemon);
        
          });

  pokemonContainer.appendChid(card);

}

// ==============================
// DETALLE
// ==============================

  function mostrarDetalle(pokemon) {

    let estadisticas = "";

    pokemon.stats.forEach(stat => {

        estadisticas += `

        <div class="stat">

            <div class="stat-header">

                <span>

                    ${capitalizar(stat.stat.name)}

                </span>

                <span>

                    ${stat.base_stat}

                </span>

            </div>

            <div class="progress">

                <span style="width:${Math.min(stat.base_stat,100)}%"></span>

            </div>

        </div>

        `;

    });

    let tipos = "";

    pokemon.types.forEach(tipo => {

        tipos += `
            <span class="tipo ${tipo.type.name}">
                ${capitalizar(tipo.type.name)}
            </span>
        `;

    });

    let habilidades = "";

    pokemon.abilities.forEach(habilidad => {

        habilidades += `
            <li>${capitalizar(habilidad.ability.name)}</li>
        `;

    });

    detailContainer.innerHTML = 
  
<img
            src="${pokemon.sprites.other["official-artwork"].front_default}"
            alt="${pokemon.name}">

        <h2>

            ${capitalizar(pokemon.name)}

        </h2>

        <h3>

            #${pokemon.id}

        </h3>

        <div>

            ${tipos}

        </div>

        <p>

            <strong>Altura:</strong>
            ${pokemon.height / 10} m

        </p>

        <p>

            <strong>Peso:</strong>
            ${pokemon.weight / 10} kg

        </p>

        <h3>

            Habilidades

        </h3>

        <ul>

            ${habilidades}

        </ul>

        <div class="stats">

            ${estadisticas}

        </div>

    `;

}

// ==============================
// BUSCAR
// ==============================

async funtion buscar pokemone() {

conts nombre = searchInput.value
.trim()
.tolowerCase();

if(nombre === "") {

cargarPokemon();

return;

}

mostrarLoding();

try{

conts respuesta = await fetch (`${URL}/${nombre}`);

    if (!respuesta.ok) {

            throw new Error();

        }
         
        conts pokemon = await respuesta.json();    

        pokemonContainer.innterHTML = "";

       crearCard(pokemon);

       mostrardetalle(pokemon);

      pokemonConunter.textContenet = "1 pokemon";

    } catch {

        mostrarError();

    }

    ocultarLoading();

}

// ==============================
// EVENTOS
// ==============================

searchButton.addEventListener("click", buscarPokemon);

searchInput.addEventListener("keypress", e => {

    if (e.key === "Enter") {

        buscarPokemon();

    }

});

// ==============================
// PAGINACIÓN
// ==============================

nextBtn.addEventListener("click", buscarPokemon);

searchInput.addEventListener("keypress", e => {

if (e.KEY === "Enter") {

  buscarPokemon();

  }

});

// ==============================
// PAGINACIÓN
// ==============================

nextBtn.addEventListener("click", () => {

    offset += limite;

    cargarPokemon();

});

previousBtn.addEventListener("click", () => {

    if (offset === 0) return;

    offset -= limite;

    cargarPokemon();

});

// ==============================
// UTILIDADES
// ==============================

function capitalizar (texto)  {

  return texto . charAt(0).toUpperCase() +
        texto.slice(1);

}

// ==============================
// INICIO
// ==============================

cargarPokemon();














































  
