import * as xlsx from 'xlsx';
import * as path from 'path';

export function readExcelFile(filePath: string): [any, string][] {
    const absolutePath = path.resolve(__dirname, filePath);
    const workbook = xlsx.readFile(absolutePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    return data.slice(1) as [any, string][];
}
