"use strict";

import { CreateBackdrop } from "../backdrop.js";
import { createPagenationButtons } from "./PagenationButton.js";
import {
  postItem,
  CreateQuote,
  todoItem,
  userItem,
  createMovieItem,
  imageCreator,
  networkError,
} from "./templates.js";
import { TMDT_API_KEY } from "./apikey.js";

const xhttp = new XMLHttpRequest();
const getPosts = document.querySelector(".get-posts");
const getTodos = document.querySelector(".get-todos");
const getUsers = document.querySelector(".get-images");
const getQuotes = document.querySelector(".get-quotes");
const getMovies = document.querySelector(".get-movies");

// links
const postsLink = "https://jsonplaceholder.typicode.com/posts";
// tasks link
const todoLink = "https://jsonplaceholder.typicode.com/todos";
// users link
const usersLink = "https://jsonplaceholder.typicode.com/users";
// quotes link
const quotesLink = "https://type.fit/api/quotes";

// movies link (Discover)
const movieLink_trending = `https://api.themoviedb.org/3/trending/all/day?api_key=${TMDT_API_KEY}&page=1`;

// movie images
const img_500 = "https://image.tmdb.org/t/p/w500";
const noPosterAvailable = `/public/img/noPoster.jpg`;

$(document).ready(function () {
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
                  poster_path,
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
  // ==========================Quotes=====================
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

  // ==========================Quotes=====================
  //============ AJAX CALL FOR QUOTES HANDLER
  const loadMovies = function (resourceLink) {
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
    // remove all movie elements
    $(".movie").remove();
    // remove all movie posters from slider
    $(".img_result").remove();

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
      }
    };
    xhttp.open("GET", resourceLink, true);
    xhttp.send();
  };

  getPosts.addEventListener("click", () => loadPostsDemoData(postsLink));
  getTodos.addEventListener("click", () => loadTodosDemoData(todoLink));
  getUsers.addEventListener("click", () => loadUsersDemoData(usersLink));
  getQuotes.addEventListener("click", () => loadQuotesDemoData(quotesLink));
  getMovies.addEventListener("click", () => loadMovies(movieLink_trending));
});
