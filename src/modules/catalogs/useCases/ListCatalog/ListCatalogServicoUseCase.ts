import { GrupoServicosRepository } from "../../repositories/GrupoServicosRepository";

export class ListCatalogServicoUseCase {
  async execute() {
    const grupoServico = new GrupoServicosRepository();
    const resultServicos = await grupoServico.listAll();
    return resultServicos;
  }
}
