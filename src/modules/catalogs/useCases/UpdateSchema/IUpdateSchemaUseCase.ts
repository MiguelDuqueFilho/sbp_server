export interface IUpdateSchemaUseCase {
  execute(event: string): Promise<any>;
}
