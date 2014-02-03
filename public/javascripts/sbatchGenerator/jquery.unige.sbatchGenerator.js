/**
 * jQueryUI widget for the message dispatcher
 *
 * The goal of this widget is to accept data from outside and to forward it
 * to others widgets.
 * Outside can be a websocket, another script etc.
 * Others widgets can be a log, notification, image, 3d etc.
 * This widget must provide callbacks entries to forward message.
 * When a widget register, it must specify what kind of message it wants to
 * receive.
 *
 * @author yann.sagon@unige.ch (Yann Sagon)
 */
(function($) {
   'use strict';
  $.widget('unige.sbatchGenerator', {
    self: null,
    /**
         * object to store widget default options
         */
    options: {
      test: 'toto'
    },

    _vars: {
      container: null,
      inputs: null,
    },

    /**
        * Widget constructor function
        * @constructor
        * @private
        */
    _create: function() {
       self = this;
       self._vars.container = self.element;
       console.log(self._vars.container);
       self._drawUI();
    },
    
    /**
     * Draw the widget
     */
    _drawUI: function() {
      var script = $('<pre id="script"></pre>');
      
      
      
      var form = $('<form id="form"></form>');
      
      var fieldset = $('<fieldset></fielseet>');
      
      var legend = $('<legend>Sbatch generator</legend>');
      self._vars.inputs = [
        {'type': 'number',
         'slurm_option': '--cpus-per-task',
         'id': 'sbatch_cpusPerTask',
         'name': 'sbatch_cpusPerTask',
         'label': 'Cpus per task',
         'tooltip': 'Number of threads a single instance of your application needs',
         'class': 'span1',
         'ph': '1..16',
         'validate': [{'key':'required', 'val':''},
                      {'key':'min', 'val':1},
                      {'key':'max', 'val':16}
         ]                          
        },
        {'type': 'text',
                 'slurm_option': '--job-name',
                 'id': 'sbatch_jobName',
                 'label': 'Job name',
         'class': 'span2',
                 'ph': 'string',
                 'validate': [{'key':'required', 'val':''},
                      {'key':'minlength', 'val':2}
         ]                  
           
        },
        {'type': 'number',
         'slurm_option': '--ntasks',
         'id': 'sbatch_nTasks',
         'name': 'sbatch_nTasks',
         'label': 'Number of tasks',
         'tooltip': 'Number of instance(s) of your application, or number of MPI workers',
         'class': 'span1',
         'ph': '1..416',
         'validate': [{'key':'max', 'val':416},
                      {'key':'min', 'val':1},
                      {'key':'required', 'val':''}
         ]
             
        },
        {'type': 'text',
         'slurm_option': '--time',
         'id': 'sbatch_time',
         'name': 'sbatch_time',
         'label': 'Required time',
         'tooltip': 'Maximum running time of your job. In order for your job to be scheduled quickly, specify the minimum time possible',
         'class': 'span2',
         'ph': 'days-hh:mm:ss'
        },
        {'type': 'email',
         'slurm_option': '--mail-user',
         'id': 'sbatch_mail_user',
         'name': 'sbatch_mail_user',
         'label': 'Email of the user to be notified',
         'value': email,
         'class': 'span3',
         'ph': 'email'
        },
        {'type': 'select',
         'slurm_option': '--mail-type',
         'id': 'sbatch_mail_type',
         'label': 'Type of notification',
         'class': 'span2',
         'name': 'sbatch_mail_type',
         'value': [{'id': 'BEGIN', 'value':'Begin of job'},
                   {'id': 'END', 'value':'End of job'},
                   {'id': 'FAIL', 'value':'Fail job'},
                   {'id': 'REQUEUE', 'value':'Requeue'},
                   {'id': 'ALL', 'value':'All'}]
        
        }, 
        {'type': 'select',
         'slurm_option': '--partition',
         'id': 'partitions',
         'label': 'Partition',
         'class': 'span3',
         'name': 'sbatch_partitions',
         'tooltip': 'See &lt;a href=&quot;#status&quot;&gt;status&lt;/a&gt;',
         'value': [
                   {'id': 'debug', 'value':'Debug'},
                   {'id': 'parallel', 'value':'Parallel'},
                   {'id': 'bigmem', 'value':'Bigmem'}
                  ]
        
        },        
        {'type': 'button',
         'id': 'btnSubmit',
         'name': 'submit',
         'value': 'Generate'
        },
      ];
      
      
      
      $.validator.addMethod("duration", function(value, element){
        return this.optional(element) || /^([0-4]-)?(\d\d:)?(\d\d:)?(\d\d)$/.test(value);
      }, 'Specify a valid duration max: 4-00:00:00');
      
      for(var i=0; i< self._vars.inputs.length; i++){
         var input = self._buildInputs(self._vars.inputs[i]);
         var label = self._buildLabels(self._vars.inputs[i]);
         if(label){
            label.appendTo(fieldset);
         }
         input.appendTo(fieldset);
      }
      legend.appendTo(form);
      
      fieldset.appendTo(form);
      form.appendTo(this._vars.container);
      
      script.appendTo(this._vars.container);
      
      // validate form
      form.validate({debug: true,
                     submitHandler: function(form){
                        var res = self._generateScript();
                        script.text(res);
                     },
                     rules: {
                      sbatch_time:{
                         required: true,
                         duration: true
                      }                      
                     }});
      //form.validate({
      //  submitHandler: function(form){
      //    alert("salut");
      //    $(form).submit();
      //  }
      //});
      
      
    },

    _generateScript: function() {
       var data = new Array();
       data.push('#!/bin/sh ');
       
       var inputs = self._vars.inputs;
       for (var i=0; i<inputs.length; i++){
          if(typeof inputs[i].slurm_option != 'undefined'){
             data.push('#SBATCH ' + inputs[i].slurm_option + '=' + $('#'+inputs[i].id).val());
          }
       }
       data.push('#SBATCH --clusters=baobab');
       data.push('#SBATCH --output=slurm-%J.out');
       data.push('\n');
       data.push('srun your_binary');
       return data.join('\n');
    },
    
    _buildLabels: function(obj){
        var label = false;
         if(obj.label){
            label = $('<label>'+obj.label+'</label>');
            if(obj.tooltip){
              label.append($('<a href="#" data-html="true" data-toggle="tooltip" title="'+ obj.tooltip +'">?</a>'));
            }
         }
         return label;
    },
    _buildInputs: function(obj){
        switch(obj.type){
          case 'select':{
          var select = $('<select id="'+ obj.id 
                                       + '" name="'+ obj.name 
                                       + '" class="'+ obj.class + '"></select>');
          for(var i=0; i<obj.value.length; i++){
            var id = obj.value[i].id;
            var value = obj.value[i].value;
            
            $('<option value="' + id + '" id="'+ id +'">'+value+'</option>').appendTo(select);
          }
          return select;
          }
          case 'text':
          case 'email':
          case 'number':{
             var input = $('<input type="'+ obj.type
             + '" placeholder="' + obj.ph 
             + '" name="' + obj.name
             + '" class="' + obj.class
             + '" id="' + obj.id
             + '">');
             if(typeof obj.value != 'undefined'){
               input.attr('value', obj.value);
             }
             if(typeof obj.validate != 'undefined'){
                for(var i=0;i< obj.validate.length; i++){
                    input.attr(obj.validate[i].key, obj.validate[i].val);
                }
             }
             
             return input;
             break;
          }
          case 'button':{
          return $('<button class="btn" id="'+obj.id+'">' + obj.value + '</button>');
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
})(jQuery);
