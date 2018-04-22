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



$(function() {
	//document has loaded
	//alert(document.cookie);
	var username = document.cookie
	$('#name').html(username);

	if(username) {
		//query database and get all 
		var sql = "Select *, (Select Count(*) From VISIT AS V Where P.PropID = V.PropID) AS Visits, (Select AVG(VI.Rating) From VISIT AS VI Where P.PropID = VI.PropID) AS AvgRating From PROPERTY AS P Where ApprovedBy != NULL";
		
		query(sql,function(result){
				//alert(JSON.stringify(result));
					if(result.length == 0) {
				 		//incorrect password
				 		alert("No Properties");
				 	} else {

				 		$.each(result, function(index, row) {
				 			$('#table-body').append("<a class='table-result'><tr>");
				 			$.each(row, function(key, col) {
				 				if(key = "PROPID") {
				 					$('#table-body').append("<td class='propid'>"+ col +"</td>");
				 				}
				 				$('#table-body').append("<td>"+ col +"</td>");
				 			});
				 			$('#table-body').append("</tr></a>");
				 		});
				 		
					}
			});
	}

	$('.table-result').click(function(){
		//show detail view
		$('#table-area').removeClass('col-sm-12');
		$('#table-area').addClass('col-sm-8');
		$('#detail-area').removeClass('hidden');

		//populate detail view
		var propid = $(this).find('.propid').val();
		var sql = "Select * From PROPERTY Where PropID = '" + propid +"'";

		query(sql, function(result) {
			if(result.length > 0) {
				$(this).html = 
					"<div id='propid-tag' class='hidden'>"+result[0]+"</div>" +
					"<div class='row'>" +
						"<table class='table table-striped'>" +
							"<thead>" +
								"<tr><th>Detailed View</th></tr>" +
							"</thead>" +
							"<tbody>" +
								"<tr><td>Name:"+ result[0] +"</td></tr>" + 
								"<tr><td>Owner:"+ result[0] +"</td></tr>" +
								"<tr><td>Visits:"+ result[0] +"</td></tr>" +
								"<tr><td>Address:"+ result[0] +"</td></tr>" +
								"<tr><td>City:"+ result[0] +"</td></tr>" +
								"<tr><td>Zip:"+ result[0] +"</td></tr>" +
								"<tr><td>Size:"+ result[0] +"</td></tr>" +
								"<tr><td>Avg. Rating:"+ result[0] +"</td></tr>" +
								"<tr><td>Type:"+ result[0] +"</td></tr>" +
								"<tr><td>Public:"+ result[0] +"</td></tr>" +
								"<tr><td>Comercial:"+ result[0] +"</td></tr>" +
								"<tr><td>ID:"+ result[0] +"</td></tr>" +

								"<tr><td>Crops:</td></tr>" +
								"<tr><td>Animal:</td></tr>" +
								"<tr>" +
									"<td>" + 
										"<div class='form-group'>" +
											"<label for='rating'>Rate Visit</label>" +
											"<select class='form-control' id='rating'>" +
												"<option>1 Star</option>" +
												"<option>2 Star</option>" +
												"<option>3 Star</option>" +
												"<option>4 Star</option>" +
												"<option>5 Star</option>" +
											"</select>" +
										"</div>" +
										"<a href='#' class='btn btn-primary' id='logvisit'>Log Visit</a>" +
									"</td>" +
								"</tr>" +
							"</tbody>" +
						"</table>" +
					"</div>";
			}
		});

	});

});