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
const attrs = [
  "id",
  "brand",
  "model",
  "type",
  "color",
  "year",
  "seating",
  "power",
  "transmission",
  "rate",
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
    if (!isFinite(data[at])) {
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
        id: id[i],
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
      "a1",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "q2",
      "q3",
      "q4",
      "q5",
      "q7",
      "q8",
      "r8",
      "tt",
    ],
  },
  { brand: "aston martin", families: ["db11", "dbx"] },
  { brand: "bentley", families: ["continental-gt", "bentayga"] },
  {
    brand: "bmw",
    families: [
      "i3",
      "i4",
      "i7",
      "i8",
      "ix",
      "x1",
      "x2",
      "x3",
      "x4",
      "x5",
      "x6",
      "x7",
      "z4",
    ],
  },
  { brand: "bugatti", families: ["chiron"] },
  { brand: "cadillac", families: ["ct4", "ct5", "ct6", "cts"] },
  { brand: "chevrolet", families: ["aveo", "camaro", "colorado", "cruze"] },
  { brand: "dodge", families: ["challenger", "charger"] },
  { brand: "fiat", families: ["500", "124-spider", "doblo"] },
  { brand: "ford", families: ["gt", "ka", "ranger"] },
  { brand: "hyundai", families: ["accent", "bayon"] },
  { brand: "jeep", families: ["wrangler", "cherokee"] },
  { brand: "kia", families: ["carens", "sportage"] },
  {
    brand: "mercedes",
    families: [
      "cls",
      "sprinter",
      "e-class",
      "a-class",
      "b-class",
      "s-class",
      "g-class",
    ],
  },
  { brand: "mg", families: ["gs", "hs", "zs"] },
  { brand: "mini", families: ["mini", "coupe"] },
  { brand: "mitsubishi", families: ["lancer-evolution"] },
  { brand: "nissan", families: ["gt-r", "370z"] },
  { brand: "porsche", families: ["911", "panamera"] },
  { brand: "subaru", families: ["ascent", "solterra"] },
  { brand: "tesla", families: ["model-x", "model-s"] },
  { brand: "toyota", families: ["prius"] },
];

const car = async (n) => {
  const ids = await getIDs(n);
  const cars_specs = [];
  for (let index = 0; index < n; index++) {
    const no = Math.floor(Math.random() * brands.length);
    cars_specs.push({
      id: ids[index],
      brand: brands[no].brand,
      model:
        brands[no].families[
          Math.floor(Math.random() * brands[no].families.length)
        ],
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      year: Math.floor(Math.random() * 30) + 1990,
      seating: Math.floor(Math.random() * 14) + 2,
      power: power[Math.floor(Math.random() * power.length)],
      transmission:
        transmissions[Math.floor(Math.random() * transmissions.length)],
      rate: Math.floor(Math.random() * 1000) + 200,
      status: "active",
    });
    console.log(generateSQL("cars", attrs, cars_specs[index]));
  }

  return cars_specs;
};

// console.log(car());
(async function () {
  let queries = "";
  await car(20).then((r) =>
    r.forEach((user) => (queries += generateSQL("car", attrs, user) + "\n"))
  );

  console.log(queries);
})();
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
