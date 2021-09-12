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


export { postItem, CreateQuote, todoItem, userItem, createMovieItem , imageCreator};
