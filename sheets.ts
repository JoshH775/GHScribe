import { readFile, utils } from "xlsx";

const diary = readFile('./diary.xlsx');

const sheetName = diary.SheetNames[0];

const sheet = diary.Sheets[sheetName];
utils.sheet_add_aoa(sheet, [['2002-01-01', 'Hello', 'World']], {origin: 'A1'});

