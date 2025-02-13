const express = require('express');

const app = express();
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const connection = require('express-myconnection');

const optionBd = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'node_bd'
};
//extraction des donnees du formulaire
app.use(express.urlencoded({ extended: false }));
//definition du middleware
app.use(myconnection(mysql, optionBd, 'pool'))

//definition du moteur d'affichage
app.set('view engine', 'ejs');
app.set('views', 'IHM')

app.get('/', (req, res) => {

  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query('SELECT * FROM node', [], (err, resultat) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).render('index', { resultat })
        }
      })
    }
  });
});

app.post('/node', (req, res) => {
console.log(req.body);
})

app.get('/about', (req, res) => {
  const hour = new Date().toLocaleDateString("fr-FR", {
    hour: 'numeric',
    minute: '2-digit',
    second: 'numeric'
  })
  res.status(200).render('about', {hour});
});
app.get('*', (req, res) => {
  res.status(404).render('notFound');
});

app.listen(3001, () => {
  console.log('attente de requete qu port 3001');
});

//cours 10 
//19: 41