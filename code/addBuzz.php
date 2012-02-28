<?php
ini_set('display_errors', 1);

include 'dbparams.php';

/*$filename = "test.txt";
$fp = fopen($filename, 'w');
fwrite($fp, "yay!");
fclose($fp);*/


$post = $_POST['buzz'];

$buzz = json_decode($post, true);

// set the default timezone to use. Available since PHP 5.1
date_default_timezone_set('Asia/Seoul');

$creator = $buzz['creator'];
$creatorname = $buzz['creatorname'];
$location = $buzz['location'];
$longitude = $buzz['longitude'];
$latitude = $buzz['latitude'];
$details = $buzz['details'];

$timestamp = date('Y\-m\-j\ h\:i\:s');

if ($creator == "" && $creatorname == "")
{
	//Silly FireFox makes two requests.
	exit(0);
}

// Take care of NULLs. DB won't accept nothing.
if($creator == "")
{
	$creator = "NULL";
}
if($creatorname == "")
{
	$creatorname = "NULL";
}
if($title == "")
{
	$title = "NULL";
}
if($location == "")
{
	$location = "NULL";
}
if($longitude == "")
{
	$longitude = "NULL";
}
if($latitude == "")
{
	$latitude = "NULL";
}
if($details == "")
{
	$details = "NULL";
}

$filename = $buzz['creator'] . date('j\_m\_Y\_h\_i\_s') . '.json';

$fp = fopen($filename, 'w');
fwrite($fp, $post);
fclose($fp);

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to MySQL server');

mysql_select_db($dbname);

$query = "INSERT INTO buzzes (creator, creatorname, timestamp, location, latitude, longitude, details) VALUES ('$creator', '$creatorname', '$timestamp', '$location', '$latitude', '$longitude', '$details')";

//echo $query;

$result = mysql_query($query);
if(!$result)
{
	die("Invalid query: " . mysql_error() . "<br/>Query: " . $query);
}

?>
