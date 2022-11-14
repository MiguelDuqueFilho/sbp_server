import { Router } from "express";

import { catalogRoutes } from "./catalog.routes";
import { messageRoutes } from "./message.routes";
import { testRoutes } from "./test.routes";

const router = Router();

router.use("/api/catalog", catalogRoutes);
router.use("/api/message", messageRoutes);
router.use("/api/test", testRoutes);

export { router };
