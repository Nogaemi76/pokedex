const pokeUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=";
const singlePokeUrl = "https://pokeapi.co/api/v2/pokemon/";

//Send request to the API
const fetchRequest = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let results = data.results;
            console.log(results);
            displayList(results);
        })
        .catch(err => console.log(err));
}

//Display pokemon list on right screen
const displayList = (res) => {
    let pokelist = Array.from(document.getElementsByClassName('list-item')); 
    //Array.from not really necessary : loop for functions with HtmlCollection
    console.log(pokelist);
    for (let i = 0; i < res.length; i++) {
        pokelist[i].textContent = (offsetValue + i + 1) + ". " + capitalizeStr(res[i].name);
    }    
}

// Add MAJ on first letter
const capitalizeStr = (string) => {    
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Change pokemon displayed with Prev & Next buttons
//offset doesn't work with negative values
let offsetValue = 0;
fetchRequest(pokeUrl + offsetValue);

//Prev & Next buttons
const prevButton = document.getElementsByClassName('left-button')[0];
const nextButton = document.getElementsByClassName('right-button')[0];

prevButton.addEventListener('click', () => { 
    if (offsetValue >= 20) {
        offsetValue = offsetValue - 20;
    } else {
        offsetValue = 0;
    }
    fetchRequest(pokeUrl + offsetValue);
});

nextButton.addEventListener('click', () => {
    offsetValue = offsetValue + 20;
    fetchRequest(pokeUrl + offsetValue);
});

// Fetch request on click on single pokemon
const pokelist = document.getElementById('pokelist');
// console.log('pokelist', pokelist);
pokelist.addEventListener('click', (e) => {
    let pokemonClicked = e.target.innerHTML;
    // console.log(pokemonClicked);
    pokemonFetched = pokemonClicked.split(". ")[1].toLowerCase();

    fetch(singlePokeUrl + pokemonFetched)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            const mainScreenEl = document.querySelector('.main-screen');
            mainScreenEl.classList.remove('hide');

            const pokeTypesArray = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];
            for (let i = 0; i < pokeTypesArray.length; i++) {
                if (mainScreenEl.classList.contains(pokeTypesArray[i])) {
                    mainScreenEl.classList.remove(pokeTypesArray[i]);
                }
            }

            // console.log('name:', data.name,', id:', data.id, ', weight:', data.weight, ', height:', data.height);
            // console.log('front img:', data.sprites.front_default);
            // console.log('back img:', data.sprites.back_default);

            let pokeName = data.name;
            let pokeNameCapitalized = capitalizeStr(pokeName);
            let pokeId = data.id;
            let pokeWeight = data.weight;
            let pokeHeight = data.height;
            let pokeFrontImg = data.sprites.front_default;
            let pokeBackImg = data.sprites.back_default;
            
            document.querySelector('.poke-name').innerHTML = pokeNameCapitalized;
            document.querySelector('.poke-id').innerHTML = "#" + pokeId;
            document.querySelector('.poke-weight').innerHTML = pokeWeight;
            document.querySelector('.poke-height').innerHTML = pokeHeight;
            document.querySelector('.poke-front-image').setAttribute('src', pokeFrontImg); 
            document.querySelector('.poke-back-image').setAttribute('src', pokeBackImg);
           
            // console.log(data.types);
            let pokeTypeOne = data.types[0].type.name;
            let pokeTypeOneCapitalized = capitalizeStr(pokeTypeOne);
            document.querySelector('.poke-type-one').innerHTML = pokeTypeOneCapitalized;

            mainScreenEl.classList.add(pokeTypeOne);
            
            if (data.types.length > 1) {
                let pokeTypeTwo = data.types[1].type.name;
                let pokeTypeTwoCapitalized = capitalizeStr(pokeTypeTwo);
                document.querySelector('.poke-type-two').innerHTML = pokeTypeTwoCapitalized;
                document.querySelector('.poke-type-two').classList.remove('hide');
            } else {
                document.querySelector('.poke-type-two').innerHTML = "";
                document.querySelector('.poke-type-two').classList.add('hide');
            }            
        })
        .catch(err => console.log(err));
});