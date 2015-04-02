requirejs.config({
    //"baseUrl": "",
    "paths": {
      "jquery-ui": "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min",
      "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
      "jcanvas": "https://raw.githubusercontent.com/caleb531/jcanvas/master/jcanvas"
    },
    "shim": {
      "jquery-ui": ["jquery"],
      "jcanvas": ["jquery-ui"]
    }
});

// Load the main app module to start the app
requirejs(["main"]);
