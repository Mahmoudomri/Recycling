import express from "express";


const app = express();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51MpKg2DsHBrcw9aeXx8uqhpw5Q0dfw9BsqVkPs06BulFQL4tuqQ7jJrSUqFR0fwvw9eZynufH1TyVDWd9nZt8yms00q90sShZs";
const SECRET_KEY ="sk_test_51MpKg2DsHBrcw9ae0Zv1db9iAuTBqd96SxvuMxRjeLIVvGOFD3a7cxbANPYaPwuESkRKxIp210ISUKxm9bCAERGn00Xq7nu4Fa";
import Stripe from "stripe";
const stripe = new Stripe(SECRET_KEY,{apiVersion:"2022-11-15"});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: "usd",
            payment_method_types: ["card"],
        });
        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret: clientSecret,
        });
    } catch (e) {
        console.log(e.message);
        res.json({error: e.message});
    }
});