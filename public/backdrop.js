// Create backdrop

const CreateBackdrop = function (
  bd_image_source,
  bd_main_title,
  release_date,
  bd_movieDetails,
  bd_rating
) {
  // close button div
  const bd_close_icon = $("</i>").attr({ class: "fas", class: "fa-times" }),
    // close btn icon
    bd_close_btn = $("<div></div>")
      .attr({ class: "close-backdrop-btn" })
      .append(bd_close_icon),
    // bd image
    bd_image = $("<img/>")
      .attr({ src: `${bd_image_source}`, alt: "backdrop" })
      .fadeIn(),
    // backdrop title
    bd_title = $("<h1></h1>")
      .attr({ class: "backdrop-title" })
      .text("Title:  " + bd_main_title),
    // backdrop relase date
    bd_release_date = $("<p></p>")
      .attr({ class: "release-date" })
      .text("Realease Date: " + release_date),
    // movie details
    bd_movie_details = $("<p></p>")
      .attr({ class: "movie-details" })
      .text("Details: " + bd_movieDetails),
    // rating
    bd_ratings = $("<p></p>")
      .attr({ class: "rating" })
      .text("Rating: " + bd_rating),
    // inner text conatiner div
    bd_innerText_container = $("<div></div>")
      .attr({ class: "actors" })
      .append(bd_title, bd_release_date, bd_movie_details, bd_ratings),
    // image container
    bd_img_wrapper = $("<div></div>")
      .attr("class", "img-text-wrapper")
      .append(bd_image, bd_innerText_container),
    // main container section
    bd_section = $("<section></section>")
      .attr({ draggable: "true", class: "backdrop-container" })
      .append(bd_close_btn, bd_img_wrapper);

  $(".direction-arrow-container").before(bd_section);
};
export { CreateBackdrop };
