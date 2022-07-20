import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";

const app = express();
app.use(express.json());
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    return res.json({
        status: "Error",
        message: error.message
    })
})
app.listen(3000, () => { console.log('server is listening on port 3000') });