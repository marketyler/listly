var Listly = function() {

  function Listly() {
    var self = this;
    self.tasks = [];

    function addTask(task_name) {

      var task = new Task({name: task_name});
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
      // Grab list item template
      var li = $('#list_item_template').clone();
      li.removeAttr('id');

      li.find('label').text(task.name);
      li.removeClass('hidden');

      li.find('.btn-danger').click(function() {
        // remove from array
        self.tasks.splice(self.tasks.indexOf(task.name), 1);

        // save to local storage
        save();

        // remove from list
        li.remove();
        //removeFromList(item);
      });

      $('#tasks').append(li);
    }

    function removeFromList(item) {
      // remove from array
      var name = li.
      // remove from local storage

      //remove from ol
      item.remove();
    }

    function supportsLocalStorage() {
      try {
        return 'localStorage' in window && window.localStorage !== null;
      }
      catch (err) {
        return false;
      }
    }

    function load() {
      if (supportsLocalStorage() && localStorage.tasks) {
        self.tasks = JSON.parse(localStorage.tasks);
        $.each(self.tasks, function(index, task) {
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

    function showFormError(form) {
      $(form).find('.alert')
        .html('Ahhh cuss!')
        .removeClass('hidden');
    }

    // load the form
    load();

    // instantiate handlers
    $('form#new_task').submit(function(ev) {
      ev.preventDefault();
      var task_name = $(this.task_name).val();

      if (addTask(task_name)) {
        task_name = "" ;
      }
      else {
        showFormError(this);
      }
      $(this.task_name).focus().select();
    });
  }

  return Listly;
}();

var listly = new Listly();
