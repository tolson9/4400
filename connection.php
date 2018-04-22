<?php
$servername = "academic-mysql.cc.gatech.edu";
$username = "cs4400_team_35";
$password = "wGEwFeGc";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

?>