var Task = function () {
  var self = this;
  self.counter = 0;

  function Task(properties) {
    this.name = properties.name;
    this.position = properties.position;
    this.completed = !!properties.completed;
    this.id = getOrSetId(properties.id);
  }

  function getOrSetId(id) {
    if (!id) {
      id = self.counter + 1;
    }
    incrementCounter(id);
    return id;
  }

  function incrementCounter(id) {
    if (id > self.counter){
        self.counter = id;
    }
  }

  Task.getTaskById = function(id) {
    var task;
    $.each(listly.tasks, function(index, current_task) {
      if (current_task.id == id) {
        task = current_task;
        return false;
      }
    });
    return task;
  };

  return Task;
}();
