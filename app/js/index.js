document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.js-video');
  const layout = document.querySelector('.c-layout')
  const sidebar = document.querySelector('.js-sidebar');
  const main = document.querySelector('.js-main');
  const sections = document.querySelectorAll('.js-section-content');
  const nav_indicators = document.querySelectorAll('.js-nav-indicator-item');

  const header_bottom = document.querySelector('.js-header').getBoundingClientRect().bottom;

  const video_screen_min = 480;
  const layout_breakpoint = 768;

  adjustLayout();
  scrollSidebar();

  function adjustLayout() {
    const screen_w = document.documentElement['clientWidth'];

    // if ( screen_w < video_screen_min ) {
    //   video.pause();
    // } else {
    //   video.play();
    //   video.playbackRate = 0.5;
    // }
    
    // handle column layout on larger screens
    if ( screen_w >= layout_breakpoint ) {
      layout.classList.add('c-layout--columns');
    } else {
      layout.classList.remove('c-layout--columns');
    }
  }


  // handle sidebar locking on larger screens
  function scrollSidebar() {
    const screen_w = document.documentElement['clientWidth'];
    
    if ( screen_w >= layout_breakpoint ) {
      const main_top = main.getBoundingClientRect().top;
      if ( main_top > 0 ) {
        sidebar.classList.remove('c-layout__sidebar--locked');
      } else {
        sidebar.classList.add('c-layout__sidebar--locked');
      }
    } else {
      sidebar.classList.remove('c-layout__sidebar--locked');
    }
    
    sections.forEach(section => {
      const section_offset = section.getBoundingClientRect();
      const section_top = section_offset.top - 50;
      const section_bottom = section_offset.bottom - 30;
      console.log(section_top, section_bottom, header_bottom);
      
      if ( section_top <= header_bottom && section_bottom > header_bottom ) {
        document.querySelector(`.${section.dataset.indicator}`).classList.add('is-current');
      } else {
        document.querySelector(`.${section.dataset.indicator}`).classList.remove('is-current');
      }
    });
  }


  function callFunctions() {
    window.requestAnimationFrame(scrollSidebar);
  }


  // var latestKnownScrollY = 0;
  // var ticking = false;

  // function onScroll() {
  // 	latestKnownScrollY = window.scrollY;
  // 	requestTick();
  // }

  // function requestTick() {
  // 	if(!ticking) {
  // 		requestAnimationFrame(update);
  // 	}
  // 	ticking = true;
  // }

  function throttle (callback, limit) {
    let wait = false;            // Initially, we're not waiting
    return function () {         // We return a throttled function
      if (!wait) {               // If we're not waiting
        callback.call();         // Execute users function
        wait = true;             // Prevent future invocations
        setTimeout(function () { // After a period of time
          wait = false;          // And allow future invocations
        }, limit);
      }
    }
  }


  window.addEventListener('scroll', throttle(callFunctions, 25));
  window.addEventListener('resize', throttle(adjustLayout, 25));
});