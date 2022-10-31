import { Router } from "express";

import { sampleLogger } from "../lib/logger";

const testRoutes = Router();
/**
 * * Sample log event in console
 */

testRoutes.get("/logger", sampleLogger);

export { testRoutes };
