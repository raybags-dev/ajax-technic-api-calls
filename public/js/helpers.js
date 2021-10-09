import { weather__component } from "./templates.js";
import { THE_OPEN_WEATHERMAP_API_KEY } from "./apikey.js";

const xhttp = new XMLHttpRequest();

// weather London.
const wether_maker = function () {
  // city runner interval

  let cityRunnerInterval;
  const cities = [
    "amsterdam",
    "california",
    "new York",
    "chicago",
    "paris",
    "st petersburg",
    "dudinka",
    "nairobi",
    "harbin",
    "los angeles",
    "moscow",
    "mumbai",
    "tokyo",
    "delhi",
    "shanghai",
    "mexico",
    "osaka",
    "dhaka",
    "cairo",
    "karachi",
    "istanbul",
    "kolkata",
    "kinshasa",
    "lagos",
    "manila",
    "rotterdam",
    "florida",
    "munich",
    "luxembourg",
    "stockholm",
    "nuuk",
    "tokyo",
    "seoul",
    "entebbe",
    "pretoria",
  ];
  // remove spinner
  $("#spinner").addClass("hide");
  // remove loading effetc class
  // Hide heading text
  $(".content-main-heading").css({
    transform: "translate(-50%, -500%)",
  });

  function toCeliciousDegrees(fahrenheit) {
    let fTemp = fahrenheit;
    let degrees_celiciuus = (((fTemp - 32) * 5) / 9).toFixed(1);
    return { degrees_celiciuus };
  }

  // handle weather call
  function handleCall() {
    xhttp.onreadystatechange = async function () {
      if (this.readyState === 4 && this.status === 200) {
        const data = JSON.parse(this.responseText);
        const {
          coord: { lat, lon },
          main: { feels_like, humidity },
          name: city,
          weather: [{ description, main: weather_status }],
          wind: { deg, speed },
          sys: { country },
          timezone,
        } = data;

        const windSpeed = `windspeed: ${speed || "--"}`,
          humid = `humidity: ${humidity || "--"}`;

        const { degrees_celiciuus } = toCeliciousDegrees(deg),
          degrees = `${degrees_celiciuus || "--"} °C `;

        const { degrees_celiciuus: feels } = toCeliciousDegrees(feels_like),
          itFeelsLike = `It feels like ${feels || "--"} °C `;

        const target_city = `${city || "--"}`,
          weather_description = `Today it's ${description}`,
          weatherStatus = `${weather_status || "--"} today`;

        let weather_image_link = "";
        //     "/public/img/rainy_sunny-min.jpeg"

        if (degrees_celiciuus <= 500) {
          weather_image_link = "/public/img/sunny.jpg";
        }
        if (degrees_celiciuus <= 100) {
          weather_image_link = "/public/img/rainy.jpg";
        }
        if (degrees_celiciuus <= 70) {
          weather_image_link = "/public/img/cloudy_sunny_image-min.jpeg";
        }
        if (degrees_celiciuus <= 20) {
          weather_image_link = "/public/img/light_snow.jpg";
        }
        if (degrees_celiciuus <= 0) {
          weather_image_link = "/public/img/snowy.jpeg";
        }

        weather__component(
          humid,
          country,
          windSpeed,
          target_city,
          degrees,
          itFeelsLike,
          weather_description,
          weather_image_link
        );

        // change heading text
        $(".content-main-heading")
          .text("Global Temperature")
          .css({ transform: "translate(-50%, -50%)" });
      }
    };
  }

  let counter = 0,
    cityInterval;
  function loop() {
    if (cities[counter]) generateCityHTML(cities[counter]);
    else clearInterval(cityInterval);
    counter++;
  }
  cityInterval = setInterval(loop, 100);
  // if (counter === 18) clearInterval(cityInterval);

  // current city generator
  function generateCityHTML(current_city) {
    if (!current_city) return;

    handleCall();
    xhttp.open(
      "GET",
      `http://api.openweathermap.org/data/2.5/weather?q=${current_city}&APPID=${THE_OPEN_WEATHERMAP_API_KEY}`
    );
    xhttp.send();
  }

  $("#data-container").removeClass("loadingAnimation");
  clearInterval(cityRunnerInterval);
};

const setMovieRating = function (thisMovieRating) {
  $(thisMovieRating).each(function (index, thisMoivie) {
    let movieAverage = parseInt($(thisMoivie).text());

    if (
      movieAverage === undefined ||
      movieAverage === "" ||
      movieAverage === null
    )
      $(thisMoivie).addClass("no-rating");
    if (movieAverage <= 4.0)
      $(thisMoivie).removeClass("no-rating").addClass("low-rating");
    if (movieAverage > 4.1 && movieAverage <= 6.9)
      $(thisMoivie).removeClass("no-rating").addClass("average-rating");
    if (movieAverage >= 7.0)
      $(thisMoivie).removeClass("no-rating").addClass("top-rating");
  });
};

const scrollToTopOfThePage = function () {
  let target = $("body");
  $("#data-container").animate({ scrollTop: $(target).offset().top });
};

export { wether_maker, setMovieRating, scrollToTopOfThePage };
