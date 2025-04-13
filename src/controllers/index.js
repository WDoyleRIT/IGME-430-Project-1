const { text } = require('body-parser');
const fs = require('fs');
const { get } = require('http');

const pokedex = JSON.parse(fs.readFileSync(`${__dirname}/../../data/pokedex.json`));

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

console.log(results);

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
    notFound,
    getData,
};