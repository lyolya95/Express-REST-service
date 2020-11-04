const { reqWrapper } = require('../../errors/appErrors');
const { OK } = require('http-status-codes');
const { Forbidden } = require('http-errors');
const router = require('express').Router();
const loginService = require('./auth.service');

router.route('/').post(
  reqWrapper(async (req, res) => {
    const { login, password } = req.body;

    const token = await loginService.signToken(login, password);
    if (!token) {
      throw new Forbidden();
    } else {
      res.status(OK).json({ token });
    }
  })
);

module.exports = router;
