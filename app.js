const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1998supre',
    database: 'tecsup'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.post('/login', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    const query = 'SELECT * FROM paciente WHERE login = ? AND password = ?';
    db.query(query, [login, password], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.redirect('/');
        } else {
            res.send(`
                <h1>Datos incorrectos</h1>
                <a href="http://localhost:3000/login">Volver al login</a>
            `);
        }
    });
});
app.get('/', (req, res) => {
    res.send('Mantenimiento de pacientes - Pregunta 1');
});
app.get('/paciente', (req, res) => {
    const query = 'SELECT * FROM paciente';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});
app.post('/paciente', (req, res) => {
    const paciente = {
        login: req.body.login,
        password: req.body.password,
        apellidos: req.body.apellidos,
        nombres: req.body.nombres,
        movil: req.body.movil,
        correo: req.body.correo,
        direccion: req.body.direccion
    };
    const query = 'INSERT INTO paciente SET ?';
    db.query(query, paciente, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});
app.post('/eliminar/:id', (req, res) => {
    const idpaciente = req.params.id;
    const query = 'DELETE FROM paciente WHERE idpaciente = ?';
    db.query(query, idpaciente, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});
app.post('/actualizar/:id', (req, res) => {
    const idpaciente = req.params.id;
    const pacienteActualizado = {
        login: req.body.login,
        password: req.body.password,
        apellidos: req.body.apellidos,
        nombres: req.body.nombres,
        movil: req.body.movil,
        correo: req.body.correo,
        direccion: req.body.direccion
    };
    const query = 'UPDATE paciente SET ? WHERE idpaciente = ?';
    db.query(query, [pacienteActualizado, idpaciente], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});
app.post('/actualizar/:id', (req, res) => {
    const idpaciente = req.params.id;
    const pacienteActualizado = {
        login: req.body.login,
        password: req.body.password,
        apellidos: req.body.apellidos,
        nombres: req.body.nombres,
        movil: req.body.movil,
        correo: req.body.correo,
        direccion: req.body.direccion
    };
    const query = 'UPDATE paciente SET ? WHERE idpaciente = ?';
    db.query(query, [pacienteActualizado, idpaciente], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
