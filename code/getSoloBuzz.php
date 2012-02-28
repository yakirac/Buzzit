<?php
ini_set('display_errors', 1);

include 'dbparams.php';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to MySQL server');

mysql_select_db($dbname);

	$bid = $_GET['buzzid'];

	if ($bid != null)
	{

		$query = "SELECT * FROM buzzes WHERE id=" . $bid;

		$result = mysql_query($query);
		if(!$result)
		{
			die("Invalid query: " . mysql_error() . "<br/>Query: " . $query);
		}

		$num = mysql_num_rows($result);
		
		$i = 0;
		$json["id"] = mysql_result($result, $i, "id");
		$json["creator"] = mysql_result($result, $i, "creator");
		$json["creatorname"] = mysql_result($result, $i, "creatorname");
		$json["timestamp"] = mysql_result($result, $i, "timestamp");
		$json["location"] = mysql_result($result, $i, "location");
		$json["latitude"] = mysql_result($result, $i, "latitude");
		$json["longitude"] = mysql_result($result, $i, "longitude");
		$json["details"] = mysql_result($result, $i, "details");

		$buzz["buzz"] = $json;

		//$json2['buzzes'] = $buzzes;

		//echo $json;
		echo json_encode($buzz);

	}//if($bid != null)

?>
