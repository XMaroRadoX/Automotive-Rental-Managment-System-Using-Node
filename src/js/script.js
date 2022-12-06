// Filter buttons
{
  const filterBtns = document.querySelectorAll(".btn-filter");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("open");
      const icon = btn.querySelector(".bi");
      if (btn.classList.contains("open")) {
        icon.classList.remove("bi-chevron-down");
        icon.classList.add("bi-chevron-up");
      } else {
        icon.classList.add("bi-chevron-down");
        icon.classList.remove("bi-chevron-up");
      }
    });
  });
}

// //////////////////////////////////////////////////////////////////
// types
{
  const typeGroup = document.querySelector(".type-grp");

  // config
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

  const frag = document.createDocumentFragment();

  types.sort((a, b) => a.localeCompare(b));

  types.forEach((type, i) => {
    const name = type[0].toUpperCase() + type.slice(1).toLowerCase();
    const div = document.createElement("div");
    if (i > 0) div.classList = "mt-3";
    const html = `
    <input
      class="form-check-input me-2"
      type="checkbox"
      value="${type}"
      id="check${name}"
    />
    <label class="form-check-label" for="check${name}">${name}</label>
  `;
    div.insertAdjacentHTML("afterbegin", html);
    frag.appendChild(div);
  });

  typeGroup.append(frag);
}
// //////////////////////////////////////////////////////////////////

// Countries
{
  const frag = document.createDocumentFragment();
  const select = document.querySelector(".form-select");
  const flag = document.querySelector(".region-flag");

  const cont = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/all`);

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

      countries.forEach((country) => {
        const opt = document.createElement("option");
        opt.value = country.cca3;
        opt.textContent = country.name;
        frag.appendChild(opt);
      });

      select.append(frag);
      select.value = "EGY";
    } catch (err) {
      console.log(err);
    }
  };

  select.addEventListener("change", async () => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${select.value}`
      );

      const data = await res.json();

      flag.src = `https://flagicons.lipis.dev/flags/4x3/${data[0].cca2.toLowerCase()}.svg`;
    } catch (err) {
      console.log(err);
    }
  });
  // "https://flagcdn.com/eg.svg"
  cont();
}
// //////////////////////////////////////////////////////////////////

// Transmission
{
  const transmissionGroup = document.querySelector(".transmission-grp");

  // config
  const transmissions = ["manual", "automatic", "cvt"];

  transmissions.sort((a, b) => a.localeCompare(b));

  const frag = document.createDocumentFragment();

  transmissions.forEach((t, i) => {
    let name = t[0].toUpperCase() + t.slice(1).toLowerCase();
    if (name === "Cvt") name = name.toUpperCase();

    const div = document.createElement("div");
    if (i > 0) div.classList = "mt-3";
    const html = `
    <input
      class="form-check-input me-2"
      type="checkbox"
      value="${t}"
      id="check${name}"
    />
    <label class="form-check-label" for="check${name}">${name}</label>
  `;
    div.insertAdjacentHTML("afterbegin", html);
    frag.appendChild(div);
  });

  transmissionGroup.append(frag);
}

// //////////////////////////////////////////////////////////////////
// Seating
{
  const range = document.querySelector(".form-range");
  const incSeats = document.querySelector(".seat-plus");
  const decSeats = document.querySelector(".seat-minus");
  const seatingLabel = document.querySelector(".seating-label");
  let seating = 2;

  range.addEventListener("change", () => {
    seating = +range.value;
    seatingLabel.textContent = seating + " Persons";
  });

  incSeats.addEventListener("click", () => {
    if (seating === 14) return;
    seating++;
    range.value = seating;
    seatingLabel.textContent = seating + " Persons";
  });

  decSeats.addEventListener("click", () => {
    if (seating === 2) return;
    seating--;
    range.value = seating;
    seatingLabel.textContent = seating + " Persons";
  });
}

// //////////////////////////////////////////////////////////////////
// Brands
{
  //config
  const brands = [
    "aston martin",
    "audi",
    "bentley",
    "bmw",
    "bugatti",
    "cadillac",
    "chevrolet",
    "dodge",
    "fiat",
    "ferrari",
    "ford",
    "gmc",
    "honda",
    "hyundai",
    "jaguar",
    "jeep",
    "kia",
    "lexus",
    "mazda",
    "mercedes-benz",
    "mg",
    "mini",
    "mitsubishi",
    "nissan",
    "porsche",
    "renault",
    "subaru",
    "tesla",
    "toyota",
    "volkswagen",
    "volvo",
  ];

  brands.sort((a, b) => a.localeCompare(b));

  const brandGroup = document.querySelector(".brand-grp");

  const frag = document.createDocumentFragment();

  brands.forEach((brand, i) => {
    let name = brand[0].toUpperCase() + brand.slice(1).toLowerCase();
    if (brand.length < 4) name = name.toUpperCase();

    const div = document.createElement("div");
    if (i > 0) div.classList = "mt-3";
    const html = `
    <input
      class="form-check-input me-2"
      type="checkbox"
      value="${brand}"
      id="check${name}"
    />
    <label class="form-check-label" for="check${name}">${name}</label>
  `;
    div.insertAdjacentHTML("afterbegin", html);
    frag.appendChild(div);
  });

  brandGroup.append(frag);
}

// //////////////////////////////////////////////////////////////////
// Colors
{
  //config
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
  colors.sort((a, b) => a.localeCompare(b));

  const colorGroup = document.querySelector(".color-grp");

  const frag = document.createDocumentFragment();

  colors.forEach((color, i) => {
    let name = color[0].toUpperCase() + color.slice(1).toLowerCase();

    const div = document.createElement("div");
    if (i > 0) div.classList = "mt-3";
    const html = `
    <input
      class="form-check-input me-2"
      type="checkbox"
      value="${color}"
      id="check${name}"
    />
    <label class="form-check-label" for="check${name}">${name}</label>
  `;
    div.insertAdjacentHTML("afterbegin", html);
    frag.appendChild(div);
  });

  colorGroup.append(frag);
}
