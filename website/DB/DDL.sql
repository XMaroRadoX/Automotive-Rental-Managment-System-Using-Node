-- Active: 1671200496755@@127.0.0.1@3306@courseregistration

DROP DATABASE IF EXISTS system;

CREATE DATABASE IF NOT EXISTS system;

use system;

CREATE TABLE
    customer(
        id char(10),
        email varchar(320) UNIQUE,
        password varchar(128),
        fname varchar(64),
        lname varchar(64),
        phone_no int,
        license_no varchar(16) UNIQUE,
        region varchar(64),
        PRIMARY KEY(id)
    );

CREATE TABLE
    favourites(
        customer_id char(10),
        car_id char(10),
        PRIMARY KEY(id, car_id)
    );

CREATE TABLE
    car(
        -- car
        id char(10),
        brand varchar(64),
        model varchar(32),
        type varchar(16),
        color varchar(32),
        year int,
        seating int,
        powertrain varchar(64),
        transmission varchar(40),
        rate int,
        status varchar(64),
        -- not mentioned in sqlv2
        plate_no int UNIQUE,
        region varchar(64),
        PRIMARY KEY(car_id)
    );

CREATE TABLE
    reservation(
        reservation_id int,
        drop_place varchar(64),
        drop_date date,
        date date,
        pick_place varchar(64),
        pick_date date,
        return_date date,
        car_id int,
        id int,
        PRIMARY KEY(reservation_id)
    );

CREATE TABLE
    payments(
        method varchar(32),
        pick_date date,
        return_date date,
        drop_date date,
        status varchar(64),
        date date,
        pay_date date,
        reservation_id int,
        car_id int,
        id int,
        PRIMARY KEY(
            reservation_id,
            id,
            car_id
        )
    );

ALTER TABLE car_specs
ADD
    FOREIGN KEY (car_id) REFERENCES car (id);

ALTER TABLE reservation
ADD
    FOREIGN KEY (car_id) REFERENCES car (id);

ALTER TABLE reservation
ADD
    FOREIGN KEY (id) REFERENCES customer (id);

ALTER TABLE payments
ADD
    FOREIGN KEY (id) REFERENCES customer (id);

ALTER TABLE payments
ADD
    FOREIGN KEY (car_id) REFERENCES car (id);

ALTER TABLE payments
ADD
    FOREIGN KEY (reservation_id) REFERENCES reservation (reservation_id);

ALTER TABLE favourites
ADD
    FOREIGN KEY (customer_id) REFERENCES customer (id);

ALTER TABLE favourites
ADD
    FOREIGN KEY (car_id) REFERENCES car (id);