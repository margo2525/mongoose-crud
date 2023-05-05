const { Router } = require('express');
const { phoneController } = require('../controller');

const phoneRouter = Router();

// TODO validation middleware

phoneRouter
  .route('/')
  .get(phoneController.getPhones)
  .post(phoneController.createPhone);

phoneRouter
  .route('/:phoneId')
  .get(phoneController.getPhoneById)
  .patch(phoneController.updatePhoneById)
  .delete(phoneController.deletePhoneById);

phoneRouter.route('/:phoneId').get(phoneController.getPhonesByUser);

module.exports = phoneRouter;
