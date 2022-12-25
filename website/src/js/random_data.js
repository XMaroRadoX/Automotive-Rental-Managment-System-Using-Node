// ###################### GENERAL DATA GENERATION ##################
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const cont = async () => {
  try {
    const res = await fetch(`https://restusers.com/v3.1/all`);
    const data = await res.json();
    const countries = [];

    data.forEach((cont) => {
      if (cont.name.common !== "Israel")
        countries.push({
          name: cont.name.common,
          cca3: cont.cca3,
        });
    });
    countries.sort((a, b) => a.name.localeCompare(b.name));
  } catch (err) {
    console.log(err);
  }
};

// ###################### USER DATA GENERATION ##################
const region = [
  "Egypt",
  "USA",
  "Germany",
  "Italy",
  "Spain",
  "France",
  "Algeria",
  "Japan",
  "China",
  "Brazil",
  "Argentina",
];
const attrs = [
  "id",
  "brand",
  "model",
  "type",
  "color",
  "year",
  "seating",
  "powertrain",
  "transmission",
  "rate",
  "plate_no",
  "region",
  "status",
];

const custs = [
  "id",
  "email",
  "password",
  "fname",
  "lname",
  "phone_no",
  "license_no",
  "region",
];

const generateSQL = function (table, attrs, data) {
  let attr = "";
  let values = [];
  attrs.forEach((at) => {
    // if()
    let str;
    if (!isFinite(data[at]) || at === "phone_no" || at === "plate_no") {
      str = `"${data[at]}"`;
    } else {
      str = data[at];
    }

    values.push(str);
  });

  return `insert into ${table}(${attrs.join(",")}) values(${values.join(",")})`;
};

const getID = new Promise((resolve, reject) => {
  fetch(`https://www.uuidtools.com/api/generate/v4`)
    .then((res) => resolve(res.json()))
    .catch((e) => reject(e));
});

const getIDs = async function (n) {
  const ids = [];
  for (i = 0; i < n; i++) {
    let getID = new Promise((resolve, reject) => {
      fetch(`https://www.uuidtools.com/api/generate/v4`)
        .then((res) => resolve(res.json()))
        .catch((e) => reject(e));
    });

    const id = await getID
      .then((r) => r[0].split("-").join(""))
      .catch((e) => console.log(e));
    ids.push(id);
  }
  return ids;
};

const user = async (n) => {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=${n}`);
    const data = (await res.json()).results;
    const id = await getIDs(n);
    const users = [];
    await data.forEach((user, i) => {
      users.push({
        id: id[i].slice(0, 10),
        fname: user.name.first,
        lname: user.name.last,
        email: user.email,
        password: user.login.password,
        phone_no: user.phone,
        license_no: user.login.md5.slice(0, 6).toUpperCase(),
        region: user.location.country,
      });
    });

    return users;
  } catch (err) {
    console.log(err);
  }
};

// ####################### CAR DATA GENERATION ####################
const transmissions = ["manual", "automatic", "cvt"];
const power = ["fuel", "gas", "electric"];
const colors = [
  "white",
  "black",
  "gray",
  "silver",
  "blue",
  "red",
  "brown",
  "green",
  "orange",
  "beige",
  "purple",
  "gold",
  "yellow",
];
const types = [
  "micro",
  "sedan",
  "hatchback",
  "coupe",
  "cabriolet",
  "limousine",
  "sport",
  "suv",
  "crossover",
  "pickup",
  "van",
  "minivan",
  "minibus",
];
const brands = [
  {
    brand: "audi",
    families: [
      {
        model: "a5",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 200,
      },
      {
        model: "a6",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 350,
      },
      {
        model: "a7",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 750,
      },
      {
        model: "a8",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 800,
      },
      {
        model: "q2",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "manual",
        year: 2023,
        rate: 1200,
      },
      {
        model: "q3",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 1000,
      },
    ],
  },
  {
    brand: "aston martin",
    families: [
      {
        model: "db11",
        type: "coupe",
        seating: 2,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 1500,
      },
      {
        model: "dbx",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2021,
        rate: 850,
      },
    ],
  },
  {
    brand: "bentley",
    families: [
      {
        model: "bentayga",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 2000,
      },
      {
        model: "continental-gt",
        type: "hatchback",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 2500,
      },
    ],
  },
  {
    brand: "bmw",
    families: [
      {
        model: "i3",
        type: "hatchback",
        seating: 4,
        powertrain: "electric",
        transmission: "automatic",
        year: 2021,
        rate: 1400,
      },
      {
        model: "i4",
        type: "sedan",
        seating: 4,
        powertrain: "electric",
        transmission: "automatic",
        year: 2022,
        rate: 1200,
      },
      {
        model: "i7",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2023,
        rate: 1950,
      },
      {
        model: "i8",
        type: "sport",
        seating: 4,
        powertrain: "gasoline",
        transmission: "automatic",
        year: 2020,
        rate: 1900,
      },
      {
        model: "x1",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 550,
      },
      {
        model: "x2",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 310,
      },
      {
        model: "x3",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 465,
      },
      {
        model: "x4",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 920,
      },
      {
        model: "x5",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 330,
      },
      {
        model: "x6",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 535,
      },
      {
        model: "x7",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 1830,
      },
      {
        model: "z4",
        type: "coupe",
        seating: 2,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 940,
      },
    ],
  },
  {
    brand: "bugatti",
    families: [
      {
        model: "chiron",
        type: "sport",
        seating: 2,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 3000,
      },
    ],
  },
  {
    brand: "cadillac",
    families: [
      {
        model: "ct6",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2020,
        rate: 2100,
      },
      {
        model: "ct5",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "manual",
        year: 2022,
        rate: 2400,
      },
    ],
  },
  {
    brand: "chevrolet",
    families: [
      {
        model: "aveo",
        type: "compact",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 200,
      },
      {
        model: "camaro",
        type: "coupe",
        seating: 2,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 1200,
      },
      {
        model: "cruze",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 400,
      },
    ],
  },
  {
    brand: "hyundai",
    families: [
      {
        model: "accent",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 350,
      },
      {
        model: "bayon",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "manual",
        year: 2022,
        rate: 350,
      },
    ],
  },
  {
    brand: "jeep",
    families: [
      {
        model: "wrangler",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 680,
      },
    ],
  },
  {
    brand: "kia",
    families: [
      {
        model: "carens",
        type: "wagon",
        seating: 7,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2018,
        rate: 350,
      },
      {
        model: "sportage",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 550,
      },
    ],
  },
  {
    brand: "mercedes",
    families: [
      {
        model: "e-class",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 1850,
      },

      {
        model: "g-class",
        type: "suv",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2022,
        rate: 2400,
      },
    ],
  },
  {
    brand: "toyota",
    families: [
      {
        model: "corolla",
        type: "sedan",
        seating: 4,
        powertrain: "fuel",
        transmission: "automatic",
        year: 2016,
        rate: 350,
      },
    ],
  },
];

const car = async (n) => {
  const ids = await getIDs(n);
  const cars_specs = [];
  for (let i = 0; i < n; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const car =
      brand.families[Math.floor(Math.random() * brand.families.length)];
    cars_specs.push({
      id: ids[i].slice(0, 10),
      brand: brand.brand,
      model: car.model,
      type: car.type,
      color: colors[Math.floor(Math.random() * colors.length)],
      year: car.year,
      seating: car.seating,
      powertrain: car.powertrain,
      transmission: car.transmission,
      rate: car.rate,
      plate_no: ids[i].slice(11, 16),
      region: region[Math.floor(Math.random() * region.length)],
      status: "active",
    });
    // console.log(cars_specs);
    // console.log(generateSQL("cars", attrs, cars_specs[index]));
  }

  return cars_specs;
};

(async function () {
  let queries = "";
  await car(40).then((r) =>
    r.forEach((user) => (queries += generateSQL("car", attrs, user) + "\n"))
  );

  console.log(queries);
})();

// console.log(car());

// ####################### RENTAL DATA GENERATION ####################
const rental = async () => {
  try {
    const res = await fetch(`https://randomuser.me/api/`);
    const data = await res.json();
    const reservations = [];

    data.forEach((rental) => {
      reservations.push({
        reservation_id: Date.now() + i * 378,
        user: users[Math.floor(Math.random() * users.length)],
        car: cars[Math.floor(Math.random() * cars.length)],
        start: rental.start,
        end: rental.end,
        price: rental.price,
        country: countries[Math.floor(Math.random() * countries.length)],
        available: Math.random() >= 0.5,
      });
    });
    reservations.sort((a, b) => a.id.localeCompare(b.id));
  } catch (err) {
    console.log(err);
  }
};
// ##################### Favourite Data Generation #################
// ####
