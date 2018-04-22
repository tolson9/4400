function query(sql, callback) {
	$.ajax({
		url:"http://localhost:3000/query",
		data: {statement: sql},
		dataType: "jsonp",
		//headers: {'Access-Control-Allow-Origin': *},
		//crossDomain: true,
		
	}).done(function(result){
		callback(result);
	});
}

function insert(sql) {
	$.ajax({
		url:"http://localhost:3000/query",
		data: {statement: sql},
		dataType: "jsonp"
	});
}

$(function() {
	//document has loaded
	//alert(document.cookie);
	$('#submit').click(function() {
		var email = $('#email').val();
		var name = $('#name').val();
		var password = $('#password').val();
		var checkpass = $('#passwordcheck').val();

		if(email.length && name && password && checkpass) {
			if(password == checkpass) {
				//query database and get all 
				var sql = "Insert Into USER (Username, Email, Password, Usertype) " +
				"Values (\'" + name + "\',\'" + email + "\', \'" + password + "\', \'Visitor\')";
				
				insert(sql);

				document.cookie = name;
				document.location = "/visitor/visitorhome.html";
			} else {
				alert("password and check password must match");
			}
		} else {
			alert("error");
		}
	});

});