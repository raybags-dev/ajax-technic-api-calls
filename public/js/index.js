"use strict";

import { CreateBackdrop } from "./backdrop.js";
import { createPagenationButtons } from "./PagenationButton.js";
import {
  postItem,
  CreateQuote,
  todoItem,
  userItem,
  createMovieItem,
  imageCreator,
  networkError,
  createISShtmlContainer,
  graphContainer,
} from "./templates.js";
import { TMDT_API_KEY } from "./apikey.js";

const xhttp = new XMLHttpRequest();
const getPosts = document.querySelector(".get-posts");
const getTodos = document.querySelector(".get-todos");
const getUsers = document.querySelector(".get-images");
const getQuotes = document.querySelector(".get-quotes");
const getMovies = document.querySelector(".get-movies");
const getISSposition = document.querySelector(".get-ISS-location");
const getGlobalData = document.querySelector(".get-temperature");

// links
const postsLink = "https://jsonplaceholder.typicode.com/posts";
// tasks link
const todoLink = "https://jsonplaceholder.typicode.com/todos";
// users link
const usersLink = "https://jsonplaceholder.typicode.com/users";
// quotes link
const quotesLink = "https://type.fit/api/quotes";

// movie images
const img_500 = "https://image.tmdb.org/t/p/w500";
const noPosterAvailable = `/public/img/noPoster.jpg`;
// ISS base url
const ISS_base_url = "https://api.wheretheiss.at/v1/satellites/25544";
// Global ISS interval
const temp_url = "/public/data/ZonAnn.Ts+dSST.csv";

let ISS_interval;

$(document).ready(function () {
  // slide in all paragraphs
  $(".p_x").each((index, p) => {
    $(p)
      .delay(100 * index)
      .animate(
        {
          "margin-top": "0%",
        },
        1000
      );
  });
  // animate lines
  $(".lines").each((index, lines) =>
    $(lines).delay(2500).animate({ width: "100%", opacity: 1 })
  );
  // Spinner
  $("#spinner").addClass("hide");

  // remove backdrop on body click handler
  $(document).on("click", (event) => {
    try {
      let clickedOnElement = event.target.closest(".backdrop-container").length;
      if (clickedOnElement) {
        $(".backdrop-container").remove();
      } else {
        $(".backdrop-container").remove();
      }
    } catch (e) {}
  });

  // offline online handler
  const offline = function () {
    let online = window.navigator.onLine;
    if (!online) networkError();
  };

  // Handle arrow direction display handler
  const hideArrowDirectionContainer = function () {
    // elemnts to be hidden
    const arrayOfElemnetsToBeHidden = [$(".direction-arrow-container")];
    $(arrayOfElemnetsToBeHidden).each((index, element) => {
      $(element).addClass("hide");
    });
  };

  // hide direction arrows on click of any button | engagement acquired
  $(".BTN").each((ind, ele) => {
    $(ele).on("click", hideArrowDirectionContainer);
  });

  // apply button effect handler
  (() => {
    const setBTNanimation = function () {
      $(".BTN").each(function (ind, button) {
        setTimeout(() => {
          $(button).addClass("BTN_hover_effect");
        }, ind * 200);

        setTimeout(() => {
          $(button).removeClass("BTN_hover_effect");
        }, ind * 280);
      });
    };
    // animation variable
    const BTNHoverEffect = setInterval(setBTNanimation, 6000);
    // remove interval on button hover
    $(document).on("click", () => {
      clearInterval(BTNHoverEffect);
      $(".BTN").removeClass("BTN_hover_effect");
    });
  })();

  // Remove Backdrop handler
  const removeBackdropContainer = function () {
    $(".close-backdrop-btn").on("click", () => {
      $(".backdrop-container")
        .slideUp()
        .delay(1000, function () {
          $(this).remove();
        });
    });
  };

  // remove interval and anable ISS button
  (function () {
    $(".BTN").each((index, button) => {
      $(button).on("click", (e) => {
        e.currentTarget.innerHTML !== "iss"
          ? clearInterval(ISS_interval)
          : true;
        // anable ISS button on click
        $(".get-ISS-location").removeAttr("disabled");
      });
    });
  })();

  // PAGINATION BUTTONS HANDLER ================//
  const paginationHandler = function () {
    // create pagenation buttons
    createPagenationButtons();

    // API call
    $(".more_movies_btn a").each(async (ind, movielink) => {
      $(movielink).on("click", function (e) {
        e.preventDefault();
        // scroll handler
        // Handle content container inner scroll
        (function () {
          let target = $("body");
          $("#data-container").animate({ scrollTop: $(target).offset().top });
        })();

        const moviewLink = `https://api.themoviedb.org/3/trending/all/day?api_key=1fd9e2240dd7b999db65cb61d9ca50cf&page=${$(
          movielink
        ).text()}`;

        //============ AJAX CALL FOR MORE MOVIES HANDLER
        (() => {
          // offline handler

          offline();
          // apply loading effetc class
          $("#data-container").addClass("loadingAnimation");
          // add spinner
          $("#spinner").removeClass("hide");

          xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              $(".movie").remove();
              // remove all movie posters from slider
              $(".img_result").remove();
              // remove ISS container
              $(".ISS-map-container").remove();
              $(".ISS-data-wrapper").remove();

              // remove global temperature component
              $("#chart").remove();
              // remove spinner
              $("#spinner").addClass("hide");
              // remove loading effetc class
              $("#data-container").removeClass("loadingAnimation");
              const data = this.responseText;
              const response = JSON.parse(data);
              const movieArray = response.results;

              // no image replacement

              // Movies data distructuring
              movieArray.forEach((obj) => {
                const {
                  backdrop_path,
                  original_name,
                  overview,
                  release_date,
                  title,
                  vote_average,
                } = obj;
                // poster or no poster
                const moviePoster = backdrop_path
                  ? `${img_500}/${backdrop_path}`
                  : noPosterAvailable;
                // overview or no overview
                const overView = `${
                  overview || "no movie description for this item"
                }`;
                // rating or no rating
                const rating = `${vote_average || "--"}`;
                // title or original title
                const movie_title = `${title || original_name}`;
                // create movie and map data to element
                createMovieItem(
                  movie_title,
                  moviePoster,
                  overView,
                  release_date,
                  rating
                );
                imageCreator(moviePoster);
              });
              // Create Backdrop when movie is clicked handler
              (function () {
                $(".movie").each((index, movieItem) => {
                  $(movieItem).on("click", (e) => {
                    const bd_title =
                      $(movieItem).children()[0].innerText || "Title Unknown";
                    const bd_image_url =
                      $(movieItem).children()[1].src || noPosterAvailable;
                    const bd_details = $(movieItem).children()[2].innerText;
                    const bd_release_date =
                      $(movieItem).children()[3].innerText || "Not yet set";
                    const bd_rating =
                      $(movieItem).children()[4].innerText || "Not known";

                    CreateBackdrop(
                      `${bd_image_url}`,
                      bd_title,
                      bd_release_date,
                      bd_details,
                      bd_rating
                    );
                    // remove backdrop
                    removeBackdropContainer();
                  });
                });
              })();
            }
          };
          xhttp.open("GET", moviewLink, true);
          xhttp.send();
          return;
        })();
      });
    });
  };
  // ============AJAX CALL FOR PHOTO HANDLER =================
  const loadUsersDemoData = function (resourceLink) {
    // offline handler

    offline();
    //   remove placeholder container
    $(".placeholder-container").css({ display: "none" });

    // remove task data from the dom
    $(".task").remove();
    // remove post data from the dom
    $(".post").remove();
    // remove quote data from the dom
    $(".quote").remove();
    // remove users data from dom
    $(".movie").remove();
    // remove more movie button container
    $(".more_movies_btn").remove();
    // remove ISS container
    $(".ISS-map-container").remove();
    $(".ISS-data-wrapper").remove();
    // remove global temperature component
    $("#chart").remove();

    // apply loading effetc class
    $("#data-container").addClass("loadingAnimation");
    // add spinner
    $("#spinner").removeClass("hide");

    xhttp.onreadystatechange = function () {
      // Hide heading text
      $(".content-main-heading").css({ transform: "translate(-50%, -500%)" });
      if (this.readyState === 4 && this.status === 200) {
        // remove spinner
        $("#spinner").addClass("hide");
        // remove loading effetc class
        $("#data-container").removeClass("loadingAnimation");
        const data = this.responseText;
        const response = JSON.parse(data);

        // posts data distructure=ing
        $(response).each((i, obj) => {
          const { id, name, username, email, phone, website } = obj;
          const { name: company_name, catchPhrase, bs } = obj.company;

          userItem(
            id,
            name,
            username,
            email,
            phone,
            company_name,
            website,
            catchPhrase,
            bs
          );
        });
        // change heading text
        $(".content-main-heading")
          .text("all users")
          .css({ transform: "translate(-50%, -50%)" });
      }
    };
    xhttp.open("GET", resourceLink, true);
    xhttp.send();
    return;
  };

  // ============AJAX CALL FOR POSTS HANDLER =================
  const loadPostsDemoData = function (resourceLink) {
    // offline handler

    offline();
    try {
      //   remove placeholder container
      $(".placeholder-container").css({ display: "none" });
      // remove task data from the dom
      $(".task").remove();
      // remove post data from the dom
      $(".photo").remove();
      // remove user data from the dom
      $(".user").remove();
      // remove quote data from the dom
      $(".quote").remove();
      // remove users data from dom
      $(".movie").remove();
      // remove more movie button container
      $(".more_movies_btn").remove();
      // remove ISS container
      $(".ISS-map-container").remove();
      $(".ISS-data-wrapper").remove();
      // remove global temperature component
      $("#chart").remove();

      // apply loading effetc class
      $("#data-container").addClass("loadingAnimation");
      // add spinner
      $("#spinner").removeClass("hide");

      xhttp.onreadystatechange = function (e) {
        // Hide heading text
        $(".content-main-heading").css({ transform: "translate(-50%, -500%)" });

        if (this.readyState === 4 && this.status === 200) {
          // remove spinner
          $("#spinner").addClass("hide");

          // remove loading effetc class
          $("#data-container").removeClass("loadingAnimation");
          const data = this.responseText;
          const response = JSON.parse(data);

          // posts data distructure=ing
          response.forEach((obj) => {
            const { body, id, title, userId } = obj;
            postItem(userId, id, title, body);
          });
          // change heading text
          $(".content-main-heading")
            .text("all posts")
            .css({ transform: "translate(-50%, -50%)" });
        }
      };

      xhttp.open("GET", resourceLink, true);
      xhttp.send();
    } catch (e) {
      console.log(e.message);
    }
  };

  //============ AJAX CALL FOR TODOS HANDLER
  const loadTodosDemoData = function (resourceLink) {
    // offline handler

    offline();
    //   remove placeholder container
    $(".placeholder-container").css({ display: "none" });
    // remove post data from the dom
    $(".post").remove();
    // remove post data from the dom
    $(".photo").remove();
    // remove user data from the dom
    $(".user").remove();
    // remove quote data from the dom
    $(".quote").remove();
    // remove users data from dom
    $(".movie").remove();
    // remove more movie button container
    $(".more_movies_btn").remove();
    // remove ISS container
    $(".ISS-map-container").remove();
    $(".ISS-data-wrapper").remove();
    // remove global temperature component
    $("#chart").remove();

    // apply loading effetc class
    $("#data-container").addClass("loadingAnimation");
    // add spinner
    $("#spinner").removeClass("hide");

    xhttp.onreadystatechange = function () {
      // Hide heading text
      $(".content-main-heading").css({ transform: "translate(-50%, -500%)" });
      if (this.readyState === 4 && this.status === 200) {
        // remove spinner
        $("#spinner").addClass("hide");
        // remove loading effetc class
        $("#data-container").removeClass("loadingAnimation");
        const data = this.responseText;
        const response = JSON.parse(data);

        // posts data distructure=ing
        response.forEach((obj) => {
          const { completed, id, title, userId } = obj;
          todoItem(completed, id, title, userId);
        });
        // change heading text
        $(".content-main-heading")
          .text("All tasks")
          .css({ transform: "translate(-50%, -50%)" });
      }
    };
    xhttp.open("GET", resourceLink, true);

    xhttp.send();
    return;
  };
  //============ AJAX CALL FOR QUOTES HANDLER
  const loadQuotesDemoData = function (resourceLink) {
    // offline handler

    offline();
    //   remove placeholder container
    $(".placeholder-container").css({ display: "none" });
    // remove post data from the dom
    $(".post").remove();
    // remove user data from the dom
    $(".photo").remove();
    // remove users data from dom
    $(".task").remove();
    // remove users data from dom
    $(".movie").remove();
    // remove more movie button container
    $(".more_movies_btn").remove();
    // remove ISS container
    $(".ISS-map-container").remove();
    $(".ISS-data-wrapper").remove();
    // remove global temperature component
    $("#chart").remove();

    // apply loading effetc class
    $("#data-container").addClass("loadingAnimation");
    // add spinner
    $("#spinner").removeClass("hide");

    xhttp.onreadystatechange = function () {
      // Hide heading text
      $(".content-main-heading").css({ transform: "translate(-50%, -500%)" });
      if (this.readyState === 4 && this.status === 200) {
        // remove spinner
        $("#spinner").addClass("hide");
        // remove loading effetc class
        $("#data-container").removeClass("loadingAnimation");
        const data = this.responseText;
        const response = JSON.parse(data);

        // posts data distructure=ing
        response.forEach((obj) => {
          const { author, text } = obj;
          // create elemnet and map data to element
          CreateQuote(author, text);
        });

        // change heading text
        $(".content-main-heading")
          .text("All quotes")
          .css({ transform: "translate(-50%, -50%)" });
      }
    };
    xhttp.open("GET", resourceLink, true);
    xhttp.send();
    return;
  };

  //============ AJAX CALL FOR MOVIE HANDLER==========
  // increment count on click for movie pages
  let pageCounter = 1;

  const loadMovies = function () {
    // offline handler
    offline();
    //   remove placeholder container
    $(".placeholder-container").css({ display: "none" });
    // remove post data from the dom
    $(".post").remove();
    // remove user data from the dom
    $(".photo").remove();
    // remove users data from dom
    $(".task").remove();
    // remove users data from dom
    $(".quote").remove();
    // remove all movie posters from slider
    $(".img_result").remove();
    // remove ISS container
    $(".ISS-map-container").remove();
    $(".ISS-data-wrapper").remove();
    // remove global temperature component
    $("#chart").remove();

    // apply loading effetc class
    $("#data-container").addClass("loadingAnimation");
    // add spinner
    $("#spinner").removeClass("hide");

    xhttp.onreadystatechange = function () {
      // Hide heading text
      $(".content-main-heading").css({ transform: "translate(-50%, -500%)" });
      if (this.readyState === 4 && this.status === 200) {
        // on error
        if (this.onerror) {
          console.log("the server is non responsive , check your internet.");
        }
        // create get more movies buttons
        paginationHandler();
        // remove spinner
        $("#spinner").addClass("hide");
        // remove loading effetc class
        $("#data-container").removeClass("loadingAnimation");
        const data = this.responseText;
        const response = JSON.parse(data);
        const movieArray = response.results;

        // Movies data distructuring
        movieArray.forEach((obj) => {
          const {
            backdrop_path,
            original_name,
            overview,
            release_date,
            title,
            vote_average,
          } = obj;

          // poster or no poster
          const moviePoster = backdrop_path
            ? `${img_500}/${backdrop_path}`
            : noPosterAvailable;
          // overview or no overview
          const overView = `${
            overview || "no movie description for this item"
          }`;
          // rating or no rating
          const rating = `${vote_average || "--"}`;
          // title or original title
          const movie_title = `${title || original_name}`;
          // release date
          const releaseDate = `${release_date || "unavailable"}`;
          // create movie and map data to element
          createMovieItem(
            movie_title,
            moviePoster,
            overView,
            releaseDate,
            rating
          );
          imageCreator(moviePoster);
        });
        // change heading text
        $(".content-main-heading")
          .text("Trending movies")
          .css({ transform: "translate(-50%, -50%)" });

        // Create Backdrop when movie is clicked handler
        (function () {
          $(".movie").each((index, movieItem) => {
            $(movieItem).on("click", (e) => {
              const bd_title = $(movieItem).children()[0].innerText;
              const bd_image_url = $(movieItem).children()[1].src;
              const bd_details = $(movieItem).children()[2].innerText;
              const bd_release_date = $(movieItem).children()[3].innerText;
              const bd_rating = $(movieItem).children()[4].innerText;

              CreateBackdrop(
                `${bd_image_url}`,
                bd_title,
                bd_release_date,
                bd_details,
                bd_rating
              );
              // remove backdrop
              removeBackdropContainer();
            });
          });
        })();

        // go to bottom
        (() => {
          $("#data-container").animate({
            scrollTop: $(".main-wrapper .movie:last-child").position().top,
          });
        })();
      }
    };
    xhttp.open(
      "GET",
      `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDT_API_KEY}&page=${pageCounter}`,
      true
    );
    xhttp.send();
    pageCounter++;
  };

  // ISS global position location handler

  const loadISSLocation = function (resourceLink) {
    // offline handler
    offline();
    // Hide heading text
    $(".content-main-heading").css({ transform: "translate(-50%, -500%)" });
    //   remove placeholder container
    $(".placeholder-container").css({ display: "none" });
    // remove post data from the dom
    $(".post").remove();
    // remove user data from the dom
    $(".photo").remove();
    // remove users data from dom
    $(".task").remove();
    // remove users data from dom
    $(".quote").remove();
    // remove all movie elements
    $(".movie").remove();
    // remove paginatino component
    $(".more_movies_btn").remove();
    // remove global temperature component
    $("#chart").remove();

    // apply loading effect class
    $("#data-container").addClass("loadingAnimation");
    // add spinner
    $("#spinner").removeClass("hide");

    // create map and data html container
    createISShtmlContainer();
    // create map
    const mymap = L.map("ISS_map").setView([0, 0], 4);
    // map attribution
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    // tile URL
    const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    // create icon
    const issIcon = L.icon({
      iconUrl: "/public/img/iss.png",
      iconSize: [50, 32],
      iconAnchor: [25, 16],
    });

    // map tyles
    const tiles = L.tileLayer(tileURL, { attribution });
    // add tiles to map
    tiles.addTo(mymap);

    const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);
    // disable ISS button on click
    $(".get-ISS-location").attr({ disabled: "true" });

    // and update data automatically every after 3 seconds
    const getISSdataInINtervals = () => {
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          // remove spinner
          $("#spinner").addClass("hide");
          // remove loading effetc class
          $("#data-container").removeClass("loadingAnimation");
          const data = this.responseText;
          const results = JSON.parse(data);
          const {
            id,
            latitude,
            longitude,
            altitude,
            velocity,
            visibility,
            timestamp,
            units,
            name,
          } = results;

          // create ISS conatiern
          const paragraphs = $(".ISS-data-wrapper").children();
          paragraphs.each((index, paragraph) => {
            if ($(paragraph).hasClass("iss-id"))
              $(paragraph).text(`space-station-id: ${id}`);
            if ($(paragraph).hasClass("iss-name"))
              $(paragraph).text(`space-station-name: ${name}`);

            if ($(paragraph).hasClass("iss-latitude"))
              $(paragraph).text(`iss-latitude: ${latitude.toFixed(4)} °`);
            if ($(paragraph).hasClass("iss-longitude"))
              $(paragraph).text(`longitude: ${longitude.toFixed(4)} °`);

            if ($(paragraph).hasClass("iss-altitude"))
              $(paragraph).text(`altitude: ${altitude.toFixed(4)} °`);
            if ($(paragraph).hasClass("iss-velocity"))
              $(paragraph).text(`velocity: ${velocity}`);
            if ($(paragraph).hasClass("iss-visibility"))
              $(paragraph).text(`visibility: ${visibility}`);
            if ($(paragraph).hasClass("iss-timestamp"))
              $(paragraph).text(`dtimestamp: ${timestamp}`);
            if ($(paragraph).hasClass("iss-units"))
              $(paragraph).text(`units: ${units}`);

            // add marker to map
            marker.setLatLng([latitude, longitude]);
            mymap.setView([latitude, longitude]);
            // mymap.panTo([latitude, longitude]);
          });
        }
      };

      xhttp.open("GET", resourceLink, true);
      xhttp.send();
    };

    // set heading
    const setISS_heading = () => {
      // change heading text
      $(".content-main-heading")
        .text("ISS Current Location")
        .css({ transform: "translate(-50%, -50%)" });
    };
    // call get data handler after 1.5seconds
    ISS_interval = setInterval(getISSdataInINtervals, 1500);
    setTimeout(setISS_heading, 3500);
  };

  // create chart handler
  const xlabels = [];
  const ytemps = [];
  const createChart = async function () {
    const graph_options = ["line", "bubble", "bar", "scatter"];

    const container = document.getElementById("chart");

    const ctx = container.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: xlabels,
        datasets: [
          {
            label:
              "Combined Land-Surface Air and Sea-Surface Water Temperature ℃ ",
            data: ytemps,
            fill: false,
            responsive: true,
            backgroundColor: "rgba(255, 99, 132, 0.7)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              callback: function (value, index, values) {
                return `${value.toFixed(2)} º`;
              },
            },
          },
        },
      },
    });
  };
  //==== AJAX CALL FOR GLOBAL TEMPERATURE HANDLER =====//

  const globalTemp = function (resourceLink) {
    // offline handler
    offline();
    //   remove placeholder container
    $(".placeholder-container").css({ display: "none" });
    // empty content container
    $("#data-container").empty();
    // apply loading effetc class
    $("#data-container").addClass("loadingAnimation");
    // add spinner
    $("#spinner").removeClass("hide");

    xhttp.onreadystatechange = async function () {
      // Hide heading text
      $(".content-main-heading").css({ transform: "translate(-50%, -500%)" });
      if (this.readyState === 4 && this.status === 200) {
        // remove spinner
        $("#spinner").addClass("hide");
        // remove loading effetc class
        $("#data-container").removeClass("loadingAnimation");
        // create canvas for data
        graphContainer();
        // create chart
        await createChart();

        // data
        const data = this.responseText;
        // create tabel of data
        const data_table = data.split(/\n/).slice(1);
        // create rows and columns from data
        data_table.forEach((row) => {
          const columns = row.split(",");
          const year = columns[0];
          const temp = columns[2];

          xlabels.push(year);
          ytemps.push(parseFloat(temp));
        });

        // change heading text
        $(".content-main-heading")
          .text("Global Temperature")
          .css({ transform: "translate(-50%, -50%)" });
      }
    };
    xhttp.open("GET", resourceLink, true);
    xhttp.send();
    return;
  };

  getPosts.addEventListener("click", () => loadPostsDemoData(postsLink));
  getTodos.addEventListener("click", () => loadTodosDemoData(todoLink));
  getUsers.addEventListener("click", () => loadUsersDemoData(usersLink));
  getQuotes.addEventListener("click", () => loadQuotesDemoData(quotesLink));
  getMovies.addEventListener("click", () => loadMovies());
  getISSposition.addEventListener("click", () => loadISSLocation(ISS_base_url));
  getGlobalData.addEventListener("click", () => globalTemp(temp_url));
});
