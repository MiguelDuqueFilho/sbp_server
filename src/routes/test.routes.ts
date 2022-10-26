import { Router } from "express";

import { sampleLogger } from "../lib/logger";

const testRoutes = Router();
/**
 * * Sample log event in console
 */

testRoutes.get("/logger", sampleLogger);

export { testRoutes };

// import { CreateClientController } from './ControllersNotImplemented/CreateClientController';
// import { AuthenticateUserController } from './ControllersNotImplemented/AuthenticateUserController';
// import { LoadDictionaryController } from './ControllersNotImplemented/LoadDictionaryController';

// import { ConvertXsdController } from "../Controllers/ConvertXsdController";
// import { MessageController } from "../Controllers/MessageController";
// import { XslTestController } from "../Controllers/XslTestController";

// const createClientController = new CreateClientController();
// const authenticateUserController = new AuthenticateUserController();
// const loadDicionaryController = new LoadDictionaryController();

// routes.post('/client', createClientController.handle);
// routes.post('/authenticate', authenticateUserController.handle);
// routes.get('/dictionary', loadDicionaryController.handle);
