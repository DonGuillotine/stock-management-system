"use strict";

!function (NioApp, $) {
  "use strict"; // SummerNote Init @v1.0

  NioApp.SummerNote = function () {
    var _basic = '.summernote-basic';

    if ($(_basic).exists()) {
      $(_basic).each(function () {
        $(this).summernote({
          placeholder: 'Hello stand alone ui',
          tabsize: 2,
          height: 120,
          toolbar: [['style', ['style']], ['font', ['bold', 'underline', 'strikethrough', 'clear']], ['font', ['superscript', 'subscript']], ['color', ['color']], ['fontsize', ['fontsize', 'height']], ['para', ['ul', 'ol', 'paragraph']], ['table', ['table']], ['insert', ['link', 'picture', 'video']], ['view', ['fullscreen', 'codeview', 'help']]]
        });
      });
    }

    var _minimal = '.summernote-minimal';

    if ($(_minimal).exists()) {
      $(_minimal).each(function () {
        $(this).summernote({
          placeholder: 'Hello stand alone ui',
          tabsize: 2,
          height: 120,
          toolbar: [['style', ['style']], ['font', ['bold', 'underline', 'clear']], ['para', ['ul', 'ol', 'paragraph']], ['table', ['table']], ['view', ['fullscreen']]]
        });
      });
    }
  }; // Tinymce Init @v1.0


  NioApp.Tinymce = function () {
    var _tinymce_basic = '.tinymce-basic';

    if ($(_tinymce_basic).exists()) {
      tinymce.init({
        selector: _tinymce_basic,
        content_css: true,
        skin: false,
        branding: false
      });
    }

    var _tinymce_menubar = '.tinymce-menubar';

    if ($(_tinymce_menubar).exists()) {
      tinymce.init({
        selector: _tinymce_menubar,
        content_css: true,
        skin: false,
        branding: false,
        toolbar: false
      });
    }

    var _tinymce_toolbar = '.tinymce-toolbar';

    if ($(_tinymce_toolbar).exists()) {
      tinymce.init({
        selector: _tinymce_toolbar,
        content_css: true,
        skin: false,
        branding: false,
        menubar: false
      });
    }

    var _tinymce_inline = '.tinymce-inline';

    if ($(_tinymce_inline).exists()) {
      tinymce.init({
        selector: _tinymce_inline,
        content_css: false,
        skin: false,
        branding: false,
        menubar: false,
        inline: true,
        toolbar: ['undo redo | bold italic underline | fontselect fontsizeselect', 'forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent']
      });
    }
  }; // Quill Init @v1.0


  NioApp.Quill = function () {
    var _basic = '.quill-basic';

    if ($(_basic).exists()) {
      $(_basic).each(function () {
        var toolbarOptions = [['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'], [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }], [{
          'script': 'sub'
        }, {
          'script': 'super'
        }], // superscript/subscript
        [{
          'indent': '-1'
        }, {
          'indent': '+1'
        }], // outdent/indent
        [{
          'header': [1, 2, 3, 4, 5, 6]
        }], [{
          'color': []
        }, {
          'background': []
        }], // dropdown with defaults from theme
        [{
          'font': []
        }], [{
          'align': []
        }], ['clean'] // remove formatting button
        ];
        var quill = new Quill(this, {
          modules: {
            toolbar: toolbarOptions
          },
          theme: 'snow'
        });
      });
    }

    var _minimal = '.quill-minimal';

    if ($(_minimal).exists()) {
      $(_minimal).each(function () {
        var toolbarOptions = [['bold', 'italic', 'underline'], // toggled buttons
        ['blockquote', {
          'list': 'bullet'
        }], [{
          'header': 1
        }, {
          'header': 2
        }, {
          'header': [3, 4, 5, 6, false]
        }], [{
          'align': []
        }], ['clean'] // remove formatting button
        ];
        var quill = new Quill(this, {
          modules: {
            toolbar: toolbarOptions
          },
          theme: 'snow'
        });
      });
    }
  }; // Editor Init @v1


  NioApp.EditorInit = function () {
    NioApp.SummerNote();
    NioApp.Tinymce();
    NioApp.Quill();
  };

  NioApp.coms.docReady.push(NioApp.EditorInit);
}(NioApp, jQuery);