const { Router } = require('express');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const phoneRouter = require('./phoneRouter');
const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/phones', phoneRouter);
module.exports = router;
