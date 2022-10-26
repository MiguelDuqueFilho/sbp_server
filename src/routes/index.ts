import { Router } from "express";

import { catalogRoutes } from "./catalog.routes";
import { messageRoutes } from "./message.routes";
import { testRoutes } from "./test.routes";

const router = Router();

router.use("/catalog", catalogRoutes);
router.use("/message", messageRoutes);
router.use("/test", testRoutes);

export { router };
