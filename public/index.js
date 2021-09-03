"use strict";
const xhttp = new XMLHttpRequest();
const getPosts = document.getElementById("getPosts");
const getTodos = document.querySelector(".get-todos");
const getImages = document.querySelector(".get-images");

// links
const postsLink = "https://jsonplaceholder.typicode.com/posts";
const todoLink = "https://jsonplaceholder.typicode.com/todos";
const photosLink = "https://jsonplaceholder.typicode.com/photos";

// =========== BACKGROUND IMAGE HTML BOILERPLATE HANDLER===============
const photoContainer = function (imageurl) {
  const imageContainer = $("<div></div>").attr("class", "background-img"),
    bg_img = $(`<img src="${imageurl}" />`).attr("class", "img-background");

  $(imageContainer).append(bg_img);
  $("body").append(imageContainer);
};

//===========CREATE A SINGLE POST HTML BOILERPLATE HANDLER==============//
const postItem = function (user_ud, post_id, post_title, body_content) {
  const singlePostDiv = $("<div></div>")
      .attr("class", "post")
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
      .attr("class", "task")
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

//CLREATE A SINGLE IMAGES HTML BOILERPLATE HANDLER
const photoItem = function (
  album_id,
  photo_id,
  photo_title,
  photo_url,
  thumbnail_url
) {
  const singleImageDiv = $("<div></div>")
      .attr("class", "photo")
      .animate({ opacity: 1 }),
    para_albumID = $("<p></p>")
      .attr("class", "album-id")
      .text(`album id: ` + album_id),
    para_photoID = $("<p></p>")
      .attr("class", "photo-id")
      .text(`photo id: ` + photo_id),
    para_photoTitle = $("<p></p>")
      .attr("class", "photo-title")
      .text(`title: ` + photo_title),
    para_photoURL = $("<p></p>")
      .attr("class", "photo-url")
      .text(`photo url: ` + photo_url),
    thumb_nail_url = $("<p></p>")
      .attr("class", "photo-thumbnail")
      .text(`Album thumbnail: ` + thumbnail_url);

  $(singleImageDiv).append(
    para_albumID,
    para_photoID,
    para_photoTitle,
    para_photoURL,
    thumb_nail_url
  );
  $("#data-container").append($(singleImageDiv));
};

// ============AJAX CALL FOR PHOTO HANDLER =================
const loadPhotosDemoData = function (resourceLink) {
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

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // change heading text
      $(".content-main-heading").text("your photos").animate({ opacity: 1 });
      // remove loading effetc class
      $("#data-container").removeClass("loadingAnimation");
      const data = this.responseText;
      const response = JSON.parse(data);

      // posts data distructure=ing
      $(response).each((i, obj) => {
        const { albumId, id, title, url, thumbnailUrl } = obj;
        photoItem(albumId, id, title, url, thumbnailUrl);

      });
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

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // change heading text
      $(".content-main-heading").text("your posts").animate({ opacity: 1 });
      // remove loading effetc class
      $("#data-container").removeClass("loadingAnimation");
      const data = this.responseText;
      const response = JSON.parse(data);

      // posts data distructure=ing
      response.forEach((obj) => {
        const { body, id, title, userId } = obj;
        postItem(userId, id, title, body);
      });
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

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // change heading text for tasks
      $(".content-main-heading").animate({ opacity: 1 }).text("your tasks");
      // remove loading effetc class
      $("#data-container").removeClass("loadingAnimation");
      const data = this.responseText;
      const response = JSON.parse(data);

      // posts data distructure=ing
      response.forEach((obj) => {
        const { completed, id, title, userId } = obj;
        todoItem(completed, id, title, userId);
      });
    }
  };
  xhttp.open("GET", resourceLink, true);
  xhttp.send();
  return;
};

getPosts.addEventListener("click", () => loadPostsDemoData(postsLink));
getTodos.addEventListener("click", () => loadTodosDemoData(todoLink));
getImages.addEventListener("click", () => loadPhotosDemoData(photosLink));
