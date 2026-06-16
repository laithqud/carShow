const brandImages = {
  "MERCEDES-BENZ": "../images/mercedes.jpg",
  "BMW": "../images/bmw.jpg",
  "AUDI": "../images/audi.jpg",
  "TOYOTA": "../images/toyota.jpg",
  "LEXUS": "../images/lexus.jpg",
  "DODGE": "../images/dodge.jpg"
};

fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json")
  .then(response => response.json())
  .then(data => {

    const container =
      document.getElementById("brands-container");

    let html = "";

    const wantedBrands = [
      "MERCEDES-BENZ",
      "BMW",
      "AUDI",
      "TOYOTA",
      "LEXUS",
      "DODGE"
    ];

    const brands = data.Results.filter(
      brand => wantedBrands.includes(brand.Make_Name)
    );

    brands.forEach(brand => {

      html += `
        <a href="clickedCar.html?make=${brand.Make_Name}">
          <div class="car-divs">
            <img
              src="${brandImages[brand.Make_Name]}"
              class="car-img"
              alt="${brand.Make_Name}"
            />
            <h2>${brand.Make_Name}</h2>
          </div>
        </a>
      `;

    });

    container.innerHTML = html;

  });