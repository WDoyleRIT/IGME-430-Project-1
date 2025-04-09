const fs = require('fs');

const pokedex = JSON.parse(fs.readFileSync(`${__dirname}/../../data/pokedex.json`));

const getIndex = (req, res) => {
    res.render('index');
};

const getPokemon = (req, res) => {
    let results = pokedex;
  
    if (req.query.id) {
      const id = parseInt(req.query.id, 10);
      results = results.filter((pokemon) => pokemon.id === id);
    }

    if (req.query.name) {
      const lowerName = req.query.name.toLowerCase();
      results = results.filter((pokemon) => pokemon.name.toLowerCase().includes(lowerName));
    }
  
    if (req.query.type) {
      results = results.filter((pokemon) => pokemon.type.includes(req.query.type));
    }

    res.json(results)
};

const getData = (req, res) => {
    res.json(pokedex.filter((x) => x.title.toLowerCase() === 'Pokemon'));
};

const notFound = (req, res) => {
    res.status(404).render('notFound', {
      page: req.url,
    });
};

module.exports = {
    getIndex,
    getPokemon,
    notFound,
    getData,
};