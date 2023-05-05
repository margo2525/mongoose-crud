const { Router } = require('express');
const { userController } = require('../controller');

const userRouter = Router();

// TODO validation middleware

userRouter
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

userRouter
  .route('/:userId')
  .get(userController.getUserById)
  .patch(userController.updateUserById)
  .delete(userController.deleteUserById);

userRouter
  .route('/:userId/posts')
  .post(userController.createUserPost)
  .get(userController.getUserPosts);

userRouter
  .route('/:userId/phones')
  .post(userController.createUserPhones)
  .get(userController.getUserPhone);

module.exports = userRouter;
