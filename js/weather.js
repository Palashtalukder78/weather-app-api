const cityName = () => {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.textContent = '';
    const serachField = document.getElementById('input-field');
    const searchValue = serachField.value;
    serachField.value = '';
    if(searchValue.length == ''){
        /* const weatherContainer = document.getElementById('weather-container');
        weatherContainer.textContent = ''; */

        const errorContainer = document.getElementById('empty-field-error-message');
        errorContainer.textContent = '';
        const div = document.createElement('div');
        div.classList.add('col-md-7');
        div.classList.add('mx-auto');
        div.innerHTML = `
            <div class="alert bg-danger text-light">Kisu den</div>
        `;
        errorContainer.appendChild(div);
    }else{
        const errorContainer = document.getElementById('empty-field-error-message');
        errorContainer.textContent = '';
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=674cdbd78d1295722e429e69fd51379c`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayWeather(data))
        .catch(error => console.log(error));
    }
    
}
const displayWeather = weatherData => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'none';
    const temparature = Math.round(weatherData.main.temp - 273.15);
    console.log(weatherData);
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col-md-6');
    div.classList.add('mx-auto');

    div.innerHTML = `
        <h1 class="display-2">${temparature}<sup>o</sup>deg</h1>
        <h1 class="display-3">${weatherData.name}</h1>
        <img class="img-fluid w-25 my-2" src="cloud.png" alt="">
        <h4>Country: ${weatherData.sys.country}</h4>
        <h4>Humidity: ${weatherData.weather[0].main}</h4>
        <p>Description: ${weatherData.weather[0].description}</p>
        `;
    weatherContainer.appendChild(div);
}