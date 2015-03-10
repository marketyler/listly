var Listly = function() {

  function Listly() {
    var self = this;
    self.tasks = [];

    function addTask(name) {
      name = $(name);
      self.tasks.push(name.val());
      if (save()) {
        var result = $('#tasks').append('<li>' + name.val() +'</li>');
        result.find('li').addClass('list-group-item');
        return true;
      }
      else {
        return false;
      }
    }

    function load() {
      self.tasks = JSON.parse(localStorage.tasks);
      $.each(self.tasks, function(index, task) {
        $('#tasks').append('<li class="list-group-item">' + task +'</li>');
      });
    }

    function save() {
      try {
        return (localStorage.tasks = JSON.stringify(self.tasks));
      }
      catch(err) {
        return false;
      }
    }

    // load the form
    load();

    // instantiate handlers
    $('form#new_task').submit(function(ev) {
      ev.preventDefault();
      var task_name = $(this.task_name);

      if (addTask(task_name)) {
        task_name.val('');
      }
      task_name.focus().select();
    });

  }

  return Listly;
}();

var listly = new Listly();
