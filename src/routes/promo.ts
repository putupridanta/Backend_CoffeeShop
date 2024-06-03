import { Router } from "express";
import { getPromo, createNewPromo, updateDataPromo, deleteDataPromo } from "../handlers/promo";

const promoRouter = Router();

promoRouter.get("/", getPromo);
promoRouter.post("/", createNewPromo);
promoRouter.patch("/:id", updateDataPromo);
promoRouter.delete("/:id", deleteDataPromo);

export default promoRouter;