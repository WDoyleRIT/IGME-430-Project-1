const { text } = require('body-parser');
const fs = require('fs');
const { get } = require('http');
const path = require('path');

let pokedex = JSON.parse(fs.readFileSync(`${__dirname}/../../data/pokedex.json`));

const getIndex = (req, res) => {
    res.render('index');
};

const getPokemonByID = (req, res) => {
  let results = pokedex;


  if(req.query.id) {
    const id = parseInt(req.query.id, 10);
    results = results.filter((pokemon) => pokemon.id === id);
  }
  
  console.log(results);
  return res.render('index', {
    search1: results,
  });
};

const getPokemonByName = (req, res) => {
let results = pokedex;

let newName = req.query.name.toLowerCase();
newName = newName.charAt(0).toUpperCase() + newName.slice(1);
console.log(newName);
results = results.filter((pokemon) => pokemon.name.includes(newName));

return res.render('index', {
  search2: results,
});
}

const getPokemonByType = (req, res) => {
let results = pokedex;

results = results.filter((pokemon) => pokemon.type.includes(req.query.type));

return res.render('index', {
  search3: results,
});
}

const getPokemonByWeakness = (req, res) => {
  let results = pokedex;

  results = results.filter((pokemon) => pokemon.weaknesses.includes(req.query.weaknesses));
  
  return res.render('index', {
    search4: results,
  });
}

const addPokemon = (req,res) => {
  const newIndex = pokedex.length + 1;
  const newString = newIndex.toString();
  let newName = req.body.name.toLowerCase();
  newName = newName.charAt(0).toUpperCase() + newName.slice(1);

  const newPokemon = {
    id: newIndex,
    num: newString,
    name: newName,
    img: null,
    type: null,
    height: null,
    weight: null,
    weaknesses: null,
  }

  pokedex.push(newPokemon);

  const filePath = `${__dirname}/../../data/pokedex.json`;
  fs.writeFileSync(filePath, JSON.stringify(pokedex, null, 2), 'utf8');

  return res.render('index', {
    pokemon1: newPokemon,
  });
}

const removePokemon = (req, res) => {
  let newID = req.body.id;
  let updatedPokedex;

  if(newID){
    const pokemonId = parseInt(newID, 10);
    updatedPokedex = pokedex.filter((pokemon) => pokemon.id !== pokemonId);
  }

  const pokedexPath = path.resolve(`${__dirname}/../../data/pokedex.json`);
  fs.writeFileSync(pokedexPath, JSON.stringify(updatedPokedex, null, 2));

  pokedex = updatedPokedex;

  return res.render('index', {
    pokemon2: updatedPokedex,
  });
}

const getData = (req, res) => {
    res.json(pokedex);
};

const notFound = (req, res) => {
    res.status(404).render('notFound', {
      page: req.url,
    });
};

module.exports = {
    getIndex,
    getPokemonByID,
    getPokemonByName,
    getPokemonByType,
    getPokemonByWeakness,
    addPokemon,
    removePokemon,
    notFound,
    getData,
};