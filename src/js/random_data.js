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
    const data = await res.json();
    const users = [];
    data.forEach((user) => {
      users.push({
        id: makeid(math.random()*10),
        fname: user.name.first,
        lname: user.name.last,
        email: user.email,
        password: user.login.password,
        phone_no: user.phone,
        license: user.login.md5.slice(0, 6).toUpperCase(),
        profile_photo: user.picture.thumbnail,
        region: user.location.country,
      });
    });
  } catch (err) {
    console.log(err);
  }
};
// ####################### CAR DATA GENERATION ####################
const car = async () => {
  try {
    const res = await fetch(`http://api.carsxe.com/`);
    const data = await res.json();
    const cars = [];

    data.forEach((car) => {
      cars.push({
        id: car.id,
        brand: car.brand,
        model: car.model,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        year: Math.floor(Math.random() * 30) + 1990,
        price: Math.floor(Math.random() * 1000) + 200,
        seats: Math.floor(Math.random() * 6) + 2,
        doors: Math.floor(Math.random() * 2) + 2,
        img: car.picture.large,
        available: Math.random() >= 0.5,
        country: countries[Math.floor(Math.random() * countries.length)],
        user: users[Math.floor(Math.random() * users.length)],
      });
    });
    cars.sort((a, b) => a.id.localeCompare(b.id));
  } catch (err) {
    console.log(err);
  }
};

// ####################### RENTAL DATA GENERATION ####################
const rental = async () => {
  try {
    const res = await fetch(`https://randomuser.me/api/`);
    const data = await res.json();
    const rentals = [];

    data.forEach((rental) => {
      rentals.push({
        id: rental.id,
        user: users[Math.floor(Math.random() * users.length)],
        car: cars[Math.floor(Math.random() * cars.length)],
        start: rental.start,
        end: rental.end,
        price: rental.price,
        country: countries[Math.floor(Math.random() * countries.length)],
        available: Math.random() >= 0.5,
      });
    });
    rentals.sort((a, b) => a.id.localeCompare(b.id));
  } catch (err) {
    console.log(err);
  }
};
