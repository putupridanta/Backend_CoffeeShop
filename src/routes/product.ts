import { Router } from "express";
import { createNewProduct, deleteDataProduct, filteringProduct, getDetailProduct, getProduct, priceProduct, updateDataProduct } from "../handlers/product";

const productRouter = Router();

productRouter.get("/", getProduct);
productRouter.get("/sort", priceProduct);
productRouter.get("/filter", filteringProduct);
productRouter.get("/:id", getDetailProduct);
productRouter.post("/", createNewProduct);
productRouter.patch("/:id", updateDataProduct);
productRouter.delete("/:id", deleteDataProduct);

export default productRouter;