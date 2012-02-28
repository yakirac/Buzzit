<?php
ini_set('display_errors', 1);

include 'dbparams.php';

$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to MySQL server');

mysql_select_db($dbname);

	$bid = $_GET['buzzid'];

	if ($bid != null)
	{

		$query = "SELECT * FROM comments WHERE buzzid = " . $bid;

		$result = mysql_query($query);
		if(!$result)
		{
			die("Invalid query: " . mysql_error() . "<br/>Query: " . $query);
		}

		$num = mysql_num_rows($result);
		
		if($result != null)
		{
		for($i=0; $i<$num; $i++)
		{
			//$filename = 'comments/' . mysql_result($result, $i, "filename");

			//$fp = fopen($filename, 'r');
			//$json['buzz'] = json_decode(fread($fp, filesize($filename)), true);
			//fclose($fp);

			//print_r($json);

			$json["id"] = mysql_result($result, $i, "id");
			$json["creator"] = mysql_result($result, $i, "creator");
			$json["creatorname"] = mysql_result($result, $i, "creatorname");
			$json["details"] = mysql_result($result, $i, "details");
			$json["timestamp"] = mysql_result($result, $i, "timestamp");

			$comments[] = $json;
		}
		}
		
		else{
			$json["id"] = "";
			$json["creator"] = "";
			$json["creatorname"] = "";
			$json["details"] = "";
			$json["timestamp"] = "";

			$comments[] = $json;
		
		}

		$json2['comments'] = $comments;

		//echo $json;
		echo json_encode($json2);

	}//if($bid != null)

?>
