/**
 * This is the file that do the requirejs configuration
 *
 *
 * @author yann.sagon@flowkit.com (Yann Sagon)
 */

require.config({
  //catchError: true,
  //enforceDefine: true,
  //baseUrl: 'iface-dev/javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'jquery-ui': '../bower_components/jquery-ui/ui/minified/jquery-ui.min',
    'typeahead': '../bower_components/typeahead.js/dist/typeahead.jquery.min',
    'jquery-validation': 'sbatchGenerator/jquery.validate.min',
    'timeago': '../bower_components/jquery-timeago/jquery.timeago',
    'markdown': '../bower_components/markdown/lib/markdown',
    'watable': 'watable/jquery.watable',
    'jcanvas': '../bower_components/jcanvas/jcanvas.min',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'bootstrap-datepicker': '../bower_components/bootstrap-datepicker/' +
                            'js/bootstrap-datepicker'
  },
  shim: {
    'jquery-ui': {
      exports: '$',
      deps: ['jquery']
    },
    'markdown': {
      exports: 'window.markdown'
    },
    'timeago': {
      exports: '$',
      deps: ['jquery']
    },
    'jquery-validation': {
      exports: '$',
      deps: ['jquery']
    },
    'jcanvas': {
      exports: '',
      deps: ['jquery']
    },
    'bootstrap': {
      exports: '',
      deps: ['jquery']
    },
    'bootstrap-datepicker': {
      exports: '',
      deps: ['bootstrap']
    },
    'watable': {
      exports: '$',
      deps: ['bootstrap']
    }
  }
});

