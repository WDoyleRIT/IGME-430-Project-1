const controllers = require('./controllers');

const router = (app) => {
    app.get('/', controllers.getIndex);

    app.get('/getPokemonById', controllers.getPokemonByID);
    app.get('/getPokemonByName', controllers.getPokemonByName);
    app.get('/getPokemonByType', controllers.getPokemonByType);
    app.get('/getPokemonByWeakness', controllers.getPokemonByWeakness);
    app.get('/getData', controllers.getData);
  
    // V This doesn't work anymore lol!
    //app.get('/*', controllers.notFound);
};
  
module.exports = router;