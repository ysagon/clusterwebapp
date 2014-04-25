/**
 * Main script for the slurm web interface
 *
 * @author ysagon@gmail.com (Yann Sagon)
 */
define(['jquery-ui',
        'sbatchGenerator/jquery.unige.sbatchGenerator',
        'sbatchGenerator/jquery.unige.faq',
        'timeago',
        'watable',
        'bootstrap',
        'bootstrap-datepicker'],
        function($, undefined, undefined, 
                 undefined, undefined, undefined) {
$(document).ready(function() {
  var zeropad = function(num) {
    return ((num < 10) ? '0' : '') + num;
  };
  var iso8601 = function(date) {
    return date.getUTCFullYear() +
        '-' + zeropad(date.getUTCMonth() + 1) +
            '-' + zeropad(date.getUTCDate()) +
            'T' + zeropad(date.getUTCHours()) +
            ':' + zeropad(date.getUTCMinutes()) +
            ':' + zeropad(date.getUTCSeconds()) + 'Z';
  };

   // Javascript to enable link to tab
   var url = document.location.toString();
   if (url.match('#')) {
    $('.nav-tabs a[href=#' + url.split('#')[1] + ']').tab('show');
   }

   // Change hash for page-reload
   $('.nav-tabs a').on('shown', function(e) {
    window.location.hash = e.target.hash;
   });

  $('#sbatchGenerator').sbatchGenerator();

  // load faq
  $.ajax({
     url: urlRoot + 'faq'
  }).done(function(data) {
     $('#faq').faq({'title': 'FAQ', 'data': JSON.parse(data)});
  });

  // init timestamp
  $('abbr.loaded').attr('title', iso8601(new Date()));
  $('abbr.timeago').timeago();

  $(document).tooltip({
    selector: '[data-toggle="tooltip"]'
  });

  $('#startDate').val('-10d');
  $('#startDate').datepicker({
    format: 'dd/mm/yyyy'
    //startDate: '-5d'
  }).on('changeDate', function(e) {
    var selectedDate = e.format('yyyy-mm-dd');
    var url = myWatable[0].option('url');
    var newUrl = url + '?startDate=' + selectedDate;
    myWatable[0].option('url', newUrl);
    myWatable[0].update();
    myWatable[0].option('url', url);
    console.log(selectedDate);
  });

  // to store the watable instances
  var myWatable = {'status' : {'table': null},
                   'history' : {'table': null},
                   'reservation' : {'table': null},
                   'allJobsRunning' : {'table': null},
                   'allJobsPending' : {'table': null},
                   'apps' : {'table': null}};


  /**
   * callback to refresh the watables with data from the server
   */
  var refreshTable = function() {
      myWatable.status.table.update(function() {
         refreshTimeStamp();
      });
      myWatable.allJobsRunning.table.update(function() {
         refreshTimeStamp();
      });
      myWatable.allJobsPending.table.update(function() {
         refreshTimeStamp();
      });
  };

  function refreshTimeStamp() {
    jQuery.timeago(new Date());
    $('abbr.timeago').timeago('update');
  }

  // auto refresh tabs
  setInterval(function() {
    refreshTable();
  }, 5000);

  // history table
  var temp = ($('#historyTable').WATable({
    columnPicker: true,
    filter: true,
    url: urlRoot + 'history'
  })).data('WATable');
  if (typeof temp != 'undefined') {
    myWatable.history.table = temp;
  }

  // reservation table
  var temp = ($('#reservationTable').WATable({
    pageSize: '100',
    hidePagerOnEmpty: true,
    columnPicker: true,
    url: urlRoot + 'reservations'
  })).data('WATable');
  if (typeof temp != 'undefined') {
    myWatable.reservation.table = temp;
  }

  // aplications table
  var temp = ($('#appsTable').WATable({
    pageSize: '100',
    hidePagerOnEmpty: true,
    url: urlRoot + 'applications'
  })).data('WATable');
  if (typeof temp != 'undefined') {
    myWatable.apps.table = temp;
  }

  // status table
  var temp = ($('#statusTable').WATable({
    pageSize: '100',
    hidePagerOnEmpty: true,
    url: urlRoot + 'status'
  })).data('WATable');
  if (typeof temp != 'undefined') {
    myWatable.status.table = temp;
  }

  // jobs running
  var temp = ($('#allJobsRunning').WATable({
    pageSize: '100',
    //actions: {
    //  filter: true, //Toggle visibility
    //  custom: [
    //    $('<a href="#" class="refresh">' +
    //      '<i class="icon-refresh">' +
    //      '</i>&nbsp;Refresh</a>').on('click', refreshTable)
    //  ]
    //},
    filter: true,
    hidePagerOnEmpty: true,
    url: urlRoot + 'alljobsrunning'
  })).data('WATable');
  if (typeof temp != 'undefined') {
    myWatable.allJobsRunning.table = temp;
  }

  // jobs pending
  var temp = ($('#allJobsPending').WATable({
    pageSize: '100',
    filter: true,
    hidePagerOnEmpty: true,
    url: urlRoot + 'alljobspending'
  })).data('WATable');
  if (typeof temp != 'undefined') {
    myWatable.allJobsPending.table = temp;
  }
});
});
