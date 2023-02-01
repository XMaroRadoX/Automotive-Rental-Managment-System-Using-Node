-- Select All cars

SELECT *
FROM
    car -- Select All active cars
SELECT *
FROM car
WHERE
    status = "active" -- Select All active cars and get count by color
SELECT color, COUNT(*) AS count
FROM car
WHERE status = "active"
GROUP BY
    color -- Select All active cars and get count by transmission
SELECT
    transmission,
    COUNT(*) AS count
FROM car
WHERE status = "active"
GROUP BY
    transmission -- Select All active cars and get count by brand
SELECT brand, COUNT(*) AS count
FROM car
WHERE status = "active"
GROUP BY
    brand -- Select All active cars and get count by powertrain
SELECT
    powertrain,
    COUNT(*) AS count
FROM car
WHERE status = "active"
GROUP BY
    powertrain -- Select All active cars and get count by type
SELECT type, COUNT(*) AS count
FROM car
WHERE status = "active"
GROUP BY
    type -- Select All Reservations with car info
SELECT *
FROM reservations
    NATURAL JOIN car
WHERE status != "active";

-- Insert new car

insert into
    car(
        car_id,
        brand,
        model,
        type,
        color,
        year,
        seating,
        powertrain,
        transmission,
        rate,
        plate_no,
        region,
        status
    )
values (
        id,
        "hyundai",
        "bayon",
        "suv",
        "white",
        year(now()),
        4,
        "fuel",
        "manual",
        350,
        "c447e",
        "Algeria",
        "active"
    );

select
    car_id,
    brand,
    model,
    type,
    color,
    year,
    seating,
    powertrain,
    transmission,
    rate,
    "active" as status,
    plate_no,
    region
from car
where car_id not in (
        select car_id
        from history
        where
            date <= "2022-12-28"
    )
UNION (
    SELECT
        c.car_id,
        brand,
        model,
        type,
        color,
        year,
        seating,
        powertrain,
        transmission,
        rate,
        status,
        plate_no,
        region
    FROM history as h
        join (
            SELECT
                car_id,
                brand,
                model,
                type,
                color,
                year,
                seating,
                powertrain,
                transmission,
                rate,
                plate_no,
                region
            from
                car
        ) as c on h.car_id = c.car_id
    WHERE h.date in (
            select max(date)
            from history
            where
                date <= "2022-12-28"
        )
)
ORDER BY brand