"use strict";
(function ($) {
  /***************************************************************
   * Enables javascript support for theme
   ==============================================================*/
  app.initTheme({
    // Please update this options if you changes theme color scheme
    colorTheme: 'default',
    /** By default all svg icons are inlined at the beggining of
     * the <body> tag. If you would like to remove that inlined
     * data from the template, please set this to true.
     ==============================================================*/
    loadSvgWithAjax: false
  });
  /***************************************************************
   * Enables fixed menu
   * Enables fixed search bar in mobile view
   *
   * To disable this just comment out
   ==============================================================*/
  app.activateHeaderSpy();

  /***************************************************************
   * Enables "Scroll to top" button
   *
   * To disabled this just comment out and remove the corresponding
   * code from templates
   ==============================================================*/
  app.activateScrollToTopSpy();

  /***************************************************************
   * Panel useful for development, where you can
   * enable or disable various theme features.
   *
   * Usually, this should be disabled on live website.
   ==============================================================*/
  app.activateUIPanel();

  app.scrollAnimation();


  initPlyr('.player');
  initPartnersSlider('#partners-slider');
  initSelect2('.js-in-select');
  initSearch('.js-search-form');
  initGallery('.js-gallery-item');
  initAgentForm('.js-contact-form');
  initSubscribe('.js-subscribe-form');
  initReviewSlider('#review-slider');
  initMainBanner('.js-banner');
  initWideSlider('#slider-wide');
  initBannerSlider('.js-banner-slider');
  initIndexMap('.js-map-index-canvas', window.demodata);
  initPropertyMapAndPanorama('.js-map-canvas[data-type="map"]', '.js-map-canvas[data-type="panorama"]', window.demodata[3]);
  initSubmitPropertyForm('.js-form');
  initRangeSliders();
  initSlider('.js-slick-blog');
  initSlider('#counter-slider');
  initSlider('#properties-banner');
  initGoogleMap('.js-map-canvas-contact', window.demodata[3]);
  initBtnDemo('.js-btn-demo');
  initPopovers('.js-popover');
  initGeocoderGoogleMap('#autocomplete-map', {lat: 37.7749295, lng: -122.41941550000001});
  initLeafletMap('.js-map-canvas', window.demodata);


  /***************************************************************
   * Common javascript code used on most of the pages
   * You can place here the code that is run on every page.
   * We do not advice to put here the code that runs only on
   * specific page, because we care (and you should) about
   * performance.
   ==============================================================*/
  (function () {

    /***************************************************************
     * Examples of form validations
     *
     * Plugins used:
     * - http://parsleyjs.org/doc/index.html (for validation itself)
     * - https://github.com/sciactive/pnotify (for showing global notifications)
     *
     * Validation options are set via data-parsley-* attributes,
     * see example in the templates (for example feedback form in
     * the footer) or http://parsleyjs.org/doc/examples.html
     ==============================================================*/

  })();

  function initSubscribe (container) {

    /**
     * Subscribe form validation initialization as well as
     * displaying PNotify global message on error/success
     *
     * app.notifier.showSuccess/showError is a wrapper around `PNotify` function
     * with predefined defaults to make it look good in this theme
     *
     * if you would like to modify it, feel free to use the PNotify
     * plugin directly
     ==============================================================*/
    var $subscribeForm = $(container);
    if (!$subscribeForm.length)  return;
    $subscribeForm
      .parsley()
      .on('form:success', function (formInstance) {
        app.notifier.showSuccess('You have been successfully subscribed!');
        return false;
      })
      .on('form:error', function (formInstance) {
        app.notifier.showError('Subscription failed! Please try again.');
        return false;
      });
  }

  function initAgentForm (container) {
    /**
     * Agent contact form validation
     ==============================================================*/
    var $agentForm = $(container);
    if (!$agentForm.length) return;
    var $agentFormSubmitBtn = $agentForm.find(':submit');
    $agentForm.parsley()
      .on('form:success', function (formInstance) {
        $agentFormSubmitBtn.addClass('loading');
        $agentFormSubmitBtn.prop('disabled', true);
        $.post('php/contact.php', $agentForm.serialize())
          .done(function () {
            app.notifier.showSuccess('The message was sent!');
            formInstance.reset();
            $agentForm[0].reset();
          })
          .fail(function () {
            app.notifier.showError('Something went wrong!');
          })
          .always(function () {
            $agentFormSubmitBtn.prop('disabled', false);
            $agentFormSubmitBtn.removeClass('loading');
          });

        formInstance.submitEvent.preventDefault();

      });

  }

  function initGallery (container) {
    /**
     * Setup image popups with Photoswipe plugin
     * See documentation in http://photoswipe.com/documentation/options.html
     ==============================================================*/
    var $galleryItem = $(container);
    if (!$galleryItem.length) return;
    var gallery = app.createPhotoSwipe(container,
      {
        /*
         See here available options
         http://photoswipe.com/documentation/options.html
         */
      }
    );
  }

  function initSelect2 (container) {

    /**
     * Setup select form fields improved with Select2 plugin
     * See documentation in https://select2.github.io
     ==============================================================*/
    var $inSelect = $(container);
    var $inWidgetsSelect = $('.widget select');
    if ($inSelect.length) $inSelect.select2();
    if ($inWidgetsSelect.length) $inWidgetsSelect.select2();
  }

  function initPartnersSlider(container) {
    /**
     * Slick slider for "Our partners" block
     * See documentation for options http://kenwheeler.github.io/slick/
     ==============================================================*/
    var $partnersSlider = $(container) ;
    if (!$partnersSlider.length) return;

    $partnersSlider
      .find('.js-slick-slider')
      .slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        autoplay: true,
        prevArrow: $partnersSlider.find('.js-partners-prev'),
        nextArrow: $partnersSlider.find('.js-partners-next'),
        responsive: [
          {
            breakpoint: 1100,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
  }

  function initPlyr(container) {
    /***************************************************************
     * Plyr initialization for displaying html5 video
     * If you don't plan to have html5 video on the website,
     * you can remove this
     * Documentation https://github.com/selz/plyr
     ==============================================================*/
    var $player = $(container);
    if (!$player.length) return;
    plyr.setup();
    //
    //$('.js-player-play').on('click', function () {
    //  $(this).closest('.player')[0].plyr.play();
    //  $(this).hide();
    //});
  }

  function initReviewSlider(container) {
    /***************************************************************
     * Initialize sliders for user reviews
     * See http://kenwheeler.github.io/slick/ for more options
     ==============================================================*/
    var $reviewSlider = $(container);
    if (!$reviewSlider.length) return;
    $reviewSlider
      .find('.js-slick-slider')
      .slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 5000
      });
  }

  function initMainBanner(container) {
    var $container = $(container);
    if (!$container.length) return;

    var $searchForm = $container.find('.js-search-form');
    var $header = $('.header');
    var $headerNav = $('#header-nav');
    var $mainBannerMap = $container.find('.map');

    /***************************************************************
     * Initialize banner animation
     * Just add class start animation on document ready
     ==============================================================*/

    $container.addClass('banner--play');
    $searchForm.on('formChange', _.throttle(showMap, 500));
    initBannerLineAnimation(container);
    initIndexMap('.js-map-index-canvas');

    var stateOpenedMap = false;

    function showMap() {
      if (stateOpenedMap) return;
      if (app.gridSize.get() === 'lg') {
        requestAnimationFrame(function () {
          if ($headerNav.hasClass('navbar--overlay')) {
            $header.addClass('header--white');
            $headerNav.addClass('navbar--overlay-map');
          }
          $mainBannerMap.addClass('opened');
          $searchForm.removeClass('search--banner-sidebar').addClass('search--map-sidebar').addClass('search--map-sidebar-fix');
          stateOpenedMap = true;
        });
      }
    }
  }

  function initBannerLineAnimation(container) {
    /***************************************************************
     * Initialize line animation
     * See https://github.com/maxwellito/vivus for more options
     ==============================================================*/
    if (!$('#banner-line').length) return;
    var $container = $(container);
    var $searchForm = $container.find('.js-search-form');

    new app.Vivus('banner-line', {type: 'async', start: 'autostart', ignoreInvisible: false, duration: 50}, function () {
      var $sliderItem = $('#banner-line').closest('.slider__item');
      if ($sliderItem.hasClass('slick-slide') && !$sliderItem.hasClass('slick-active')) return;
      $container.find('.js-arrow-end').css({opacity: 1});
      $searchForm.addClass('search--anim');
    });
  }

  function initWideSlider(container) {
    /***************************************************************
     * Initialize sliders on the frontpage
     * See http://kenwheeler.github.io/slick/ for more options
     ==============================================================*/
    var $wideBanner = $(container);
    if (!$wideBanner.length) return;
    var $wideBannerSlider = $wideBanner.find('.js-slick-slider');


    $wideBannerSlider
      .slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        lazyLoad: 'progressive',
        prevArrow: $wideBanner.find('.js-banner-prev'),
        nextArrow: $wideBanner.find('.js-banner-next'),
        responsive: [
          {
            breakpoint: 1300,
            settings: {
              centerMode: false,
              variableWidth: false,
              arrows: true
            }
          }
        ]
      });
    $wideBannerSlider.on('setPosition', function (event, slick) {
      $wideBanner.addClass('slider--init');
    });
  }

  function initBannerSlider(container) {
    /***************************************************************
     * Initialize sliders on the frontpage
     * See http://kenwheeler.github.io/slick/ for more options
     ==============================================================*/
    if (app.gridSize.get() === 'xs') return;
    var $banner = $(container);
    var $bannerSlider = $banner.find('.js-slick-slider');

    $bannerSlider
      .slick({
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 600,
        slidesToShow: 1,
        lazyLoad: 'progressive',
        accessibility: false,
        arrows: false,
        focusOnSelect: false
      });
  }

  function initSearch(container) {
    /**
     * Helper function for rendering checkboxes inside dropdowns
     ==============================================================*/
    var $container = $(container);
    var $selectCheckboxes = $container.find('.js-select-checkboxes');
    var $selectCheckboxesDropdown = $container.find('.js-select-checkboxes');
    var $rangeSliders = $container.find('.js-search-range');
    var $inputsText = $container.find('input[type="text"]');
    var $inputsTextArea = $container.find('textarea');
    var $inputsSelect = $container.find('select');
    var $inputsCheckbox = $container.find('input[type="checkbox"]');

    $selectCheckboxes.each(function () {
      var $this = $(this);
      var $showBtn = $(this).prev('.js-select-checkboxes-btn');
      var $showBtnPlaceholder = $showBtn.data('placeholder');

      $this
        .find('.in-checkbox')
        .change(function () {
          var $parentGroup,
            resultHtml,
            location = [];

          $parentGroup = $(this).closest('.js-select-checkboxes');

          $($parentGroup).find('.in-checkbox:checked').each(function () {
            var name = $(this).next('label').text();
            location.push(name);
          });
          resultHtml = location.join(', ') || $showBtnPlaceholder;
          $($showBtn).text(resultHtml);
        });
    });


    $('.js-select-checkboxes-reset').on('click', function () {
      var $this = $(this),
        $selectCheckboxesDropdown = $this.closest('.js-select-checkboxes');

      $selectCheckboxesDropdown
        .find('input[type="checkbox"]')
        .prop({
          checked: false,
          indeterminate: false
        });
      $selectCheckboxesDropdown
        .find('input[type="checkbox"]')
        .first()
        .trigger('change');

    });
    $('.js-select-checkboxes-accept').on('click', function () {
      var $this = $(this),
        $selectCheckboxesDropdown = $this.closest('.js-select-checkboxes');

      $selectCheckboxesDropdown
        .closest('.dropdown')
        .removeClass('open');
    });

    // Button "Clear All" (reset form)
    $('.js-form-reset').on('click', function () {
      $inputsText.val('');

      $inputsTextArea.text('');

      $inputsSelect.each(function (i, item) {
        $(item).find('option').removeAttr('selected');
        $(item).trigger('change');
      });

      $inputsCheckbox.prop({
        checked: false,
        indeterminate: false
      });

      // trigger event for custom menu dropdown
      $selectCheckboxesDropdown.each(function (i, selectCheckboxes) {
        $(selectCheckboxes)
          .find('input[type="checkbox"]')
          .first()
          .trigger('change');
      });
      // reset range slider
      $rangeSliders.each(function (i, rangeSlider) {
        // Save slider instance
        var slider = $(rangeSlider).data("ionRangeSlider");
        // Call sliders reset method
        slider.reset();
      });

    });
    $('body').on('click', '.js-dropdown-menu', function (e) {
      e.stopPropagation();
    });

    /***************************************************************
     * Example usage of tree plugin and checkbox plugins
     * to render a nice location tree
     *
     * For customizing the tree options see
     * http://aexmachina.info/jquery-bonsai
     *
     * For customizing checkbox options see
     * https://github.com/aexmachina/jquery-qubit
     ==============================================================*/
    var locationTree = $('#region');
    if (locationTree.length) {
      locationTree.bonsai();
      locationTree.qubit();
    }

    //  listeners
    var debounceFormChange = _.debounce(triggerFormChange, 500);
    $rangeSliders.on('change', debounceFormChange);
    $inputsText.on('input', triggerFormChange);
    $inputsTextArea.on('change', triggerFormChange);
    $inputsSelect.on('change', triggerFormChange);
    $inputsCheckbox.on('change', triggerFormChange);

    function triggerFormChange() {
      $container.trigger('formChange');
    }
  }

  function initRangeSliders() {
    /***************************************************************
     * Example usage of range sliders that replace the
     * price/rooms/area "from" and "to" fields
     *
     * For documentation
     * and options see https://github.com/IonDen/ion.rangeSlider
     ==============================================================*/
    var $rangeArea = $("#range_area");
    var $rangePrice = $("#range_price");
    var $rangeRoom = $("#range_room");
    var $rangeUi = $("#range_ui");

    if ($rangeArea.length ) {
      $rangeArea.ionRangeSlider({
        type: "double",
        min: 0,
        max: 2000,
        hide_min_max: true,
        hide_from_to: false,
        grid: false,
        postfix: ' sq ft',
        force_edges: true,
        step: 10,
        max_postfix: '+'
      });

    }
    if ($rangePrice.length ) {
      $rangePrice.ionRangeSlider({
        type: "double",
        min: 0,
        max: 5000000,
        hide_min_max: true,
        hide_from_to: false,
        grid: false,
        prefix: '$',
        force_edges: true,
        max_postfix: '+',
        step: 1000,
        // converts numbers like 4000000 to 4m, remove if you don't like it
        prettify: function (value) {
          return app.utils.abbreviateNumber(value)
        }
      });
    }
    if ($rangeRoom.length ) {
      $rangeRoom.ionRangeSlider({
        type: "double",
        min: 0,
        max: 10,
        from: 0,
        to: 10,
        hide_min_max: true,
        hide_from_to: false,
        grid: false,
        max_postfix: '+'
      });
    }
    if ($rangeUi.length ) {
      $rangeUi.ionRangeSlider({
        type: "double",
        min: 1000,
        max: 2000,
        from: 1200,
        to: 1800,
        hide_min_max: true,
        hide_from_to: false,
        grid: false
      });
    }

  }

  function initSlider(container) {
    /***************************************************************
     * Slider for blog pages
     * See http://kenwheeler.github.io/slick/ for more options
     ==============================================================*/
    var $blogSliders = $(container);
    if (!$blogSliders.length) return;

    $blogSliders.each(function () {
      var $sliderContainer = $(this),
        $sliderCurrent = $sliderContainer.find('.js-slick-current'),
        $sliderTotal = $sliderContainer.find('.js-slick-total');


      $sliderContainer.find('.js-slick-slider')
        .on('init', function (event, slick) {
          $sliderTotal.html(slick.slideCount);
        })
        .slick({
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: false,
          prevArrow: $sliderContainer.find('.js-slick-prev'),
          nextArrow: $sliderContainer.find('.js-slick-next')
        })
        .on('afterChange', function (event, slick, currentSlide) {
          $sliderCurrent.html(currentSlide + 1 + ' /');
        });
    });
  }

  function initGoogleMap(container, location) {
    /**
     * Google map initialization
     ==============================================================*/

    var $mapCanvas = $(container);
    if (!$mapCanvas.length) return;

    (function () {
      // We're using here sample coordinates, please replace them with real ones
      var coordinates = new google.maps.LatLng(location.lat, location.lng);
      // Default map zoom
      var zoom = 7;
      // jQuery object with map container

      var $mapBtn = $('.js-map-btn');

      /**
       * This is a wrapper around original Google Maps object,
       * which brings some user experience improvements for mobile users,
       * So that, when user loads the map on small-screen device, it
       * is replaced by a button, clicking on it will open full screen
       * popup with the map in it.
       *
       * If you don't want/need that, you can call `google.maps.Map` contructor directly
       *
       * See https://developers.google.com/maps/documentation/javascript/
       * for more examples and options
       */
      app.createGoogleMap(
        // Map container
        $mapCanvas,

        /**
         * See more options
         * https://developers.google.com/maps/documentation/javascript/reference#MapOptions
         */
        {
          zoom: zoom,
          center: coordinates,
          // Disable scrolling wheel for usability purposes
          scrollwheel: false,
          zoomControl: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
          },
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
          },
          scaleControl: true,
          scaleControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
          },
          panControl: true,
          panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
          }
        },

        // A button, clicking on which will display the map in a fullscreen popup on small screens
        $mapBtn,

        /**
         * This callback is executed when the Google Map is loaded
         * As first agrument it receives the google map object
         *
         * Please place here all the code that needs the google map object
         */
        function (map) {

          /**
           * app.createMarker is a helper which contains
           * preconfigured Marker object (see docs https://developers.google.com/maps/documentation/javascript/markers)
           *
           * If you want something more sophisticated, please use these libraries directly
           */
          app.createGmapMarker(
            map,
            coordinates,
            location.address
          );
        });
    })();
  }


  function initBtnDemo(selector) {
    /***************************************************************
     * Button interaction demo
     * See feature_ui.html (Full button interaction) for dempnstration
     *
     * This feature is useful for displaying visual feedback
     * to users that interact with long-running requests like:
     * - credit card processing
     * - waiting in the queue
     * - or simple ajax form submit
     ==============================================================*/
    var $buttons = $(selector);
    if (!$buttons.length) return;
    $buttons.on('click', function () {
      var $btn = $(this);
      var state = $btn.data('state') || 'success';

      $btn.addClass('loading');
      setTimeout(function () {
        $btn.addClass('progress');
      }, 500);
      setTimeout(function () {
        $btn.removeClass('loading');
        $btn.removeClass('progress');
        $btn.addClass(state);
      }, 1000);
      return false;
    });
  }

  /***************************************************************
   * Initialize map on index page
   ==============================================================*/
  function initIndexMap(container, properties) {
    var $mapCanvas = $(container);
    if (!$mapCanvas.length) return;
    // Default map zoom
    var zoom = 10;
    // We're using here sample coordinates, please replace them with real ones
    var coordinates = new google.maps.LatLng(33.74229160384012, -117.86845207214355);
    // jQuery object with map container
    // Temporary array for storing markers for clustering
    var markers = [];

    /**
     * This is a wrapper around original Google Maps object,
     * which brings some user experience improvements for mobile users,
     * So that, when user loads the map on small-screen device, it
     * is replaced by a button, clicking on it will open full screen
     * popup with the map in it.
     *
     * If you don't want/need that, you can call `google.maps.Map` contructor directly
     *
     * See https://developers.google.com/maps/documentation/javascript/
     * for more examples and options
     */
    requestAnimationFrame(function () {
      app.createGoogleMap(
        // Map container
        $mapCanvas,

        /**
         * See more options
         * https://developers.google.com/maps/documentation/javascript/reference#MapOptions
         */
        {
          zoom: zoom,
          center: coordinates,
          // Disable scrolling wheel for usability purposes
          scrollwheel: false,
          zoomControl: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
          },
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
          },
          scaleControl: true,
          scaleControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
          },
          panControl: true,
          panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
          }
        },

        // A button, clicking on which will display the map in a fullscreen popup on small screens
        $('.js-map-btn'),

        /**
         * This callback is executed when the Google Map is loaded
         * As first agrument it receives the google map object
         *
         * Please place here all the code that needs the google map object
         */
        function (map) {
          markers = [];
          // Loop over demo properties to create markers over map
          _.each(properties, function (item) {
            var infoboxHtml = generateMarkerHTML(item);

            /**
             * app.createInfoboxMarker is a helper which contains:
             * - preconfigured Marker object (see docs https://developers.google.com/maps/documentation/javascript/markers)
             * - preconfigured Infobox object (see docs http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs)
             * to make sure they work and look good with our theme.
             *
             * If you want something more sophisticated, please use these libraries directly
             */
            var marker = app.createGmapInfoboxMarker(
              map,
              new google.maps.LatLng(item.lat, item.lng),
              item.address,
              infoboxHtml,
              // You can pass directly the 'white' or 'dark' value or get it some other way
              $mapCanvas.data('infoboxTheme')
            );
            // Save the created marker for later use for clustering
            markers.push(marker);
          });

          /**
           * Wrapper object for MarkerClustererPlus library preconfigured to work with our theme
           * See http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclustererplus/docs/reference.html
           * for examples
           *
           * You can use it directly instead of wrapper if you want to customizer its options
           * Remove this if you don't want to cluster properties.
           */
          app.createGmapClustering(map, markers);
        });
    });

  }

  function initPropertyMapAndPanorama(containerMap, containerPanorama, property) {
    // jQuery object with map container
    var $mapCanvas = $(containerMap);
    var $panoramaCanvas = $(containerPanorama);
    if (!$mapCanvas.length || !$panoramaCanvas) return;
    // We're using here sample coordinates, please replace them with real ones
    var coordinates = new google.maps.LatLng(property.lat, property.lng);
    // Default map zoom
    var zoom = 10;
    var $mapBtn = $('.js-map-btn');
    var $panoramaBtn = $('.js-panorama-btn');
    var active;

    /**
     * This is a wrapper around original Google Maps object,
     * which brings some user experience improvements for mobile users,
     * So that, when user loads the map on small-screen device, it
     * is replaced by a button, clicking on it will open full screen
     * popup with the map in it.
     *
     * If you don't want/need that, you can call `google.maps.Map` contructor directly
     *
     * See https://developers.google.com/maps/documentation/javascript/
     * for more examples and options
     */
    app.createGoogleMap(
      // Map container
      $mapCanvas,

      /**
       * See more options
       * https://developers.google.com/maps/documentation/javascript/reference#MapOptions
       */
      {
        zoom: zoom,
        center: coordinates,
        // Disable scrolling wheel for usability purposes
        scrollwheel: false,
        mapTypeControl: true,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: true,
        scaleControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        panControl: true,
        panControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        }
      },

      // A button, clicking on which will display the map in a fullscreen popup on small screens
      $mapBtn,

      /**
       * This callback is executed when the Google Map is loaded
       * As first agrument it receives the google map object
       *
       * Please place here all the code that needs the google map object
       */
      function (map) {
        var infoboxHtml = generateMarkerHTML(property);

        /**
         * app.createInfoboxMarker is a helper which contains:
         * - preconfigured Marker object (see docs https://developers.google.com/maps/documentation/javascript/markers)
         * - preconfigured Infobox object (see docs http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs)
         * to make sure they work and look good with our theme.
         *
         * If you want something more sophisticated, please use these libraries directly
         */
        app.createGmapInfoboxMarker(
          map,
          coordinates,
          property.address,
          infoboxHtml,
          // You can pass directly the 'white' or 'dark' value or get it some other way
          $mapCanvas.data('infoboxTheme')
        );
        // Save the created marker for later use for clustering
      });

    /**
     * This is a wrapper around original Google Maps Panorama object,
     * which brings some user experience improvements for mobile users,
     * So that, when user loads the panorama on small-screen device, it
     * is replaced by a button, clicking on it will open full screen
     * popup with the panorama in it.
     *
     * If you don't want/need that, you can call `google.maps.StreetViewPanorama` contructor directly
     *
     * See https://developers.google.com/maps/documentation/javascript/
     * for more examples and options
     */
    app.createGooglePanorama(
      // Map container
      $panoramaCanvas,

      /**
       * See more options
       * https://developers.google.com/maps/documentation/javascript/streetview#StreetViewMapUsage
       */
      {
        position: coordinates,
        pov: {
          heading: 34,
          pitch: 10
        },
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        panControl: true,
        panControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        }
      },

      // A button, clicking on which will display the map in a fullscreen popup on small screens
      $panoramaBtn);

    if (app.gridSize.get() === 'lg' || app.gridSize.get() === 'md') {
      active = $mapBtn.add($panoramaBtn).filter('.active');
      var toggleActive = function (newActive) {
        if (active) {
          active.removeClass('active');
        }
        active = $(newActive);
        active.addClass('active');
      };

      $mapBtn.on('click', function () {
        toggleActive(this);
        $panoramaCanvas.css({zIndex: 5});
        $mapCanvas.css({zIndex: 10});
      });
      $panoramaBtn.on('click', function () {
        toggleActive(this);
        $panoramaCanvas.css({zIndex: 10});
        $mapCanvas.css({zIndex: 5});
      });


    } else {
      $mapBtn.removeClass('active');
    }
  }

  function initSubmitPropertyForm(container) {
    // add property form validator
    var $form = $(container);
    if (!$form.length) return;
    var $formBlocks = $(container + '-block');
    $form
      .each(function () {

        $(this)
          .parsley()
          .on('form:success', function (formInstance) {
            app.notifier.showSuccess('You have successfully submit the form!');
            return false;
          })
          .on('form:error', function (formInstance) {
            app.notifier.showError('Submited failed! Please try again.');
            _.each($formBlocks, function (block) {
              var errors = $(block).find('.parsley-required'),
                ref = $(block).attr('id'),
                $map;
              if (errors.length) {
                $(block).addClass('opened');
                $('[data-rel="#' + ref + '"]').addClass('active');
                $map = $(block).find('#autocomplete-map');
                if ($map.length) {
                  google.maps.event.trigger($map[0], 'resize');
                }
              }
            });
            return false;
          });
      });

  }

  function initPopovers(container) {
    /**
     * Popover example
     * Docs http://getbootstrap.com/javascript/#popovers
     ==============================================================*/

    var $popovers = $(container);
    if (!$popovers.length) return;
    $popovers.popover();
  }

  function initGeocoderGoogleMap(container, coordinates) {
    var $autoCompleteMap = $(container);
    if (!$autoCompleteMap.length) return;
    /** Helper to create a Google Map that:
     * - provides a draggable marker
     * - syncs marker position to the Lat and Long fields
     * - provides a autocomplete fields with locations
     ==============================================================*/
    app.createGeocoderGoogleMap({

      /**
       * Map options
       * See other options here
       * https://developers.google.com/maps/documentation/javascript/reference#MapOptions
       ==============================================================*/
      container: $autoCompleteMap,
      map: {
        // These are demo coordinates, feel free to change them
        center: new google.maps.LatLng(coordinates.lat, coordinates.lng)
      },
      /**
       * Autocomplete options
       * See other options here
       * https://developers.google.com/maps/documentation/javascript/reference#AutocompletionRequest
       ==============================================================*/
      autocomplete: {
        // Suggests locations from US
        componentRestrictions: {'country': 'us'}
      }
    });

  }


  /***************************************************************
   * As an alternative to Google Maps, you can use Leaflet
   * which uses data from OSM and tiles from MapBox
   ==============================================================*/

  function initLeafletMap(container, properties) {
    var $mapCanvas = $(container);
    if (!$mapCanvas.length) return;
    // Default map zoom
    var zoom = 10;
    // We're using here sample coordinates, please replace them with real ones
    var coordinates = new L.LatLng(33.74229160384012, -117.86845207214355);
    /*
     * This is a wrapper around original Leftlet map object,
     * which brings some user experience improvements for mobile users,
     *
     * If you don't want/need that, you can call ` L.map` contructor directly
     *
     * See http://leafletjs.com/reference.html
     * for more examples and options
     ==============================================================*/
    app.createLeafletMap(
      // Map container
      $mapCanvas,
      /* Leaftlet map options
       * http://leafletjs.com/reference.html#map-options
       ==============================================================*/
      {
        zoom: zoom,
        center: coordinates,
        zoomControl: false,
        // Disable scrolling wheel for usability purposes
        scrollWheelZoom: false
      },

      // A button, clicking on which will display the map in a fullscreen popup on small screens
      $('.js-map-btn'),

      /**
       * This callback is executed when the Leftlet is loaded
       * As first agrument it receives the Leftlet object
       *
       * Please place here all the code that needs the Leftlet object
       */
      function (map) {
        map.invalidateSize();
        // Loop over demo properties to create markers over map
        _.each(properties, function (item) {
          var infoboxHtml = generateMarkerHTML(item);

          /**
           * app.createLeafletInfoboxMarker is a helper which contains:
           * - preconfigured Marker object (see docs http://leafletjs.com/reference.html#marker)
           * - preconfigured Popup object (see docs http://leafletjs.com/reference.html#popup)
           * to make sure they work and look good with our theme.
           *
           * If you want something more sophisticated, please use these objects directly
           */
          app.createLeafletInfoboxMarker(
            map,
            new L.LatLng(item.lat, item.lng),
            item.address,
            infoboxHtml,
            // You can pass directly the 'white' or 'dark' value or get it some other way
            $mapCanvas.data('infoboxTheme')
          );
        });
      });
  }

  // Simple helper for generating html content for infoboxes
  function generateMarkerHTML(data) {
    var link;
    link = "assets/media-demo/properties/277x180/" + data.image + ".jpg";
    return "<span class='map__address'>" + data.address +
      "</span> <span class='map__info'>" +
      "<img  class='map__photo' src='" + link + "'/><span class='map__details'> " +
      "<dl><dt>Type:</dt> <dd>" + data.type + "</dd></dl>" +
      "<dl><dt>Area:</dt> <dd>" + data.area + " m2</dd></dl>" +
      "<dl><dt>Bedrooms:</dt> <dd>" + data.bedrooms + "</dd></dl>" +
      "</span></span> <span class='map__price'><strong>$" + data.price +
      "</strong></span> <a  class='map__more' href='property_details.html'>Details</a>";
  }

})(jQuery);
