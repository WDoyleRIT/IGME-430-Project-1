const controllers = require('./controllers');

const router = (app) => {
    app.get('/', controllers.getIndex);

    app.get('/getPokemonById', controllers.getPokemonByID);
    app.get('/getPokemonByName', controllers.getPokemonByName);
    app.get('/getPokemonByType', controllers.getPokemonByType);
    app.get('/getPokemonByWeakness', controllers.getPokemonByWeakness);
    app.get('/getData', controllers.getData);

    app.post('/addPokemon', controllers.addPokemon);
    app.post('/removePokemon', controllers.removePokemon);

};
  
module.exports = router;