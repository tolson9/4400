var mysql = require('mysql');

var con = mysql.createConnection({
  	/*host: "academic-mysql.cc.gatech.edu",
	user: "cs4400_team_35",
	password: "wGEwFeGc",
	//database: "cs4400_team_35"*/
	host: "127.0.0.1",
	user: "root",
	password: "root",
	database: "testdb"

});

var express = require('express');

var app = express();

app.get('/query', function(request, response){
	console.log(request.query.statement);

	con.connect(function(err){
		if(err) {
			console.log(err);

			throw err;
		} else {
			con.query(request.query.statement, function(err, result) {
				if(err){
					console.log(err);
					throw err;
				}
				else {
					console.log(result);
					response.jsonp(result);
				}
			});
		}
	});
});

app.listen(3000);