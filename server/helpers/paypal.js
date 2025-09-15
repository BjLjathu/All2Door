
import paypal from "@paypal/paypal-server-sdk";

const client = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    "YOUR_CLIENT_ID",
    "YOUR_CLIENT_SECRET"
  )
);


