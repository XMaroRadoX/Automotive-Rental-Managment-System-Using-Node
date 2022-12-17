-- Active: 1671200496755@@127.0.0.1@3306@courseregistration
DROP DATABASE IF EXISTS system;
CREATE DATABASE IF NOT EXISTS system;
use system;
CREATE TABLE customer(
  customer_id int,
  email varchar(320) UNIQUE,
  pass varchar(128),
  fname varchar(64),
  lname varchar(64),
  phone_no int,
  license_no int UNIQUE,
  profile_photo varchar(500),
  region varchar(64),
  PRIMARY KEY(customer_id)
);
CREATE TABLE car(
  car_id int,
  plate_no int UNIQUE,
  region varchar(64),
  reserve_status varchar(64),
  rent_status varchar(64),
  activity_status varchar(64),
  PRIMARY KEY(car_id)
);
CREATE TABLE car_specs(
  car_id int,
  photo varchar(500),
  seating int,
  brand varchar(64),
  color varchar(32),
  year int,
  transmission varchar(40),
  model varchar(32),
  rate int
);
CREATE TABLE reservation(
  reservation_id int,
  drop_place varchar(64),
  drop_date date,
  date date,
  pick_place varchar(64),
  pick_date date,
  return_date date,
  car_id int,
  customer_id int,
  PRIMARY KEY(reservation_id)
);
CREATE TABLE payments(
  method varchar(32),
  pick_date date,
  return_date date,
  drop_date date,
  status varchar(64),
  date date,
  reservation_id int,
  car_id int,
  customer_id int
);
ALTER TABLE car_specs ADD FOREIGN KEY (car_id) REFERENCES car (car_id);
ALTER TABLE reservation ADD FOREIGN KEY (car_id) REFERENCES car (car_id);
ALTER TABLE reservation ADD FOREIGN KEY (customer_id) REFERENCES customer (customer_id);
ALTER TABLE payments ADD FOREIGN KEY (customer_id) REFERENCES customer (customer_id);
ALTER TABLE payments ADD FOREIGN KEY (car_id) REFERENCES car (car_id);
ALTER TABLE payments ADD FOREIGN KEY (reservation_id) REFERENCES reservation (reservation_id);