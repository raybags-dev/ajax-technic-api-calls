"use strict";
// import aos animation
import { aos_animation_handler } from "./aos_object.js";

const xhttp = new XMLHttpRequest();
const getPosts = document.getElementById("getPosts");
const getTodos = document.querySelector(".get-todos");
const getUsers = document.querySelector(".get-images");

// links
const postsLink = "https://jsonplaceholder.typicode.com/posts";
const todoLink = "https://jsonplaceholder.typicode.com/todos";
// const photosLink = "https://jsonplaceholder.typicode.com/photos";
const usersLink = "https://jsonplaceholder.typicode.com/users";

$(document).ready(function () {
  aos_animation_handler();

  const addAnimeEffectToEachItemAtInterval = function (index, item) {
    $(this)
      .delay(1000 * index)
      .attr({
        "data-aos": "fade-in",
        "data-aos-easing": "ease",
      });
      console.log(this)
  };

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
    //   remove placeholder photos
    $("#placeHolder-photo").css({ display: "none" });
    //   remove placeholder post
    $("#placeHolder-post").css({ display: "none" });
    //   remove placeholder task
    $("#placeHolder-task").css({ display: "none" });
    // remove task data from the dom
    $(".task").remove();
    // remove post data from the dom
    $(".post").remove();

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
          // Apply animation on condition
          $(".photo").each(addAnimeEffectToEachItemAtInterval);
        });
        // change heading text
        $(".content-main-heading")
          .text("your photos")
          .css({ transform: "translate(-50%, -50%)" });
      }
    };
    xhttp.open("GET", resourceLink, true);
    xhttp.send();
    return;
  };

  // ============AJAX CALL FOR POSTS HANDLER =================
  const loadPostsDemoData = function (resourceLink) {
    //   remove placeholder photos
    $("#placeHolder-photo").css({ display: "none" });
    //   remove placeholder post
    $("#placeHolder-post").css({ display: "none" });
    //   remove placeholder task
    $("#placeHolder-task").css({ display: "none" });
    // remove task data from the dom
    $(".task").remove();
    // remove post data from the dom
    $(".photo").remove();

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
          // Apply animation on condition
          $(".post").each(addAnimeEffectToEachItemAtInterval);
        });
        // change heading text
        $(".content-main-heading")
          .text("your posts")
          .css({ transform: "translate(-50%, -50%)" });
      }
    };
    xhttp.open("GET", resourceLink, true);
    xhttp.send();
    return;
  };

  //============ AJAX CALL FOR TODOS HANDLER
  const loadTodosDemoData = function (resourceLink) {
    //   remove placeholder photos
    $("#placeHolder-photo").css({ display: "none" });
    //   remove placeholder post
    $("#placeHolder-post").css({ display: "none" });
    //   remove placeholder task
    $("#placeHolder-task").css({ display: "none" });
    // remove post data from the dom
    $(".post").remove();
    // remove post data from the dom
    $(".photo").remove();

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
          // Apply animation on condition
          $(".task").each(addAnimeEffectToEachItemAtInterval);
        });
        // change heading text
        $(".content-main-heading")
          .text("your tasks")
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
});
