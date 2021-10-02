// POST HTML
const postItem = function (user_ud, post_id, post_title, body_content) {
  const singlePostDiv = $("<div></div>")
      .attr({ class: "post" })
      .animate({ opacity: 1 }),
    para_userID = $("<p></p>")
      .attr("class", "user-id")
      .text(`User id: ` + user_ud),
    para_postID = $("<p></p>")
      .attr("class", "item-id")
      .text(`Post id: ` + post_id),
    para_postTitle = $("<p></p>")
      .attr("class", "title")
      .text(`Post title: ` + post_title),
    para_post_body = $("<p></p>")
      .attr("class", "post_body")
      .text(`Details id: ` + body_content);

  $(singlePostDiv).append(
    para_userID,
    para_postID,
    para_postTitle,
    para_post_body
  );
  $("#data-container").append($(singlePostDiv));
};

// QUOTE HTML
const CreateQuote = function (author, text) {
  const singleQuoteDiv = $("<div></div>")
      .attr({ class: "quote" })
      .animate({ opacity: 1 }),
    para_author = $("<p></p>")
      .attr("class", "quote-author")
      .text(`Author: ` + author),
    para_text = $("<p></p>")
      .attr("class", "quote-author")
      .text(`Quote: ` + text);

  $(singleQuoteDiv).append(para_author, para_text);
  $("#data-container").append($(singleQuoteDiv));
};
// TODO HTML
//CLREATE A SINGLE TODO HTML BOILERPLATE HANDLER
const todoItem = function (task_user_id, task_id, task_title, itemCompleted) {
  const singlePostDiv = $("<div></div>")
      .attr({ class: "task" })
      .animate({ opacity: 1 }),
    para_taskUserID = $("<p></p>")
      .attr("class", "task-user-id")
      .text(`User id: ` + task_user_id),
    para_taskID = $("<p></p>")
      .attr("class", "task-id")
      .text(`Task id: ` + task_id),
    para_taskTitle = $("<p></p>")
      .attr("class", "task-title")
      .text(`Task title: ` + task_title),
    para_task_completed = $("<p></p>")
      .attr("class", "task-completed")
      .text(`Task completed: ` + itemCompleted);

  $(singlePostDiv).append(
    para_taskUserID,
    para_taskID,
    para_taskTitle,
    para_task_completed
  );
  $("#data-container").append($(singlePostDiv));
};

//CLREATE A SINGLE IMAGES HTML BOILERPLATE HANDLER id, name, username, email, phone, website
const userItem = function (
  user_id,
  name,
  user_name,
  user_phone,
  user_email,
  user_website,
  user_company,
  company_catchphrase,
  company_bs
) {
  const singleUserDiv = $("<div></div>")
      .attr({ class: "photo" })
      .animate({ opacity: 1 }),
    para_userID = $("<p></p>")
      .attr("class", "album-id")
      .text(`User id: ` + user_id),
    para_name = $("<p></p>")
      .attr("class", "photo-id")
      .text(`Name: ` + name),
    para_user_name = $("<p></p>")
      .attr("class", "photo-title")
      .text(`User name: ` + user_name),
    para_email = $("<p></p>")
      .attr("class", "photo-url")
      .text(`User email: ` + user_email),
    para_phone = $("<p></p>")
      .attr("class", "photo-thumbnail")
      .text(`Phone: ` + user_phone),
    para_company = $("<p></p>")
      .attr("class", "photo-thumbnail")
      .text(`Company: ` + user_company),
    para_website = $("<p></p>")
      .attr("class", "photo-thumbnail")
      .text(`Website: ` + user_website),
    para_catchphrase = $("<p></p>")
      .attr("class", "photo-thumbnail")
      .text(`Catch Phrase: ` + company_catchphrase),
    para_bs = $("<p></p>")
      .attr("class", "photo-thumbnail")
      .text(`Company BS: ` + company_bs);

  $(singleUserDiv).append(
    para_userID,
    para_name,
    para_user_name,
    para_phone,
    para_email,
    para_company,
    para_website,
    para_catchphrase,
    para_bs
  );
  $("#data-container").append($(singleUserDiv));
};

// MOVIE HTML
const createMovieItem = function (
  movie_Title,
  movie_Poster,
  movie_Overview,
  movie_Release_date,
  movie_Vote_average
) {
  // no poster available
  const singleMovieDiv = $("<div></div>")
      .attr({ class: "movie" })
      .animate({ opacity: 1 }),
    para_m_title = $("<p></p>").attr("class", "movie-title").text(movie_Title),
    post_img = $("<img />").attr({
      class: "movie-poster",
      src: `${movie_Poster}`,
      alt: "poster",
    }),
    para_m_overview = $("<p></p>")
      .attr("class", "movie-overview")
      .text(`Details: ` + movie_Overview),
    para_m_release = $("<p></p>")
      .attr("class", "movie-release")
      .text(movie_Release_date),
    para_m_vote = $("<p></p>")
      .attr("class", "movie-vote")
      .text(movie_Vote_average);

  // append movie container
  $(singleMovieDiv).append(
    para_m_title,
    post_img,
    para_m_overview,
    para_m_release,
    para_m_vote
  );
  $("#data-container").append($(singleMovieDiv));
  $(".movie-vote").addClass("no-rating");
};
// IMAGE HTML
const imageCreator = function (movie_results_image_link) {
  const IMG = $("<img />").attr({
    class: "img_result",
    src: movie_results_image_link,
  });
  $(".slidesjs-control").prepend($(IMG));
};

// NETWORK ERROR HTML
const networkError = function () {
  // arrow button
  const arror_btn = $("<i></i>").attr({ class: "fas fa-arrow-right" }),
    // error head home button
    error_head_home = $("<a></a>")
      .attr({
        href: "https://api-ajax-technics-with-js-jquery.netlify.app/",
      })
      .text("refresh page")
      .append(arror_btn),
    // error network button
    network_btn_link = $("<a></a>")
      .attr({
        href: "https://projects-page.netlify.app/",
      })
      .text("back to projects page."),
    // error details
    error_para = $("<p></p>").text(
      "not sure how to say this but it'd seem your internet is out."
    ),
    // error heading
    error_heading = $("<h3></h3>")
      .attr({ class: "error-heading" })
      .text("Oops"),
    // error main wrapper
    article = $("<article></article>")
      .attr({ class: "error-container" })
      .css({
        background:
          "linear-gradient(30deg, rgb(65, 19, 19), hsl(229, 98%, 41%))",
      })
      .append(error_heading, error_para, network_btn_link, error_head_home);

  $(article).insertBefore(".direction-arrow-container");
  $("#spinner").addClass("hide");
  $("#data-container").removeClass("loadingAnimation");
  $("#slides").addClass("hide");
  return;
};

// ISS HTML template

const createISShtmlContainer = function () {
  const current_date = new Date().toLocaleDateString();
  const current_time = new Date().toLocaleTimeString();

  const para_id = $("<p></p>").attr({ class: "iss-id" }).text(`id: --`),
    para_name = $("<p></p>").attr({ class: "iss-name" }).text(`name: --`),
    para_1 = $("<p></p>").attr({ class: "iss-latitude" }).text(`latitude: --`),
    para_2 = $("<p></p>")
      .attr({ class: "iss-longitude" })
      .text(`longitude: --`),
    para_3 = $("<p></p>").attr({ class: "iss-altitude" }).text(`altitude: --`),
    para_4 = $("<p></p>").attr({ class: "iss-velocity" }).text(`velocity: --`),
    para_5 = $("<p></p>")
      .attr({ class: "iss-visibility" })
      .text(`visibility:  --`),
    para_6 = $("<p></p>")
      .attr({ class: "iss-timestamp" })
      .text(`timestamp: --`),
    para_7 = $("<p></p>").attr({ class: "iss-units" }).text(`units:  --`),
    para_8 = $("<p></p>")
      .attr({ class: "local-time" })
      .text(`local time: ${current_date}, ${current_time}`);

  const ISS_data_container = $("<div></div>")
    .attr({ class: "ISS-data-wrapper" })
    .append(
      $(para_id),
      $(para_name),
      $(para_1),
      $(para_2),
      $(para_3),
      $(para_4),
      $(para_5),
      $(para_6),
      $(para_7),
      $(para_8)
    );
  $(".main-wrapper").append(ISS_data_container);
  // main container
  const ISS_map_container = $("<div></div>").attr({
    class: "ISS-map-container",
    id: "ISS_map",
  });
  $(".main-wrapper").append($(ISS_map_container));
};

// GLOBAL TEMPERATURE HTML template
const graphContainer = function () {
  const container = $("<canvas></canvas>").attr({ id: "chart" });
  $(".main-wrapper").append($(container));
};

// Weather component
const weather__component = function (
  humidity,
  country,
  windspeed,
  city,
  degrees,
  feelsLike,
  weatherr_status,
  weather_image
) {
  const time = new Date(),
    day = time.toLocaleTimeString();

  // weather status  paragraph
  const weather_statuss = $("<span></span>")
    .attr({ class: "weather-status-para" })
    .text(`${weatherr_status}`);
  // feels like  paragraph
  const feels_like = $("<span></span>")
    .attr({ class: "feels-para" })
    .text(`${feelsLike}`);

  // degrees paragraph
  const degrees_para = $("<span></span>")
    .attr({ class: "deg-para" })
    .text(`${degrees}`);
  // city headingh
  const city_heading = $("<h1></h1>")
    .attr({ class: "city-heading" })
    .text(`${city}`);
  // paragraph for inner dat-time container
  const para_time_inner = $("<p></p>")
    .attr({ class: "inner-time-container" })
    .text(`${day}`);
  // middle data container
  const middle_data_container = $("<div></div>")
    .attr({ class: "middle-data-container" })
    .append($(para_time_inner), $(city_heading), $(degrees_para));
  // windspeed para
  const windSpeed_para = $("<p></p>")
    .attr({ class: "wind-para" })
    .text(`${windspeed}`);
  // country para
  const country_para = $("<p></p>")
    .attr({ class: "country-para" })
    .text(`${country}`);
  // humidity
  const dumidity_para = $("<p></p>")
    .attr({ class: "humid-para" })
    .text(`${humidity}`);
  // navbar container
  const navBar = $("<div></div>")
    .attr({ class: "nav_weather" })
    .append($(dumidity_para), $(country_para), $(windSpeed_para));
  // bg image
  const bg_img = $("<img/>").attr({
    class: "component-bg",
    src: weather_image,
  });

  // icon text
  const p_1 = $("<p></p>").text("day 1");
  const p_2 = $("<p></p>").text("day 2");
  const p_3 = $("<p></p>").text("day 3");

  // icons
  const icon_1 = $("<i></i>").attr({ class: "fas fa-cloud-sun" });
  const icon_2 = $("<i></i>").attr({ class: "fas fa-cloud-rain" });
  const icon_3 = $("<i></i>").attr({ class: "fas fa-cloud" });

  // icon divs
  const icon_div_1 = $("<div></div>").append($(icon_1), $(p_1));
  const icon_div_2 = $("<div></div>").append($(icon_2), $(p_2));
  const icon_div_3 = $("<div></div>").append($(icon_3), $(p_3));

  // icon container
  const icon_container = $("<div></div>")
    .attr({ class: "icon-container" })
    .append($(icon_div_1), $(icon_div_2), $(icon_div_3));
  // main single weather component
  const component_container = $("<div></div>")
    .attr({ class: "weather-component" })
    .append(
      $(bg_img),
      $(navBar),
      $(middle_data_container),
      $(icon_container),
      $(feels_like),
      $(weather_statuss)
    );
  $(".main-wrapper").append($(component_container));
};
export {
  postItem,
  CreateQuote,
  todoItem,
  userItem,
  createMovieItem,
  imageCreator,
  networkError,
  createISShtmlContainer,
  graphContainer,
  weather__component,
};
