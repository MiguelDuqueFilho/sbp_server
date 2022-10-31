import { inject, injectable } from "tsyringe";

import { IGrupoServicosRepository } from "../../repositories/IGrupoServicosRepository";
import { IListCatalogServicoConvertUseCase } from "./IListCatalogServicoConvertUseCase";

@injectable()
export class ListCatalogServicoConvertUseCase
  implements IListCatalogServicoConvertUseCase
{
  constructor(
    @inject("GrupoServicosRepository")
    private grupoServicosRepository: IGrupoServicosRepository
  ) {}

  async execute() {
    const resultServicos =
      await this.grupoServicosRepository.listAllConverted();
    return resultServicos;
  }
}
