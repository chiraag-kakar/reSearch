const app = require('./app');

app.listen(app.get('PORT'), () => {
    console.log('Server is running at ' + app.get('PORT'));
});