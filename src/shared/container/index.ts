import { container } from "tsyringe";

import { EventosRepository } from "../../modules/catalogs/repositories/EventosRepository";
import { GrupoServicosRepository } from "../../modules/catalogs/repositories/GrupoServicosRepository";
import { IEventosRepository } from "../../modules/catalogs/repositories/IEventosRepository";
import { IGrupoServicosRepository } from "../../modules/catalogs/repositories/IGrupoServicosRepository";
import { IMensagensRepository } from "../../modules/catalogs/repositories/IMensagensRepository";
import { MensagensRepository } from "../../modules/catalogs/repositories/MensagensRepository";
import { IUploadCatalogUseCase } from "../../modules/catalogs/useCases/CreateCatalog/IUploadCatalogUseCase";
import { UploadCatalogUseCase } from "../../modules/catalogs/useCases/CreateCatalog/UploadCatalogUseCase";
import { IListCatalogEventoByServiceUseCase } from "../../modules/catalogs/useCases/ListCatalog/IListCatalogEventoByServiceUseCase";
import { IListCatalogEventoUseCase } from "../../modules/catalogs/useCases/ListCatalog/IListCatalogEventoUseCase";
import { IListCatalogServicoConvertUseCase } from "../../modules/catalogs/useCases/ListCatalog/IListCatalogServicoConvertUseCase";
import { IListCatalogServicoUseCase } from "../../modules/catalogs/useCases/ListCatalog/IListCatalogServicoUseCase";
import { ListCatalogEventoByServiceUseCase } from "../../modules/catalogs/useCases/ListCatalog/ListCatalogEventoByServiceUseCase";
import { ListCatalogEventoUseCase } from "../../modules/catalogs/useCases/ListCatalog/ListCatalogEventoUseCase";
import { ListCatalogServicoConvertUseCase } from "../../modules/catalogs/useCases/ListCatalog/ListCatalogServicoConvertUseCase";
import { ListCatalogServicoUseCase } from "../../modules/catalogs/useCases/ListCatalog/ListCatalogServicoUseCase";
import { IUpdateSchemaByServiceUseCase } from "../../modules/catalogs/useCases/UpdateSchema/IUpdateSchemaByServiceUseCase";
import { IUpdateSchemaUseCase } from "../../modules/catalogs/useCases/UpdateSchema/IUpdateSchemaUseCase";
import { UpdateSchemaByServiceUseCase } from "../../modules/catalogs/useCases/UpdateSchema/UpdateSchemaByServiceUseCase";
import { UpdateSchemaUseCase } from "../../modules/catalogs/useCases/UpdateSchema/UpdateSchemaUseCase";
import { GetMessageUseCase } from "../../modules/message/useCases/GetMessage/GetMessageUseCase";
import { IGetMessageUseCase } from "../../modules/message/useCases/GetMessage/IGetMessageUseCase";
import { IMensagensReceiveRepository } from "../../modules/messageReceive/repositories/IMensagensReceiveRepository";
import { MensagensReceiveRepository } from "../../modules/messageReceive/repositories/MensagensReceiveRepository";
import { CreateMessageReceiveUseCase } from "../../modules/messageReceive/useCases/CreateMessageReceive/CreateMessageReceiveUseCase";
import { ICreateMessageReceiveUseCase } from "../../modules/messageReceive/useCases/CreateMessageReceive/ICreateMessageReceiveUseCase";
import { IMensagensSendRepository } from "../../modules/messageSend/repositories/IMensagensSendRepository";
import { MensagensSendRepository } from "../../modules/messageSend/repositories/MensagensSendRepository";
import { CreateMessageSendUseCase } from "../../modules/messageSend/useCases/CreateMessageSend/CreateMessageSendUseCase";
import { ICreateMessageSendUseCase } from "../../modules/messageSend/useCases/CreateMessageSend/ICreateMessageSendUseCase";
import { IListMessageSendUseCase } from "../../modules/messageSend/useCases/ListMessageSend/IListMessageSendUseCase";
import { ListMessageSendUseCase } from "../../modules/messageSend/useCases/ListMessageSend/ListMessageSendUseCase";
import { LocalStorageProvider } from "./providers/StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./providers/StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./providers/StorageProvider/IStorageProvider";

container.registerSingleton<IEventosRepository>(
  "EventosRepository",
  EventosRepository
);

container.registerSingleton<IGrupoServicosRepository>(
  "GrupoServicosRepository",
  GrupoServicosRepository
);

container.registerSingleton<IMensagensRepository>(
  "MensagensRepository",
  MensagensRepository
);

container.registerSingleton<IMensagensSendRepository>(
  "MensagensSendRepository",
  MensagensSendRepository
);

container.registerSingleton<IMensagensReceiveRepository>(
  "MensagensReceiveRepository",
  MensagensReceiveRepository
);

container.registerSingleton<IUpdateSchemaUseCase>(
  "UpdateSchemaUseCase",
  UpdateSchemaUseCase
);

container.registerSingleton<IUploadCatalogUseCase>(
  "UploadCatalogUseCase",
  UploadCatalogUseCase
);

container.registerSingleton<IUpdateSchemaByServiceUseCase>(
  "UpdateSchemaByServiceUseCase",
  UpdateSchemaByServiceUseCase
);

container.registerSingleton<IListCatalogServicoUseCase>(
  "ListCatalogServicoUseCase",
  ListCatalogServicoUseCase
);

container.registerSingleton<IListCatalogServicoConvertUseCase>(
  "ListCatalogServicoConvertUseCase",
  ListCatalogServicoConvertUseCase
);

container.registerSingleton<IListCatalogEventoUseCase>(
  "ListCatalogEventoUseCase",
  ListCatalogEventoUseCase
);

container.registerSingleton<IListCatalogEventoByServiceUseCase>(
  "ListCatalogEventoByServiceUseCase",
  ListCatalogEventoByServiceUseCase
);

container.registerSingleton<IGetMessageUseCase>(
  "GetMessageUseCase",
  GetMessageUseCase
);

container.registerSingleton<ICreateMessageReceiveUseCase>(
  "CreateMessageReceiveUseCase",
  CreateMessageReceiveUseCase
);

container.registerSingleton<ICreateMessageSendUseCase>(
  "CreateMessageSendUseCase",
  CreateMessageSendUseCase
);

container.registerSingleton<IListMessageSendUseCase>(
  "ListMessageSendUseCase",
  ListMessageSendUseCase
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.DISK_STORAGE]
);
