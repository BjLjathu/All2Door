const stripe = require("../../helpers/paypal");
const Order = require("../../models/order");

const createOrder = async (req, res) => {
  try {
    const { userId, cartItems, addressInfo, totalAmount } = req.body;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // supports cards
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100), // Stripe needs cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:5173/shop/stripe-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/shop/stripe-cancel",
    });

    // Save order to DB as "pending"
    const newOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod: "stripe",
      paymentStatus: "pending",
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: session.id,
      payerId: "",
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      url: session.url, // Redirect frontend to this
      orderId: newOrder._id,
    });
  } catch (err) {
    console.error("Error in createOrder:", err);
    res.status(500).json({
      success: false,
      message: "Error creating Stripe order",
    });
  }
};

module.exports = { createOrder };
