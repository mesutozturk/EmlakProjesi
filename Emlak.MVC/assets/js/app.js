var app =
webpackJsonpapp([0],[
/* 0 */
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	window.InfoBox = __webpack_require__(/*! google-maps-infobox */ 5);
	var config = __webpack_require__(/*! ./module/config */ 6);

	/**
	 * @global
	 * @type {{init: Function, activateHeaderSpy: (*|exports|module.exports), activateScrollToTopSpy: (*|exports|module.exports), activateUIPanel: (*|exports|module.exports)}}
	 */
	module.exports = {
	  /**
	   * @param {Object} [options]
	   * @param {string} options[].urlPrefix - path that is appended to images,
	   */
	  initTheme: function (options) {

	    var _ = __webpack_require__(/*! lodash */ 7);
	    if (options) {
	      _.each(options, function (value, key) {
	        config[key] = value;
	      });
	    }

	    if (config.loadSvgWithAjax === true) {
	      $(document.body).prepend($('<div>').load(config.assetsPathPrefix + 'img/sprite-inline.svg'));
	    }
	    __webpack_require__(/*! jquery */ 1);
	    __webpack_require__(/*! slick-carousel/slick/slick.js */ 9);
	    __webpack_require__(/*! select2 */ 10);
	    __webpack_require__(/*! bootstrap-sass */ 11);
	    __webpack_require__(/*! ion-rangeslider */ 12);
	    __webpack_require__(/*! jquery-bonsai */ 13);
	    __webpack_require__(/*! jquery-qubit */ 15);
	    __webpack_require__(/*! parsleyjs */ 17);
	    __webpack_require__(/*! jquery-colorbox */ 18);
	    __webpack_require__(/*! pnotify */ 19);
	    __webpack_require__(/*! google-maps-infobox */ 5);
	    __webpack_require__(/*! google-marker-clusterer-plus */ 21);
	    __webpack_require__(/*! plyr */ 22);
	    __webpack_require__(/*! leaflet */ 24);
	    __webpack_require__(/*! photoswipe/dist/photoswipe */ 25);
	    __webpack_require__(/*! photoswipe/dist/photoswipe-ui-default */ 26);
	    __webpack_require__(/*! smoothscroll */ 27);
	    __webpack_require__(/*! bootstrap-daterangepicker */ 28);

	    __webpack_require__(/*! ./module/workarounds */ 116)();
	    __webpack_require__(/*! ./module/grid-size */ 117).watch();
	    __webpack_require__(/*! ./module/ui/auth-btn */ 118)();
	    __webpack_require__(/*! ./module/ui/navbar-toggle */ 119)();
	    __webpack_require__(/*! ./module/ui/show-hide-btn */ 120)();
	    __webpack_require__(/*! ./module/ui/show-headline */ 121)();
	    __webpack_require__(/*! ./module/ui/show-form-property */ 122)();
	    __webpack_require__(/*! ./module/ui/comments */ 123)();
	    __webpack_require__(/*! ./module/parsley-bootstrap */ 124)();
	    __webpack_require__(/*! ./module/ui/uncollapser */ 125)();
	    __webpack_require__(/*! ./module/css-class-helper */ 126).initParsleyHelper();
	    __webpack_require__(/*! ./module/data-api/datetime */ 127)()
	  },
	  activateHeaderSpy: __webpack_require__(/*! ./module/ui/header-scroll-spy */ 128),
	  activateScrollToTopSpy: __webpack_require__(/*! ./module/ui/scrollup-spy */ 129),
	  activateUIPanel: __webpack_require__(/*! ./demo/ui-panel */ 130),
	  config: config,
	  gridSize: __webpack_require__(/*! ./module/grid-size */ 117),
	  createGoogleMap: __webpack_require__(/*! ./module/gmap/map */ 131).create,
	  createGooglePanorama: __webpack_require__(/*! ./module/gmap/panorama */ 133).create,
	  createGmapMarker: __webpack_require__(/*! ./module/gmap/marker */ 134).create,
	  createGmapInfoboxMarker: __webpack_require__(/*! ./module/gmap/infobox-marker */ 135).create,
	  createGmapClustering: __webpack_require__(/*! ./module/gmap/clusterer */ 137).create,
	  createLeafletMap: __webpack_require__(/*! ./module/leaflet */ 138).create,
	  createLeafletInfoboxMarker: __webpack_require__(/*! ./module/leaflet */ 138).addInfoboxMarker,
	  createGeocoderGoogleMap: __webpack_require__(/*! ./module/gmap/autocomplete-map */ 139),
	  notifier: __webpack_require__(/*! ./module/notifier */ 141),
	  createPhotoSwipe: __webpack_require__(/*! ./module/ui/photo-swipe */ 143).init,
	  mapFullscreen: __webpack_require__(/*! ./module/ui/map-fullscreen */ 144),
	  scrollAnimation: __webpack_require__(/*! ./module/ui/scroll-animation */ 145),
	  Vivus: __webpack_require__(/*! vivus */ 149),
	  CountUp: __webpack_require__(/*! countUp.js */ 148),
	  utils: __webpack_require__(/*! ./module/utils */ 150)
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 1 */
/*!********************************!*\
  !*** jquery (bower component) ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./dist/jquery.js */ 2);

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/*!*****************************!*\
  !*** ./js/module/config.js ***!
  \*****************************/
/***/ function(module, exports) {

	"use strict";
	module.exports = {
	  colorTheme: 'default',
	  assetsPathPrefix: 'assets/',
	  latitude: "33.74229160384012",
	  longitude: "-117.86845207214355",
	  ajaxUrl: null
	};


/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/*!***************************************!*\
  !*** jquery-bonsai (bower component) ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./jquery.bonsai.js */ 14);

/***/ },
/* 14 */,
/* 15 */
/*!**************************************!*\
  !*** jquery-qubit (bower component) ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./jquery.qubit.js */ 16);

/***/ },
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/*!*********************************!*\
  !*** pnotify (bower component) ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./pnotify.core.js */ 20);

/***/ },
/* 20 */,
/* 21 */,
/* 22 */
/*!******************************!*\
  !*** plyr (bower component) ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./src/js/plyr.js */ 23);

/***/ },
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/*!********************************************************************************************************************!*\
  !*** /home/chetzof/Work/wp_realtyspace/realtyspace.dev/web/app/themes/realtyspace/assets/~/moment/locale ^\.\/.*$ ***!
  \********************************************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 31,
		"./af.js": 31,
		"./ar": 32,
		"./ar-ma": 33,
		"./ar-ma.js": 33,
		"./ar-sa": 34,
		"./ar-sa.js": 34,
		"./ar-tn": 35,
		"./ar-tn.js": 35,
		"./ar.js": 32,
		"./az": 36,
		"./az.js": 36,
		"./be": 37,
		"./be.js": 37,
		"./bg": 38,
		"./bg.js": 38,
		"./bn": 39,
		"./bn.js": 39,
		"./bo": 40,
		"./bo.js": 40,
		"./br": 41,
		"./br.js": 41,
		"./bs": 42,
		"./bs.js": 42,
		"./ca": 43,
		"./ca.js": 43,
		"./cs": 44,
		"./cs.js": 44,
		"./cv": 45,
		"./cv.js": 45,
		"./cy": 46,
		"./cy.js": 46,
		"./da": 47,
		"./da.js": 47,
		"./de": 48,
		"./de-at": 49,
		"./de-at.js": 49,
		"./de.js": 48,
		"./el": 50,
		"./el.js": 50,
		"./en-au": 51,
		"./en-au.js": 51,
		"./en-ca": 52,
		"./en-ca.js": 52,
		"./en-gb": 53,
		"./en-gb.js": 53,
		"./eo": 54,
		"./eo.js": 54,
		"./es": 55,
		"./es.js": 55,
		"./et": 56,
		"./et.js": 56,
		"./eu": 57,
		"./eu.js": 57,
		"./fa": 58,
		"./fa.js": 58,
		"./fi": 59,
		"./fi.js": 59,
		"./fo": 60,
		"./fo.js": 60,
		"./fr": 61,
		"./fr-ca": 62,
		"./fr-ca.js": 62,
		"./fr.js": 61,
		"./fy": 63,
		"./fy.js": 63,
		"./gl": 64,
		"./gl.js": 64,
		"./he": 65,
		"./he.js": 65,
		"./hi": 66,
		"./hi.js": 66,
		"./hr": 67,
		"./hr.js": 67,
		"./hu": 68,
		"./hu.js": 68,
		"./hy-am": 69,
		"./hy-am.js": 69,
		"./id": 70,
		"./id.js": 70,
		"./is": 71,
		"./is.js": 71,
		"./it": 72,
		"./it.js": 72,
		"./ja": 73,
		"./ja.js": 73,
		"./jv": 74,
		"./jv.js": 74,
		"./ka": 75,
		"./ka.js": 75,
		"./km": 76,
		"./km.js": 76,
		"./ko": 77,
		"./ko.js": 77,
		"./lb": 78,
		"./lb.js": 78,
		"./lt": 79,
		"./lt.js": 79,
		"./lv": 80,
		"./lv.js": 80,
		"./me": 81,
		"./me.js": 81,
		"./mk": 82,
		"./mk.js": 82,
		"./ml": 83,
		"./ml.js": 83,
		"./mr": 84,
		"./mr.js": 84,
		"./ms": 85,
		"./ms-my": 86,
		"./ms-my.js": 86,
		"./ms.js": 85,
		"./my": 87,
		"./my.js": 87,
		"./nb": 88,
		"./nb.js": 88,
		"./ne": 89,
		"./ne.js": 89,
		"./nl": 90,
		"./nl.js": 90,
		"./nn": 91,
		"./nn.js": 91,
		"./pl": 92,
		"./pl.js": 92,
		"./pt": 93,
		"./pt-br": 94,
		"./pt-br.js": 94,
		"./pt.js": 93,
		"./ro": 95,
		"./ro.js": 95,
		"./ru": 96,
		"./ru.js": 96,
		"./si": 97,
		"./si.js": 97,
		"./sk": 98,
		"./sk.js": 98,
		"./sl": 99,
		"./sl.js": 99,
		"./sq": 100,
		"./sq.js": 100,
		"./sr": 101,
		"./sr-cyrl": 102,
		"./sr-cyrl.js": 102,
		"./sr.js": 101,
		"./sv": 103,
		"./sv.js": 103,
		"./ta": 104,
		"./ta.js": 104,
		"./th": 105,
		"./th.js": 105,
		"./tl-ph": 106,
		"./tl-ph.js": 106,
		"./tr": 107,
		"./tr.js": 107,
		"./tzl": 108,
		"./tzl.js": 108,
		"./tzm": 109,
		"./tzm-latn": 110,
		"./tzm-latn.js": 110,
		"./tzm.js": 109,
		"./uk": 111,
		"./uk.js": 111,
		"./uz": 112,
		"./uz.js": 112,
		"./vi": 113,
		"./vi.js": 113,
		"./zh-cn": 114,
		"./zh-cn.js": 114,
		"./zh-tw": 115,
		"./zh-tw.js": 115
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 30;


/***/ },
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */
/*!**********************************!*\
  !*** ./js/module/workarounds.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/***************************************************************
	 * Browser workarounds for providing a better experience
	 * on some browsers in certain edge cases
	 ==============================================================*/
	module.exports = function () {
	  $(function () {
	    var nua = navigator.userAgent;
	    var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
	    if (isAndroid) {
	      $('select.form-control').removeClass('form-control search__form-control search__form-control--select').css('width', '100%')
	    }
	  });

	  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	    var msViewportStyle = document.createElement('style')
	    msViewportStyle.appendChild(
	      document.createTextNode(
	        '@-ms-viewport{width:auto!important}'
	      )
	    )
	    document.querySelector('head').appendChild(msViewportStyle)
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 117 */
/*!********************************!*\
  !*** ./js/module/grid-size.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/***************************************************************
	 * JS helper for improving responsive experience
	 ==============================================================*/
	var currentGridSize = null;

	exports.get = function () {
	  return currentGridSize;
	};

	exports.watch = function () {
	  var winWidth = window.innerWidth,
	    screenList = ['xs', 'sm', 'md', 'lg'],
	    $body = $('body');

	  function checkScreen(width) {
	    currentGridSize = screenList[0];

	    if (width < 767) currentGridSize = screenList[0];
	    if (width >= 767) currentGridSize = screenList[1];
	    if (width > 992) currentGridSize = screenList[2];
	    if (width > 1200) currentGridSize = screenList[3];

	    $body.removeClass(screenList.join(' '));
	    $body.addClass(currentGridSize);
	  }

	  checkScreen(winWidth);

	  $(window).resize(function () {
	    checkScreen(window.innerWidth);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 118 */
/*!**********************************!*\
  !*** ./js/module/ui/auth-btn.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	module.exports = function () {
	  function closeMenu(event) {
	    var clickover = $(event.target);
	    var _opened = $(".navbar-collapse").hasClass("collapse in");
	    if (_opened === true && !clickover.hasClass("js-navbar-toggle")) {
	      $(".js-navbar-toggle").click();
	    }
	  }

	  function openDropdown(event, dropdown) {
	    closeMenu(event);
	    $('.auth__nav-item').removeClass('open');
	    $(dropdown).closest('li').addClass('open');
	  }

	  $(document).on('click', function () {
	    $('.js-restore-form').closest('li').removeClass('open');
	  });

	  $('.js-user-login-btn').on('click', function (event) {
	    closeMenu(event);
	    $('.auth__nav-item').removeClass('open');
	    if ($(this).hasClass('active')) {
	      $(this).removeClass('active')
	    } else {
	      $(this).addClass('active');
	      $('.js-login-form').closest('li').addClass('open');
	    }
	    return false;
	  });

	  $('.js-user-logged-btn').on('click', function (event) {
	    closeMenu(event);
	    $('.auth__nav-item').removeClass('open');
	    if ($(this).hasClass('active')) {
	      $(this).removeClass('active')
	    } else {
	      $(this).addClass('active');
	      $('.js-user-logged-in').closest('li').addClass('open');
	    }
	    return false;
	  });

	  $('.js-user-register').on('click', function (event) {
	    openDropdown(event, '.js-register-form');
	  });
	  $('.js-user-restore').on('click', function (event) {
	    openDropdown(event, '.js-restore-form');
	  });
	  $('.js-restore-form').on('click', function (event) {
	    event.stopPropagation();
	  });
	  $('.js-user-login').on('click', function (event) {
	    openDropdown(event, '.js-login-form');
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 119 */
/*!***************************************!*\
  !*** ./js/module/ui/navbar-toggle.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	module.exports = function () {
	  /**
	   * Display language bar in responsive mode
	   */

	  var $navBar = $('#navbar-collapse-1'),
	    $siteWrap = $('.js-site-wrap'),
	    $navbarRow = $('.js-navbar-row'),
	    $navbarToggle = $('.js-navbar-toggle'),
	    $header = $('.header'),
	    $navBarClone;

	  var gridSize = __webpack_require__(/*! ../grid-size */ 117);

	  var xDown = null;
	  var yDown = null;

	  function handleTouchStart(evt) {
	    xDown = evt.touches[0].clientX;
	    yDown = evt.touches[0].clientY;
	  }

	  function handleTouchMove(evt) {
	    if (!xDown || !yDown || !evt) {
	      return;
	    }

	    var xUp = evt.touches[0].clientX;
	    var yUp = evt.touches[0].clientY;

	    var xDiff = xDown - xUp;
	    var yDiff = yDown - yUp;

	    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
	      if (xDiff > 0) {
	        /* left swipe */
	      } else {
	        /* right swipe */
	        if ($siteWrap.hasClass('site-wrap--move')) {
	          requestAnimationFrame(function () {
	            $siteWrap.removeClass('site-wrap--move');
	            $navbarToggle.removeClass('collapsed');
	            $header.removeClass('header--mob-opened');
	          });
	        }
	      }
	    } else {
	      if (yDiff > 0) {
	        /* up swipe */
	      } else {
	        /* down swipe */
	      }
	    }
	    /* reset values */
	    xDown = null;
	    yDown = null;
	  }

	  function moveMenu (mobile) {
	    $navBarClone = $navBar.detach();
	    if(mobile) {
	      $siteWrap.before($navBarClone);
	      $navBarClone.addClass('navbar__wrap--init');
	    } else {
	      $navbarRow.append($navBarClone);
	      $navBarClone.removeClass('navbar__wrap--init');
	      $siteWrap.removeClass('site-wrap--move');
	      $navbarToggle.removeClass('js-navbar-toggle');
	    }
	  }

	  function initMenu () {
	    if (gridSize.get() === 'xs') {
	      document.addEventListener('touchstart', handleTouchStart, false);
	      document.addEventListener('touchmove', handleTouchMove, false);
	      handleTouchMove();
	      moveMenu(true);
	    } else {
	      // feature check direction where open dropdown menu
	      $('.js-dropdown').each(function (i, item) {
	        var $dropdown = $(item).find('.js-dropdown-menu');
	        var offsetLeft = $(item).offset().left;
	        var offsetRight = ($(window).width() - ($(item).offset().left + $(item).outerWidth()));
	        if (offsetLeft < $dropdown.width() ) {
	          $dropdown.removeClass('navbar__dropdown--left').removeClass('navbar__dropdown--right').addClass('navbar__dropdown--left');
	        } else if (offsetRight < $dropdown.width() ){
	          $dropdown.removeClass('navbar__dropdown--left').removeClass('navbar__dropdown--right').addClass('navbar__dropdown--right');
	        }
	      });

	      moveMenu(false);
	    }
	  }

	  $navbarToggle.on('click', function () {
	    var $this = $(this);
	    requestAnimationFrame(function () {
	      $this.toggleClass('collapsed');
	      requestAnimationFrame(function () {
	        $siteWrap.toggleClass('site-wrap--move');
	        $header.toggleClass('header--mob-opened');
	      });
	    });
	  });

	  $('.js-dropdown > a').on('click', function () {
	    var $dropdown = $(this).closest('.js-dropdown');
	    if ($dropdown.hasClass('open')) {
	      $dropdown.removeClass('open');
	    } else {
	      if (gridSize.get() === 'xs') {
	        $('html, body').scrollTop(0);
	      }
	      $dropdown.addClass('open');
	    }
	  });

	  $('.js-navbar-sublink')
	    .on('click', function () {
	      var parentItem = $(this).closest('li');
	      parentItem.addClass('open');
	    });

	  $('.js-navbar-submenu-back').on('click', function () {
	    var parentItem = $(this).closest('.js-dropdown');
	    parentItem.removeClass('open');
	  });

	  initMenu();

	  var throttledNavMove = _.throttle(initMenu, 500);
	  $(window).resize(throttledNavMove);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 120 */
/*!***************************************!*\
  !*** ./js/module/ui/show-hide-btn.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/***************************************************************
	 * UI Module for opening collapsed blocks on small screens
	 ==============================================================*/
	module.exports = function () {
	  var $toggleBtn = $('.js-toggle-btn');

	  $toggleBtn.on('click', function () {
	    var $btn = $(this);
	    var $target = $($btn.data('toggle-target'));
	    var titleOnHide = $btn.data('toggle-hide');
	    var titleOnShow = $btn.data('toggle-show');

	    if (!$btn.next().is($target)) {
	      $btn.after($target.detach());
	    }

	    if ($btn.hasClass('active')) {
	      $btn.removeClass('active').text(titleOnShow);
	      $target.removeClass('open');
	    } else {
	      $toggleBtn.removeClass('active');
	      $btn.addClass('active').text(titleOnHide);
	      $target.addClass('open');
	    }
	  });


	  // Special option for map bottom, hide it
	  var $searchTitleBtn = $('.js-search-title-btn'),
	    $searchFormBlock = $('.js-search-form'),
	    $searchMap = $searchFormBlock.closest('.map');

	  $searchTitleBtn.on('click', function () {
	    if ($(this).hasClass('closed')) {
	      $searchTitleBtn.removeClass('closed');
	      $searchFormBlock.removeClass('search--hide');
	      setTimeout(function () {
	        $searchMap.removeClass('map--hide');
	      }, 500);
	    } else {
	      $searchTitleBtn.addClass('closed');
	      $searchFormBlock.addClass('search--hide');
	      $searchMap.addClass('map--hide');
	    }
	  });



	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 121 */
/*!***************************************!*\
  !*** ./js/module/ui/show-headline.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	module.exports = function () {
	  $("[class$='__headline']").on('click', function () {
	    $(this).addClass('opened');
	  });
	};



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 122 */
/*!********************************************!*\
  !*** ./js/module/ui/show-form-property.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	module.exports = function () {
	  $(".js-form-property-title").on('click', function () {
	    var $this = $(this),
	      $rel = $($this.data('rel')),
	      $map;
	    $rel.toggleClass('opened');
	    $this.toggleClass('active');
	    $map = $rel.find('#autocomplete-map');
	    if ($map.length) {
	      google.maps.event.trigger($map[0], 'resize');
	    }
	  });
	};



	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 123 */
/*!**********************************!*\
  !*** ./js/module/ui/comments.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	module.exports = function () {
	  var $form,
	    $btnReplay = $('.js-comment-reply');
	  $btnReplay.on('click', function () {
	    if (!$form) $form = $($('.js-form-comment-wrap')[0]).clone();
	    $('.js-form-comment-wrap').remove();
	    $btnReplay.show();
	    $(this)
	      .hide()
	      .closest('.js-comment-item')
	      .append($form);
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 124 */
/*!****************************************!*\
  !*** ./js/module/parsley-bootstrap.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	__webpack_require__(/*! parsleyjs */ 17);
	module.exports = function () {
	  window.Parsley
	    .on('field:error', function () {
	      // This global callback will be called for any field that fails validation.
	      $(this.$element)
	        .closest('.form-group')
	        .removeClass('has-success')
	        .addClass('has-error');
	    })
	    .on('field:success', function () {
	      // This global callback will be called for any field that fails validation.
	      $(this.$element)
	        .closest('.form-group')
	        .removeClass('has-error')
	        .addClass('has-success');
	    });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 125 */
/*!*************************************!*\
  !*** ./js/module/ui/uncollapser.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {/***************************************************************
	 * Code that adds supports for collapsing some blocks on
	 * small displays and replacing them with buttons, clicking
	 * which, would reveal the hidden block.
	 *
	 * This is done for saving limited screen space
	 * on small displays and improving UX.
	 ==============================================================*/

	module.exports = function () {
	  $('.js-box').on('click', '.js-unhide', function () {
	    var $btn = $(this);
	    var $target = $btn.data('target');
	    var type = $btn.data('type') || 'widget';

	    if ($target === undefined) {
	      $target = $btn.prev();
	      type = 'simple';
	      if (!$target.hasClass('js-unhide-block')) {
	        $target = $btn.closest('.js-unhide-block');
	        type = 'widget';
	      }
	    } else {
	      $target = $('.' + $target);
	    }

	    if (!$target.length) {
	      throw 'Invalid element target';
	    }

	    switch (type) {
	      case 'widget':
	        $target.addClass('opened');
	        break;

	      case 'simple':
	        $target.show();
	        break;
	    }

	    $btn.hide();
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 126 */
/*!***************************************!*\
  !*** ./js/module/css-class-helper.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {exports.initParsleyHelper = function () {
	  __webpack_require__(/*! parsleyjs */ 17);
	  $('.js-parsley').parsley();
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 127 */
/*!****************************************!*\
  !*** ./js/module/data-api/datetime.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {__webpack_require__(/*! bootstrap-daterangepicker */ 28);
	var _ = __webpack_require__(/*! lodash */ 7);

	var detectOpenDirection = function ($item) {
	  var opensDir;
	  var offsetLeft = $item.offset().left;
	  var offsetRight = ($(window).width() - ($item.offset().left + $item.outerWidth()));
	  if (offsetLeft < 600) {
	    opensDir = 'right';
	  } else if (offsetRight < 600) {
	    opensDir = 'left';
	  }
	  return opensDir;
	};

	var buildOptions  = function($item){
	  return _.defaultsDeep(
	    {
	      startDate: $item.data('start-date'),
	      endDate: $item.data('end-date'),
	      timePicker: $item.data('time-picker'),
	      singleDatePicker: $item.data('single-picker'),
	      timePicker24Hour: $item.data('24hr'),
	      locale: {
	        format: $item.data('locale-format')
	      }
	    },
	    {
	      locale: {
	        format: 'MM/DD/YYYY  h:mm A'
	      },
	      timePicker: false,
	      timePickerIncrement: 5,
	      opens: detectOpenDirection($item),
	      autoApply: false
	    }
	  );
	};

	module.exports = function () {
	  $('.js-datetimerange').each(function () {
	    var $fieldsDatetime = $(this);
	    $fieldsDatetime.daterangepicker(buildOptions($fieldsDatetime));
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 128 */
/*!*******************************************!*\
  !*** ./js/module/ui/header-scroll-spy.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/***************************************************************
	 * Enables fixed menu
	 * Enables fixed search bar in mobile view
	 ==============================================================*/
	module.exports = function () {
	  var _ = __webpack_require__(/*! lodash */ 7);
	  var gridSize = __webpack_require__(/*! ../grid-size */ 117);
	  var $header = $('.header'),
	    $headerNav = $('#header-nav'),
	    $headerNavOffset = $('#header-nav-offset'),
	    $navbarCollapse = $('#navbar-collapse-1'),
	    setCssClass = '',
	    lgOffset = $headerNav.offset().top + 2000,
	    _cssClass = null;

	  // set height for placeholder only if the navbar has not positioned absolute
	  if (!$headerNav.hasClass('navbar--overlay')) $headerNavOffset.height($headerNav.height());

	  var setHeaderClass = function () {
	    var offsetTop = $(window).scrollTop();
	    if (offsetTop > lgOffset) {
	      setCssClass = 'header-fixed';
	    } else {
	      setCssClass = '';
	    }
	    if (gridSize.get() !== 'xs') {
	      if (setCssClass !== _cssClass) {
	        $header.removeClass('header-fixed').addClass(setCssClass);
	        $headerNav.removeClass('header-fixed').addClass(setCssClass);
	        $headerNavOffset.removeClass('header-fixed').addClass(setCssClass);
	        $navbarCollapse.removeClass('header-fixed').addClass(setCssClass);
	        _cssClass = setCssClass;
	      }

	    }
	  };

	  $(window).on('scroll', _.debounce(setHeaderClass, 10));
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 129 */
/*!**************************************!*\
  !*** ./js/module/ui/scrollup-spy.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/***************************************************************
	 * "Scroll to top" button
	 ==============================================================*/
	var _ = __webpack_require__(/*! lodash */ 7);
	module.exports = function () {
	  var $scrollup = $('.js-scrollup'),
	    scrollupClass = '',
	    _cssClass = null;

	  var setScrollupClass = function () {
	    var offsetTop = $(window).scrollTop();
	    if (offsetTop > 400) {
	      scrollupClass = 'scrollup-show';
	    } else {
	      scrollupClass = '';
	    }

	    if (scrollupClass !== _cssClass) {
	      $scrollup.removeClass('scrollup-show');
	      $scrollup.addClass(scrollupClass);
	      _cssClass = scrollupClass;
	    }
	  };

	  $(window).on('scroll', _.debounce(setScrollupClass, 800));
	  $scrollup.on('click', function () {
	    var offsetTop = $(window).scrollTop();
	    var time = 800 + (offsetTop / 10);
	    $('html, body').animate({scrollTop: 0}, time, 'linear');
	  });

	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 130 */
/*!*****************************!*\
  !*** ./js/demo/ui-panel.js ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/***************************************************************
	 * Panel useful for development, where you can
	 * enable or disable various theme features.
	 *
	 * Usually, this should be DISABLED on live website.
	 ==============================================================*/
	module.exports = function () {
	  var _ = __webpack_require__(/*! lodash */ 7);
	  var panels = ['pages', 'boxed', 'patterns', 'theme_colors', 'compact', 'sidebar', 'listing_grid', 'dropdown_effects', 'slider_effects'];
	  var options = {
	    pages: [
	      {url: 'index.html', name: 'Banner & Search'},
	      {url: 'index_slider.html', name: 'Property slider'},
	      {url: 'index_slider_search.html', name: 'Slider & Search'},
	      {url: 'index_slider_auth.html', name: 'Slider & Authorization'},
	      {url: 'index_not_available.html', name: 'Index not available'},
	      {url: 'index_vmap_light.html', name: 'Index Map Light'},
	      {url: 'index_vmap_dark.html', name: 'Index Map Dark'},
	      {url: 'index_hmap_light.html', name: 'Index Map Bottom'},
	      {url: 'feature_map_leaflet.html', name: 'Feature Map Leaflet'},
	      {url: 'feature_vmap_fullscreen.html', name: 'Feature Map Fullscreen'},
	      {url: 'feature_loaders.html', name: 'Feature loaders'},
	      {url: 'feature_boxed.html', name: 'Feature boxed'},
	      {url: 'feature_header_small.html', name: 'Feature header small'},
	      {url: 'feature_left_sidebar.html', name: 'Feature left sidebar'},
	      {url: 'agents_listing_grid.html', name: 'Listing agents grid'},
	      {url: 'agents_listing.html', name: 'Listing agents list'},
	      {url: 'properties_listing_grid.html', name: 'Listing properties grid medium'},
	      {url: 'feature_grid_small.html', name: 'Listing properties grid small'},
	      {url: 'feature_grid_large.html', name: 'Listing properties grid large'},
	      {url: 'properties_listing.html', name: 'Listing properties list'},
	      {url: 'properties_listing_empty.html', name: 'Listing properties empty'},
	      {url: 'property_details.html', name: 'Property details'},
	      {url: 'property_details_agent.html', name: 'Propertiy details agent'},
	      {url: 'my_listings.html', name: 'My listings'},
	      {url: 'my_listings_add_edit.html', name: 'My listings add edit '},
	      {url: 'my_profile.html', name: 'My profile'},
	      {url: 'agent_listing.html', name: 'Agent listing'},
	      {url: 'agent_listing_sidebar.html', name: 'Agent listing sidebar'},
	      {url: 'blog.html', name: 'Blog'},
	      {url: 'blog_details.html', name: 'Blog details'},
	      {url: 'blog_empty.html', name: 'Blog empty'},
	      {url: 'contacts.html', name: 'Contacts'},
	      {url: 'faq.html', name: 'Faq'},
	      {url: 'reviews.html', name: 'Reviews'},
	      {url: 'gallery.html', name: 'Gallery'},
	      {url: 'pricing.html', name: 'Pricing'},
	      {url: 'page.html', name: 'Page'},
	      {url: 'user_login.html', name: 'User login'},
	      {url: 'user_register.html', name: 'User register'},
	      {url: 'user_restore_pass.html', name: 'User restore password'},
	      {url: 'bootstrap.html', name: 'Twitter Bootstrap'},
	      {url: 'feature_typography.html', name: 'Feature Typography'},
	      {url: 'feature_ui.html', name: 'Feature UI'},
	      {url: 'error_403.html', name: 'Error 403'},
	      {url: 'error_404.html', name: 'Error 404'},
	      {url: 'error_500.html', name: 'Error 500'},
	      {url: 'email.html', name: 'Email Example'}
	    ],
	    boxed: false,
	    bg_patterns: ['brickwall', 'debut_light', 'diagonal_lines_01', 'diagonal-noise', 'dust_2X', 'groovepaper', 'little_pluses', 'p4', 'p5',
	      'retina_dust', 'ricepaper2', 'shl', 'squairy_light', 'stardust_2X', 'subtle_dots', 'subtle_dots_2X', 'white_brick_wall', 'worn_dots'],
	    theme_colors: ['default', 'blue-orange_red', 'blue_green', 'brown-dark_red', 'brown-dark_yellow', 'brown_red', 'dark_blue-dark_yellow',
	      'dark_blue-light_green', 'dark_blue-yellow', 'dark_violet-green', 'dark_violet-yellow', 'gray-red', 'green-red', 'green_blue-red',
	      'light_blue-beige', 'light_blue-cyan', 'light_cyan-red', 'light_green-dark_blue', 'light_green-violet', 'pink_yellow'],
	    header_fixed: true,
	    header_colors: [['header_color_gray', 'Condensed gray'], ['header_color_white', 'Condensed white'], ['header_color_brand', 'Brand colors']],
	    dropdown_effects: ['default', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp'],
	    slider_effects: ['default', 'bounce', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'flipInX', 'flipInY', 'zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp'],
	    hover_effects: ['default', 'apollo', 'honey', 'layla', 'lexi', 'lily', 'oscar', 'sarah', 'zoe'],
	    sidebar: ['left', 'right', 'hide'],
	    listing_grid: ['small', 'medium', 'big']
	  };

	  var UIpanel = (function () {
	    var widget = {},
	      $body = $('body'),
	      $uiPanel,
	      $uiPanelToogle,
	      $linkStyles = document.querySelectorAll('link');

	    widget.ui = {
	      select: function (data, type, selected) {
	        var _this = this;
	        _this.getWrapper = function (type, options) {
	          return '<select class="form-control js-uipanel-control-' + type + '"><option value="">Choose option</option>' + options + '</select>';
	        };
	        _this.getOptions = function (data) {
	          return data.map(function (item) {
	            return '<option value="' + item.value + '" ' + (selected === item.value ? 'selected' : '') + '>' + item.title + '</option>';
	          });
	        };

	        return _this.getWrapper(type, _this.getOptions(data));
	      },
	      radio: function (value, title, type) {
	        return '<div class="checkbox">' +
	          '<input id="option_' + type + '_' + title + '" type="radio" name="' + type + '" class="in-radio js-uipanel-control-' + type + '" value="' + value + '">' +
	          '<label for="option_' + type + '_' + title + '" class="in-label">' + title + '</label>' +
	          '</div>';

	      },
	      formGroup: function (label, control) {
	        return '<div class="form-group">' +
	          '<label for="" class="control-label">' + label + '</label>' +
	          control +
	          '</div>';
	      }
	    };

	    widget.panels = {
	      pages: {
	        onChange: function (e) {
	          window.location.href = window.location.href.replace(/([a-z0-9_&]*\.html#?.*)$/i, e.currentTarget.value);
	        },
	        add: function () {
	          var data = options.pages.map(function (page) {
	            return {
	              value: page.url,
	              title: page.name
	            }
	          });

	          var url = window.location.pathname;
	          var filename = url.substring(url.lastIndexOf('/') + 1);
	          var control = widget.ui.select(data, 'pages', filename);
	          var formGroup = widget.ui.formGroup('Pages', control);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('pages');
	        }
	      },
	      boxed: {
	        onChange: function (e) {
	          if (e.currentTarget.value == 'true') {
	            $body.addClass('boxed');
	          } else {
	            $body.removeClass('boxed');
	          }
	        },
	        add: function () {
	          var controls = widget.ui.radio(false, 'No', 'boxed');
	          controls += widget.ui.radio(true, 'Yes', 'boxed');
	          var formGroup = widget.ui.formGroup('Boxed', controls);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('boxed');
	        }
	      },
	      patterns: {
	        onChange: function (e) {
	          $body[0].className = $body[0].className.replace(/bg-[a-zX0-9_\-&]*/, '');
	          $body.addClass('bg-' + e.currentTarget.value);
	        },
	        add: function () {
	          var data = options.bg_patterns.map(function (pattern) {
	            return {
	              value: pattern,
	              title: pattern
	            }
	          });

	          var control = widget.ui.select(data, 'patterns');
	          var formGroup = widget.ui.formGroup('Patterns', control);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('patterns');
	        }
	      },
	      theme_colors: {
	        onChange: function (e) {
	          var themeId = e.currentTarget.value;
	          if (!themeId) return;
	          var config = __webpack_require__(/*! ../module/config */ 6);
	          [].forEach.call($linkStyles, function (link) {
	            if (/\/css\/theme\-/.test(link.href)) {
	              var xhr = new XMLHttpRequest();
	              xhr.open('GET', 'assets/css/theme-' + themeId + '.css');
	              xhr.send('');
	              xhr.addEventListener("load", function(e) {
	                console.log('loaded');
	                link.href = 'assets/css/theme-' + themeId + '.css';
	                config.colorTheme = themeId;
	              }, false);
	            }
	          });
	        },
	        add: function () {
	          var data = options.theme_colors.map(function (pattern) {
	            return {
	              value: pattern,
	              title: pattern
	            }
	          });

	          var control = widget.ui.select(data, 'theme_colors');
	          var formGroup = widget.ui.formGroup('Theme colors', control);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('theme_colors');
	        }
	      },
	      dropdown_effects: {
	        onChange: function (e) {
	          $body[0].className = $body[0].className.replace(/menu-[a-zA-Z]*/, '');
	          $body.addClass('menu-' + e.currentTarget.value);
	        },
	        add: function () {
	          var data = options.dropdown_effects.map(function (effect) {
	            return {
	              value: effect,
	              title: effect
	            }
	          });

	          var control = widget.ui.select(data, 'dropdown_effects');
	          var formGroup = widget.ui.formGroup('Menu effects', control);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('dropdown_effects');
	        }
	      },
	      slider_effects: {
	        onChange: function (e) {
	          $body[0].className = $body[0].className.replace(/slider\-\-[a-zA-Z]*/, '');
	          $body.addClass('slider--' + e.currentTarget.value);
	        },
	        add: function () {
	          var data = options.slider_effects.map(function (effect) {
	            return {
	              value: effect,
	              title: effect
	            }
	          });

	          var control = widget.ui.select(data, 'slider_effects');
	          var formGroup = widget.ui.formGroup('Slider effects', control);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('slider_effects');
	        }
	      },
	      hover_effects: {
	        onChange: function (e) {
	          $body[0].className = $body[0].className.replace(/hover-[a-zA-Z]*/, '');
	          $body.addClass('hover-' + e.currentTarget.value);
	        },
	        add: function () {
	          var data = options.hover_effects.map(function (effect) {
	            return {
	              value: effect,
	              title: effect
	            }
	          });

	          var control = widget.ui.select(data, 'hover_effects');
	          var formGroup = widget.ui.formGroup('Hover effects', control);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('hover_effects');
	        }
	      },
	      compact: {
	        onChange: function (e) {
	          if (e.currentTarget.value == 'true') {
	            $body.addClass('compact');
	          } else {
	            $body.removeClass('compact');
	          }
	        },
	        add: function () {
	          var controls = widget.ui.radio(false, 'No', 'compact');
	          controls += widget.ui.radio(true, 'Yes', 'compact');
	          var formGroup = widget.ui.formGroup('Header compact', controls);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('compact');

	        }
	      },
	      header_colors: {
	        onChange: function (e) {
	          $body[0].className = $body[0].className.replace(/header_color_[a-zX0-9_\-&]*/, '');
	          $body.addClass(e.currentTarget.value);
	        },
	        add: function () {
	          var data = options.header_colors.map(function (style) {
	            return {
	              value: style[0],
	              title: style[1]
	            }
	          });

	          var control = widget.ui.select(data, 'header_colors');
	          var formGroup = widget.ui.formGroup('Header style', control);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('header_colors');
	        }
	      },
	      sidebar: {
	        onChange: function (e) {
	          $body[0].className = $body[0].className.replace(/sidebar-[a-zX0-9_\-&]*/, '');
	          $body.addClass('sidebar-' + e.currentTarget.value);
	        },
	        add: function () {
	          var controls = options.sidebar.map(function (type) {
	            return widget.ui.radio(type, type, 'sidebar');
	          });

	          var formGroup = widget.ui.formGroup('Sidebar', controls);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('sidebar');
	        }
	      },
	      listing_grid: {
	        onChange: function (e) {
	          $body[0].className = $body[0].className.replace(/listing-grid-[a-zX0-9_\-&]*/, '');
	          $body.addClass('listing-grid-' + e.currentTarget.value);
	        },
	        add: function () {
	          var controls = options.listing_grid.map(function (type) {
	            return widget.ui.radio(type, type, 'listing_grid');
	          });

	          var formGroup = widget.ui.formGroup('Listing grid', controls);
	          $uiPanel.append(formGroup);
	          widget.listeners.control('listing_grid');
	        }
	      }
	    };

	    widget.addPanels = function (_panels) {
	      _panels.forEach(function (panel) {
	        widget.panels[panel].add();
	      });
	    };

	    widget.listeners = {
	      panel: function () {
	        $uiPanel = $('.js-ui-panel');
	        $uiPanelToogle = $('.js-ui-panel-toggle');
	        $uiPanelToogle.on('click', function () {
	          if ($(this).hasClass('active')) {
	            $(this).removeClass('active');
	            $uiPanel.removeClass('opened');
	          } else {
	            $(this).addClass('active');
	            $uiPanel.addClass('opened');
	          }
	        });

	        var $uiPanelButtonScroll = $('.js-ui-panel-scroll');

	        $uiPanelButtonScroll.on('click', function () {
	          var delta = $(this).data('dir') == 'up' ? -500 : 500;
	          var offsetTop = $(window).scrollTop();
	          $('html, body').animate({scrollTop: offsetTop + delta}, 100);
	        });
	      },
	      control: function (type) {
	        $('.js-uipanel-control-' + type).on('change', function (e) {
	          widget.panels[type].onChange(e);
	        });
	      }
	    };


	    widget.init = function (_panels) {

	      $('<link>')
	        .appendTo('head')
	        .attr({type: 'text/css', rel: 'stylesheet'})
	        .attr('href', '../assets/css/ui-panel.css');

	      var htmlBlock = '<div class="ui-panel js-ui-panel">' +
	        '<button class="ui-panel__toggle js-ui-panel-toggle"></button>' +
	        '<button type="button" class="ui-panel__scroll ui-panel__scroll--up js-ui-panel-scroll" data-dir="up"></button>' +
	        '<button type="button" class="ui-panel__scroll ui-panel__scroll--down js-ui-panel-scroll" data-dir="down"></button>' +
	        '</div>';
	      $body.append(htmlBlock);

	      widget.listeners.panel();
	      widget.addPanels(_panels);
	    };
	    return widget;
	  })();

	  UIpanel.init(panels);
	  return UIpanel;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 131 */
/*!*******************************!*\
  !*** ./js/module/gmap/map.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	exports.create = function ($mapContainer, options, $mobilePopupTrigger, onLoad) {
	  var mobilePopup = __webpack_require__(/*! ../mobile-popup */ 132);
	  onLoad = onLoad || $.noop;

	  if ($mobilePopupTrigger) {
	    mobilePopup.wrapContainer($mapContainer, $mobilePopupTrigger, loadMap);
	  } else {
	    loadMap();
	  }

	  function loadMap() {
	    var map = new google.maps.Map($mapContainer[0], options);
	    onLoad(map);
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 132 */
/*!***********************************!*\
  !*** ./js/module/mobile-popup.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/***************************************************************
	 * Helper for improved user experience with maps on devices
	 * with small screen.
	 *
	 * So that, when user loads the map on small-screen device, it
	 * is replaced by a button, clicking on it will open full screen
	 * popup with the map in it.
	 *
	 ==============================================================*/
	/**
	 * @param $mapContainer
	 * @param $triggerButton
	 * @param loadCallback
	 */
	exports.wrapContainer = function ($mapContainer, $triggerButton, loadCallback) {
	  var gridSize = __webpack_require__(/*! ./grid-size */ 117);
	  var $body = $('body');

	  if (gridSize.get() == 'xs') {
	    $triggerButton.colorbox({
	      html: $mapContainer,
	      onLoad: function () {
	        var winWidth = $(window).width();
	        var winHeight = window.innerHeight;
	        $mapContainer.css({
	          width: winWidth,
	          height: winHeight
	        });
	      },
	      onComplete: function () {
	        loadCallback();
	        $body.css({overflow: 'hidden'});
	      },
	      onCleanup: function () {
	        $body.css({overflow: 'auto'});
	      }
	    });
	  } else {
	    loadCallback();
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 133 */
/*!************************************!*\
  !*** ./js/module/gmap/panorama.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	exports.create = function ($mapContainer, options, $mobilePopupTrigger, onLoad) {
	  var mobilePopup = __webpack_require__(/*! ../mobile-popup */ 132);
	  onLoad = onLoad || $.noop;

	  if ($mobilePopupTrigger) {
	    mobilePopup.wrapContainer($mapContainer, $mobilePopupTrigger, loadPanorama);
	  } else {
	    loadPanorama();
	  }

	  function loadPanorama() {
	    var map = new google.maps.StreetViewPanorama($mapContainer[0], options);
	    onLoad(map);
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 134 */
/*!**********************************!*\
  !*** ./js/module/gmap/marker.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 *
	 * @param {Map} map
	 * @param {LatLng} latlng
	 * @param {string} title
	 * @returns {Marker}
	 */
	var config = __webpack_require__(/*! ../config */ 6);
	var _ = __webpack_require__(/*! lodash */ 7);

	exports.create = function (map, latlng, title) {
	  return exports.createAdvanced({
	    position: latlng,
	    map: map,
	    title: title
	  });
	};

	exports.createAdvanced = function (options) {
	  options = _.defaults(options, {
	    animation: google.maps.Animation.DROP,
	    icon: {
	      url: config.assetsPathPrefix + 'img/marker/' + config.colorTheme + '.png',
	      origin: new google.maps.Point(0, 0),
	      anchor: new google.maps.Point(15, 47)
	    }
	  });
	  return new google.maps.Marker(options);
	};


/***/ },
/* 135 */
/*!******************************************!*\
  !*** ./js/module/gmap/infobox-marker.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function HashTable() {
	  var keys = [], values = [];

	  return {
	    put: function (key, value) {
	      var index = keys.indexOf(key);
	      if (index == -1) {
	        keys.push(key);
	        values.push(value);
	      }
	      else {
	        values[index] = value;
	      }
	    },
	    get: function (key) {
	      return values[keys.indexOf(key)];
	    }
	  };
	}

	var infoboxInstances = new HashTable();
	var markers = new HashTable();

	exports.create = function (map, latlng, title, infoboxHtml, infoboxTheme) {
	  var Infobox;
	  var config = __webpack_require__(/*! ../config */ 6);
	  var infoboxBuilder = __webpack_require__(/*! ./infobox */ 136);
	  var markerBuilder = __webpack_require__(/*! ./marker */ 134);

	  var marker = markerBuilder.create(map, latlng, title);
	  markers.put(marker, {content: infoboxHtml, theme: infoboxTheme});

	  Infobox = infoboxInstances.get(map);
	  if (!Infobox) {
	    Infobox = infoboxBuilder.create(infoboxHtml, infoboxTheme);
	    infoboxInstances.put(map, Infobox);
	  }

	  google.maps.event.addListener(marker, 'click', function () {
	    var infoboxData = markers.get(marker);
	    Infobox.close();
	    infoboxBuilder.setContent(Infobox, infoboxData.content, infoboxData.theme);
	    Infobox.open(map, marker);
	    Infobox.setVisible(true);
	  });

	  google.maps.event.addListener(map, 'click', function () {
	    if (Infobox) {
	      Infobox.setVisible(false);
	    }
	  });

	  return marker;
	};


/***/ },
/* 136 */
/*!***********************************!*\
  !*** ./js/module/gmap/infobox.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Creates a infobox window for google maps
	 *
	 * @param {string} content
	 * @param {string} theme - "dark" or "white"
	 * @returns {InfoBox} Infobox object
	 */

	exports.create = function (content, theme) {
	  var config = __webpack_require__(/*! ../config */ 6);
	  var infoboxBuilder = __webpack_require__(/*! google-maps-infobox */ 5);
	  theme = theme || 'white';
	  return new infoboxBuilder({
	    content: generateContent(content, theme),
	    boxStyle: {
	      background: "none",
	      opacity: 1,
	      width: "355px"
	    },
	    pixelOffset: new google.maps.Size(-17, -77),
	    closeBoxMargin: "7px 7px 2px 2px",
	    closeBoxURL: "",
	    infoBoxClearance: new google.maps.Size(1, 1),
	    visible: true,
	    pane: "floatPane",
	    enableEventPropagation: false
	  });
	};

	exports.setContent = function (Infobox, content, theme) {
	  Infobox.setContent(generateContent(content, theme));
	};

	function generateContent(content, theme) {
	  return "<div class='map__infobox map__infobox--" + theme + "'>" + content + "</div>";
	}


/***/ },
/* 137 */
/*!*************************************!*\
  !*** ./js/module/gmap/clusterer.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 *
	 * @param {Map} map
	 * @param {Marker[]} markers - Array of markers
	 * @returns {Marker}
	 */
	exports.create = function (map, markers) {
	  var config = __webpack_require__(/*! ../config */ 6);
	  var MarkerClusterer = __webpack_require__(/*! google-marker-clusterer-plus */ 21);
	  return new MarkerClusterer(map, markers, {
	    maxZoom: 11,
	    gridSize: 100,
	    styles: [{
	      url: config.assetsPathPrefix + 'img/marker/' + config.colorTheme + '.png',
	      width: 34,
	      height: 47,
	      anchorText: [-7, 18],
	      anchorIcon: [15, 47],
	      textColor: '#fff',
	      textSize: 10
	    }]
	  });
	};


/***/ },
/* 138 */
/*!******************************!*\
  !*** ./js/module/leaflet.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	exports.create = function ($mapContainer, options, $mobilePopupTrigger, onLoad) {
	  var L = __webpack_require__(/*! leaflet */ 24);
	  var mobilePopup = __webpack_require__(/*! ./mobile-popup */ 132);
	  var firstRun = false;
	  var map;

	  onLoad = onLoad || $.noop;

	  if ($mobilePopupTrigger) {
	    mobilePopup.wrapContainer($mapContainer, $mobilePopupTrigger, loadMap);
	  } else {
	    loadMap();
	  }

	  function loadMap() {
	    if (!firstRun) {
	      map = L.map($mapContainer[0], options);

	      L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	        maxZoom: 19,
	        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
	      }).addTo(map);

	      var controlZoom = L.control.zoom({
	        position: 'topright'
	      });
	      controlZoom.addTo(map);
	    }

	    onLoad(map);
	    firstRun = true;
	  }
	};

	exports.addInfoboxMarker = function (map, latlng, title, infoboxHtml, infoboxTheme) {
	  var config = __webpack_require__(/*! ./config */ 6);
	  var propertyIcon = L.icon({
	    iconUrl: config.assetsPathPrefix + 'img/marker/' + config.colorTheme + '.png',
	    iconSize: [34, 47],
	    iconAnchor: [0, 0],
	    popupAnchor: [25, -25]
	  });
	  L.marker(latlng, {icon: propertyIcon})
	    .addTo(map)
	    .bindPopup("<div class='map__infobox map__infobox--" + infoboxTheme + "'>" + infoboxHtml + '</div>');
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 139 */
/*!********************************************!*\
  !*** ./js/module/gmap/autocomplete-map.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/***************************************************************
	 * Helper for displaying the interactive map and interaction
	 * with form field in my_listings_add_edit.html
	 ==============================================================*/
	module.exports = function (options) {
	  var _ = __webpack_require__(/*! lodash */ 7),
	    geolocation = __webpack_require__(/*! ./geolocation */ 140),
	    $mapContainer = options.container;
	  _.mergeDefaults = __webpack_require__(/*! ./../helper/merge-defaults */ 142);

	  options = _.mergeDefaults(options, {
	    map: {
	      zoom: 10,

	      mapTypeControl: false,
	      panControl: false,
	      zoomControl: false,
	      streetViewControl: false
	    },
	    autocomplete: {
	      componentRestrictions: {'country': 'us'}
	    }
	  });


	  var map, marker,
	    geocoder,
	    autocompleteAddress = document.getElementById("autocomplete"),
	    autocompleteLat = document.getElementById("autocomplete-lat"),
	    autocompleteLng = document.getElementById("autocomplete-lng"),
	    $triggerButton = $('.js-map-btn'),
	    stateMapInit = false
	    ;

	  geocoder = new google.maps.Geocoder();


	  var gridSize = __webpack_require__(/*! ../grid-size */ 117);
	  var winWidth = $(window).width();
	  var winHeight = $(window).height();
	  var $body = $('body');

	  if (gridSize.get() == 'xs') {
	    $mapContainer.css({
	      width: winWidth,
	      height: winHeight
	    });

	    $triggerButton.colorbox({
	      html: $mapContainer,
	      onLoad: function () {
	        var winWidth = $(window).width();
	        var winHeight = window.innerHeight;
	        $mapContainer.css({
	          width: winWidth,
	          height: winHeight
	        });
	      },
	      onComplete: function () {
	        if (!stateMapInit) {
	          map = new google.maps.Map($mapContainer[0], options.map);
	          stateMapInit = true;
	        }
	        mapInit(map);
	        $body.css({overflow: 'hidden'});
	      },
	      onCleanup: function () {
	        $body.css({overflow: 'auto'});
	      }
	    });
	  } else {
	    map = new google.maps.Map($mapContainer[0], options.map);
	    mapInit(map);
	  }

	  function mapInit(map) {
	    google.maps.event.addListener(map, 'click', function (event) {
	      placeMarker(event.latLng);
	    });

	    geolocation.activate(map, {
	      buttonTrigger: '.js-geolocate',
	      onSuccess: function (latLng) {
	        placeMarker(latLng);
	      }
	    });

	    function placeMarker(location) {
	      if (marker) {
	        marker.setPosition(location); //on change sa position
	      } else {
	        addMapMarker(location.lat(), location.lng())
	      }
	      setCoordinatesFiled(location.lat(), location.lng());
	      getAddress(location);
	    }

	    function getAddress(latLng) {
	      geocoder.geocode({'latLng': latLng},
	        function (results, status) {
	          if (status == google.maps.GeocoderStatus.OK) {
	            if (results[0]) {
	              autocompleteAddress.value = results[0].formatted_address;
	            }
	            else {
	              autocompleteAddress.value = "No results";
	            }
	          }
	          else {
	            autocompleteAddress.value = status;
	          }
	        });
	    }

	    // Create the autocomplete object and associate it with the UI input control.
	    // Restrict the search to the default country, and to place type "cities".
	    var autocomplete = new google.maps.places.Autocomplete(
	      /** @type {HTMLInputElement} */( autocompleteAddress ),
	      options.autocomplete);

	    google.maps.event.addListener(autocomplete, 'place_changed', onPlaceChanged);

	    $('#autocomplete').on('keypress', function (e) {
	      if (e.keyCode == 13) return false;
	    });


	    // When the user selects a city, get the place details for the city and
	    // zoom the map in on the city.
	    function onPlaceChanged() {
	      var place = autocomplete.getPlace();
	      if (place.geometry) {
	        map.panTo(place.geometry.location);
	        // change zoom map only if user did not change it before
	        map.setZoom(15);
	        if (marker) {
	          var markerCoords = new google.maps.LatLng(place.geometry.location.A, place.geometry.location.F);
	          marker.setPosition(markerCoords); //on change sa position
	        } else {
	          addMapMarker(place.geometry.location.A, place.geometry.location.F)
	        }
	        setCoordinatesFiled(place.geometry.location.A, place.geometry.location.F);
	      } else {
	        autocomplete.placeholder = 'Enter a address';
	      }

	    }

	    // create marker on map
	    function addMapMarker(lat, lng) {
	      var markerCoords = new google.maps.LatLng(lat, lng);
	      var markerBuilder = __webpack_require__(/*! ./marker */ 134);

	      marker = markerBuilder.createAdvanced({
	        position: markerCoords,
	        map: map,
	        draggable: true
	      });

	      google.maps.event.addListener(marker, 'dragend', function () {
	        placeMarker(marker.getPosition());
	      });
	    }

	    // set coordinates in fileds
	    function setCoordinatesFiled(lat, lng) {
	      autocompleteLat.value = lat;
	      autocompleteLng.value = lng;
	    }

	    $('.js-autocomplete-coords').on('input', function (e) {
	      if ($.isNumeric(autocompleteLat.value) && $.isNumeric(autocompleteLng.value)) {
	        var latlng = new google.maps.LatLng(autocompleteLat.value, autocompleteLng.value);
	        if (marker) {
	          marker.setPosition(latlng); //on change sa position
	        } else {
	          addMapMarker(latlng.lat(), latlng.lng())
	        }
	        map.panTo(latlng);
	        getAddress(latlng);
	        if (e.keyCode == 13) return false;
	      }
	    });

	  }


	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 140 */
/*!***************************************!*\
  !*** ./js/module/gmap/geolocation.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/**
	 * @param {Map} map Google Map Object
	 * @param {Object} options
	 * @param {String} options.buttonTrigger
	 * @param {Function} options.onSuccess
	 */
	module.exports.activate = function (map, options) {
	  var notifier = __webpack_require__(/*! ../notifier */ 141);
	  var _ = __webpack_require__(/*! lodash */ 7);
	  options = _.defaults(options, {
	    buttonTrigger: false,
	    onSuccess: function () {
	    }
	  });

	  if (options.buttonTrigger) {
	    $(options.buttonTrigger).on('click', initialize);
	  } else {
	    google.maps.event.addDomListener(window, 'load', initialize);
	  }


	  function initialize() {
	    // Try HTML5 geolocation
	    if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(
	        function (position) {
	          var pos = new google.maps.LatLng(
	            position.coords.latitude,
	            position.coords.longitude
	          );
	          map.setCenter(pos);
	          options.onSuccess(pos);
	        }, function () {
	          handleNoGeolocation(true);
	        }
	      );
	    } else {
	      // Browser doesn't support Geolocation
	      handleNoGeolocation(false);
	    }
	  }

	  function handleNoGeolocation(errorFlag) {
	    if (errorFlag) {
	      notifier.showError('Error: The Geolocation service failed.');
	    } else {
	      notifier.showError('Error: Your browser doesn\'t support geolocation.');
	    }
	  }

	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 141 */
/*!*******************************!*\
  !*** ./js/module/notifier.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/***************************************************************
	 * A helper for displaying notification at the top of the page
	 * Usually this is useful in AJAX requests, in order to provide
	 * a feedback to users over the request status
	 *
	 * You can use methods:
	 * - app.notifier.showError
	 * - app.notifier.showServerError
	 * - app.notifier.showSuccess
	 *
	 * Optionally you can pass a `message` as the first argument
	 * in order to provide custom text
	 *
	 * See https://github.com/sciactive/pnotify for documentation
	 ==============================================================*/
	var _ = __webpack_require__(/*! lodash */ 7);
	var PNotify = __webpack_require__(/*! pnotify */ 19);

	var conf = {
	  icon: false,
	  text: false,
	  title_escape: false,
	  addclass: "stack-bar-top",
	  cornerclass: "",
	  width: "100%",
	  stack: {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0},
	  delay: 2000
	};

	var getTemplate = function (type, message) {
	  type = type == 'error' ? 'error' : 'valid';
	  var html = '<svg class="notify-icon"><use xlink:href="#icon-' + type + '"></use></svg>' + message;
	  return html;
	};
	exports.showError = function (message) {
	  message = message || 'An error occured, please see details below';
	  new PNotify(_.merge(conf, {
	    title: getTemplate('error', message),
	    type: 'error'
	  }));
	};

	exports.showServerError = function (message) {
	  message = message || 'Server error occured, please contact website administrator.';
	  new PNotify(_.merge(conf, {
	    title: getTemplate('error', message),
	    type: 'error'
	  }));
	};

	exports.showSuccess = function (message) {
	  message = message || 'An error occured, please see details below';
	  new PNotify(_.merge(conf, {
	    title: getTemplate('success', message),
	    type: 'success'
	  }));
	};

	exports.watchNotifications = function (messages) {
	  _.each(messages, function (message) {
	    if (message.type === 'error') {
	      exports.showError(message.message);
	    } else {
	      exports.showSuccess(message.message);
	    }
	  });
	};


/***/ },
/* 142 */
/*!********************************************!*\
  !*** ./js/module/helper/merge-defaults.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(/*! lodash */ 7);

	/**
	 * defaultsDeep
	 *
	 * Implement a deep version of `_.defaults`.
	 *
	 * This method is hopefully temporary, until lodash has something
	 * similar that can be called in a single method.  For now, it's
	 * worth it to use a temporary module for readability.
	 * (i.e. I know what `_.defaults` means offhand- not true for `_.partialRight`)
	 */

	// In case the end user decided to do `_.defaults = require('merge-defaults')`,
	// before doing anything else, let's make SURE we have a reference to the original
	// `_.defaults()` method definition.
	var origLodashDefaults = _.defaults;

	// Corrected: see https://github.com/lodash/lodash/issues/540
	module.exports = _.partialRight(_.merge, function recursiveDefaults(dest, src) {

	  // Ensure dates and arrays are not recursively merged
	  if (_.isArray(arguments[0]) || _.isDate(arguments[0])) {
	    return arguments[0];
	  }
	  return _.merge(dest, src, recursiveDefaults);
	});

	//origLodashDefaults.apply(_, Array.prototype.slice.call(arguments));

	// module.exports = _.partialRight(_.merge, _.defaults);

	// module.exports = _.partialRight(_.merge, function deep(a, b) {
	//   // Ensure dates and arrays are not recursively merged
	//   if (_.isArray(a) || _.isDate(a)) {
	//     return a;
	//   }
	//   else return _.merge(a, b, deep);
	// });

/***/ },
/* 143 */
/*!*************************************!*\
  !*** ./js/module/ui/photo-swipe.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	function getItems(cssSelector) {
	  var $items = $(cssSelector),
	    arrItems = [];

	  $items.each(function (i, item) {
	    var size = item.getAttribute('data-size').split('x'),
	      src = item.getAttribute('href');
	    arrItems.push({
	      src: src,
	      w: parseInt(size[0]),
	      h: parseInt(size[1])
	    });
	  });

	  return arrItems;
	}
	var _ = __webpack_require__(/*! lodash */ 7);
	exports.init = function (cssSelector, options) {
	  var htmlPswp = '<div class="pswp js-pspw" tabindex="-1" role="dialog" aria-hidden="true">\
	    <div class="pswp__bg"></div>\
	    <div class="pswp__scroll-wrap">\
	      <div class="pswp__container">\
	        <div class="pswp__item"></div>\
	        <div class="pswp__item"></div>\
	        <div class="pswp__item"></div>\
	      </div>\
	      <div class="pswp__ui pswp__ui--hidden">\
	        <div class="pswp__top-bar">\
	          <div class="pswp__counter"></div>\
	          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>\
	          <button class="pswp__button pswp__button--share" title="Share"></button>\
	          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>\
	          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>\
	          <div class="pswp__preloader">\
	            <div class="pswp__preloader__icn">\
	              <div class="pswp__preloader__cut">\
	                <div class="pswp__preloader__donut"></div>\
	              </div>\
	            </div>\
	          </div>\
	        </div>\
	        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\
	          <div class="pswp__share-tooltip"></div>\
	        </div>\
	        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>\
	        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>\
	        <div class="pswp__caption">\
	          <div class="pswp__caption__center"></div>\
	        </div>\
	      </div>\
	  </div>\
	</div>';


	  // define options (if needed)
	  options = _.defaults(options, {
	    // optionName: 'option value'
	    // for example:
	    shareEl: false,
	    index: 0,
	    history: false
	  });

	  var pswpElement = $(htmlPswp).appendTo('body')[0];

	  // build items array
	  var items = getItems(cssSelector);
	  var PhotoSwipe = __webpack_require__(/*! photoswipe/dist/photoswipe */ 25);
	  var PhotoSwipeUI_Default = __webpack_require__(/*! photoswipe/dist/photoswipe-ui-default */ 26);
	  var galleryLinks = $(cssSelector);

	  // listen events>
	  galleryLinks.on('click', function (e) {

	    var index = galleryLinks.index(this);
	    // Initializes and opens PhotoSwipe
	    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
	    gallery.init();
	    gallery.goTo(index);
	    return false;
	  });
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 144 */
/*!****************************************!*\
  !*** ./js/module/ui/map-fullscreen.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	/***************************************************************
	 * Fullscreen map, set height
	 ==============================================================*/
	module.exports = function () {
	  var winHeight = $(window).height(),
	    headerHeight = $('.header').height(),
	    headerNavHeight = $('#header-nav').height(),
	    map = $('.js-map'),
	    $mapCanvas,
	    mapHeight = map.height(),
	    diff;

	  var gridSize = __webpack_require__(/*! ../grid-size */ 117).get();
	  if (gridSize !== 'lg') return;

	  diff = winHeight - headerHeight - headerNavHeight;
	  if (mapHeight < diff) {
	    map.animate({height: diff}, 1000, function () {
	      $mapCanvas = $('.js-map-index-canvas');
	      if ($mapCanvas.length) {
	        google.maps.event.trigger($mapCanvas[0], 'resize');
	      }
	    });
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 145 */
/*!******************************************!*\
  !*** ./js/module/ui/scroll-animation.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	module.exports = function () {
	  var ScrollReveal = __webpack_require__(/*! scrollreveal */ 146);
	  var gridSize = __webpack_require__(/*! ../grid-size */ 117);

	  var callbacks = {
	    countUp: __webpack_require__(/*! ./count-up */ 147)
	  };


	  if (gridSize.get() === 'lg' && $('body').hasClass('scroll-animation')) {
	    window.sr = new ScrollReveal({
	        enter:    'bottom',
	        move:     '8px',
	        over:     '0.6s',
	        wait:     '0s',
	        easing:   'ease',

	        scale:    { direction: 'up', power: '0' },
	        rotate:   { x: 0, y: 0, z: 0 },
	        vFactor:  0.9,
	        opacity:  0,
	        complete: function(el){
	          var animateClass = $(el).data('animate-end');
	          var animateCallback = $(el).data('animate-callback');
	          if(animateClass) $(el).addClass('animated ' + animateClass);
	          if(animateCallback) callbacks[animateCallback](el, 'scroll-reveal');
	        }
	      }
	    );
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 146 */,
/* 147 */
/*!**********************************!*\
  !*** ./js/module/ui/count-up.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	module.exports = function (el, params) {
	  var CountUp = __webpack_require__(/*! countUp.js */ 148);
	  if(params === 'scroll-reveal') {
	    var $counter = $(el).find('.js-count-up');
	    var $counterValueEnd = $counter.data('count-end') || 0;
	    var $counterValueStart= $counter.data('count-start') || 0;
	    var $counterValueDuration= $counter.data('count-duration') || 2;
	    var options = {
	      useEasing : true,
	      useGrouping : true,
	      separator : ' ',
	      decimal : '.',
	      prefix : '',
	      suffix : ''
	    };

	    var counterAnim = new CountUp($counter[0], $counterValueStart, $counterValueEnd, 0, $counterValueDuration, options);
	    counterAnim.start();
	  }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ },
/* 148 */,
/* 149 */,
/* 150 */
/*!****************************!*\
  !*** ./js/module/utils.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	//exports.centerElementInViewport = function (DOMElement) {
	//    require('jquery-smooth-scroll');
	//    var elementHeight,
	//        elementOffset,
	//        windowHeight,
	//        offset,
	//        $element;
	//
	//    $(window).on('DOMContentLoaded load', function () {
	//        if (!exports.isElementInViewport(DOMElement)) {
	//            $element = $(DOMElement);
	//            elementOffset = $element.offset().top;
	//            elementHeight = $element.height();
	//            windowHeight = $(window).height();
	//
	//            if (elementHeight < windowHeight) {
	//                offset = elementOffset - ((windowHeight / 2) - (elementHeight / 2));
	//            }
	//            else {
	//                offset = elementOffset;
	//            }
	//            $.smoothScroll({speed: 500}, offset);
	//        }
	//    });
	//};

	exports.isElementInViewport = function (DOMElement) {
	  var rect = DOMElement.getBoundingClientRect();
	  var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
	  var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

	  return (
	    (rect.left >= 0)
	    && (rect.top >= 0)
	    && ((rect.left + rect.width) <= windowWidth)
	    && ((rect.top + rect.height) <= windowHeight)
	  );
	};

	exports.focusInputOnLoad = function (inputName) {
	  var element = document.getElementsByName(inputName)[0];
	  if (element) {
	    element.focus();
	    exports.centerElementInViewport(element);
	  }
	};

	exports.setFormProcessingState = function ($form, promise, noValidator) {
	  if (noValidator === undefined) {
	    noValidator = true;
	  }

	  exports.setProcessingState($form.find(':submit'), promise, $form);
	};

	exports.setProcessingState = function ($clickableElement, promise, $secondaryElement) {
	  var $htmlHelper = false;
	  if (!$clickableElement.hasClass('button--loading') && promise.state() === 'pending') {
	    $clickableElement.addClass('button__default--reset button--loading');

	    if ($secondaryElement) {
	      $secondaryElement.wrap('<div class="loading-overlay"></div>');
	      $htmlHelper = $('<div class="loading"></div>').appendTo($secondaryElement.parent());
	    }


	    $clickableElement.on('click.blocker', function (event) {
	      if (promise.state() === 'pending') {
	        event.stopImmediatePropagation();
	        alert('please wait');
	        return false;
	      } else {
	        $clickableElement.off('click.blocker');
	      }
	    });

	    promise.always(function () {
	      $clickableElement.removeClass('button__default--reset button--loading');
	      if ($secondaryElement) {
	        $secondaryElement.unwrap();
	        $htmlHelper.remove();
	      }
	      $clickableElement.off('click.blocker');
	    });
	  }
	};

	exports.closeOutside = function ($element, eventCallback) {
	  var notH = 1,
	    $pop = $element.on('hover', function () {
	      notH ^= 1;
	    });

	  $(document).on('mousedown keydown', function (e) {
	    if (notH || e.which == 27) {
	      eventCallback();
	    }
	  });
	};

	exports.abbreviateNumber = function (number) {
	  // 2 decimal places => 100, 3 => 1000, etc
	  var decPlaces = Math.pow(10, 0);

	  // Enumerate number abbreviations
	  var abbrev = ["k", "m", "b", "t"];

	  // Go through the array backwards, so we do the largest first
	  for (var i = abbrev.length - 1; i >= 0; i--) {

	    // Convert array index to "1000", "1000000", etc
	    var size = Math.pow(10, (i + 1) * 3);

	    // If the number is bigger or equal do the abbreviation
	    if (size <= number) {
	      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
	      // This gives us nice rounding to a particular decimal place.
	      number = Math.round(number * decPlaces / size) / decPlaces;

	      // Handle special case where we round up to the next abbreviation
	      if ((number == 1000) && (i < abbrev.length - 1)) {
	        number = 1;
	        i++;
	      }

	      // Add the letter for the abbreviation
	      number += abbrev[i];

	      // We are done... stop
	      break;
	    }
	  }

	  return number;
	};

	exports.loadSvgWithAjax = function () {
	  var config = __webpack_require__(/*! ./config */ 6);
	  $(document.body).prepend($('<div>').load(config.assetsPathPrefix + 'img/sprite-inline.svg'));
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! jquery */ 1)))

/***/ }
]);