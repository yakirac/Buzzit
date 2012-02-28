
/**
 * The main function to be run on start up
 */
function widget_load_init() {
	//console.log("Hello world");

	var user = document.createElement( 'p' );
	user.innerHTML = "Hello, " + PORTAL_CLIENT.getUsername();
	document.getElementById("idtest").appendChild( user );
}
