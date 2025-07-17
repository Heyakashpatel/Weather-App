const search_btn = document.querySelector('.btn');
const input_box = document.querySelector('.input-box');
const temp = document.querySelector('.temp');
const wind = document.querySelector('.wind');
const humid = document.querySelector('.humid');
const desc = document.querySelector('.desc');
const loc_name = document.querySelector('.loc-name');
const weather_img = document.querySelector('.weath-img');


search_btn.addEventListener('click', ()=>{
    weatherInfo(input_box.value);
    suggestionsBox.innerHTML = '';
});


async function weatherInfo(value){
        const api_key = "54301ca76f4c8bbafcc24354407f8ab3";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${api_key}`;

        loc_name.innerHTML = `${value}`;

        const weather_data = await fetch(`${url}`).then(res => res.json());
       
        temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        desc.innerHTML = `${weather_data.weather[0].description}`;
        humid.innerHTML = `${weather_data.main.humidity}%`;
        wind.innerHTML = `${weather_data.wind.speed}Km/H`;

        switch(weather_data.weather[0].main){
            case 'Clouds':
            weather_img.src = "./assets/cloud.png";
            break;

            case 'Clear':
            weather_img.src = "./assets/clear.png";
            break;

            case 'Rain':
            weather_img.src = "./assets/rain.png";
            break;

            case 'Mist':
            weather_img.src = "./assets/mist.png";
            break;

            case 'Snow':
            weather_img.src = "./assets/snow.png";
            break;

        }
}


window.addEventListener('DOMContentLoaded', () => {        
  weatherInfo("India");          
});



// Dark Mode

const checkbox = document.getElementById('toggle-checkbox');
  const appBox = document.getElementById('app-box');
  const temp_info_main = document.getElementById('temp-info-main');
  const additional_info = document.getElementById('additional-info');
  const input_info = document.getElementById('input-box');

   
  checkbox.addEventListener('change', function () {
    appBox.classList.toggle('active', this.checked);
    temp_info_main.classList.toggle('active', this.checked);
    additional_info.classList.toggle('active', this.checked);
    input_info.classList.toggle('active', this.checked);
  });



 // Search Suggestions js

const api_key = "54301ca76f4c8bbafcc24354407f8ab3";

const suggestionsBox = document.getElementById('suggestions');

input_box.addEventListener('input', async function () {
  const query = input_box.value.trim();

  if (query.length < 2) {
    suggestionsBox.innerHTML = '';
    return;
  }

  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${api_key}`;
  const locations = await fetch(geoUrl).then(res => res.json());

  suggestionsBox.innerHTML = '';

  locations.forEach(loc => {
    const item = document.createElement('li');
    item.textContent = `${loc.name}, ${loc.country}`;

    item.addEventListener('click', () => {
      input_box.value = `${loc.name}`;
      weatherInfo(loc.name); // Call your weather function (must be defined)
      suggestionsBox.innerHTML = '';
    });

    suggestionsBox.appendChild(item);
  });
});


