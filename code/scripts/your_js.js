
/**
 * The main function to be run on start up
 */
function widget_load_init() {
	//console.log("Hello world");

	/*$(document).ready(function() {
		$("tabs").tabs();
	});*/

	/*$(function() {
		$( "#tabs" ).tabs();
	});*/


	/*var user = document.createElement( 'p' );
	user.innerHTML = "Hello, " + PORTAL_CLIENT.getName() + ", " + 
PORTAL_CLIENT.getUsername();
	document.getElementById("idtest").appendChild( user );*/

	//add logo and link to home page in the center of the header
	var center = document.getElementById( 'center' );
	var logo = document.createElement( 'a' );
	logo.setAttribute("href", "javascript:show_home()");
	var logo_img = document.createElement( 'img' );
	logo_img.setAttribute("src", "images/logo1_trans.png");
	logo.appendChild( logo_img );
	center.innerHTML = "";
	center.appendChild( logo );

} // function widget_load_init()


function submit_buzz() {
	var form = document.forms['addbuzz'];
	var data = new Object();
	data.title = form['title'].value;
	data.creator = PORTAL_CLIENT.getUsername();
	data.creatorname = PORTAL_CLIENT.getName();
	data.location = form['location'].value;
	//hardcoded for now, could possible pull from GT Places
	data.longitude = '32.324252';
	//hardcoded
	data.latitude = '21.032421';
	data.start_time = form['start_time'].value;
	data.end_time = form['end_time'].value;
	data.details = form['details'].value;

	var dataString = $.toJSON(data);
	//alert(dataString);
	$.post('http://128.61.52.180/buzzit/addBuzz.php', {buzz: dataString});
	alert("Submitted!");
} //function submit_buzz();


function show_buzzes()
{
	//alert("Will show buzzes soon! (hopefully!)");
	
	//id = showbuzzes

	//Make ajax call and get all buzzes
	var url = "http://128.61.52.180/buzzit/getBuzz.php";


	$.getJSON(url, function(data) {
		var buzzes = data.buzzes;

		var buzzlist = document.getElementById('buzzlist');
		var br = document.createElement( "br" );

		buzzlist.innerHTML = "";


		var count = 0;

		for (var obj in buzzes)
		{
			var b = buzzes[obj].buzz;			
			//alert(b.title);

			

			var h3 = document.createElement( "h3" );

			var h3_a = document.createElement( "a" );

			var h3_a_div = document.createElement( "div" );
			h3_a_div.innerHTML = b.creatorname + " - " + 
b.title;

			h3_a.appendChild( h3_a_div );
			h3.appendChild( h3_a );


			var acc_div = document.createElement( "div" );

			//acc_div.appendChild( br );
			//acc_div.appendChild( br );

			acc_div.innerHTML = b.creatorname + "<br />" +
				b.title + "<br />" +
				b.location + "<br />" +
				b.start_time + "<br />" +
				b.end_time + "<br />" +
				b.details + "<br /><br /><br /><hr />";
			

			buzzlist.appendChild( h3 );
			buzzlist.appendChild( acc_div );

			

			count++;
		}


		$(document).ready(function() {
	$("#buzzlist").accordion({ autoHeight: false, collapsible: true, active: false });
});

	});//getJSON function

} //function show_buzzes()

function ontxtchange()
{

}//function ontxtchange()

function placeholder()
{
	alert("placeholder function!");
}

function show_thebuzz()
{
	$("#homeScreen").hide();
	
	var content = document.getElementById("content");
	content.innerHTML = "Hello Content!";
	content.setAttribute("style", "color: white;");
}

function show_home()
{
	$("#content").hide();
	$("#homeScreen").show();
}
