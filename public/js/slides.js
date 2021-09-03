$(document).ready(function () {
  $("#slides").slidesjs({
    width: 900,
    height: 900,
    play: {
      active: false,
      auto: true,
      interval: 5000,
      swap: true,
      effect: "slide",
      pauseOnHover: false,
    },
    pagination: {
      active: true,
      effect: "slide",
    },
    callback: {
      loaded: function (number) {
        // Do something awesome!
        // Passes start slide number
      },
      start: function (number) {
        // Do something awesome!
        // Passes slide number at start of animation
      },
      complete: function (number) {
        // Do something awesome!
        // Passes slide number at end of animation
      },
    },
  });
});
