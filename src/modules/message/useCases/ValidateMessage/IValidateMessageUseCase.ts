import libxmljs from "libxmljs2";

export interface IValidateMessageUseCase {
  execute(
    event: string,
    xmlData: string
  ): Promise<{
    codMsg: string;
    message?: string;
    error?: libxmljs.ValidationError[];
  }>;
}
