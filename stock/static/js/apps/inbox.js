"use strict";

!function (NioApp, $) {
  "use strict";

  var $win = $(window),
      $body = $('body'),
      breaks = NioApp.Break; // Inbox Variable

  var $ibx_aside = $('.nk-ibx-aside'),
      $ibx_link = $('.nk-ibx-link'),
      $ibx_hide = $('.nk-ibx-hide'),
      $ibx_view = $('.nk-ibx-view'),
      $ibx_reply_head = $('.nk-ibx-reply-header'),
      $tagify = $('.tagify'),
      hide_aside = 'hide-aside',
      show_ibx = 'show-ibx';

  NioApp.Message = function () {
    function ibx_show() {
      $ibx_link.on('click', function (e) {
        $ibx_link.removeClass('current');
        $ibx_aside.addClass(hide_aside);
        $ibx_view.addClass(show_ibx);
        $(this).addClass('current');
        e.preventDefault();
      });
    }

    ibx_show();

    function ibx_hide() {
      $ibx_hide.on('click', function (e) {
        $ibx_aside.removeClass(hide_aside);
        $ibx_view.removeClass(show_ibx);
        e.preventDefault();
      });
    }

    ibx_hide();

    function reply_toggle() {
      $ibx_reply_head.on('click', function (e) {
        if (!$(this).hasClass('is-opened') && !($(e.target).parents('.nk-reply-tools').length > 0)) {
          if ($(this).hasClass('is-collapsed')) {
            $(this).removeClass('is-collapsed').next().addClass('is-shown');
          } else if (!$(this).hasClass('is-collapsed')) {
            $(this).addClass('is-collapsed').next().removeClass('is-shown');
          }
        }
      });
    }

    reply_toggle();

    function tagify_init() {
      if ($tagify.exists() && typeof $.fn.tagify === 'function') {
        $tagify.tagify();
      }
    }

    tagify_init();
  };

  NioApp.coms.docReady.push(NioApp.Message);
}(NioApp, jQuery);