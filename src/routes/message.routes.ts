import { Router } from "express";
import xmlparser from "express-xml-bodyparser";

import { GetMessageController } from "../modules/message/useCases/GetMessage/GetMessageController";
import { ValidateMessageController } from "../modules/message/useCases/ValidateMessage/ValidateMessageController";
import { CreateMessageSendController } from "../modules/messageSend/useCases/CreateMessageSend/CreateMessageSendController";
import { ListMessageSendController } from "../modules/messageSend/useCases/ListMessageSend/ListMessageSendController";

const messageRoutes = Router();

const getMessageController = new GetMessageController();
const validateMessageController = new ValidateMessageController();
const createMessageSendController = new CreateMessageSendController();
const listMessageSendController = new ListMessageSendController();

messageRoutes.get("/:event", getMessageController.handle);

messageRoutes.post(
  "/validate/:event",
  xmlparser({ normalizeTags: false }),
  validateMessageController.handle
);

messageRoutes.post(
  "/send/:codMsg",
  xmlparser({ normalizeTags: false }),
  createMessageSendController.handle
);

messageRoutes.get("/list/send", listMessageSendController.handle);

export { messageRoutes };
