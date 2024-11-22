const prisma = require("../configs/prisma");
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51QHzhVGHdw6djxlBlEa4MD1Hom1QUj8LEriJydcLFxydL9dJSz16dVVQjIe1uw3VZOBMyVVueXHOtDEVIaSbVHz600qxTq6r6s"
);

exports.payment = async (req, res) => {
  try {

    // console.log("user cart :",req.user.id);
    
    const cart = await prisma.cart.findFirst({
        where: {
            orderedById: req.user.id
        }
    })

    // console.log(cart);
    // return
    const amountTHB =  cart.cartTotal * 100;
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("server error payment : " + error);
    res.status(500).json({
      message: "Server Error ",
    });
  }
};
