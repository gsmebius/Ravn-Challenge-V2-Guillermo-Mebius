import express from 'express';
import bodyParser from 'body-parser';

import { categoryRouter } from './routes/category.routes';
import { productRouter } from './routes/product.routes';
import { roleRouter } from './routes/role.routes';
import { userRouter } from './routes/user.routes';
import { shopRouter } from './routes/shop.routes';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/role', roleRouter);
app.use('/sign', userRouter);
app.use('/shop', shopRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
