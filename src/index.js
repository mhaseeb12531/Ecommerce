const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

require('./db/mongoose');

const userRouter = require('./routes/user.route');
const productRouter = require('./routes/product.route');
const onlineShopRouter = require('./routes/onlineShop.route');
const addressRouter = require('./routes/address.route');
const orderRouter = require('./routes/order.route');
const cartDetailstRouter = require('./routes/cartDetails.route');
const orderDetailsRouter = require('./routes/orderDetails.route');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use(onlineShopRouter);
app.use(addressRouter);
app.use(orderRouter);
app.use(cartDetailstRouter);
app.use(orderDetailsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up on port ${port}`);
});
module.exports = router;
