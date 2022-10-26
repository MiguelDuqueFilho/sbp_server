import {
  PDFExtract,
  PDFExtractOptions,
  PDFExtractResult,
} from "pdf.js-extract";

interface ILoadDictionary {
  filename: string;
  tableTitle: string;
  tableHeader: string;
  firstPage?: number;
  lastPage?: number;
}

const pdfExtract = new PDFExtract();

export class TextTablePdf {
  async execute({
    filename,
    tableTitle,
    tableHeader,
    firstPage,
    lastPage,
  }: ILoadDictionary) {
    const options: PDFExtractOptions = {
      firstPage,
      lastPage,
      disableCombineTextItems: true,
      // normalizeWhitespace: true,
    };

    const data: PDFExtractResult = await pdfExtract.extract(filename, options);

    return data;
  }
}
