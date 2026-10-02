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


  
  


         
            

    

    



















































  
