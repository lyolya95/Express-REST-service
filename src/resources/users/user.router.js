const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (err) {
    res.status(404).send('Users not found');
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(404).send('User not found');
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.create(
      new User({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
      })
    );
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(404).send('User not found');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(
      req.params.id,
      new User({
        id: req.params.id,
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
      })
    );
    res.json(User.toResponse(user));
  } catch (err) {
    res.status(404).send('User not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.deleted(req.params.id);
    res.status(200).send('OK');
  } catch (err) {
    res.status(404).send('User not found');
  }
});

module.exports = router;
