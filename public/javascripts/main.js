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
        'clusterViewer/jquery.unige.clusterViewer',
        'bootstrap',
        'bootstrap-datepicker'],
function($, undefined, undefined,
    undefined, undefined, undefined, undefined) {
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

    // fill the select with users
    // todo migrate to typeahead.. one day
    $.ajax({
      url: urlRoot + 'listuser'
    }).done(function(data) {
      var entries = JSON.parse(data);
      var res = new Array();
      for (var i = 0; i < entries.length; i++) {
        res.push({ label: entries[i].displayName,
          value: entries[i].unigeChUniqueUid });
      }
      $('#historyUser').autocomplete({ source: res });
    });


    var changeTab = function() {
      // Javascript to enable link to tab
      var url = document.location.toString();
      if (url.match('#')) {
        $('.nav-tabs a[href=#' + url.split('#')[1] + ']').tab('show');
      }
    };

    changeTab();

    // change tab  when url change
    $(window).bind('hashchange', function() {
      changeTab();
    });


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


    // set the initial start date for history
    $('#startDate').val('-10d');

    $('#startDate').datepicker({
      format: 'dd/mm/yyyy'
      //startDate: '-5d'
    }).on('changeDate', function(e) {
      changeHistory();
    });

    $('#historyUser').on('change', function(e) {
      changeHistory();
    });

    // refresh the history table with start date and user
    var changeHistory = function() {
      var selectedDate = $('#startDate').
          datepicker('getFormattedDate', 'yyyy-mm-dd');

      var url = myWatable.history.table.option('url');

      var newUrl = url + '?startDate=' + selectedDate +
                       '&user=' + $('#historyUser').val();

      myWatable.history.table.option('url', newUrl);
      myWatable.history.table.update();
      myWatable.history.table.option('url', url);
    };

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
    // store the slurm status url to be able to refresh it later.
    var srcSlurmStatusDay = $('#img_slurm_status_day').attr('src');
    var srcSlurmStatusHour = $('#img_slurm_status_hour').attr('src');

    // auto refresh elements
    setInterval(function() {
      refreshTable();
      $('#img_slurm_status_day').
          attr('src', srcSlurmStatusDay + '&bzt=' + new Date().getTime());
      $('#img_slurm_status_hour').
          attr('src', srcSlurmStatusHour + '&bzt=' + new Date().getTime());
    }, 20000);

    // history table
    var temp = ($('#historyTable').WATable({
      pageSize: '100',
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

    var clusterView = $('#clusterView');
    clusterView.clusterViewer();
    /*clusterView.drawRect({
    layer: true,
    fillStyle: 'blue',
    x: 0, y: 0,
    fromCenter: false,
    width: 150, height: 75,
    click: function(layer) {
      console.log('asdf', layer);
    }
  });
  clusterView.drawRect({
    layer: true,
    fillStyle: 'red',
    x: 150, y: 0,
    fromCenter: false,
    width: 150, height: 75,
    click: function(layer) {
      console.log('aaaa', layer);
    }
  });
  clusterView.drawRect({
    layer: true,
    fillStyle: 'green',
    fromCenter: false,
    x: 0, y: 75,
    width: 150, height: 75,
    click: function(layer) {
      console.log('aaaa', layer);
    }
  });
  clusterView.drawRect({
    layer: true,
    fillStyle: 'yellow',
    fromCenter: false,
    x: 150, y: 75,
    width: 150, height: 75,
    click: function(layer) {
      console.log('aaaa', layer);
    }
  });*/

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
