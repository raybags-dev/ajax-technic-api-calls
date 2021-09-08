const createPagenationButtons = function () {
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
};
export { createPagenationButtons };
