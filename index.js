const userTabe = document.querySelector("[data-userweather]");
const searchTabe = document.querySelector("[data-searchweather]");
const usercontainer = document.querySelector(".container");
const grantaccessContainer = document.querySelector(".grant-loction-container");
const searchForm = document.querySelector("[data-searcform]");
const loadingScreen = document.querySelector(".loddin-container");
const userweatherinfo = document.querySelector(".user-weather-info"); 

let currTabe = userTabe;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
grantsessioncorrdinates();
currTabe.classList.add("Current_tab");
function switchTabe(cliclkTabe){
    if(cliclkTabe!=currTabe){
        currTabe.classList.remove("Current_tab");
        currTabe = cliclkTabe;
        currTabe.classList.add("Current_tab");

        if(!searchForm.classList.contains("active")){
            userweatherinfo.classList.remove("active");
            grantaccessContainer.classList.remove("active");
            searchForm.classList.add("active");
            
        }
        else{
           searchForm.classList.remove("active");
          
           userweatherinfo.classList.add("active"); 
           grantsessioncorrdinates();  
        }

    }
    // else{
    //     userweatherinfo.classList.add("active");
    // }
}
userTabe.addEventListener("click",()=>{
    switchTabe(userTabe);
});
searchTabe.addEventListener("click",()=>{
    switchTabe(searchTabe);
});

function grantsessioncorrdinates() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
        //agar local coordinates nahi mile
        grantaccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    // make grantcontainer invisible
    grantaccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userweatherinfo.classList.add("active");
        rendereWeatherinfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
        //HW

    }

}
function rendereWeatherinfo(weatherInfo){
    const city_name = document.querySelector("[data-countryname]");
    const country_falge= document.querySelector("[data-countryflag]");
    const weather_des = document.querySelector("[dat-weatherdecs]");
    const weather_img = document.querySelector("[data-weathericon]");
    const city_temp = document.querySelector("[data-temprature]");
    const wind_speed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const coludey = document.querySelector("[data-cloud]");

    city_name.innerText = weatherInfo?.name;
    country_falge.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weather_des.innerText = weatherInfo?.weather?.[0]?.description;
    weather_img.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    city_temp.innerText =  `${weatherInfo?.main?.temp}°C`;
    wind_speed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    coludey.innerText = `${weatherInfo?.clouds?.all}%`;

}
console.log("render function complete");
function getcurrentLoction(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(howPosition);
    }
    else{
        console.log("geoloction not found");
    }
 }
 console.log("taking current location");
 function howPosition(position){
    const usercoodinate = { 
         lat:position.coords.latitude,
         lon:position.coords.longitude,
    }
    // console.log(usercoodinate);
    sessionStorage.setItem("user-coordinates",JSON.stringify(usercoodinate));
    fetchUserWeatherInfo(usercoodinate);

      

 }
 console.log("current loction");
const Access_button = document.querySelector("[data-grantaccess]");
Access_button.addEventListener("click",getcurrentLoction);
const searchinfo =document.querySelector("[data-searchinfo]");
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityname = searchinfo.value;
    if(cityname === ""){
        return;
    }
    else{
        fectchwetherinfobycity(cityname);
    }
})
// console.log("eventlistner");
async function fectchwetherinfobycity(cityname){
        loadingScreen.classList.add("active");
        userweatherinfo.classList.remove("active");
        grantaccessContainer.classList.remove("active");
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            loadingScreen.classList.remove("active");
            userweatherinfo.classList.add("active");
            rendereWeatherinfo(data);
        }
        catch(e){

        }
}
console.log("hdnud");

