/**
 * jQueryUI widget to display a cluster
 *
 * This widget allows to draw a dynamic image of the cluster with event parts.
 *
 * @author yann.sagon@unige.ch (Yann Sagon)
 */
define(['jquery', 'jquery-ui', 'jcanvas'], function($, ui, jcanvas) {
  'use strict';
  $.widget('unige.clusterViewer', {
    /**
     * object to store widget default options
     */
    options: {
      test: 'toto'
    },

    _vars: {
      container: null,
      inputs: null
    },

    /**
     * Widget constructor function
     * @constructor
     * @private
     */
    _create: function() {
      var that = this;
      that._vars.container = that.element;
      console.log(that._vars.container);
      that._drawUI();
    },

    /**
     * Draw the widget
     */
    _drawUI: function() {
      var that = this;
      var colors = ['red', 'green', 'grey', 'magenta', 'brown', 'black', 'yellow', 'orange', 'BurlyWood'];
      var canvas = $('<canvas height="500" width="200">');
      canvas.appendTo(this._vars.container);
      canvas.addLayer(this._getRack(200, 500));
      var x=0;
      var y=0;
      var heightNode = 25;
      var widthNode = 100;
      for(var i=0; i<10; i++){
         canvas.addLayer(this._getChassis(x, y, 200, 50, colors[i]));
         var xnode =0;
         var ynode =y;
         for(var j=0; j<4; j++){
           var n = String.fromCharCode(96 + (i*4+1)*(j+1));
           console.log("number: ", n);
           canvas.addLayer(this._getNode(xnode, ynode, 100, 25, colors[i+j+1], n));
           xnode +=widthNode;
           xnode = xnode % 200;
           ynode +=heightNode;
         }
         x=0
         y+=50;
      }
      canvas.drawLayers();
    },

    _getRack: function(w, h){
      return {
        type: 'rectangle',
        fillStyle: 'blue',
        x: 0, y: 0,
        fromCenter: false,
        width: w, height: h,
        click: function(layer) {
          console.log(name, layer);
        }
      };
    },

    _getNode: function(x, y, w, h, c, n){
      return {
        type: 'rectangle',
        name: n,
        fillStyle: c,
        x: x, y: y,
        fromCenter: false,
        width: w, height: h,
        click: function(layer) {
          console.log(layer.name);
        }
      };
    },

    _getChassis: function(x, y, w, h, c){
      return {
        type: 'rectangle',
        fillStyle: c,
        x: x, y: y,
        fromCenter: false,
        width: w, height: h,
        click: function(layer) {
          console.log('asdf', layer);
        }
      };
    },


    /**
        * Manage options received from the init function
        * @private
        * @param {Object} key of the option
        * @param {Object|float|string} value of the option
        */
    _setOption: function(key, value) {
      this._super(key, value);
    }
  });
});
