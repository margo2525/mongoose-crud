const mongoose = require('mongoose');

(async () => {
  try {
    // Установлення з'єднання
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });

    console.log('Connection OK ');

    // Створення моделі на базі схеми
    const taskSchema = new mongoose.Schema({
      value: String,
    });
    const Task = mongoose.model('Task', taskSchema);

    const testTask = { value: 'ToDo HW 1' };
    Task.create;
    const createdTask = await Task.create(testTask);
    console.log('createdTask :>> ', createdTask);

    // Task.find
    const foundTasks = await Task.find();
    console.log('foundTasks :>> ', foundTasks);

    // Task.findById
    const foundTask = await Task.findById('644d468db277a42265e9d3ce');
    console.log('foundTask :>> ', foundTask);

    // Task.findByIdAndUpdate
    const updatedTask = await Task.findByIdAndUpdate(
      '644d468db277a42265e9d3ce',
      { value: 'Rest' },
      { new: true }
    );
    console.log('updatedTask :>> ', updatedTask);

    // Task.findByIdAndDelete
    const deletedTask = await Task.findByIdAndDelete(
      '644d468db277a42265e9d3ce'
    );
    console.log('deletedTask :>> ', deletedTask);
  } catch (err) {
    console.log('err :>> ', err);
  }
})();
