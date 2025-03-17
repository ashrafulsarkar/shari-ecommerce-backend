const express = require('express');
const router = express.Router();
// internal
const SSLCommerzController = require('../controller/SSLCommerz.controller');

router.post("/pay_sslcommerze/:orderId", SSLCommerzController.paySSLCommerzeOrder)
router.post('/order-callback/success', SSLCommerzController.payOrderControllerSuccess);
router.post('/order-callback/cancel/:invoice_no', SSLCommerzController.payOrderControllerCancel);
router.post('/order-callback/failed/:invoice_no', SSLCommerzController.payOrderControllerFailed);

module.exports = router;

