"use strict";

(function (NioApp, $) {
  'use strict'; // Uses
  // NioApp.Toast(message, type, {attr});
  // 
  // @message     = 'Your message' 
  // @type        = 'info|success|warning|error',  
  // @attr        = {position: 'bottom-right', icon: 'auto', ui: ''}
  // 
  // attr.ui used for additonal class as is-dark
  // attr.icon used for custom icon
  // attr.position used for position of the msg.
  // Example Trigger

  $('.eg-toastr-default').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for deafult toast message.', 'info');
  });
  $('.eg-toastr-bottom-center').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for bottom center toast message.', 'info', {
      position: 'bottom-center'
    });
  });
  $('.eg-toastr-bottom-right').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for bottom right toast message.', 'info');
  });
  $('.eg-toastr-bottom-left').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for bottom left toast message.', 'info', {
      position: 'bottom-left'
    });
  });
  $('.eg-toastr-bottom-full').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for bottom full width toast message.', 'info', {
      position: 'bottom-full'
    });
  });
  $('.eg-toastr-top-center').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for top center toast message.', 'info', {
      position: 'top-center'
    });
  });
  $('.eg-toastr-top-right').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for top right toast message.', 'info', {
      position: 'top-right'
    });
  });
  $('.eg-toastr-top-left').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for top left toast message.', 'info', {
      position: 'top-left'
    });
  });
  $('.eg-toastr-top-full').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for top full width toast message.', 'info', {
      position: 'top-full'
    });
  });
  $('.eg-toastr-info').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for bottom right toast message.', 'info');
  });
  $('.eg-toastr-success').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for success toast message.', 'success');
  });
  $('.eg-toastr-warning').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for warning toast message.', 'warning');
  });
  $('.eg-toastr-error').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is a note for error toast message.', 'error');
  });
  $('.eg-toastr-dark').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is dark version note of toast message.', 'info', {
      ui: 'is-dark'
    });
  });
  $('.eg-toastr-no-icon').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('This is without icon note of toast message.', 'info', {
      icon: false
    });
  });
  $('.eg-toastr-with-title').on("click", function (e) {
    e.preventDefault();
    toastr.clear();
    NioApp.Toast('<h5>Update Successfully</h5><p>Your profile has been successfully updated.</p>', 'success');
  });
})(NioApp, jQuery);