//constants 
const btn = document.querySelector('#js-new-quote');
btn.addEventListener('click', getRandomPokemon);

const typeBtn = document.querySelector('#js-type');
typeBtn.addEventListener('click', getType);

const heightBtn = document.querySelector('#js-height');
heightBtn.addEventListener('click', getHeight);

const idBtn = document.querySelector('#js-id');
idBtn.addEventListener('click', getID);

const movesBtn = document.querySelector('#js-moves');
movesBtn.addEventListener('click', getMoves);

const answerText = document.querySelector('#js-answer-text');
const pokeAPI = "https://pokeapi.co/api/v2/pokemon";

let pokemonName = '';

//functions//

async function getRandomPokemon() {
    try {
        const response = await fetch(pokeAPI);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemon = data.results[randomIndex];
        pokemonName = randomPokemon.name;
        displayPokemon(pokemonName);
    } catch (err) {
        console.error(err);
        alert('Failed to fetch random Pokémon');
    }
}

async function getType() {
    try {
        const response = await fetch(`${pokeAPI}/${pokemonName}`);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        const pokemonTypes = data.types.map(type => type.type.name).join(', ');
        answerText.textContent = `Type: ${pokemonTypes}`;
    } catch (err) {
        console.error(err);
        alert('Failed to fetch Pokémon type');
    }
}

async function getHeight() {
    try {
        const response = await fetch(`${pokeAPI}/${pokemonName}`);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        const pokemonHeight = data.height;
        answerText.textContent = `Height: ${pokemonHeight}`;
    } catch (err) {
        console.error(err);
        alert('Failed to fetch Pokémon height');
    }
}

async function getID() {
    try {
        const response = await fetch(`${pokeAPI}/${pokemonName}`);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        const pokemonID = data.id;
        answerText.textContent = `ID: ${pokemonID}`;
    } catch (err) {
        console.error(err);
        alert('Failed to fetch Pokémon ID');
    }
}

async function getMoves() {
    try {
        const response = await fetch(`${pokeAPI}/${pokemonName}`);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const data = await response.json();
        const pokemonMoves = data.moves.map(move => move.move.name).slice(0, 5).join(', '); 
        answerText.textContent = `Moves: ${pokemonMoves}`;
    } catch (err) {
        console.error(err);
        alert('Failed to fetch Pokémon moves');
    }
}

function displayPokemon(pokemonName) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = `Random Pokémon: ${pokemonName}`;
}

getRandomPokemon();
