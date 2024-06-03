import { Router } from "express";

import userRouter from "./users";
import productRouter from "./product";
import orderRouter from "./order";
import promoRouter from "./promo";

const mainRouter = Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/promo", promoRouter);

export default mainRouter;