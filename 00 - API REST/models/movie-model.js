'use strict'

var conn = require('./movie-connection'),
	MovieModel = () => {}

MovieModel.getAll = (cb) => conn.query('SELECT * FROM movie', cb)

MovieModel.getOne = (id, cb) => conn.query('SELECT * FROM movie WHERE id = ?', id, cb)

//MovieModel.insert = (data, cb) => conn.query('INSERT INTO movie SET ?', data, cb)

//MovieModel.update = (data, cb) => conn.query('UPDATE movie SET ? WHERE movie_id = ?', [data, data.movie_id], cb)

MovieModel.save = (data, cb) => {
	try{
		if(data.id){
			conn.query('SELECT * FROM movie WHERE id = ?', data.id, (err, rows) => {
				// console.log(`Número de registros: ${rows.length}`)
				if(err){ throw err }
				return conn.query('UPDATE movie SET ? WHERE id = ?', [data, data.id], cb)
			})
		} else {
			conn.query('INSERT INTO movie SET ?', data, (err, rows) => {
				if(err) { throw err }
			});
		}
	} catch(err) {
		console.error(err);
	}
}

MovieModel.delete = (id, cb) => conn.query('DELETE FROM movie WHERE id = ?', id, cb)

module.exports = MovieModel