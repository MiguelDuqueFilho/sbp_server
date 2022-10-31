import { inject, injectable } from "tsyringe";

import { IGrupoServicosRepository } from "../../repositories/IGrupoServicosRepository";
import { IListCatalogServicoUseCase } from "./IListCatalogServicoUseCase";

@injectable()
export class ListCatalogServicoUseCase implements IListCatalogServicoUseCase {
  constructor(
    @inject("GrupoServicosRepository")
    private grupoServicosRepository: IGrupoServicosRepository
  ) {}

  async execute() {
    const resultServicos = await this.grupoServicosRepository.listAll();
    return resultServicos;
  }
}
