<?php
$conn = new mysqli("localhost", "root", "1234", "registration");
$data = json_decode(file_get_contents('php://input'));

$email = $data->{'email'};
$password = sha1($data->{'password'});



if (!$conn) {
  echo 'Could not connect: ' . mysqli_connect_error();
}

$sql = 'SELECT * FROM user where email="' . $email . '" and password="' . $password . '"';

$res = mysqli_query($conn, $sql);

$user = mysqli_fetch_all($res, MYSQLI_ASSOC);


if (!empty($user)) {
  $user['success'] = true;
} else {
  $user['success'] = false;
}

echo json_encode($user);