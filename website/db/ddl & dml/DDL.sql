-- Active: 1671200496755@@127.0.0.1@3306@courseregistration

DROP DATABASE IF EXISTS system;

CREATE DATABASE IF NOT EXISTS system;

use system;

CREATE TABLE
    customer(
        customer_id char(10),
        email varchar(320) UNIQUE,
        password varchar(128),
        phone_no CHAR(32) UNIQUE,
        fname varchar(64),
        lname varchar(64),
        license_no varchar(16) UNIQUE,
        region varchar(64),
        PRIMARY KEY(customer_id)
    );

CREATE TABLE
    favourites(
        customer_id char(10),
        car_id char(10),
        PRIMARY KEY(customer_id, car_id)
    );

CREATE TABLE
    car(
        car_id char(10),
        brand varchar(32),
        model varchar(32),
        type varchar(16),
        color varchar(16),
        year int,
        seating int,
        powertrain varchar(32),
        transmission varchar(16),
        rate int,
        status varchar(16),
        plate_no VARCHAR(16) UNIQUE,
        region varchar(64),
        PRIMARY KEY(car_id)
    );

CREATE TABLE
    reservations(
        res_id CHAR(10),
        car_id char(10),
        customer_id char(10),
        date date,
        drop_place varchar(64),
        drop_date date,
        pick_place varchar(64),
        pick_date date,
        res_status varchar(16),
        PRIMARY KEY(res_id, customer_id, car_id)
    );

CREATE TABLE
    payments(
        res_id CHAR(10),
        car_id char(10),
        customer_id char(10),
        return_date date,
        method varchar(32),
        pay_status varchar(64),
        total int,
        pay_date date,
        period int,
        PRIMARY KEY(res_id, customer_id, car_id)
    );

CREATE TABLE
    history(
        date date,
        car_id char(10),
        status varchar(16),
        PRIMARY KEY(date, car_id)
    );

ALTER TABLE reservations
ADD
    FOREIGN KEY (car_id) REFERENCES car (car_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE reservations
ADD
    FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE payments
ADD
    FOREIGN KEY (customer_id) REFERENCES reservations (customer_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE payments
ADD
    FOREIGN KEY (car_id) REFERENCES reservations (car_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE payments
ADD
    FOREIGN KEY (res_id) REFERENCES reservations (res_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE favourites
ADD
    FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE favourites
ADD
    FOREIGN KEY (car_id) REFERENCES car (car_id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE history
ADD
    FOREIGN KEY (car_id) REFERENCES car (car_id) ON DELETE CASCADE ON UPDATE CASCADE;