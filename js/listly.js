var Listly = function() {

  function Listly() {
    var self = this;
    self.tasks = [];

    function addTask(name) {
      name = $(name);
      self.tasks.push(name.val());
      if (save()) {
        appendToList(name.val());
        return true;
      }
      else {
        return false;
      }
    }

    function appendToList(task_name) {
      // Grab list item template
      var li = $('#list_item_template').clone();
      li.removeAttr('id');

      li.find('label').text(task_name);
      li.removeClass('hidden');

      li.find('.btn-danger').click(function() {
        // remove from array

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
      var task_name = $(this.task_name);

      if (addTask(task_name)) {
        task_name.val('');
      }
      else {
        showFormError(this);
      }
      task_name.focus().select();
    });

    // $('').onclick(function(ev) {
    //
    // });

  }

  return Listly;
}();

var listly = new Listly();
