const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const { reqWrapper } = require('../../errors/appErrors');

router.route('/').get(
  reqWrapper(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  reqWrapper(async (req, res) => {
    const task = await tasksService.getById(req.params.id);
    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  reqWrapper(async (req, res) => {
    const task = await tasksService.create(
      new Task({
        ...req.body,
        boardId: req.params.boardId
      })
    );
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  reqWrapper(async (req, res) => {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  reqWrapper(async (req, res) => {
    const result = await tasksService.deleted(
      req.params.boardId,
      req.params.id
    );
    if (!result) {
      throw new NOT_FOUND_ERROR('tasks', req.params.id);
    }
    res.status(200).send('OK');
  })
);

module.exports = router;
