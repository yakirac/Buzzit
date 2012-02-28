<?php

ini_set('display_errors', 1);

include 'dbparams.php';

$buzz_id = $_POST['buzz_id'];
$username = $_POST['username'];

// $user = json_decode($post, true); 

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to MySQL server');

mysql_select_db($dbname);


// search for user name in table 'user'
/*
$result = mysql_query("SELECT username FROM user WHERE username = '$username'");
//print "SELECT username FROM user WHERE username = '$username'";

$temp = mysql_num_rows($result); // or die ('result error');

if ($temp == 0) 
*/


// search for repeated favs!!

mysql_query("INSERT INTO favorites (username, buzz_id) VALUES ('$username', '$buzz_id')") or die ('result error');

/*
else // username already exists in table 'user'
{

// get current user's favorites_list from table 'user'
$fav = mysql_query("SELECT favorites_list FROM user WHERE username = '$username'");

if($fav == "") $fav = array(); 

// check for repeat favs

if ( count($fav)==0 ) $fav[] = buzz_id;
else
{
	for( $i=0; $i<count($fav); $i++ )
	{
		if( $fav[$i] == buzz_id ) break;
			else if(($i+1) == count($fav)) $fav[] = buzz_id;
	}
}

mysql_query("UPDATE user SET favorites_list = '$fav' WHERE username = '$username'");

}

*/
?>