import { GrupoServicosRepository } from "../../repositories/GrupoServicosRepository";

export class ListCatalogServicoConvertUseCase {
  async execute() {
    const grupoServico = new GrupoServicosRepository();
    const resultServicos = await grupoServico.listAllConverted();
    return resultServicos;
  }
}
