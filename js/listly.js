var Listly = function() {

  function Listly() {
    var self = this;
    self.tasks = [];

    function addTask(task_name) {
      // All of this...
      // var properties = {};
      // properties.name = task_name;
      // var task = new Task(properties);
      // self.tasks.push(task);

      // Is equivalent to these two line
      var task = new Task({ name: task_name });
      self.tasks.push(task);

      if (save()) {
        appendToList(task);
        return true;
      }
      else {
        return false;
      }
    }

    function appendToList(task) {
      // Grab a copy of the list item template.
      var li = $('#list_item_template').clone();
      li.removeAttr('id');

      // Add the task name to the LI's label.
      li.find('label').text(task.name);

      // Unhide the new LI.
      li.removeClass('hidden');

      // Activate the delete button.
      li.find('button.delete').click(function() {
        self.tasks.splice(self.tasks.indexOf(task), 1);
        save();
        li.remove();
      });

      // Sets up tje event handler on all button.edit elementws
      // including those that are not yet on the pag.
      // $('body').on('click', 'button.edit', function() {
      //
      // });


      // Activate the edit button.
      li.find('button.edit').click(task, createEditForm);

      $('#tasks').append(li);
    }

    function createEditForm(ev) {
      var task, li, edit_form, name_field;

      task = ev.data;
      li = $(this).closest('li');

      edit_form =
        $('#edit_form_template').clone().removeAttr('id');
      edit_form.removeClass('hidden');
      name_field = edit_form.find('.edit-task-name');
      name_field.data('task-id', task.id);
      name_field.val(task.name);

      li.find('label').replaceWith(edit_form);
      name_field.focus().select();

      // Save button
      edit_form.submit(updateTask);
    }

    function updateTask(ev) {

      ev.preventDefault();
      var field = $(this.elements.task_name);
      var id = field.data('task-id');
      $.each(self.tasks, function(index, task) {
        if (task.id == id) {
          task.name = field.val();
          return false;
        }
      });

      save();
    }

    function showFormError(form) {
      // add message inside alert div
      $(form).find('.alert').removeClass('hidden');
    }

    function supportsLocalStorage() {
      try {
         return 'localStorage' in window && window.localStorage !== null;
      }
      catch(err) {
        return false;
      }
    }

    function load() {
      if (supportsLocalStorage() && localStorage.tasks) {
        var task;
        var task_objects = JSON.parse(localStorage.tasks);
        $.each(task_objects, function(index, task_properties) {
          task = new Task(task_properties);
          self.tasks.push(task);
          appendToList(task);
        });
      }
    }

    function save() {
      if (supportsLocalStorage()) {
        return (localStorage.tasks = JSON.stringify(self.tasks));
      }
      else {
        return false;
      }
    }

    load();

    $('form#new_task').on('submit', function(ev) {
      ev.preventDefault();
      var field = $(this.task_name);
      var task_name = field.val();

      if (addTask(task_name)) {
        field.val('');
      }
      else {
        showFormError(this);
      }
      field.focus().select();
    });
  }

  return Listly;
}();

var listly = new Listly();
