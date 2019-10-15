"use strict";

$(document).ready(function () {
  // if (window.matchMedia('(max-width: 320px)').matches) {
  function imgSrc(img) {
    if ($(img).attr("src") === "img/headline-menu-icon.png") $(img).attr("src", "img/headline-menu-icon_2.png");else $(img).attr("src", "img/headline-menu-icon.png");
  }

  $('.headline-menu').hide();
  $('.headline-icon').on('click', function () {
    imgSrc(this);
    $('.headline-menu').toggle();
  }); // }
  // if (window.matchMedia('(max-width: 640px)').matches) {

  function imgSrc640(img) {
    if ($(img).attr("src") === "img/headline-menu-icon_640.png") $(img).attr("src", "img/headline-menu-icon_640_2.png");else $(img).attr("src", "img/headline-menu-icon_640.png");
  }

  $('.headline-menu').hide();
  $('.headline-icon_640').on('click', function () {
    imgSrc640(this);
    $('.headline-menu').toggle();
  }); // }
  // if (window.matchMedia('(max-width: 980px)').matches) {
  //     // $('.headline-menu').show();
  // }
});