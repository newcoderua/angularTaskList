var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://mischatch21:password@ds117485.mlab.com:17485/mytasklist', ['tasks']);

// Get all tasks
router.get('/tasks', function(req, res, next){
  db.tasks.find((err, tasks) => {
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

//Get single task
router.get('/task/:id', function(req, res, next){
  db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, tasks) => {
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

//Save tasks
router.post('/task', function(req, res, next){
  var task = req.body;
  if(!task.title || !(task.isDone + '')){
    res.status(400);
    res.json({
      'error': 'Bad Data'
    });
  } else {
    db.tasks.save(task, function(err, task){
      if(err){
        res.send(err);
      }
      res.json(task);
    });
  }
});

// Delete task
router.delete('/task/:id', function(req, res, next){
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, tasks) => {
    if(err){
      res.send(err);
    }
    res.json(tasks);
  });
});

// Update task
router.put('/task/:id', function(req, res, next){
  var task = req.body;
  var updTask = {};
  if (task.isDone) {
    updTask.isDone = task.isDone;
  }
  if (task.title) {
    updTask.title = task.title;
  }
  if (!updTask){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else {
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, (err, tasks) => {
      if(err){
        res.send(err);
      }
      res.json(tasks);
    });
  }

});

module.exports = router;
