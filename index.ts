import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();

import Router from "./src/routes";
import getLink from "./src/helpers/getLinks";
// import mainRouter from "./src/routes";


// buat aplikasi express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// buat handler untuk rute api
// app.get("/", (req: Request, res: Response) => {
//     res.send("Ok");
// });

app.get("/test/base/url/:a", (req: Request, res: Response) => {
    res.json({
      link: getLink(req, "previous"),
      path: req.path,
    });
});

app.use(express.static("./public"));

app.use(Router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`);
});
// http://localhost:8000/