<?php
$conn = new mysqli("localhost", "root", "1234", "registration");
$data = json_decode(file_get_contents('php://input'));

$email = $data->{'email'};
$password = $data->{'password'};
$name = $data->{'name'};



if (!$conn) {
  echo 'Could not connect: ' . mysqli_connect_error();
}

//  SHA1('pass123')
$sql = 'SELECT * FROM user where email="' . $email . '"';
$res = mysqli_query($conn, $sql)->fetch_object();

if ($res) {
  $response = '{"success":false , "message":"A user with the same email already exists"}';
} else {
  $sql = "SELECT * from user";
  $res = mysqli_query($conn, $sql);

  $id = mysqli_num_rows($res) + 1;
  $sql = "INSERT INTO user (user_id, email, name,password,registration_date) VALUES ('$id','$email', '$name', sha1('$password'),current_timestamp())";

  $res = mysqli_query($conn, $sql);
  $response = '{"success":true , "message":"User added successfully"}';
}

echo $response;