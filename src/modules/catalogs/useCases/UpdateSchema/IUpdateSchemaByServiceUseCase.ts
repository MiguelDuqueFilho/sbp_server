export interface IUpdateSchemaByServiceUseCase {
  execute(service: string): Promise<{
    count: number;
  }>;
}
