const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { reqWrapper } = require('../../errors/appErrors');
const { OK, getStatusText } = require('http-status-codes');

router.route('/').get(
  reqWrapper(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  reqWrapper(async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  reqWrapper(async (req, res) => {
    const board = await boardsService.create(new Board({ ...req.body }));
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  reqWrapper(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  reqWrapper(async (req, res) => {
    await boardsService.deleted(req.params.id);
    res.status(OK).send(getStatusText(OK));
  })
);

module.exports = router;
