<?php
ini_set('display_errors', 1);

include 'dbparams.php';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to MySQL server');

mysql_select_db($dbname);

// $_POST?? another fx?
$username = $_GET['username'];

$buzz_id = mysql_query("SELECT buzz_id FROM favorites WHERE username = '$username'") or die ('just die');

// for each buzz_id, get data of buzz and return to script for manipulation

$size = mysql_num_rows($buzz_id);
//echo $size;

for ($i=0; $i<$size; $i++)
{
	
	$id = mysql_result($buzz_id, $i);

	$result = mysql_query("SELECT * FROM buzzes WHERE id = '$id'");

		$json["id"] = mysql_result($result, 0, "id");
		$json["creator"] = mysql_result($result, 0, "creator");
		$json["creatorname"] = mysql_result($result, 0, "creatorname");
		$json["timestamp"] = mysql_result($result, 0, "timestamp");
		$json["location"] = mysql_result($result, 0, "location");
		$json["latitude"] = mysql_result($result, 0, "latitude");
		$json["longitude"] = mysql_result($result, 0, "longitude");
		$json["details"] = mysql_result($result, 0, "details");

		$buzzes[] = $json;

	$fav_buzz['buzzes'] = $buzzes;
}

echo json_encode($fav_buzz);


?>


