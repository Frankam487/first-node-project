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
//ce bout de code permet de recuperer les donnees du formulaire(indispensables pour les formulaires)
app.use(express.urlencoded({ extended: false }));
//definition du middleware
app.use(myconnection(mysql, optionBd, 'pool'))

//definition du moteur d'affichage
app.set('view engine', 'ejs');
app.set('views', 'IHM');

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
app.delete('/node/:id', (req, res) => { 
  let id = req.params.id;
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query('DELETE FROM node WHERE id = ?', [id], (err, resultat) => {
        if (err) {
          console.log(err);
        } else {
          res.status(300).json({routeRacine: './'});
        }
      })
    }
  });
})
app.post('/node', (req, res) => {
  let id = req.body.id === "" ? null : req.body.id;
  let titre = req.body.titre;
  let description = req.body.description;

let reqSQL = id === null ? "INSERT INTO node(id, titre, description)VALUES(?, ?, ?)" : "UPDATE node SET titre = ?, description = ? WHERE id = ?";

  
  let donnees = id === null ? [null, titre, description] : [titre, description, id];
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        reqSQL,
        donnees, (err, resultat) => {
        if (err) {
          console.log(err);
        } else {
          res.status(300).redirect('./');
        }
      })
    }
  });
});

app.get('/about', (req, res) => {
  const hour = new Date().toLocaleDateString("fr-FR", {
    hour: 'numeric',
    minute: '2-digit',
    second: 'numeric'
  });
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