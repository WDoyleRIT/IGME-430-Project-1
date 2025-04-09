const controllers = require('./controllers');

const router = (app) => {
    app.get('/', controllers.getIndex);

    app.get('/getPokemon', controllers.getPokemon);
    app.get('/getData', controllers.getData);
  
    // V This doesn't work anymore lol!
    //app.get('/*', controllers.notFound);
};
  
module.exports = router;