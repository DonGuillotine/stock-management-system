"use strict";

!function (NioApp, $) {
  "use strict";

  var $win = $(window),
      $body = $('body'),
      breaks = NioApp.Break; // Chats Variable

  var $toggle = $('.chat-profile-toggle'),
      $chat_profile = $('.nk-chat-profile'),
      $chat_body = $('.nk-chat-body'),
      $chat_aside = $('.nk-chat-aside'),
      $chat_open = $('.chat-open'),
      $chat_hide = $('.nk-chat-hide'),
      $search_toggle = $('.chat-search-toggle'),
      $chat_search = $('.nk-chat-head-search'),
      olay_profile = 'nk-chat-profile-overlay',
      shown_profile = 'profile-shown',
      hideau_profile = 'chat-profile-autohide',
      hide_aside = 'hide-aside',
      show_chat = 'show-chat',
      info_break = $body.hasClass('has-apps-sidebar') ? 1200 : breaks.xxl,
      flat_break = breaks.lg;

  NioApp.Chats = function () {
    function chat_autohide() {
      if (NioApp.Win.width >= flat_break) {
        if (!$body.hasClass(hideau_profile)) $body.addClass(hideau_profile);
      } else {
        if ($body.hasClass(hideau_profile)) $body.removeClass(hideau_profile);
      }
    }

    function profile_show(inbody) {
      $toggle.addClass('active');
      $chat_profile.addClass('visible');
      $chat_body.addClass(shown_profile);
      if (inbody === true) $body.addClass('chat-' + shown_profile);
    }

    function profile_hide(inbody) {
      $toggle.removeClass('active');
      $chat_profile.removeClass('visible');
      $chat_body.removeClass(shown_profile);
      if (inbody === true) $body.removeClass('chat-' + shown_profile);
    }

    function profile_overlay() {
      var overlay = '.' + olay_profile;

      if (NioApp.Win.width < info_break && $chat_profile.hasClass('visible')) {
        !$chat_profile.next().hasClass(olay_profile) ? $chat_profile.after('<div class="' + olay_profile + '"></div>') : null;
      } else {
        $(overlay).remove();
      }

      $(overlay).on('click', function () {
        $(this).remove();
        profile_hide(true);
        chat_autohide();
      });
    }

    function search_show() {
      $search_toggle.on('click', function (e) {
        if (NioApp.Win.width <= info_break) {
          profile_hide();
          profile_overlay();
        }

        $chat_search.addClass('show-search');
        e.preventDefault();
      });
    }

    search_show();

    function search_hide() {
      $(document).on('mouseup', function (e) {
        if (!$chat_search.is(e.target) && $chat_search.has(e.target).length === 0 && !$chat_search.find('.form-control').val()) {
          $chat_search.removeClass('show-search');
        }
      });
    }

    search_hide();

    function chat_show() {
      $chat_open.on('click', function (e) {
        $chat_open.parent().removeClass('current');
        $chat_aside.addClass(hide_aside);
        $chat_body.addClass(show_chat);
        $(this).parent().addClass('current');
        e.preventDefault();
      });
    }

    chat_show();

    function chat_hide() {
      $chat_hide.on('click', function () {
        $chat_aside.removeClass(hide_aside);
        $chat_body.removeClass(show_chat);
      });
    }

    chat_hide();

    function profile_trigger() {
      $toggle.on('click', function (e) {
        $toggle.toggleClass('active');
        $chat_profile.toggleClass('visible');
        $chat_body.toggleClass(shown_profile);

        if ($(this).hasClass('active') && !$body.hasClass('chat-' + shown_profile)) {
          $body.addClass('chat-' + shown_profile);
        } else {
          $body.removeClass('chat-' + shown_profile);
        }

        if (NioApp.Win.width >= flat_break) {
          if ($body.hasClass(hideau_profile)) {
            $body.removeClass(hideau_profile);
          } else if (NioApp.Win.width < info_break && !$(this).hasClass('active')) {
            $body.addClass(hideau_profile);
          }
        }

        profile_overlay();
        e.preventDefault();
      });
    }

    profile_trigger();

    function chat_on_init() {
      if (NioApp.Win.width >= info_break) {
        profile_show();
      } else {
        profile_hide();
      }

      chat_autohide();
    }

    chat_on_init();

    function chat_on_resize() {
      if ($body.hasClass(hideau_profile)) {
        if (NioApp.Win.width >= info_break) {
          profile_show();
        } else {
          profile_hide();
        }
      }

      if (NioApp.Win.width >= flat_break && NioApp.Win.width < info_break) {
        if ($body.hasClass('chat-' + shown_profile)) {
          $body.removeClass('chat-' + shown_profile);
          profile_hide();
        }
      }
    }

    $win.on('resize', function () {
      chat_on_resize();
      profile_overlay();
    });
  };

  NioApp.coms.docReady.push(NioApp.Chats);
}(NioApp, jQuery);