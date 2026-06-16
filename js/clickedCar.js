const params = new URLSearchParams(window.location.search);
const make = params.get("make");

// صورة البراند (يدوي)
const brandImages = {
  "MERCEDES-BENZ": "../images/mercedes.jpg",
  "BMW": "../images/bmw.jpg",
  "AUDI": "../images/audi.jpg",
  "TOYOTA": "../images/toyota.jpg",
  "LEXUS": "../images/lexus.jpg",
  "DODGE": "../images/dodge.jpg"
};

// ضع API KEY هنا 👇
const PEXELS_API_KEY = "QyxvhHOlRrZfA8qlmhJWK46tO7a6uR5EO9AhiOZ68gk3Bejw4YO3Bz88";

function fetchPexelsImage(query) {
  return fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=1`,
    {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.medium;
      }
      return "../images/default-car.jpg";
    })
    .catch(() => "../images/default-car.jpg");
}

// عرض بيانات البراند
document.getElementById("brand-details").innerHTML = `
  <div class="car-details">
    <img src="${brandImages[make]}" class="car-img2" alt="${make}">
    <div style="width:40%">
      <h1>${make}</h1>
      <p>Explore available models from ${make}</p>
    </div>
  </div>
`;

// جلب الموديلات
fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${make}?format=json`)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("ranges");
    container.innerHTML = "";

    data.Results.slice(0, 12).forEach(model => {

      const query = `${make} ${model.Model_Name}`;

      fetchPexelsImage(query).then(imageUrl => {

        container.innerHTML += `
          <a class="car-range-link" href="range.html?make=${make}&model=${encodeURIComponent(model.Model_Name)}">
            <div class="car-range">
              <img src="${imageUrl}" class="car-range-img" alt="${model.Model_Name}">
              <h2>${model.Model_Name}</h2>
            </div>
          </a>
        `;

      });

    });
  });