import { Router } from "express";

import { LoadCatalogController } from "../modules/catalogs/useCases/CreateCatalog/LoadCatalogController";
import { ListCatalogEventoByServiceController } from "../modules/catalogs/useCases/ListCatalog/ListCatalogEventoByServiceController";
import { ListCatalogEventoController } from "../modules/catalogs/useCases/ListCatalog/ListCatalogEventoController";
import { ListCatalogServicoController } from "../modules/catalogs/useCases/ListCatalog/ListCatalogServicoController";
import { ListCatalogServicoConvertController } from "../modules/catalogs/useCases/ListCatalog/ListCatalogServicoConvertController";
import { UpdateSchemaByServiceController } from "../modules/catalogs/useCases/UpdateSchema/UpdateSchemaByServiceController";
import { UpdateSchemaController } from "../modules/catalogs/useCases/UpdateSchema/UpdateSchemaController";

const catalogRoutes = Router();

const loadCatalogController = new LoadCatalogController();
const listCatalogServicoController = new ListCatalogServicoController();
const listCatalogServicoConvertController =
  new ListCatalogServicoConvertController();
const listCatalogEventoController = new ListCatalogEventoController();
const listCatalogEventoByServiceController =
  new ListCatalogEventoByServiceController();
const updateSchemaByServiceController = new UpdateSchemaByServiceController();
const updateSchemaController = new UpdateSchemaController();

/**
 * * path url = '/catalog
 */
catalogRoutes.post("/load", loadCatalogController.handle);
catalogRoutes.get("/service/list", listCatalogServicoController.handle);
catalogRoutes.get(
  "/service/listconv",
  listCatalogServicoConvertController.handle
);
catalogRoutes.get("/event/list/:event", listCatalogEventoController.handle);
catalogRoutes.get(
  "/event/listByService/:service",
  listCatalogEventoByServiceController.handle
);
catalogRoutes.get("/schema/update/:event", updateSchemaController.handle);
catalogRoutes.get(
  "/schema/updateAll/:service",
  updateSchemaByServiceController.handle
);

export { catalogRoutes };
