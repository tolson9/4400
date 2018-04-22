$(function() {
	//document has loaded

	//clear cookies
	document.cookie = "";

	//user tries to log in
	$('#submit').click(function () {
		var email = $("#email").val();
		var password = $('#password').val();

		if(email && password) {
			var sql = "select * from USER where Email=\'" + email 
			+ "\' and Password=\'" + password+"\'";


			$.ajax({
				url:"http://localhost:3000/query",
				data: {statement: sql},
				dataType: "jsonp",
				//headers: {'Access-Control-Allow-Origin': *},
				//crossDomain: true,
				
			}).done(function(result){
				//alert(JSON.stringify(result));
					if(result.length == 0) {
				 		//incorrect password
				 		//alert("Incorrect Username or Password");
				 	} else {
				 		document.cookie = result[0].USERNAME;

				 		var type = result[0].USERTYPE;
				 		
				 		if(type == "ADMIN"){
				 			document.location = "/admin/adminhome.html";
				 		} else if(type == "VISITOR") {
				 			document.location = "/visitor/visitorhome.html";
				 		} else {
				 			document.location = "/owner/ownerhome.html";
				 		}
					}
			});

			/*$.get("http://localhost:3000/query", { statement: sql} ).done(
				function(result){
					if(result.length == 0) {
				 		//incorrect password
				 		//alert("Incorrect Username or Password");
				 	} else {
				 		var cookie = "username=" + result[0].username;
				 		document.cookie = cookie;

				 		var type = result[0].type;

				 		if(type == "Admin"){
				 			document.location = "adminhome.html";
				 		} else if(type == "Visitor") {
				 			document.location = "visitorhome.html";
				 		} else {
				 			document.location = "ownerhome.html";
				 		}
					}
				});*/
			
		} else {
			alert("You must enter a username and password");
		}
	});
});