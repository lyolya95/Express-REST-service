const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  res.json(Task.toResponse(task));
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({
      ...req.body,
      boardId: req.params.boardId
    })
  );
  res.json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.boardId,
    req.params.id,
    req.body
  );
  res.json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.deleted(req.params.boardId, req.params.id);
  res.status(200).send('OK');
});

module.exports = router;
