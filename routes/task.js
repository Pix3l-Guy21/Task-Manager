const express = require("express")
const taskRoutes = express.Router();
const fs = require('fs');

const dataPath = './data.json';

const saveTask = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(dataPath, stringifyData);
};

const getTasks = () => {
    const jsonFile = fs.readFileSync(dataPath);
    return JSON.parse(jsonFile);
};

taskRoutes.get('/tasks', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

// taskRoutes.get('/tasks', (req, res) => {
//     const tasklist = getTasks();
//     res.send(tasklist);
// });
taskRoutes.post('/tasks/addtask', (req, res) => {
    var existingTasks = getTasks();
    const newTaskId = Math.floor(10 + Math.random()*10);

    existingTasks[newTaskId] = req.body;
    console.log(existingTasks);
    saveTask(existingTasks);
    res.send({success: true, msg: 'account data added successfully'})
});
taskRoutes.get('/tasks/list', (req, res) => {
  const tasks = getAccountData()
  res.send(tasks)
})

taskRoutes.put('/tasks/:id', (req, res) => {
    var existingTasks = getTasks();
    const taskId = req.params.id;
    existingTasks[taskId] = req.body;
    saveTask(existingTasks);
    res.send({ message: `Task with Id ${taskId} is updated` });
});

taskRoutes.delete('/tasks/delete/:id', (req, res) => {
    var existingTasks = getTasks();
    const taskId = req.params[id];
    delete existingTasks[taskId];
    saveTask(existingTasks);
    res.json({ message: `Task with Id ${taskId} is deleted` });
})



module.exports = taskRoutes