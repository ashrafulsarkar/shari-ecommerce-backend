
const SSLCommerz = require("sslcommerz-nodejs");
const { getSetting } = require("../lib/helper");
const { updateorder, getOrderDetails } = require("../helper/order");

let settings = {
  isSandboxMode: false, //false if live version
  store_id: process.env.STROE_ID_SSLCOMMERZE,
  store_passwd: process.env.STORE_PASSWORD_SSLCOMMERZE,
};

let sslcommerz = new SSLCommerz(settings);

exports.paySSLCommerzeOrder = async (req, res, next) => {
  let found = await getOrderDetails({ _id: req.params.orderId });
  let txnID = () => {
    const timestamp = Math.floor(Date.now() / 10000);
    const randomNum = Math.floor(Math.random() * 10000);
    return timestamp * 10000 + randomNum;
  };
  let TXNID = txnID();
  if (!found) {
    return res.status(404).json({
      code: 404,
      status: "failed",
      msg: `Order with id ${req.params.orderId} not found`,
      data: null,
    });
  } else {
    let invoice_no = found.invoice;
    let total_price = found.totalAmount;
    let name = found.name;
    let email = found.email || "admin@gmail.com";
    let phone = found.contact;
    let address = found.address;

    const HOST = process.env.SERVER_URL;

    let post_body = {};
    post_body["total_amount"] = total_price;
    post_body["currency"] = "BDT";
    post_body["tran_id"] = TXNID;
    post_body["success_url"] = HOST + "/api/sslcommerze/order-callback/success";
    post_body["fail_url"] =
      HOST + "/api/sslcommerze/order-callback/failed/" + found._id;
    post_body["cancel_url"] =
      HOST + "/api/sslcommerze/order-callback/cancel/" + found._id;
    post_body["emi_option"] = 0;
    post_body["cus_name"] = name;
    post_body["cus_email"] = email;
    post_body["cus_phone"] = phone;
    post_body["cus_add1"] = address;
    post_body["cus_city"] = "Dhaka";
    post_body["cus_country"] = "Bangladesh";
    post_body["shipping_method"] = "NO";
    post_body["multi_card_name"] = "";
    post_body["num_of_item"] = 1;
    post_body["product_name"] = await getSetting('app_name');
    post_body["product_category"] = await getSetting('app_name');
    post_body["product_profile"] = "general";
    post_body["value_a"] = found._id;
    sslcommerz
      .init_transaction(post_body)
      .then((response) => {
        console.log("response",response)
        res.status(200).json({
          code: 200,
          status: "success",
          msg: "Successfully retrieved data",
          data: response.GatewayPageURL,
        });
      })
      .catch((error) => {
        console.log("error",error)
        res.status(200).json({
          code: 200,
          status: "success",
          msg: "Something Went Wrong",
          data: error,
        });
      });
  }
};


// payOrderControllerSuccess
exports.payOrderControllerSuccess = async (req, res, next) => {

    const paymentData = req.body.value_a ? req.body : req.query;

    console.log('Payment data:', paymentData);

    let final_status = "Unpaid";
    let status = req.body.status;
    if (status == "VALID") {
      final_status = "Paid";
    }
    const order_id = req.body.value_a;
    const paymentMethod = req.body.card_type;
    let trx_id = req.body.tran_id;

    console.log('order success=>',req.body);
    let id = order_id;
    var updateAddress = await updateorder(
      { _id: id },
      {
        $set: {
          cardInfo: req.body,
          payment_status: final_status,
          transactionId: trx_id,
          paymentMethod,
        },
      }
    );

    // return res.status(200).json({
    //   code: 200,
    //   status: "success",
    //   msg: "Success",
    //   data: req.body,
    // });
    return res.redirect(process.env.STORE_URL + "/order/" + id);
  };



// cancel order
exports.payOrderControllerCancel = async (req, res) => {
    // return res.status(200).json({
    //   data: req.body,
    //   message: "Payment cancelled",
    // });
    return res.redirect(
      process.env.STORE_URL + "/order/" + req.params.invoice_no
    );
  };

exports.payOrderControllerFailed = async (req, res) => {
    return res.redirect(
      process.env.STORE_URL + "/order/" + req.params.invoice_no
    );
  };
