<?php
ini_set('display_errors', 1);

include 'dbparams.php';

/*$filename = "test.txt";
$fp = fopen($filename, 'w');
fwrite($fp, "yay!");
fclose($fp);*/


$post = $_POST['comment'];

$comment = json_decode($post, true);

// set the default timezone to use. Available since PHP 5.1
date_default_timezone_set('Asia/Seoul');

$creator = mysql_escape_string($comment['creator']);
$creatorname = mysql_escape_string($comment['creatorname']);
$details = mysql_escape_string($comment['details']);
$buzzid = mysql_escape_string($comment['buzzid']);
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
if($details == "")
{
	$details = "NULL";
}

$filename = $comment['creator'] . date('j\_m\_Y\_h\_i\_s') . '.json';

$fp = fopen($filename, 'w');
fwrite($fp, $post);
fclose($fp);

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to MySQL server');

mysql_select_db($dbname);

$query = "INSERT INTO comments (creator, creatorname, details, buzzid, timestamp) VALUES ('$creator', '$creatorname', '$details', '$buzzid', '$timestamp')";
//$query = sprintf("INSERT INTO comments (creator, creatorname, details, buzzid, timestamp) VALUES ('%s', '%s', '%s', '%s', '%s')", mysql_real_escape_string($creator), 
//mysql_real_escape_string($creatorname), mysql_real_escape_string($details), mysql_real_escape_string($buzzid), mysql_real_escape_string($timestamp));

//$query = sprintf("SELECT * FROM users WHERE user='%s' AND password='%s'",
//            mysql_real_escape_string($user),
//            mysql_real_escape_string($password));

//echo $query;

$result = mysql_query($query);
if(!$result)
{
	die("Invalid query: " . mysql_error() . "<br/>Query: " . $query);
}

?>
