"use strict";

(function (NioApp, $) {
  'use strict';

  $("#basic-tree").jstree({
    "core": {
      "themes": {
        "responsive": false
      }
    }
  });
  $("#custom-icon-tree").jstree({
    "core": {
      "themes": {
        "responsive": false
      }
    }
  });
  $("#context-menu-tree").jstree({
    "core": {
      "themes": {
        "responsive": false
      },
      "check_callback": true
    },
    "plugins": ["contextmenu"]
  });
  $("#drag-drop-tree").jstree({
    "core": {
      "themes": {
        "responsive": false
      },
      "check_callback": true
    },
    "plugins": ["dnd"]
  });
  $('#checkbox-tree').jstree({
    "core": {
      "themes": {
        "responsive": false
      }
    },
    "plugins": ["wholerow", "checkbox"]
  });
})(NioApp, jQuery);