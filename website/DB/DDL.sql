-- Active: 1671200496755@@127.0.0.1@3306@courseregistration

DROP DATABASE IF EXISTS system;

CREATE DATABASE IF NOT EXISTS system;

use system;

CREATE TABLE
    customer(
        customer_id int,
        email varchar(320) UNIQUE,
        pass varchar(128),
        fname varchar(64),
        lname varchar(64),
        phone_no int,
        license_no int UNIQUE,
        region varchar(64),
        PRIMARY KEY(customer_id)
    );

CREATE TABLE
    favourites(
        customer_id int,
        car_id int,
        PRIMARY KEY(customer_id, car_id)
    );

CREATE TABLE
    car(
        -- car
        car_id int,
        plate_no int UNIQUE,
        region varchar(64),
        reserve_status varchar(64),
        rent_status varchar(64),
        activity_status varchar(64),
        -- car specs
        seating int,
        brand varchar(64),
        color varchar(32),
        transmission varchar(40),
        power varchar(64),
        year int,
        model varchar(32),
        rate int,
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
        customer_id int,
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
        customer_id int,
        PRIMARY KEY(
            reservation_id,
            customer_id,
            car_id
        )
    );

ALTER TABLE car_specs
ADD
    FOREIGN KEY (car_id) REFERENCES car (car_id);

ALTER TABLE reservation
ADD
    FOREIGN KEY (car_id) REFERENCES car (car_id);

ALTER TABLE reservation
ADD
    FOREIGN KEY (customer_id) REFERENCES customer (customer_id);

ALTER TABLE payments
ADD
    FOREIGN KEY (customer_id) REFERENCES customer (customer_id);

ALTER TABLE payments
ADD
    FOREIGN KEY (car_id) REFERENCES car (car_id);

ALTER TABLE payments
ADD
    FOREIGN KEY (reservation_id) REFERENCES reservation (reservation_id);

ALTER TABLE favourites
ADD
    FOREIGN KEY (customer_id) REFERENCES customer (customer_id);

ALTER TABLE favourites
ADD
    FOREIGN KEY (car_id) REFERENCES car (car_id);