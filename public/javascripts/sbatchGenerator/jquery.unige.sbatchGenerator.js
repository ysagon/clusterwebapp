/**
 * jQueryUI widget for the message dispatcher
 *
 * This widget allows to generate a slurm sbatch script
 * based on the user input
 *
 * @author yann.sagon@unige.ch (Yann Sagon)
 */
define(['jquery-ui', 'jquery-validation'], function($, undefined) {
   'use strict';
  $.widget('unige.sbatchGenerator', {
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


    _getDivWrapper: function(size){
      return $('<div class="'+size+'"></div>');
    },
    /**
     * Draw the widget
     */
    _drawUI: function() {
      var that = this;
      var script = $('<pre id="script"></pre>');



      var form = $('<form role="form" ' +
                    'class="form-horizontal" ' +
                    'id="form"></form>');

      var fieldset = $('<fieldset></fieldset>');


      var formgroup = $('<div class="form-group form-group-sm"></div>');

      var legend = $('<legend>Sbatch generator</legend>');
      that._vars.inputs = [
        {'type': 'number',
         'slurm_option': '--cpus-per-task',
         'id': 'sbatch_cpusPerTask',
         'name': 'sbatch_cpusPerTask',
         'label': 'Cpus per task',
         'labelWidth': 'col-sm-2',
         'widgetWidth': 'col-sm-2',
         'tooltip': 'Number of threads a single instance ' +
                    'of your application needs',
         'ph': '1..16',
         'validate': [{'key': 'required', 'val': ''},
                      {'key': 'min', 'val': 1},
                      {'key': 'max', 'val': 16}
         ]
        },
        {'type': 'text',
                 'slurm_option': '--job-name',
                 'id': 'sbatch_jobName',
                 'label': 'Job name',
         'labelWidth': 'col-sm-2',
         'widgetWidth': 'col-sm-4',
         'ph': 'string',
         'validate': [{'key': 'required', 'val': ''},
                      {'key': 'minlength', 'val': 2}
         ]

        },
        {'type': 'number',
         'slurm_option': '--ntasks',
         'id': 'sbatch_nTasks',
         'name': 'sbatch_nTasks',
         'label': 'Number of tasks',
         'tooltip': 'Number of instance(s) of your application, or number ' +
                    'of MPI workers',
         'labelWidth': 'col-sm-2',
         'widgetWidth': 'col-sm-2',
         'ph': '1..416',
         'validate': [{'key': 'max', 'val': 416},
                      {'key': 'min', 'val': 1},
                      {'key': 'required', 'val': ''}
         ]

        },
        {'type': 'text',
         'slurm_option': '--time',
         'id': 'sbatch_time',
         'name': 'sbatch_time',
         'label': 'Required time',
         'tooltip': 'Maximum running time of your job. In order for your ' +
                    'job to be scheduled quickly, specify the minimum time ' +
                    'possible',
         'labelWidth': 'col-sm-2',
         'widgetWidth': 'col-sm-4',
         'ph': 'days-hh:mm:ss'
        },
        {'type': 'email',
         'slurm_option': '--mail-user',
         'id': 'sbatch_mail_user',
         'name': 'sbatch_mail_user',
         'label': 'Email of the user to be notified',
         'value': email,
         'labelWidth': 'col-sm-2',
         'widgetWidth': 'col-sm-4',
         'ph': 'email'
        },
        {'type': 'select',
         'slurm_option': '--mail-type',
         'id': 'sbatch_mail_type',
         'label': 'Type of notification',
         'labelWidth': 'col-sm-2',
         'widgetWidth': 'col-sm-2',
         'name': 'sbatch_mail_type',
         'value': [{'id': 'NONE', 'value': 'No notification'},
                   {'id': 'BEGIN', 'value': 'Begin of job'},
                   {'id': 'END', 'value': 'End of job'},
                   {'id': 'FAIL', 'value': 'Fail job'},
                   {'id': 'REQUEUE', 'value': 'Requeue'},
                   {'id': 'ALL', 'value': 'All'}]

        },
        {'type': 'select',
         'slurm_option': '--partition',
         'id': 'partitions',
         'label': 'Partition',
         'labelWidth': 'col-sm-2',
         'widgetWidth': 'col-sm-2',
         'name': 'sbatch_partitions',
         'tooltip': 'See &lt;a href=&quot;#status&quot;&gt;status&lt;/a&gt;',
         'value': [
                   {'id': 'debug', 'value': 'Debug'},
                   {'id': 'parallel', 'value': 'Parallel'},
                   {'id': 'bigmem', 'value': 'Bigmem'},
                   {'id': 'shared', 'value': 'Shared'}
                  ]

        },
        {'type': 'button',
         'id': 'btnSubmit',
         'name': 'submit',
         'widgetWidth': 'col-sm-offset-2 col-sm-10',
         'value': 'Generate'
        }
      ];



      $.validator.addMethod('duration', function(value, element) {
        return this.optional(element) ||
               /^([0-4]-)?(\d\d:)?(\d\d:)?(\d\d)$/.test(value);
      }, 'Specify a valid duration max: 4-00:00:00');

      for (var i = 0; i < that._vars.inputs.length; i++) {
         var newFormGroup = formgroup.clone();
         var newDivWrapper = that._getDivWrapper(that._vars.inputs[i].widgetWidth);
         var input = that._buildInputs(that._vars.inputs[i]);
         var label = that._buildLabels(that._vars.inputs[i]);
         if (label) {
            label.appendTo(newFormGroup);
         }
         input.appendTo(newDivWrapper);
         newDivWrapper.appendTo(newFormGroup);
         newFormGroup.appendTo(fieldset);
      }
      legend.appendTo(form);

      //formgroup.appendTo(fieldset);

      fieldset.appendTo(form);
      form.appendTo(this._vars.container);

      script.appendTo(this._vars.container);

      // validate form
      form.validate({debug: true,
                     submitHandler: function(form) {
                        var res = that._generateScript();
                        script.text(res);
                     },
                     rules: {
                      sbatch_time: {
                         required: true,
                         duration: true
                      }
                     }});
    },

    _generateScript: function() {
       var that = this;
       var data = new Array();
       data.push('#!/bin/sh ');

       var inputs = that._vars.inputs;
       for (var i = 0; i < inputs.length; i++) {
          if (typeof inputs[i].slurm_option != 'undefined') {
             data.push('#SBATCH ' +
                       inputs[i].slurm_option +
                       '=' +
                       $('#' + inputs[i].id).val());
          }
       }
       data.push('#SBATCH --clusters=baobab');
       data.push('#SBATCH --output=slurm-%J.out');
       data.push('\n');
       data.push('srun your_binary');
       return data.join('\n');
    },

    _buildLabels: function(obj) {
        var label = false;
         if (obj.label) {
            label = $('<label for="' + obj.id + '" class="'+ obj.labelWidth +'" control-label">' + obj.label + '</label>');
            if (obj.tooltip) {
              label.append($('<a href="#" data-html="true" ' +
                             'data-toggle="tooltip" title="' +
                             obj.tooltip +
                             '">?</a>'));
            }
         }
         return label;
    },
    _buildInputs: function(obj) {
        switch (obj.type) {
          case 'select': {
          var select = $('<select id="' + obj.id +
                         '" name="' + obj.name +
                         //'" class="form-control ' + obj.class + '"></select>');
                         '" class="form-control"></select>');
          for (var i = 0; i < obj.value.length; i++) {
            var id = obj.value[i].id;
            var value = obj.value[i].value;

            $('<option value="' +
              id +
              '" id="' + id + '">' +
              value + '</option>').appendTo(select);
          }
          return select;
          }
          case 'text':
          case 'email':
          case 'number': {
             var input = $('<input type="' + obj.type +
             '" placeholder="' + obj.ph +
             '" name="' + obj.name +
             //'" class="form-control ' + obj.class +
             '" class="form-control ' +
             '" id="' + obj.id +
             '">');
             if (typeof obj.value != 'undefined') {
               input.attr('value', obj.value);
             }
             if (typeof obj.validate != 'undefined') {
                for (var i = 0; i < obj.validate.length; i++) {
                    input.attr(obj.validate[i].key, obj.validate[i].val);
                }
             }

             return input;
             break;
          }
          case 'button': {
          return $('<button type="submit" class="btn btn-default" id="' +
                   obj.id + '">' +
                   obj.value + '</button>');
          }
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
