/**
 * This is the file that do the requirejs configuration
 *
 *
 * @author yann.sagon@flowkit.com (Yann Sagon)
 */

require.config({
  //catchError: true,
  //enforceDefine: true,
  baseUrl: 'iface-dev/javascripts',
  paths: {
    'jquery': '../bower_components/jquery/jquery.min'
    ,'jquery-ui': '../bower_components/jquery-ui/ui/minified/jquery-ui.min'
    ,'jquery-validation': 'sbatchGenerator/jquery.validate.min' 
    ,'timeago': '../bower_components/jquery-timeago/jquery.timeago'
    ,'watable': 'watable/jquery.watable'
    ,'bootstrap': '../bower_components/bootstrap/docs/assets/js/bootstrap.min'
    ,'bootstrap-datepicker': '../bower_components/bootstrap-datepicker/js/bootstrap-datepicker'
  },
  shim: {
    'jquery-ui': {
      exports: '$',
      deps: ['jquery']
    },
    'timeago': {
      exports: '$',
      deps: ['jquery']
    },
    'jquery-validation': {
      exports: '$',
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

