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
		var sql = "Select *, (Select Count(*) From VISIT AS V Where P.PropID = V.PropID) AS Visits, (Select AVG(VI.Rating) From VISIT AS VI Where P.PropID = VI.PropID) AS AvgRating From PROPERTY AS P Where ApprovedBy IS NOT NULL";
		
		query(sql,function(result){
				//alert(JSON.stringify(result));
					if(result.length == 0) {
 				 		alert("No Properties");
				 	} else {
				 		$.each(result, function(index, row) {
				 			$('#table-body').append(
				 				"<tr class='table-result'>" +
									"<td>" +
										row.PROPNAME +
									"</td>" + 
									"<td>" +
										row.STADDRESS +
									"</td>" +
									"<td>" +
										row.CITY +
									"</td>" +
									"<td>" +
										row.ZIP +
									"</td>" + 
									"<td>" +
										row.SIZEACRES + 
									"</td>" +
									"<td>" +
										row.PROPTYPE + 
									"</td>" +
									"<td>" +
										row.ISPUBLIC.data +
									"</td>" + 
									"<td>" +
										row.ISCOMMERCIAL.data +
									"</td>" +
									"<td class='propid'>" +
										row.PROPID +
									"</td>" +
									"<td>" + 
										row.Visits + 
									"</td>" +
									"<td>" + 
										row.AvgRating +
									"</td>" +
								"</tr>"
				 				);
				 		});
				 		
					}
			});
	}

	$('body').on('click','.table-result',function(){
		//show detail view
		$('#table-area').removeClass('col-sm-12');
		$('#table-area').addClass('col-sm-8');
		$('#detail-area').removeClass('hidden');

		//populate detail view
		var propid = $(this).find('.propid').html();
		var sql = "Select *,(Select Count(*) From VISIT AS V Where P.PropID = V.PropID) AS Visits, (Select AVG(VI.Rating) From VISIT AS VI Where P.PropID = VI.PropID) AS AvgRating From PROPERTY AS P Where PropID = '" + propid +"'";

		query(sql, function(result) {
			if(result.length > 0) {
				$("#detail-area").html(
					"<div id='propid-tag' class='hidden'>"+result[0].PROPID+"</div>" +
					"<div class='row'>" +
						"<table class='table table-striped'>" +
							"<thead>" +
								"<tr><th>Detailed View</th></tr>" +
							"</thead>" +
							"<tbody>" +
								"<tr><td>Name:"+ result[0].PROPNAME +"</td></tr>" + 
								"<tr><td>Owner:"+ result[0].OWNEDBY +"</td></tr>" +
								"<tr><td>Visits:"+ result[0].Visits +"</td></tr>" +
								"<tr><td>Address:"+ result[0].STADDRESS +"</td></tr>" +
								"<tr><td>City:"+ result[0].CITY +"</td></tr>" +
								"<tr><td>Zip:"+ result[0].ZIP +"</td></tr>" +
								"<tr><td>Size:"+ result[0].SIZEACRES +"</td></tr>" +
								"<tr><td>Avg. Rating:"+ result[0].AvgRating +"</td></tr>" +
								"<tr><td>Type:"+ result[0].PROPTYPE +"</td></tr>" +
								"<tr><td>Public:"+ result[0].ISPUBLIC.data +"</td></tr>" +
								"<tr><td>Comercial:"+ result[0].ISCOMMERCIAL.data +"</td></tr>" +
								"<tr><td>ID:"+ result[0].PROPID +"</td></tr>"
				);
				sql = "Select PC.ItemName, PI.Itemtype " +
					"From PROPERTYCONTAINS AS PC, PROPERTYITEM AS PI " +
					"Where PC.PropID = '" + propid + "' AND PC.ItemName = PI.ItemName";

				query(sql, function(result) {
					if(result) {
						$("#detail-area").append("<tr><td>Crops: ");
						$.each(result, function(index, element){
							if(element.Itemtype == "CROP") {
								$("#detail-area").append(element.ItemName +", ");
							}
						});
						$("#detail-area").append("</tr></td><tr><td>Animals: ");
						$.each(result, function(index, element){
							if(element.Itemtype == "ANIMAL") {
								$("#detail-area").append(element.ItemName +", ");
							}
						});
						$("#detail-area").append("</tr></td>");
					}
				});

				query(sql, function(result) {
					if(result) {

					}
				});
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
					"</div>"
				);
			}
		});

	});

});