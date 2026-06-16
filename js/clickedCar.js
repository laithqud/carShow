const params = new URLSearchParams(window.location.search);

const make = params.get("make");

const brandImages = {
  "MERCEDES-BENZ": "../images/mercedes.jpg",
  "BMW": "../images/bmw.jpg",
  "AUDI": "../images/audi.jpg",
  "TOYOTA": "../images/toyota.jpg",
  "LEXUS": "../images/lexus.jpg",
  "DODGE": "../images/dodge.jpg"
};

document.getElementById("brand-details").innerHTML = `

  <div class="car-details">

    <img
      src="${brandImages[make]}"
      class="car-img2"
      alt="${make}"
    >

    <div style="width:40%">

      <h1>${make}</h1>

      <br>

      <p>
        Browse available models from ${make}.
      </p>

    </div>

  </div>

`;

fetch(
  `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`
)
.then(response => response.json())
.then(data => {

  let html = "";

  data.Results.slice(0, 20).forEach(model => {

    html += `

      <a
        href="range.html?make=${make}&model=${encodeURIComponent(model.Model_Name)}"
        class="car-range-link">

        <div class="car-range">

          <img
            src="../images/default-car.jpg"
            class="car-range-img"
            alt="${model.Model_Name}"
          >

          <h2>${model.Model_Name}</h2>

        </div>

      </a>

    `;

  });

  document.getElementById("ranges").innerHTML = html;

});