const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  try {
    res.json(await boardsService.getAll());
  } catch (err) {
    res.status(404).send('Board not found');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    res
      .status(200)
      .json(Board.toResponse(await boardsService.getById(req.params.id)));
  } catch (err) {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(
    new Board({
      title: req.body.title,
      columns: [...req.body.columns]
    })
  );
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(
    req.params.id,
    new Board({
      id: req.params.id,
      title: req.body.title,
      columns: [...req.body.columns]
    })
  );
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.deleted(req.params.id);
    res.status(200).send('OK');
  } catch (err) {
    res.status(404).send('Board not found');
  }
});

module.exports = router;
