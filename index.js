var city = document.querySelector('#city');
var searchBtn = document.querySelector('#searchCity');
var currentCond = document.querySelector('#currentConditions');
var currentTemp = document.querySelector('#currentTempSpan');
var forecast = document.querySelector('#forecast');
var table = document.querySelector('#forecastTable');

searchBtn.addEventListener('click', function() {
    getWeatherData(city.value);
});

city.addEventListener('keyup', function(e){
    if(e.key === 'Enter') {
        getWeatherData(city.value);
    }
});

var getWeatherData = async function (cityName) {
    var locationResponse = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=%09oO2mGUa3SDVNV653eVN60J5IO5IkEZap&q=${cityName}`)
       .then(res => {
           return res.data[0].Key;
       }) 
       .catch(err => {
           console.error(err);
       })
    console.log(locationResponse);

    var conditionsResponse = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationResponse}?apikey=oO2mGUa3SDVNV653eVN60J5IO5IkEZap`)
        .then(res => {
            displayCurrentConditions(res.data[0].Temperature.Metric.Value);
            return res.data[0].Temperature.Metric.Value;
        }) 
        .catch(err => {
            console.error(err);
        })

    console.log(conditionsResponse);

    var forecastResponse = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationResponse}?apikey=oO2mGUa3SDVNV653eVN60J5IO5IkEZap&metric=true`)
        .then(res => {
            show5DaysForecast(res.data.DailyForecasts);
           // console.log(res.data.DailyForecasts);
           // return res.data[0].Temperature.Metric.Value;
        }) 
        .catch(err => {
            console.error(err);
        })
}

function displayCurrentConditions (temp) {
    currentTemp.innerHTML = `${temp} &#8451;`;
    currentCond.style.display = 'flex';
}


function show5DaysForecast(data) {
    console.log(data);
    var htmlTable = ``;

    data.forEach(el => {
        htmlTable += `
        <tr>
            <td>${displayDate(el.Date)}</td>
            <td>${el.Temperature.Minimum.Value}</td>
            <td>${el.Temperature.Maximum.Value}</td>
        </tr>
        `;

    })

    table.innerHTML = htmlTable;
    forecast.style.display = 'flex';
}

function displayDate(date) {
    var oldDate = new Date(date);

    const day = oldDate.getDate() < 10 ? '0' + oldDate.getDate().toString() : oldDate.getDate().toString();
    let month = oldDate.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();
    const year = oldDate.getFullYear().toString();

    const newDate = `${day}/${month}/${year}`

    console.log(newDate);
    return newDate;

}

displayDate('2021-08-18T07:00:00+03:00');