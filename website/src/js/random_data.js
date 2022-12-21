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
const user = async () => {
  try {
    const res = await fetch(`https://randomuser.me/api/?results=10`);
    const data = (await res.json()).results;
    console.log(data);
    const users = [];
    data.forEach((user, i) => {
      users.push({
        id: Date.now() + i * 1000,
        fname: user.name.first,
        lname: user.name.last,
        email: user.email,
        password: user.login.password,
        phone_no: user.phone,
        license: user.login.md5.slice(0, 6).toUpperCase(),
        region: user.location.country,
      });
    });

    console.log(users);
  } catch (err) {
    console.log(err);
  }
};

user();
// ####################### CAR DATA GENERATION ####################
const transmissions = ["manual", "automatic", "cvt"];
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
const car = async () => {
  const cars_specs = [];
  for (let index = 0; index < 1000; index++) {
    cars_specs.push({
      id: Date.now() + i * 781,
      brand: brands[Math.floor(Math.random() * brands.length)].brand,
      model:
        brands[Math.floor(Math.random() * brands.length)].families[
          Math.floor(Math.random() * families.length)
        ],
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      year: Math.floor(Math.random() * 30) + 1990,
      seating: Math.floor(Math.random() * 14) + 2,
      photo: `https:cdn.imagin.studio/getImage?customer=egalexandria-university-faculty-of-engineering&make=${brand}&modelfamily=${model}&paintId=imagin-${color}`,
      transmission:
        transmissions[Math.floor(Math.random() * transmissions.length)],
      rate: Math.floor(Math.random() * 1000) + 200,
    });
  }
};

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
