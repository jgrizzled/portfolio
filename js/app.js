'use strict';
$(() => {
  const win = $(window);
  const documentHeight = $(document).height();
  const root = $(':root');
  const nav = $('#nav-bar').add('.burger-item');
  const burgerMenu = $('#burger-menu');
  const burgerToggle = $('#burger-toggle');
  const burgerLinks = $('.burger-item a');
  const notBurgerLinks = $('*').not(burgerLinks);
  let burgerOpened = false;

  //set nav background opacity between 15% and 100% based on scroll position
  function navScrollOpacity() {
    setNavOpacity(win.scrollTop() / (documentHeight * 0.05) + 0.15);
  }

  function setNavOpacity(opacity) {
    nav.css(
      'background',
      'rgba(17, 17, 17, ' + Math.min(parseFloat(opacity).toFixed(2), 1) + ')'
    );
  }

  function toggleBurgerMenu(event) {
    event.stopPropagation();
    if (!burgerOpened) {
      nav.css('transition', 'background .15s ease-in-out');
      nav.css('background', root.css('--darker-charcoal'));
      burgerMenu.css('right', '0');
      burgerMenu.attr('aria-hidden', 'false');
      burgerLinks.attr('tabindex', '0');
      notBurgerLinks.one('click', toggleBurgerMenu);
      burgerOpened = true;
    } else {
      burgerMenu.css('right', '-100%');
      navScrollOpacity();
      burgerMenu.attr('aria-hidden', 'true');
      burgerLinks.attr('tabindex', '-1');
      notBurgerLinks.off('click');
      burgerToggle.one('click', toggleBurgerMenu);
      burgerOpened = false;
      nav.css('transition', 'none');
    }
  }

  win.on('scroll', event => {
    if (!burgerOpened) navScrollOpacity();
    //close burger menu on scroll
    else toggleBurgerMenu(event);
  });

  navScrollOpacity(); //initialize nav opacity
  burgerToggle.one('click', toggleBurgerMenu);
});
