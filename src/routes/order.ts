import { Router } from "express";
import { createNewOrder, getOrder, updateDataOrder, deleteDataOrder } from "../handlers/order";

const orderRouter = Router();

orderRouter.get("/", getOrder);
orderRouter.post("/", createNewOrder);
orderRouter.patch("/:id", updateDataOrder);
orderRouter.delete("/:id", deleteDataOrder);

export default orderRouter;