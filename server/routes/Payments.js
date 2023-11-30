const express = require("express");
const paymentRoutes = express.Router();


const { capturePayment, verifySignature } = require('../controllers/Payments');
const { auth, isStudent } = require('../middlewares/auth');

paymentRoutes.post('/payment/buyCourse/:courseId', auth, isStudent, capturePayment);
paymentRoutes.post('/payments/verifySignature', verifySignature);



module.exports = paymentRoutes;