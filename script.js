/*
Plan
 using PokeAPI create a website that turns every sprite a pokemon uses

 // Java script requriements

    Phase 1
    Test api calls with thunderclient

    Create basic fetch request and store the json
    pull the pokemon name fomr the json and log it to console
    pull the sprite links and log them to console

    Phase 2
    create a funciton to put these into the html DOM
    title displays correctly
    sprite images appear

 // HTML and CSS requirements

    // Phase 1
    Plain H1, with the pokemons name and results in console

    // Phase 2
    Heading at the top middle of the page and each pokemon sprite being displayed in a seperate card with the sprite title displayed
*/

// Phase 1
// Test api calls with thunderclient
   // call to get the record for pikachu
   // https://pokeapi.co/api/v2/pokemon/25

//  Create basic fetch request and store the json
async function pokeAPifetch(indexNum) {
   const pokeFetch = await fetch ('https://pokeapi.co/api/v2/pokemon/' + indexNum
   );
   // error check
   if (!pokeFetch.ok) { // if pokedata.ok is false
      console.log(`Response not okay see below`)
      console.log(`Status: ${pokeFetch.status}`) // logs the status code
      console(`Text: ${pokeFetch.text()}`) // logs the status text
      return;
   }

   // Storing the info as a Json so I can access it
   const pokeData = await pokeFetch.json(); // grabs the JSON from the returned object.
   return pokeData;
}

//     pull the pokemon name from the json and log it to console
   async function pokeName(JSON) {
      return pokemonName = await JSON.forms[0].name;
   }

//     pull the sprite links and log them to console
   async function pokeSprites(JSON) {
      // Create object to store all the sprite urls
      // let gottaCatchEmAll = {};
      // array for objects
      const pokemon = [];
      // constructor to create pokemon objects
      function spriteGen(genNum, url) {
         this.genNum = genNum;
         this.url = url;
      }
      // store each sprite as an object from gen1-gen8
      const gen1 = new spriteGen('generation-i', JSON.sprites.versions['generation-i']['red-blue']['front_default']);
      const gen2 = new spriteGen('generation-ii', JSON.sprites.versions['generation-ii']['silver']['front_default']);
      const gen3 = new spriteGen('generation-iii', JSON.sprites.versions['generation-iii']['emerald']['front_default']);
      const gen4 = new spriteGen('generation-iv', JSON.sprites.versions['generation-iv']['diamond-pearl']['front_default']);
      const gen5 = new spriteGen('generation-v', JSON.sprites.versions['generation-v']['black-white']['front_default']);
      const gen6 = new spriteGen('generation-vi', JSON.sprites.versions['generation-vi']['omegaruby-alphasapphire']['front_default']);
      const gen7 = new spriteGen('generation-vii', JSON.sprites.versions['generation-vii']['ultra-sun-ultra-moon']['front_default']);
      const gen8 = new spriteGen('generation-viii', JSON.sprites.versions['generation-viii']['icons']['front_default']);
      // append these to pokemon array
      pokemon.push(gen1, gen2, gen3, gen4, gen5, gen6, gen7, gen8);

      // this could be further imrpoved as a loop if I converted the roman numerals in the json into ints first.

      /*
      // return the array as log for debugging
      pokemon.forEach(function(obj, index) {
         console.log(`index ${index} is ${obj.genNum}, url is ${obj.url}`)
      }
      )
      */
      return pokemon
   }
// function to set the pokemon name on the page
function setName(JSON) {
   let jsonName = document.getElementById('pokeName');
   jsonName.textContent = `${JSON.name}`
}

// function to set the index number on the page
function setIndexNum(JSON) {
   let indexNum = document.getElementById('pokeIndexNum');
   indexNum.textContent = `#${JSON.id}`
}

// function to create the div for each gen
   function divMaker(spriteObject) {
      // make blank div
      const div = document.createElement('div');
      div.id = `${spriteObject.genNum}`;
      div.classList.add('pokeSprite'); // applies the class so CSS can style it.

      // make image element
      const img = document.createElement('img');
      img.src = spriteObject.url;
      img.alt = `${spriteObject.genNum} sprite`;

      // create the p element
      const p = document.createElement('p');
      p.textContent = `${spriteObject.genNum}`;

      // Append the image and paragraph elements to the new div
      div.appendChild(img);
      div.appendChild(p);

      // return new blank div
      return div;
   }

// function to populate the a div for each gen with information
function div_o_matic(pokeArray, spanElement) {
   // loop to create a div for each object in the array
   for (let i = 0; i < pokeArray.length; i++) {
      const div = divMaker(pokeArray[i]) // temp div for the current loop
      spanElement.appendChild(div) // pushing the div to the DOM span element
      console.log(`loop cycle ${i}`)
   }
}

// async master function to run the program
async function pokeConsole(indexNum) {
   const pokeJson = await pokeAPifetch(indexNum);
   console.log(pokeJson);
   const pokemonName = await pokeName(pokeJson)
   console.log(`This pokemon's name is ${pokemonName}`);
   const pokemonUrls = await pokeSprites(pokeJson);

   // manipulating the DOM
      // Setting the pokemon name
      setName(pokeJson)
      // Setting the index number
      setIndexNum(pokeJson)
      // creating the DIVs
      const pokeSpan = document.getElementById('pokeContainer');
      console.log(`pokeSpan is ${pokeSpan}`)
      const pokeArray = await pokeSprites(pokeJson)
      console.log(`poke Array ${pokeArray}`)
      div_o_matic(pokeArray, pokeSpan);
}

// Getting a random index number to display
let randomIndex = Math.floor(Math.random() * 151) + 1;
// running the program
pokeConsole(randomIndex);
