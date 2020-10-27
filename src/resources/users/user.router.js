const router = require('express').Router();
const usersService = require('./user.service');
const User = require('./user.model');
const { OK, getStatusText } = require('http-status-codes');
const { reqWrapper } = require('../../errors/appErrors');

router.route('/').get(
  reqWrapper(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  reqWrapper(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  reqWrapper(async (req, res) => {
    const user = await usersService.create(new User({ ...req.body }));
    res.json(User.toResponse(user));
  })
);

router.route('/:id').put(
  reqWrapper(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(
  reqWrapper(async (req, res) => {
    await usersService.deleted(req.params.id);
    res.status(OK).send(getStatusText(OK));
  })
);

module.exports = router;
