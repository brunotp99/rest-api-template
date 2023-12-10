import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validateResources from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { requireUser } from "./middleware/requireUser";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";

function routes (app: Express) {
    app.get("/healthCheck", (req: Request, res: Response) => 
        res.sendStatus(200)
    )
    
    app.post("/api/users", validateResources(createUserSchema), createUserHandler)

    app.post("/api/sessions", validateResources(createSessionSchema), createUserSessionHandler)

    app.get("/api/sessions", requireUser, getUserSessionsHandler);
    
    app.delete("/api/sessions", requireUser, deleteSessionHandler);
    
    app.post("/api/products", [requireUser, validateResources(createProductSchema)], createProductHandler)
    app.put("/api/products/:productId", [requireUser, validateResources(updateProductSchema)], updateProductHandler)
    app.delete("/api/products/:productId", [requireUser, validateResources(deleteProductSchema)], deleteProductHandler)
    app.get("/api/products/:productId", validateResources(getProductSchema), getProductHandler)
}

export default routes;