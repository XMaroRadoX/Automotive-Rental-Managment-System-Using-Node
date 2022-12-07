export const getCountries = async () => {
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

    return countries;
  } catch (err) {
    console.error(err);
  }
};

export const selectHandler = async function (flag) {
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${this.value}`
    );

    const data = await res.json();

    flag.src = `https://flagicons.lipis.dev/flags/4x3/${data[0].cca2.toLowerCase()}.svg`;
  } catch (err) {
    console.error(err);
  }
};
