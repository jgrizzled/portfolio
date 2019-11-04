'use strict';
$(() => {
  const win = $(window);
  const nav = $('nav');

  //set <nav> background opacity between 10% and 100% based on scroll position
  function setNavScrollOpacity() {
    nav.css('background', `rgba(17, 17, 17, ${
      Math.min(parseFloat(win.scrollTop()/100+0.1).toFixed(2),1)
    })`);
  }

  setNavScrollOpacity();

  win.on('scroll', () => {
      setNavScrollOpacity();
  });
});