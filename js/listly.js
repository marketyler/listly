var Listly = function() {

  function Listly() {
    this.tasks = [];
    var self = this;

    $('form#new_task').submit(function(ev) {
      ev.preventDefault();
      var task_name = $(this.task_name);

      // Add list item to #tasks
      var result = $('#tasks').append('<li>' + task_name.val() +'</li>');
      result.find('li').addClass('list-group-item');
      task_name.val('');
      task_name.focus();

      // Add the task name to tasks array

    });
  }

  return Listly;
}();

var listly = new Listly();
