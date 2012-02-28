//Variables
var lat = "";
var lon = "";
var places = "";
var loc = "";
var placematches = [];
var gdetails = "";
var glat = "";
var glon = "";
var gloc = "";


/**
 * The main function to be run on start up
 */
function widget_load_init() {
	//add logo and link to home page in the center of the header
	var center = document.getElementById( 'center' );
	var logo = document.createElement( 'a' );
	//logo.setAttribute("href", "#foo");
	logo.setAttribute("id", "logo");
	var logo_img = document.createElement( 'img' );
	//logo_img.setAttribute("src", "images/logo1_trans.png");
	//This started redirecting to m.cip.gatech.edu/images with jqueryMobile
	logo_img.setAttribute("src", "http://m.cip.gatech.edu/~buzzit/base_widget/images/logo1_trans.png");	
	logo.appendChild( logo_img );
	center.innerHTML = "";
	center.appendChild( logo );

	$("#thebuzz").bind("pageshow", function() {
		//placeholder();

		//Add home button in top left header
		$("#portal_header #left a img").attr("src", "http://m.cip.gatech.edu/~buzzit/base_widget/images/Home.png");

		$("#portal_header #left a").attr("href", "fportal.php");
		//$("#portal_header #left a").attr("data-transition", "slideup");
		//$("#portal_header #left a").attr("data-rel", "back");
		//$("#portal_header #left a").attr("data-direction", "reverse");

		/*$("#portal_header #left a").click(function() {
		//window.location='http://m.cip.gatech.edu/fportal.php?k=buzzit/base_widget/index.xml';
		//$.mobile.changePage("#thebuzz", "slideup");
		return false;
		});*/


		loadbuzzlist();
	});

	$("#find_place").bind("pageshow", function() {
		findplace();
	});

	$("#match_loc").bind("pageshow", function() {
		matchloc();
	});

	$("#match_loc").bind("pagecreate", function() {
		matchloc();
	});

// SHU_ADD
	$("#favorites").bind("pageshow", function() {
		load_favs();
	});


	//This is for when returning from maps!!!
	if ($.mobile.activePage.attr("id") == "thebuzz")
	{
		//Add home button in top left header
		$("#portal_header #left a img").attr("src", "http://m.cip.gatech.edu/~buzzit/base_widget/images/Home.png");

		$("#portal_header #left a").attr("href", "fportal.php");
		//$("#portal_header #left a").attr("data-transition", "slideup");
		//$("#portal_header #left a").attr("data-rel", "back");
		//$("#portal_header #left a").attr("data-direction", "reverse");

		/*$("#portal_header #left a").click(function() {
		//window.location='http://m.cip.gatech.edu/fportal.php?k=buzzit/base_widget/index.xml';
		//$.mobile.changePage("#thebuzz", "slideup");
		return false;
		});*/


		loadbuzzlist();
	}

	logolink();

	//Initially populate library.buildings.
	library.getBuildingData();

	//$('.ui-select a').attr('href','JavaScript:void()');
	$('.ui-btn-text a').attr('href','JavaScript:void()');

} // function widget_load_init()

function placeholder()
{
	alert("placeholder function!");
}


function logolink()
{
	var logo = document.getElementById( 'logo');
	logo.setAttribute("href", "#mainpage");
	//logo.setAttribute("href", "javascript:window.location='http://m.cip.gatech.edu/fportal.php?k=buzzit/base_widget/index.xml'");
	//logo.setAttribute("href", "javascript:$.mobile.changePage($('#mainpage'), 'slide', false, false)");
	logo.setAttribute("data-transition", "slide");
	logo.setAttribute("data-back", "true");
	//logo.setAttribute("onclick", "nologolink()");
}

function nologolink()
{
	var logo = document.getElementById( 'logo' );
	logo.removeAttribute( "href" );
	//logo.removeAttribute( "onclick" );
}
/**
 * Yakira Bristol
 * Called by the search in my buzz
 */
function ontxtchange(element) 
{
	//var searchTerm = document.getElementById("bsearch").value;
	//var searchTerm = $('#advsettings').find('input[id=bsearch]').value;
	var searchTerm = element.value;

	
	//clearTimeout(searchTimer);
	//searchTimer = setTimeout(function() {searchBuzz(searchTerm);}, 400);
	searchBuzz(searchTerm);
	
};
/**
 * Yakira Bristol
 * Called by the search in the buzz
 */
function onbuzztxtchange(element) 
{
	//var searchTerm = document.getElementById("bsearch").value;
	//var searchTerm = $('#thebuzz').find('input[id=bsearch]').value;
	var searchTerm = element.value;

	
	//clearTimeout(searchTimer);
	//searchTimer = setTimeout(function() {searchMainBuzz(searchTerm);}, 400);
	searchTheBuzz(searchTerm);
	
};

/**
 * Yakira Bristol
 * Called by the search on the main landing page
 */
function onmaintxtchange(element) 
{
	//var searchTerm = document.getElementById("bsearch").value;
	//var searchTerm = $('#mainpage').find('input[id=bsearch]').value;
	var searchTerm = element.value;

	
	//clearTimeout(searchTimer);
	//searchTimer = setTimeout(function() {searchMainBuzz(searchTerm);}, 400);
	searchMainBuzz(searchTerm);
	
};

/**
 * Yakira Bristol
 * Gets the results from the searchBuzz.php file and places them in the list on the
 * My Buzz page
 */
function searchBuzz(term){
	var url = "http://m.cip.gatech.edu/~buzzit/yakira_test/searchBuzz.php?bsearch=" + term; 

	//$.post('http://m.cip.gatech.edu/~buzzit/yakira_test/searchBuzz.php', {bsearch: term});	

	$.getJSON(url, function(data){
		var buzzes = data.buzzes;
		var buzzlistresults = document.getElementById('buzzlistresults'); 

		var br = document.createElement( "br" );
		var hr = document.createElement( "hr" );

		//Clear results buzzlist
		buzzlistresults.innerHTML = "";
		/*if ( cell.hasChildNodes() )
		{
			while ( cell.childNodes.length >= 1 )
	    {
				cell.removeChild( cell.firstChild );       
			} 
		}*/



		var count = 0;

		buzzes.reverse();

		for (var obj in buzzes)
		{
			var b = buzzes[obj];			
			//alert(b.title);

			var buzzid = document.createElement( "div" );
			buzzid.setAttribute("style", "display: none;");
			buzzid.setAttribute("class", "buzzid");
			buzzid.innerHTML = b.id;

			//accordion div
			var accdiv = document.createElement( "div" );
			accdiv.setAttribute("data-role", "collapsible");
			accdiv.setAttribute("data-collapsed", "true");			

			var h3 = document.createElement( "h3" );
			h3.innerHTML = b.creatorname + " says, " + b.details.substring(0, 14) + " ...";

			
			/* var buzzup = document.createElement( "a" );
			buzzup.setAttribute("href", "javascript:null()");
			buzzup.setAttribute("data-role", "button");
			buzzup.setAttribute("data-inline", "true");
			buzzup.setAttribute("data-icon", "arrow-u");
			buzzup.setAttribute("data-iconpos", "notext");

			var buzzdown = document.createElement( "a" );
			buzzdown.setAttribute("href", "javascript:null()");
			buzzdown.setAttribute("data-role", "button");
			buzzdown.setAttribute("data-inline", "true");
			buzzdown.setAttribute("data-icon", "arrow-d");
			buzzdown.setAttribute("data-iconpos", "notext"); */

			var favorite = document.createElement( "a" );
			favorite.setAttribute("href", "javascript:null()");
			favorite.setAttribute("data-role", "button");
			favorite.setAttribute("data-inline", "true");
			favorite.setAttribute("data-icon", "star");
			favorite.setAttribute("data-iconpos", "notext");

// SHU_ADD
			// adds to Favorites, dependent on result of favCheck.php
			favorite.setAttribute("onclick", "fav_func('" + b.id + "')");

			var p = document.createElement( "p" );
			p.innerHTML = b.creatorname + " says, <br />" +
				b.details + "<br /><br />" +
				b.timestamp + "<br />";// + 
				//"<br /><hr />";

			var bottomdiv = document.createElement( "div" );
			bottomdiv.setAttribute("style", "float: right");

			var morelink = document.createElement ( "a" );
			morelink.setAttribute("href", "#buzz_page");
			morelink.setAttribute("data-role", "button");
			morelink.setAttribute("data-inline", "true");
			morelink.setAttribute("data-transition", "slide");
			morelink.setAttribute("data-back", "false");
			morelink.setAttribute("onclick", "loadexpandedbuzz( " + b.id + " );");
			//morelink.setAttribute("style", "float: right;");
			morelink.innerHTML = "more";
		
			var maplink = document.createElement ( "a" );
			maplink.setAttribute("href", "#");
			maplink.setAttribute("onclick", "gotomap( 'listbuzz', '" + b.id + "')");
			maplink.setAttribute("data-role", "button");
			maplink.setAttribute("data-inline", "true");
			//maplink.setAttribute("style", "float: right;");
			maplink.innerHTML ="map";

			//p.appendChild( maplink );	
			//p.appendChild( morelink );

			//If a buzz doesn't have a complete location, don't show "MAP" button
			if(b.longitude != "0" && b.latitude != "0")
			{
				bottomdiv.appendChild( maplink );
			}
			bottomdiv.appendChild( morelink );
			//bottomdiv.appendChild( br );
			//bottomdiv.appendChild( br );

			p.appendChild( bottomdiv );


			//p.innerHTML += "<br style='diplay: block; clear: both;'/><hr style='diplay: block; clear: both;' />";
			p.innerHTML += "<hr style='diplay: block; clear: both;' />";

			//p.appendChild( br );
			//p.appendChild( hr );

			accdiv.appendChild( h3 );
			accdiv.appendChild( buzzid );
			//accdiv.appendChild( buzzup );
			//accdiv.appendChild( buzzdown );
			accdiv.appendChild( favorite );
			accdiv.appendChild( p );

			buzzlistresults.appendChild( accdiv );

			count++;
		}


		$('#buzzlistresults').find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});

		$('#buzzlistresults').find('a[data-role=button]').button({theme:'c',refresh:true});

	});
}

/**
 * Yakira Bristol
 * Gets the results from the searchBuzz.php file and places them in the list on the
 * main landing page
 */
function searchMainBuzz(term){
	var url = "http://m.cip.gatech.edu/~buzzit/yakira_test/searchBuzz.php?bsearch=" + term; 

	//$.post('http://m.cip.gatech.edu/~buzzit/yakira_test/searchBuzz.php', {bsearch: term});	

	$.getJSON(url, function(data){
		var buzzes = data.buzzes;
		var mainbuzzlist = document.getElementById('mainbuzzlist'); 

		var br = document.createElement( "br" );
		var hr = document.createElement( "hr" );

		//Clear results buzzlist
		mainbuzzlist.innerHTML = "";
		/*if ( cell.hasChildNodes() )
		{
			while ( cell.childNodes.length >= 1 )
	    {
				cell.removeChild( cell.firstChild );       
			} 
		}*/



		var count = 0;

		buzzes.reverse();

		for (var obj in buzzes)
		{
			var b = buzzes[obj];			
			//alert(b.title);

			var buzzid = document.createElement( "div" );
			buzzid.setAttribute("style", "display: none;");
			buzzid.setAttribute("class", "buzzid");
			buzzid.innerHTML = b.id;

			//accordion div
			var accdiv = document.createElement( "div" );
			accdiv.setAttribute("data-role", "collapsible");
			accdiv.setAttribute("data-collapsed", "true");			

			var h3 = document.createElement( "h3" );
			h3.innerHTML = b.creatorname + " says, " + b.details.substring(0, 14) + " ...";

			
		/*	var buzzup = document.createElement( "a" );
			buzzup.setAttribute("href", "javascript:null()");
			buzzup.setAttribute("data-role", "button");
			buzzup.setAttribute("data-inline", "true");
			buzzup.setAttribute("data-icon", "arrow-u");
			buzzup.setAttribute("data-iconpos", "notext");

			var buzzdown = document.createElement( "a" );
			buzzdown.setAttribute("href", "javascript:null()");
			buzzdown.setAttribute("data-role", "button");
			buzzdown.setAttribute("data-inline", "true");
			buzzdown.setAttribute("data-icon", "arrow-d");
			buzzdown.setAttribute("data-iconpos", "notext"); */

			var favorite = document.createElement( "a" );
			favorite.setAttribute("href", "javascript:null()");
			favorite.setAttribute("data-role", "button");
			favorite.setAttribute("data-inline", "true");
			favorite.setAttribute("data-icon", "star");
			favorite.setAttribute("data-iconpos", "notext");
// SHU_ADD
			// adds to Favorites, dependent on result of favCheck.php
			favorite.setAttribute("onclick", "fav_func('" + b.id + "')");


			var p = document.createElement( "p" );
			p.innerHTML = b.creatorname + " says, <br />" +
				b.details + "<br /><br />" +
				b.timestamp + "<br />";// + 
				//"<br /><hr />";

			var bottomdiv = document.createElement( "div" );
			bottomdiv.setAttribute("style", "float: right");

			var morelink = document.createElement ( "a" );
			morelink.setAttribute("href", "#buzz_page");
			morelink.setAttribute("data-role", "button");
			morelink.setAttribute("data-inline", "true");
			morelink.setAttribute("data-transition", "slide");
			morelink.setAttribute("data-back", "false");
			morelink.setAttribute("onclick", "loadexpandedbuzz( " + b.id + " );");
			//morelink.setAttribute("style", "float: right;");
			morelink.innerHTML = "more";
		
			var maplink = document.createElement ( "a" );
			maplink.setAttribute("href", "#");
			maplink.setAttribute("onclick", "gotomap( 'listbuzz', '" + b.id + "')");
			maplink.setAttribute("data-role", "button");
			maplink.setAttribute("data-inline", "true");
			//maplink.setAttribute("style", "float: right;");
			maplink.innerHTML ="map";

			//p.appendChild( maplink );	
			//p.appendChild( morelink );

			//If a buzz doesn't have a complete location, don't show "MAP" button
			if(b.longitude != "0" && b.latitude != "0")
			{
				bottomdiv.appendChild( maplink );
			}
			bottomdiv.appendChild( morelink );
			//bottomdiv.appendChild( br );
			//bottomdiv.appendChild( br );

			p.appendChild( bottomdiv );


			//p.innerHTML += "<br style='diplay: block; clear: both;'/><hr style='diplay: block; clear: both;' />";
			p.innerHTML += "<hr style='diplay: block; clear: both;' />";

			//p.appendChild( br );
			//p.appendChild( hr );

			accdiv.appendChild( h3 );
			accdiv.appendChild( buzzid );
			//accdiv.appendChild( buzzup );
			//accdiv.appendChild( buzzdown );
			accdiv.appendChild( favorite );
			accdiv.appendChild( p );

			mainbuzzlist.appendChild( accdiv );

			count++;
		}


		$('#mainbuzzlist').find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});

		$('#mainbuzzlist').find('a[data-role=button]').button({theme:'c',refresh:true});

	});
}

/**
 * Yakira Bristol
 * Gets the results from the searchBuzz.php file and places them in the list on the
 * The Buzz page
 */
function searchTheBuzz(term){
	var url = "http://m.cip.gatech.edu/~buzzit/yakira_test/searchBuzz.php?bsearch=" + term; 

	//$.post('http://m.cip.gatech.edu/~buzzit/yakira_test/searchBuzz.php', {bsearch: term});	

	$.getJSON(url, function(data){
		var buzzes = data.buzzes;
		var buzzlist = document.getElementById('buzzlist'); 

		var br = document.createElement( "br" );
		var hr = document.createElement( "hr" );

		//Clear results buzzlist
		buzzlist.innerHTML = "";
		/*if ( cell.hasChildNodes() )
		{
			while ( cell.childNodes.length >= 1 )
	    {
				cell.removeChild( cell.firstChild );       
			} 
		}*/



		var count = 0;

		buzzes.reverse();

		for (var obj in buzzes)
		{
			var b = buzzes[obj];			
			//alert(b.title);

			var buzzid = document.createElement( "div" );
			buzzid.setAttribute("style", "display: none;");
			buzzid.setAttribute("class", "buzzid");
			buzzid.innerHTML = b.id;

			//accordion div
			var accdiv = document.createElement( "div" );
			accdiv.setAttribute("data-role", "collapsible");
			accdiv.setAttribute("data-collapsed", "true");			

			var h3 = document.createElement( "h3" );
			h3.innerHTML = b.creatorname + " says, " + b.details.substring(0, 14) + " ...";

			
		/*	var buzzup = document.createElement( "a" );
			buzzup.setAttribute("href", "javascript:null()");
			buzzup.setAttribute("data-role", "button");
			buzzup.setAttribute("data-inline", "true");
			buzzup.setAttribute("data-icon", "arrow-u");
			buzzup.setAttribute("data-iconpos", "notext");

			var buzzdown = document.createElement( "a" );
			buzzdown.setAttribute("href", "javascript:null()");
			buzzdown.setAttribute("data-role", "button");
			buzzdown.setAttribute("data-inline", "true");
			buzzdown.setAttribute("data-icon", "arrow-d");
			buzzdown.setAttribute("data-iconpos", "notext"); */

			var favorite = document.createElement( "a" );
			favorite.setAttribute("href", "javascript:null()");
			favorite.setAttribute("data-role", "button");
			favorite.setAttribute("data-inline", "true");
			favorite.setAttribute("data-icon", "star");
			favorite.setAttribute("data-iconpos", "notext");

// SHU_ADD
			// adds to Favorites, dependent on result of favCheck.php
			favorite.setAttribute("onclick", "fav_func('" + b.id + "')");

			var p = document.createElement( "p" );
			p.innerHTML = b.creatorname + " says, <br />" +
				b.details + "<br /><br />" +
				b.timestamp + "<br />";// + 
				//"<br /><hr />";

			var bottomdiv = document.createElement( "div" );
			bottomdiv.setAttribute("style", "float: right");

			var morelink = document.createElement ( "a" );
			morelink.setAttribute("href", "#buzz_page");
			morelink.setAttribute("data-role", "button");
			morelink.setAttribute("data-inline", "true");
			morelink.setAttribute("data-transition", "slide");
			morelink.setAttribute("data-back", "false");
			morelink.setAttribute("onclick", "loadexpandedbuzz( " + b.id + " );");
			//morelink.setAttribute("style", "float: right;");
			morelink.innerHTML = "more";
		
			var maplink = document.createElement ( "a" );
			maplink.setAttribute("href", "#");
			maplink.setAttribute("onclick", "gotomap( 'listbuzz', '" + b.id + "')");
			maplink.setAttribute("data-role", "button");
			maplink.setAttribute("data-inline", "true");
			//maplink.setAttribute("style", "float: right;");
			maplink.innerHTML ="map";

			//p.appendChild( maplink );	
			//p.appendChild( morelink );

			//If a buzz doesn't have a complete location, don't show "MAP" button
			if(b.longitude != "0" && b.latitude != "0")
			{
				bottomdiv.appendChild( maplink );
			}
			bottomdiv.appendChild( morelink );
			//bottomdiv.appendChild( br );
			//bottomdiv.appendChild( br );

			p.appendChild( bottomdiv );


			//p.innerHTML += "<br style='diplay: block; clear: both;'/><hr style='diplay: block; clear: both;' />";
			p.innerHTML += "<hr style='diplay: block; clear: both;' />";

			//p.appendChild( br );
			//p.appendChild( hr );

			accdiv.appendChild( h3 );
			accdiv.appendChild( buzzid );
			//accdiv.appendChild( buzzup );
			//accdiv.appendChild( buzzdown );
			accdiv.appendChild( favorite );
			accdiv.appendChild( p );

			buzzlist.appendChild( accdiv );

			count++;
		}


		$('#buzzlist').find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});

		$('#buzzlist').find('a[data-role=button]').button({theme:'c',refresh:true});

	});
}


function loadbuzzlist()
{
	//placeholder();
	//Make ajax call and get all buzzes
	//var url = "http://128.61.52.180/buzzit/getBuzz.php";
	var url = "http://m.cip.gatech.edu/~buzzit/base_widget/getBuzz.php";

	//This is the ajax call. It is an ajax/GET call that does NOT send any data to the server. It just hits the .php file and retrieves the data. The data comes back as JSON, but the $.getJSON method automatically changes it to a javascript object as opposed to $.get().
	$.getJSON(url, function(data) {
		var buzzes = data.buzzes;

		//alert(buzzes.buzz.creator);

		var buzzlist = document.getElementById('buzzlist');
		var br = document.createElement( "br" );
		var hr = document.createElement( "hr" );

		//Clear buzzlist
		buzzlist.innerHTML = "";
		/*if ( cell.hasChildNodes() )
		{
			while ( cell.childNodes.length >= 1 )
	    {
				cell.removeChild( cell.firstChild );       
			} 
		}*/



		var count = 0;

		buzzes.reverse();

		for (var obj in buzzes)
		{
			var b = buzzes[obj];			
			//alert(b.title);

			var buzzid = document.createElement( "div" );
			buzzid.setAttribute("style", "display: none;");
			buzzid.setAttribute("class", "buzzid");
			buzzid.innerHTML = b.id;

			//accordion div
			var accdiv = document.createElement( "div" );
			accdiv.setAttribute("data-role", "collapsible");
			accdiv.setAttribute("data-collapsed", "true");			

			var h3 = document.createElement( "h3" );
			h3.innerHTML = b.creatorname + " says, " + b.details.substring(0, 14) + " ...";

			//Buttons
			//<a href="javascript:buzzit()" data-role="button" data-inline="true" style="float: right;" data-transition="slide" data-back="false">Buzz it!</a>

		/*	var buzzup = document.createElement( "a" );
			buzzup.setAttribute("href", "javascript:null()");
			buzzup.setAttribute("data-role", "button");
			buzzup.setAttribute("data-inline", "true");
			buzzup.setAttribute("data-icon", "arrow-u");
			buzzup.setAttribute("data-iconpos", "notext");

			var buzzdown = document.createElement( "a" );
			buzzdown.setAttribute("href", "javascript:null()");
			buzzdown.setAttribute("data-role", "button");
			buzzdown.setAttribute("data-inline", "true");
			buzzdown.setAttribute("data-icon", "arrow-d");
			buzzdown.setAttribute("data-iconpos", "notext"); */

			var favorite = document.createElement( "a" );
			favorite.setAttribute("href", "javascript:null()");
			favorite.setAttribute("data-role", "button");
			favorite.setAttribute("data-inline", "true");
			favorite.setAttribute("data-icon", "star");
			favorite.setAttribute("data-iconpos", "notext");

// SHU_ADD
			// adds to Favorites, dependent on result of favCheck.php
			favorite.setAttribute("onclick", "fav_func('" + b.id + "')");

			var p = document.createElement( "p" );
			p.innerHTML = b.creatorname + " says, <br />" +
				b.details + "<br /><br />" +
				b.timestamp + "<br />";// + 
				//"<br /><hr />";

			var bottomdiv = document.createElement( "div" );
			bottomdiv.setAttribute("style", "float: right");

			var morelink = document.createElement ( "a" );
			morelink.setAttribute("href", "#buzz_page");
			morelink.setAttribute("data-role", "button");
			morelink.setAttribute("data-inline", "true");
			morelink.setAttribute("data-transition", "slide");
			morelink.setAttribute("data-back", "false");
			morelink.setAttribute("onclick", "loadexpandedbuzz( " + b.id + " );");
			//morelink.setAttribute("style", "float: right;");
			morelink.innerHTML = "more";
		
			var maplink = document.createElement ( "a" );
			maplink.setAttribute("href", "#");
			maplink.setAttribute("onclick", "gotomap( 'listbuzz', '" + b.id + "')");
			maplink.setAttribute("data-role", "button");
			maplink.setAttribute("data-inline", "true");
			//maplink.setAttribute("style", "float: right;");
			maplink.innerHTML ="map";

			//p.appendChild( maplink );	
			//p.appendChild( morelink );

			//If a buzz doesn't have a complete location, don't show "MAP" button
			if(b.longitude != "0" && b.latitude != "0")
			{
				bottomdiv.appendChild( maplink );
			}
			bottomdiv.appendChild( morelink );
			//bottomdiv.appendChild( br );
			//bottomdiv.appendChild( br );

			p.appendChild( bottomdiv );


			//p.innerHTML += "<br style='diplay: block; clear: both;'/><hr style='diplay: block; clear: both;' />";
			p.innerHTML += "<hr style='diplay: block; clear: both;' />";

			//p.appendChild( br );
			//p.appendChild( hr );

			accdiv.appendChild( h3 );
			accdiv.appendChild( buzzid );
			//accdiv.appendChild( buzzup );
			//accdiv.appendChild( buzzdown );
			accdiv.appendChild( favorite );
			accdiv.appendChild( p );

			buzzlist.appendChild( accdiv );

			count++;
		}


		$('#buzzlist').find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});

		$('#buzzlist').find('a[data-role=button]').button({theme:'c',refresh:true});

	});//getJSON function


}//function loadbuzzlist()


function buzzit()
{
	//var text = document.getElementById( 'textarea' ).value;
	//var form = document.forms['addbuzz'];
	var data = new Object();
	data.creator = PORTAL_CLIENT.getUsername();
	data.creatorname = PORTAL_CLIENT.getName();
	//data.location = form['location'].value;
	//hardcoded for now, could possible pull from GT Places
	//data.longitude = '32.324252';
	if (lon != "")
	{
		data.longitude = lon;
		lon = "";
	}
	else
	{
		//data.longitude = -84.397513; //center of campus
		data.longitude = "NULL";
	}
	
	//hardcoded
	//data.latitude = '21.032421';
	if (lat != "")
	{
		data.latitude = lat;
		lat = "";
	}
	else
	{
		//data.latitude = 33.777298; //center of campus
		data.latitude = "NULL";
	}
	data.details = document.getElementById( 'textarea' ).value;

	if (loc != "")
	{
		data.location = loc;
		loc = "";
	}
	else
	{
		var textval = document.getElementById( 'textarea' ).value;

		var regexS = "[\\#]([^]*)";
 		var regex = new RegExp( regexS );
  		var results = regex.exec( textval );

		if( results == null )
		{
	    		data.location = "";
		}
	  	else
		{
	    		data.location = results[1];
		

			//HERE I NEED TO DO SOMETHING TO COMPARE #VALUE AGAINST PLACES NAMES AND TAGS + include none of the above option

			library.getBuildingData();

			//Empty placematches
			placematches = [];

			//library.buildings

			for (obj in library.buildings)
			{

				var placeObj = new Object;

				var lib = library.buildings[obj];

				//Check against truncated name
				if (data.location == (lib.name).split(' ').join(''))
				{
					//Add it to the list of possible matches
					placeObj.nombre = lib.name;
					placeObj.latitude = lib.latitude;
					placeObj.longitude = lib.longitude;
					placeObj.location = (placeObj.nombre).split(' ').join('');
					placematches.push(placeObj);
					continue;
				}

				//Check all the tags for this building
				for ( t in lib.tag_list)
				{

					var tag = lib.tag_list[t];

					//The tags have an extra ' before and after
					if ("'" + data.location + "'" == tag)
					{
						//Add it to the list of possible matches
						placeObj.nombre = lib.name;
						placeObj.latitude = lib.latitude;
						placeObj.longitude = lib.longitude;
						placeObj.location = (placeObj.nombre).split(' ').join('');
						placematches.push(placeObj);
						continue;
					}
				}

			}//for (obj in library.buildings[obj]

		//data.location = "";	
		}//else data.location = results[1];

	}//else loc = ""

	if (placematches.length > 0)
	{
		//Call the dialog to choose a possible location
		gdetails = data.details;
		gloc = data.location;
		$.mobile.changePage($('#match_loc'), 'slideup', false, false);
		return;
	}

	//var dataString = $.toJSON(data);
	var dataString = JSON.stringify(data);	
	//alert(dataString);
	$.post('http://m.cip.gatech.edu/~buzzit/base_widget/addBuzz.php', {buzz: dataString});
	alert("Submitted!");


	document.getElementById( 'textarea' ).value = "";

	//reload the buzzlist with our new post
	loadbuzzlist();
}//function buzzit()


function findplace()
{
	//placeholder(); 

	//Add back button in top left header
	$("#portal_header #left a img").attr("src", "http://m.cip.gatech.edu/~buzzit/base_widget/images/back.png");

	$("#portal_header #left a").attr("href", "#");
	//$("#portal_header #left a").attr("data-transition", "slideup");
	//$("#portal_header #left a").attr("data-rel", "back");
	//$("#portal_header #left a").attr("data-direction", "reverse");

	$("#portal_header #left a").click(function() {
		//window.location='http://m.cip.gatech.edu/fportal.php?k=buzzit/base_widget/index.xml';
	$.mobile.changePage("#thebuzz", "slideup");
		return false;
	});

	var url = "gtplaces/gtplaces.php";

	$.getJSON(url, function(data) {

	//$.get(url, function(data) {

		var list = document.getElementById( 'placelist' );
		list.innerHTML = "";

		places = data;

		//alert("In getJSON");
		//alert(data[0].name);
	
		//for (place in data)
		for (var i = 0; i < data.length; i++)
		{
			var li = document.createElement( 'li' );
			var li_a = document.createElement( 'a' );
			li_a.setAttribute("href", "#thebuzz");
			li_a.setAttribute("data-direction", "reverse");
			li.onmouseup = function() { 
				var nombre = this.getElementsByTagName('a')[0].innerHTML;
				document.getElementById( 'textarea' ).value += '#' + nombre;
				//$('#thebuzz').find('div[data-role=fieldcontain]').fieldcontain({refresh:true});

				for (var j = 0; j < places.length; j++)
				{
					//Find this place and grab it's lat/long
					if (nombre == places[j].name)
					{
						lat = places[j].latitude;
						lon = places[j].longitude;
						//Once we get tags, change this to first tag (should be shorter than full name...)
						loc = places[j].name;
						break;
					}
				}

			};//onmouseup function

			li_a.innerHTML = "" + data[i].name;
			//li_a.innerHTML = "" + place.name;

			li.appendChild( li_a );

			list.appendChild( li );

		}

		//$('#find_place').find('ul[data-role=listview]').listview({refresh:true});
		$('#placelist').listview('refresh');
		//$('#placelist').listview({refresh:true});
	
	});//getJSON function

}//function findplace()

function matchloc()
{

	//Add back button in top left header
	$("#portal_header #left a img").attr("src", "http://m.cip.gatech.edu/~buzzit/base_widget/images/back.png");

	$("#portal_header #left a").attr("href", "#");
	//$("#portal_header #left a").attr("data-transition", "slideup");
	//$("#portal_header #left a").attr("data-rel", "back");
	//$("#portal_header #left a").attr("data-direction", "reverse");

	$("#portal_header #left a").click(function() {
		//window.location='http://m.cip.gatech.edu/fportal.php?k=buzzit/base_widget/index.xml';
	$.mobile.changePage("#thebuzz", "slideup");
		return false;
	});

	var list = document.getElementById( 'loclist' );
		list.innerHTML = "";
		//Need to delete all children nodes.
		/*if ( list.hasChildNodes() )
		{
    	while ( list.childNodes.length >= 1 )
    	{
    	    list.removeChild( list.firstChild );       
    	} 
		}*/

	var title = document.createElement( 'p' );
	title.innerHTML = "Did you mean ...";

	list.appendChild( title );



	//for ( var pcount = 0; pcount < placematches.length; pcount++)
	for ( obj in placematches )	
	{

			//pmatch is Object with nombre, latitude, and longitude
			var pmatch = placematches[obj];

			var li = document.createElement( 'li' );
			var li_a = document.createElement( 'a' );
			li_a.setAttribute("href", "#thebuzz");
			//li_a.setAttribute("data-direction", "reverse");

			li.onmouseup = function(pmatch2) { 
				
				//Have to do an anonymous function inside of a function to force it to save a copy of the variable instead of referring to whatever the last instance of the global variable is. Something about forming a closure?
			//http://stackoverflow.com/questions/1203876/how-to-pass-a-variable-by-value-to-an-anonymous-javascript-function

				return function() {

					//post the buzzit!
					var data = new Object();
					data.creator = PORTAL_CLIENT.getUsername();
					data.creatorname = PORTAL_CLIENT.getName();
					data.location = pmatch2.location;
					data.latitude = pmatch2.latitude;
					data.longitude = pmatch2.longitude;
					data.details = gdetails;

					//data.location = placematches[newpcount].location;
					//data.latitude = placematches[newpcount].latitude;
					//data.longitude = placematches[newpcount].longitude;

					var dataString = JSON.stringify(data);

					$.post('http://m.cip.gatech.edu/~buzzit/base_widget/addBuzz.php', {buzz: dataString});
					alert("Submitted!");

					gloc = "";
					gdetails = "";
					loc = "";
					lat = "";
					lon = "";
					placematches = [];
					$("#textarea").attr("value", "");
				};

			}(pmatch);//onmouseup function

			li_a.innerHTML = "" + pmatch.nombre;
			//li_a.innerHTML = "" + place.name;

			li.appendChild( li_a );

			list.appendChild( li );


	}

			var li = document.createElement( 'li' );
			var li_a = document.createElement( 'a' );
			li_a.setAttribute("href", "#thebuzz");
			//li_a.setAttribute("data-direction", "reverse");
			li.onmouseup = function() { 

				gloc = "";
				gdetails = "";

			};//onmouseup function

			li_a.innerHTML = "None of these!";
			//li_a.innerHTML = "" + place.name;

			li.appendChild( li_a );

			list.appendChild( li );
	

	$('#loclist').listview('refresh');

	placematches = [];

}//function matchloc()


function gup( named )
{
  named = named.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+named+"=([^&]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}//function gup()

function gotomap( src, id )
{
	if (src == "thebuzz")
	{
		$.mobile.pageLoading();
		window.location='http://m.cip.gatech.edu/fportal.php?k=buzzit/maps/index.xml&buzz=' + document.getElementById( 'textarea' ).value;
	}
	else if (src == "listbuzz")
	{
		window.location='http://m.cip.gatech.edu/fportal.php?k=buzzit/maps/index.xml&showbuzz=' + id;
	}
	else if (src == "nearbuzz")
	{
		$.mobile.pageLoading();
		window.location='http://m.cip.gatech.edu/fportal.php?k=buzzit/maps/index.xml&nearbuzzes=true';
	}
}//function gotomap()

// SHU_ADD

function fav_func( id )
{
	var username = PORTAL_CLIENT.getUsername();
	$.post('http://m.cip.gatech.edu/~buzzit/base_widget/setFav.php', {buzz_id: id, username: username});
}

function load_favs()
{
	var username = PORTAL_CLIENT.getUsername();
	// pass username into getFav.php
	var url = "http://m.cip.gatech.edu/~buzzit/base_widget/getFav.php?username=" + username;
	$.getJSON(url, function(data)
	//$.getJSON('http://m.cip.gatech.edu/~buzzit/shu_test/getFav.php', {username: username}, function(data)
	{
//		alert(data);

// copy starts
		var buzzes = data.buzzes;

//		alert(buzzes.buzz.creator);

		var buzzlist = document.getElementById('favorites_list');
		var br = document.createElement( "br" );
		var hr = document.createElement( "hr" );

		//Clear buzzlist
		buzzlist.innerHTML = "";

		var count = 0;

		buzzes.reverse();

		for (var obj in buzzes)
		{
			var b = buzzes[obj];			
			//alert(b.title);

			var buzzid = document.createElement( "div" );
			buzzid.setAttribute("style", "display: none;");
			buzzid.setAttribute("class", "buzzid");
			buzzid.innerHTML = b.id;

			//accordion div
			var accdiv = document.createElement( "div" );
			accdiv.setAttribute("data-role", "collapsible");
			accdiv.setAttribute("data-collapsed", "true");			

			var h3 = document.createElement( "h3" );
			h3.innerHTML = b.creatorname + " says, " + b.details.substring(0, 14) + " ...";

			var p = document.createElement( "p" );
			p.innerHTML = b.creatorname + " says, <br />" +
				b.details + "<br /><br />" +
				b.timestamp + "<br />";

			var bottomdiv = document.createElement( "div" );
			bottomdiv.setAttribute("style", "float: right");

			var morelink = document.createElement ( "a" );
			morelink.setAttribute("href", "#buzz_page");
			morelink.setAttribute("data-role", "button");
			morelink.setAttribute("data-inline", "true");
			morelink.setAttribute("data-transition", "slide");
			morelink.setAttribute("data-back", "false");

			morelink.innerHTML = "more";
		
			var maplink = document.createElement ( "a" );
			maplink.setAttribute("href", "#");
			maplink.setAttribute("onclick", "gotomap( 'listbuzz', '" + b.id + "')");
			maplink.setAttribute("data-role", "button");
			maplink.setAttribute("data-inline", "true");

			maplink.innerHTML ="map";

			//If a buzz doesn't have a complete location, don't show "MAP" button
			if(b.longitude != "0" && b.latitude != "0")
			{
				bottomdiv.appendChild( maplink );
			}
			bottomdiv.appendChild( morelink );

			p.appendChild( bottomdiv );

			p.innerHTML += "<hr style='diplay: block; clear: both;' />";

			accdiv.appendChild( h3 );
			accdiv.appendChild( buzzid );
			accdiv.appendChild( p );

			buzzlist.appendChild( accdiv );

			count++;
		}


		$('#favorites_list').find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});

		$('#favorites_list').find('a[data-role=button]').button({theme:'c',refresh:true});


// copy ends

	});
}

function loadexpandedbuzz(bid)
{	
	//alert("loadexpanded:" + bid);
	var url = "http://m.cip.gatech.edu/~buzzit/dea_test/getSoloBuzz.php?buzzid=" + bid;
	
	$.getJSON(url, function(data) 
	{
		var buzz = data.buzz;
		//var b = buzz[object];
		var buzztext = document.getElementById("fullbuzz");
		buzztext.innerHTML ="";
		var br = document.createElement( "br" );
		var hr = document.createElement( "hr" ); 
		var div = document.createElement("div");
		div.setAttribute("data-role", "content");
		
		var h3 = document.createElement("h3");
		h3.innerHTML = buzz.creatorname;
		
		var p = document.createElement( "p" );
		p.setAttribute("id", "textbody");
		p.innerHTML = buzz.details;
		
		var commentslink = document.getElementById("viewbtn");
		commentslink.setAttribute("onclick", "loadcommentlist(" + bid + ");");
		
		buzztext.appendChild(h3);
		buzztext.appendChild(p);
		
	});//getJSON function
}//function loadexpandedbuzz()


function loadcommentlist(bid)
{
	//alert("loadcomment:" + bid);
	var url = "http://m.cip.gatech.edu/~buzzit/dea_test/getComment.php?buzzid=" + bid;
	
	var postbtn = document.getElementById('postbtn');
	postbtn.setAttribute("href", "javascript:postcomment(" + bid + ");");
	
	var commentlist = document.getElementById('commentlist');
	var commentarea = document.getElementById('commentarea');
	commentarea.innerHTML = "";
	commentarea.placeholder = "Leave a comment";
	//commentlist.innerHTML =;
	
	$.getJSON(url, function(data) {
		var comments = data.comments;
		
		//var commentlist = document.getElementById('commentlist');
		//var commentarea = document.getElementById('commentarea');
		//commentarea.innerHTML = "";
		
		commentlist.innerHTML ="";
		
		var count = 0;
		comments.reverse();
		for (var obj in comments)
		{
			var c = comments[obj];
			var commentid = document.createElement("div");
			commentid.setAttribute("style", "display: none;");
			commentid.setAttribute("class", "commentid");
			commentid.innerHTML = c.id;
			
			//accordion div
			var accdiv = document.createElement( "div" );
			accdiv.setAttribute("data-role", "collapsible");
			accdiv.setAttribute("data-collapsed", "true");			

			var h3 = document.createElement( "h3" );
			h3.innerHTML = c.details + "...";	
			//h3.innerHTML = c.details.substring(0, 14) + " ...";		
			
			var p = document.createElement( "p" );
			p.innerHTML = c.details + " <br /><br /> posted by " + c.creatorname + "<br />" + c.timestamp + "<br />";// + 
				//"<br /><hr />";
		
			//p.innerHTML += "<br style='diplay: block; clear: both;'/><hr style='diplay: block; clear: both;' />";
			p.innerHTML += "<hr style='diplay: block; clear: both;' />";
	
			//p.appendChild( br );
			//p.appendChild( hr );
			
			//accdiv.appendChild(post);
			accdiv.appendChild( h3 );
			accdiv.appendChild( p );
			accdiv.appendChild( commentid );
			commentlist.appendChild( accdiv );
			count++;
		}

		$('#commentlist').find('div[data-role=collapsible]').collapsible({theme:'c',refresh:true});

		$('#commentlist').find('a[data-role=button]').button({theme:'c',refresh:true});
	});//getJSON function
}//function loadcommentlist()


function postcomment(bid)
{
	//alert("in postcomment" + bid);
	var data = new Object();
	data.creator = PORTAL_CLIENT.getUsername();
	data.creatorname = PORTAL_CLIENT.getName();
	data.details = document.getElementById('commentarea').value;
	//alert("text:" + data.details);
	data.buzzid = bid;
	
	var dataString = JSON.stringify(data);
	$.post('http://m.cip.gatech.edu/~buzzit/dea_test/addComment.php', {comment: dataString});
	alert("Comment Posted");
	document.getElementById('commentarea').value = "";	
	loadcommentlist(bid)
}


