const express = require('express');
const PayOS = require('@payos/node');

const payos = new PayOS(
  '0d6a87e8-6784-4c04-ba59-66c618b20724', 
  'f22a4aad-b309-4bbf-a382-07cc3e3fbbb2', 
  '5c8c749463f015d4d288d386ffc3e719bcc1e5322cb3d8da532db4fcfdabdf2f');
const app = express();
app.use(express.static('public'));
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:3000';
app.post('/create-payment-link', async(req, res)=>{
  const order = {
    amount: 2000,
    description: 'Thanh toan sach Ebook',
    orderCode: 21, 
    returnUrl: `${YOUR_DOMAIN}/success.html`,
    cancelUrl: `${YOUR_DOMAIN}/cancel.html`,
  };
  const paymentLink = await payos.createPaymentLink(order);
  res.redirect(303, paymentLink.checkoutUrl);
}
)
// webhook-url https using ngrok
//https://f6df-125-235-239-105.ngrok-free.app/receive-hook
app.post("/receive-hook", async(req, res)=>{
  console.log(req.body);
  res.json();
})

app.listen(3000, ()=>console.log("running on port 3000"));