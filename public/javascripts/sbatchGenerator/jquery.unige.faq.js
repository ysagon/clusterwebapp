/**
 *
 * @author yann.sagon@unige.ch (Yann Sagon)
 */
define(['jquery-ui', 'markdown'], function($, md) {
  'use strict';
  $.widget('unige.faq', {
    /**
         * object to store widget default options
         */
    options: {
      data: '',
      title: 'FAQ'
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

    _getGroup: function() {
      return $('<div class="panel pannel-primary"></div>');
    },

    _getToggle: function(data, idParent, idCollapse) {
      return $('<a class="pannel-title" data-toggle="collapse" ' +
               'data-parent="#' + idParent + '" href="#' + idCollapse + '">' +
               data + '</a>');
    },

    _getBegin: function(id) {
      return $('<div class="panel-group" id="' + id + '"></div>');
    },

    _getTitle: function(title) {
      var head = $('<h3>' + title + '</h3>');
      return head;
    },

    _getHeading: function() {
      return $('<div class="pannel-heading"></div>');
    },

    _getBody: function(idCollapse, open) {
      var active = open ? ' in' : '';
      return $('<div id="' + idCollapse +
               '" class="panel-collapse collapse' + active + '"></div>');
    },

    _getInner: function(content) {
      return $('<div class="pannel-body">' + content + '</div>');
    },


    _getFullGroup: function(idGroup,
        headingContent,
        bodyContent,
        idParent,
        open) {
      var that = this;
      var accordionGroup = that._getGroup();
      var accordionHeading = that._getHeading();

      var toggle = that._getToggle(headingContent, idParent, idGroup);

      toggle.appendTo(accordionHeading);
      accordionHeading.appendTo(accordionGroup);

      var accordionBody = that._getBody(idGroup, open);

      var accordionInner = that._getInner(bodyContent);

      accordionInner.appendTo(accordionBody);

      accordionBody.appendTo(accordionGroup);

      return accordionGroup;

    },

    _createAccordion: function(accordionId, accordionTitle, data) {
      var that = this;

      var title = that._getTitle(accordionTitle);

      var begin = that._getBegin(accordionId);

      for (var i = 0; i < data.length; i++) {
        if (typeof data[i].head !== 'undefined') {
          var group = that._getFullGroup(accordionId + '_' + i,
              md.toHTML(data[i].head),
              md.toHTML(data[i].body), accordionId, data[i].active);


          group.appendTo(begin);
        }
      }
      title.appendTo(this._vars.container);
      begin.appendTo(this._vars.container);
    },

    /**
     * Draw the widget
     */
    _drawUI: function() {
      $('<h2>' + this.options.title + '</h2>').
          appendTo(this._vars.container);

      var that = this;

      for (var i = 0; i < this.options.data.length; i++) {
        that._createAccordion('accordion' + i,
            this.options.data[i][0].title,
            this.options.data[i].slice(1));
      }
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
