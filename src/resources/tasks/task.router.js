const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  try {
    res.json(await tasksService.getAll());
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    res.json(await tasksService.getById(req.params.boardId, req.params.id));
  } catch (err) {
    res.status(404).send('Task not found');
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    })
  );
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.id,
    new Task({
      id: req.params.id,
      title: req.body.title,
      order: req.body.order,
      description: req.body.description,
      userId: req.body.userId,
      boardId: req.params.boardId,
      columnId: req.body.columnId
    })
  );
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.deleted(req.params.boardId, req.params.id);
    res.status(200).send('OK');
  } catch (err) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
