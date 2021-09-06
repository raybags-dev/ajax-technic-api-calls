"use strict";
// import aos animation
import { aos_animation_handler } from "./aos_object.js";

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

// movies link
const moviewLink = `https://api.themoviedb.org/3/discover/movie?api_key=1fd9e2240dd7b999db65cb61d9ca50cf&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`;

const img_300 = "https://image.tmdb.org/t/p/w300";
const img_500 = "https://image.tmdb.org/t/p/w500";

// no poster available
const noPosterAvailable =
  "https://www.movienewz.com/img/films/poster-holder.jpg";

$(document).ready(function () {
  aos_animation_handler();
  // Spinner
  $("#spinner").addClass("hide");

  // Handle arrow direction display handler
  const displayArrowDirection = function () {
    // elemnts to be hidden
    const arrayOfElemnetsToBeHidden = [$(".direction-arrow-container")];
    $(arrayOfElemnetsToBeHidden).each((index, element) => {
      $(element).addClass("hide");
    });
  };
  // hide direction arrows on click of any button | engagement acquired
  $(".BTN").each((ind, ele) => {
    $(ele).on("click", displayArrowDirection);
  });

  // PAGINATION BUTTONS HANDLER ================//
  const createButtons = function () {
    // fetch more movies button container
    const fetch_more_m_btn_container = $("<div></div>").attr({
        class: "more_movies_btn",
      }),
      btn_1 = $("<a></a>").attr({ href: "/", class: "btn_1, link" }).text("2"),
      btn_2 = $("<a></a>").attr({ href: "/", class: "btn_2, link" }).text("3"),
      btn_3 = $("<a></a>").attr({ href: "/", class: "btn_3, link" }).text("4"),
      btn_4 = $("<a></a>").attr({ href: "/", class: "btn_4, link" }).text("5");

    // append button container
    $(fetch_more_m_btn_container).append(btn_1, btn_2, btn_3, btn_4);
    $("#data-container").after(fetch_more_m_btn_container);

    $(".more_movies_btn a").each(async (ind, movielink) => {
      $(movielink).on("click", function (e) {
        e.preventDefault();
        const moviewLink = `https://api.themoviedb.org/3/discover/movie?api_key=1fd9e2240dd7b999db65cb61d9ca50cf&language=en-US&sort_by=popularity.desc&include_adult=false&page=${$(
          movielink
        ).text()}`;

        //============ AJAX CALL FOR MORE MOVIES HANDLER
        (() => {
          // apply loading effetc class
          $("#data-container").addClass("loadingAnimation");
          // add spinner
          $("#spinner").removeClass("hide");

          xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              $(".movie").remove();
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
                  original_title,
                  overview,
                  poster_path,
                  release_date,
                  title,
                  vote_average,
                } = obj;
                // poster or no poster
                const moviePoster = `${img_500}/${
                  backdrop_path || noPosterAvailable
                }`;
                // overview or no overview
                const overView = `${
                  overview || "no movie description for this item"
                }`;
                // rating or no rating
                const rating = `${vote_average || "--"}`;
                // title or original title
                const movie_title = `${title || original_title}`;
                // create movie and map data to element
                createMovieItem(
                  movie_title,
                  moviePoster,
                  overView,
                  release_date,
                  rating
                );
              });
            }
          };
          xhttp.open("GET", moviewLink, true);
          xhttp.send();
          return;
        })();
      });
    });
  };
  //===========CREATE MOVIE ITEM HTML BOILERPLATE HANDLER==============//
  const createMovieItem = function (
    movie_Title,
    movie_Poster,
    movie_Overview,
    movie_Release_date,
    movie_Vote_average
  ) {
    const singleMovieDiv = $("<div></div>")
        .attr({ class: "movie" })
        .animate({ opacity: 1 }),
      para_m_title = $("<p></p>")
        .attr("class", "movie-title")
        .text(movie_Title),
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
    return movie_Vote_average <= 5.5
      ? $(".movie-vote").addClass("danger")
      : movie_Vote_average <= 7.0
      ? $(".movie-vote").addClass("average")
      : movie_Vote_average <= 10.0
      ? $(".movie-vote").addClass("primary")
      : $(".movie-vote").addClass("no-rating");
  };

  //===========CREATE A QUOTE HTML BOILERPLATE HANDLER==============//
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
  // =============Quotes end================

  //===========CREATE A SINGLE POST HTML BOILERPLATE HANDLER==============//
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

  // ============AJAX CALL FOR PHOTO HANDLER =================
  const loadUsersDemoData = function (resourceLink) {
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
    return;
  };

  //============ AJAX CALL FOR TODOS HANDLER
  const loadTodosDemoData = function (resourceLink) {
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
  const loadMoviesDemoData = function (resourceLink) {
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
    $(".movie").remove();

    // apply loading effetc class
    $("#data-container").addClass("loadingAnimation");
    // add spinner
    $("#spinner").removeClass("hide");

    xhttp.onreadystatechange = function () {
      // Hide heading text
      $(".content-main-heading").css({ transform: "translate(-50%, -500%)" });
      if (this.readyState === 4 && this.status === 200) {
        // create get more movies buttons
        createButtons();
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
            original_title,
            overview,
            poster_path,
            release_date,
            title,
            vote_average,
          } = obj;
          // movie backdrop
          const movieBackdrop = `${img_300}/${
            poster_path || noPosterAvailable
          }`;
          // poster or no poster
          const moviePoster = `${img_500}/${
            backdrop_path || noPosterAvailable
          }`;
          // overview or no overview
          const overView = `${
            overview || "no movie description for this item"
          }`;
          // rating or no rating
          const rating = `${vote_average || "--"}`;
          // title or original title
          const movie_title = `${title || original_title}`;
          // create movie and map data to element
          createMovieItem(
            movie_title,
            moviePoster,
            overView,
            release_date,
            rating
          );
        });

        // change heading text
        $(".content-main-heading")
          .text("Trending movies")
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
  getMovies.addEventListener("click", () => loadMoviesDemoData(moviewLink));
});
