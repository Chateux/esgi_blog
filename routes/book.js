const express = require('express');
const { pool } = require('../config/db');

const router = express.Router();

// Get all data
router.get('/', (request, response) => {
	pool.query('SELECT * FROM Livres ORDER BY Titre', (error, result) => {
		if(error) {
			throw new Error('Error request');
		} else {
			response.status(200).json(result.rows);
		}
	});
});

// Get all data by ID
router.get('/:id', (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('SELECT * FROM Livres WHERE Livre_ID = $1', [id], (error, result) => {
		if(error) {
			throw new Error('Error request');
		} else {
			response.status(200).json(result.rows);
		}
	});
});

// Post data
router.post('/',  (request, response) => { 
	const { titre, auteur, commentaires } = request.body;

	pool.query('INSERT INTO Livres (Titre, Auteur, Commentaires) VALUES ($1, $2, $3)', [titre, auteur, commentaires] , error => {
		if(error) {	
			response.status(400).json({status: 'error', message: 'Remplire tous les champs'});
		} else {
			response.status(201).json({status: 'success', message: 'Livre ajouté.'});
		}
	});
});


// Delete data by ID
router.delete('/:id', (request, response) => {
	const id = parseInt(request.params.id);

	pool.query('DELETE FROM Livres WHERE Livre_ID = $1', [id], error => {
		if(error) {
			response.status(400).json({status: 'error', message: 'No'});
		} else {
			response.status(201).json({status: 'success', message: 'Livre supprimé.'});
		}
	});
});

// Edit data by ID
router.put('/:id', (request, response) => {
	const id = parseInt(request.params.id);
	const { titre, auteur, commentaires } = request.body;

	pool.query('UPDATE Livres SET Titre = $1, Auteur = $2, Commentaires = $3 WHERE Livre_ID = $4', [titre, auteur, commentaires, id], error => {
			if(error) {
				response.status(400).json({status: 'error', message: 'No'});
			} else {
				response.status(201).json({status: 'success', message: 'Livre edité.'});
			}
	});

});


module.exports = router;