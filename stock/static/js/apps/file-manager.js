"use strict";

!function (NioApp, $) {
  "use strict";

  var $win = $(window),
      $body = $('body'),
      breaks = NioApp.Break; // Variable

  var $file_dload = $('.file-dl-toast');

  NioApp.FileManager = function () {
    $file_dload.on("click", function (e) {
      e.preventDefault();
      NioApp.Toast('<h5>Downloading File</h5><p>Generating the file to start download.</p>', 'success', {
        position: 'bottom-center',
        icon: 'ni ni-download-cloud',
        ui: 'is-dark'
      });
    });
  };

  NioApp.coms.docReady.push(NioApp.FileManager);
}(NioApp, jQuery);