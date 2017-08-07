const express = require('express');  //zaladowanie biblioteki
const hbs = require('hbs');
const fs = require('fs');

var app = express();  //tworzenie aplikacji po przez wywolanie express jako funkcji

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs'); //app.set(key, value). dodanie do express konfiguracji

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err){
			console.log('unable to append to server.log');
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public')); //sciezka absolutna do folderu ktory chce zaserwowac

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
}); //hbs.registerHelper(helperName,function)

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/maintenance', (req, res) => {
	res.render('maintenance.hbs');
});

app.get('/',(req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		body: 'Welecome',
	});
});

app.get('/about',(req, res) => { // app.get(podstrona,funkcja)
	res.render('about.hbs', {  //res.render(strona.hbs,przekazanie zmiennych)
		pageTitle: 'About Page',
	});  //renderowanie przy uzyciu handlebars
});

app.get('/bad',(req, res) => {
	res.send({
		errorMessage: 'unable to handle request' // Przekazanie danych w JSON
	});
});

app.listen(3000, () => { //app.listen(port,wywolanie funkcji)
	console.log('server is up on port 3000') //odp. do cmd po odpaleniu serwera
}); // wlaczenie nasluchu dla portu 3000, odpala serwer