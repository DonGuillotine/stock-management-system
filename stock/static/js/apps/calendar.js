"use strict";

!function (NioApp, $) {
  "use strict"; // Variable

  var $win = $(window),
      $body = $('body'),
      breaks = NioApp.Break;

  NioApp.Calendar = function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    var t_dd = String(tomorrow.getDate()).padStart(2, '0');
    var t_mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    var t_yyyy = tomorrow.getFullYear();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    var y_dd = String(yesterday.getDate()).padStart(2, '0');
    var y_mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    var y_yyyy = yesterday.getFullYear();
    var YM = yyyy + '-' + mm;
    var YESTERDAY = y_yyyy + '-' + y_mm + '-' + y_dd;
    var TODAY = yyyy + '-' + mm + '-' + dd;
    var TOMORROW = t_yyyy + '-' + t_mm + '-' + t_dd;
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var calendarEl = document.getElementById('calendar');
    var eventsEl = document.getElementById('externalEvents');
    var removeEvent = document.getElementById('removeEvent');
    var addEventBtn = $('#addEvent');
    var addEventForm = $('#addEventForm');
    var addEventPopup = $('#addEventPopup');
    var updateEventBtn = $('#updateEvent');
    var editEventForm = $('#editEventForm');
    var editEventPopup = $('#editEventPopup');
    var previewEventPopup = $('#previewEventPopup');
    var deleteEventBtn = $('#deleteEvent');
    var mobileView = NioApp.Win.width < NioApp.Break.md ? true : false;
    var calendar = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      initialView: mobileView ? 'listWeek' : 'dayGridMonth',
      themeSystem: 'bootstrap',
      headerToolbar: {
        left: 'title prev,next',
        center: null,
        right: 'today dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      height: 800,
      contentHeight: 780,
      aspectRatio: 3,
      editable: true,
      droppable: true,
      views: {
        dayGridMonth: {
          dayMaxEventRows: 2
        }
      },
      direction: NioApp.State.isRTL ? "rtl" : "ltr",
      nowIndicator: true,
      now: TODAY + 'T09:25:00',
      eventDragStart: function eventDragStart(info) {
        $('.popover').popover('hide');
      },
      eventMouseEnter: function eventMouseEnter(info) {
        $(info.el).popover({
          template: '<div class="popover"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
          title: info.event._def.title,
          content: info.event._def.extendedProps.description,
          placement: 'top'
        });
        info.event._def.extendedProps.description ? $(info.el).popover('show') : $(info.el).popover('hide');
      },
      eventMouseLeave: function eventMouseLeave(info) {
        $(info.el).popover('hide');
      },
      eventClick: function eventClick(info) {
        // Get data
        var title = info.event._def.title;
        var description = info.event._def.extendedProps.description;
        var start = info.event._instance.range.start;
        var startDate = start.getFullYear() + '-' + String(start.getMonth() + 1).padStart(2, '0') + '-' + String(start.getDate()).padStart(2, '0');
        var startTime = start.toUTCString().split(' ');
        startTime = startTime[startTime.length - 2];
        startTime = startTime == '00:00:00' ? '' : startTime;
        var end = info.event._instance.range.end;
        var endDate = end.getFullYear() + '-' + String(end.getMonth() + 1).padStart(2, '0') + '-' + String(end.getDate()).padStart(2, '0');
        var endTime = end.toUTCString().split(' ');
        endTime = endTime[endTime.length - 2];
        endTime = endTime == '00:00:00' ? '' : endTime;

        var className = info.event._def.ui.classNames[0].slice(3);

        var eventId = info.event._def.publicId; //Set data in eidt form

        $('#edit-event-title').val(title);
        $('#edit-event-start-date').val(startDate).datepicker('update');
        $('#edit-event-end-date').val(endDate).datepicker('update');
        $('#edit-event-start-time').val(startTime);
        $('#edit-event-end-time').val(endTime);
        $('#edit-event-description').val(description);
        $('#edit-event-theme').val(className);
        $('#edit-event-theme').trigger('change.select2');
        editEventForm.attr('data-id', eventId); // Set data in preview

        var previewStart = String(start.getDate()).padStart(2, '0') + ' ' + month[start.getMonth()] + ' ' + start.getFullYear() + (startTime ? ' - ' + to12(startTime) : '');
        var previewEnd = String(end.getDate()).padStart(2, '0') + ' ' + month[end.getMonth()] + ' ' + end.getFullYear() + (endTime ? ' - ' + to12(endTime) : '');
        $('#preview-event-title').text(title);
        $('#preview-event-header').addClass('fc-' + className);
        $('#preview-event-start').text(previewStart);
        $('#preview-event-end').text(previewEnd);
        $('#preview-event-description').text(description);
        !description ? $('#preview-event-description-check').css('display', 'none') : null;
        previewEventPopup.modal('show');
        $('.popover').popover('hide');
      },
      events: [{
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Reader will be distracted',
        start: YM + '-03T13:30:00',
        className: "fc-event-danger",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Rabfov va hezow.',
        start: YM + '-14T13:30:00',
        end: YM + '-14',
        className: "fc-event-success",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'The leap into electronic',
        start: YM + '-05',
        end: YM + '-06',
        className: "fc-event-primary",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Lorem Ipsum passage - Product Release',
        start: YM + '-02',
        end: YM + '-04',
        className: "fc-event-primary",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        title: 'Gibmuza viib hepobe.',
        start: YM + '-12',
        end: YM + '-10',
        className: "fc-event-pink-dim",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Jidehse gegoj fupelone.',
        start: YM + '-07T16:00:00',
        className: "fc-event-danger-dim",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Ke uzipiz zip.',
        start: YM + '-16T16:00:00',
        end: YM + '-14',
        className: "fc-event-info-dim",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Piece of classical Latin literature',
        start: TODAY,
        end: TODAY + '-01',
        className: "fc-event-primary",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Nogok kewwib ezidbi.',
        start: TODAY + 'T10:00:00',
        className: "fc-event-info",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Mifebi ik cumean.',
        start: TODAY + 'T14:30:00',
        className: "fc-event-warning-dim",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Play Time',
        start: TODAY + 'T17:30:00',
        className: "fc-event-info",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'Rujfogve kabwih haznojuf.',
        start: YESTERDAY + 'T05:00:00',
        className: "fc-event-danger",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }, {
        id: 'default-event-id-' + Math.floor(Math.random() * 9999999),
        title: 'simply dummy text of the printing',
        start: YESTERDAY + 'T07:00:00',
        className: "fc-event-primary-dim",
        description: "Use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden."
      }]
    });
    calendar.render(); //Add event

    addEventBtn.on("click", function (e) {
      e.preventDefault();
      var eventTitle = $('#event-title').val();
      var eventStartDate = $('#event-start-date').val();
      var eventEndDate = $('#event-end-date').val();
      var eventStartTime = $('#event-start-time').val();
      var eventEndTime = $('#event-end-time').val();
      var eventDescription = $('#event-description').val();
      var eventTheme = $('#event-theme').val();
      var eventStartTimeCheck = eventStartTime ? 'T' + eventStartTime + 'Z' : '';
      var eventEndTimeCheck = eventEndTime ? 'T' + eventEndTime + 'Z' : '';
      console.log(eventStartTime);
      calendar.addEvent({
        id: 'added-event-id-' + Math.floor(Math.random() * 9999999),
        title: eventTitle,
        start: eventStartDate + eventStartTimeCheck,
        end: eventEndDate + eventEndTimeCheck,
        className: "fc-" + eventTheme,
        description: eventDescription
      });
      addEventPopup.modal('hide');
    });
    updateEventBtn.on("click", function (e) {
      e.preventDefault();
      var eventTitle = $('#edit-event-title').val();
      var eventStartDate = $('#edit-event-start-date').val();
      var eventEndDate = $('#edit-event-end-date').val();
      var eventStartTime = $('#edit-event-start-time').val();
      var eventEndTime = $('#edit-event-end-time').val();
      var eventDescription = $('#edit-event-description').val();
      var eventTheme = $('#edit-event-theme').val();
      var eventStartTimeCheck = eventStartTime ? 'T' + eventStartTime + 'Z' : '';
      var eventEndTimeCheck = eventEndTime ? 'T' + eventEndTime + 'Z' : '';
      var selectEvent = calendar.getEventById(editEventForm[0].dataset.id);
      selectEvent.remove();
      calendar.addEvent({
        id: editEventForm[0].dataset.id,
        title: eventTitle,
        start: eventStartDate + eventStartTimeCheck,
        end: eventEndDate + eventEndTimeCheck,
        className: "fc-" + eventTheme,
        description: eventDescription
      });
      editEventPopup.modal('hide');
    });
    deleteEventBtn.on("click", function (e) {
      e.preventDefault();
      var selectEvent = calendar.getEventById(editEventForm[0].dataset.id);
      selectEvent.remove();
    });

    function to12(time) {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        time = time.slice(1);
        time.pop();
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM

        time[0] = +time[0] % 12 || 12;
      }

      time = time.join('');
      return time;
    }

    function customCalSelect(cat) {
      if (!cat.id) {
        return cat.text;
      }

      var $cat = $('<span class="fc-' + cat.element.value + '"> <span class="dot"></span>' + cat.text + '</span>');
      return $cat;
    }

    ;
    $(".select-calendar-theme").select2({
      templateResult: customCalSelect
    });
    addEventPopup.on('hidden.bs.modal', function (e) {
      setTimeout(function () {
        $('#addEventForm input,#addEventForm textarea').val('');
        $('#event-theme').val('event-primary');
        $('#event-theme').trigger('change.select2');
      }, 1000);
    });
    previewEventPopup.on('hidden.bs.modal', function (e) {
      $('#preview-event-header').removeClass().addClass('modal-header');
    });
  };

  NioApp.coms.docReady.push(NioApp.Calendar);
}(NioApp, jQuery);