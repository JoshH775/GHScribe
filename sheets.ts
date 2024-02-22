import { readFile, utils, writeFile } from "xlsx";

const diary = readFile('./diary.xlsx');

const sheet = diary.Sheets[diary.SheetNames[0]];

export function getData(): DiaryEntry[] {
    return utils.sheet_to_json(sheet, {defval: ''});
}

export function addRow(args: DiaryEntry) {

    if (checkPrevious(args.Date)) {
        console.log('Row already exists for ' + args.Date);
        return;
    }
    const origin = utils.encode_cell({c: 0, r: getData().length+1})
    utils.sheet_add_aoa(sheet, [[args.Date, args["Work Carried Out"], args["Knowledge Gained"]]], {origin: origin});
    writeFile(diary, './diary.xlsx');
    console.log('Row added for ' + args.Date);
}

export interface DiaryEntry {
    Date: string;
    'Work Carried Out': string;
    'Knowledge Gained': string;
    Competencies: string;
}

function checkPrevious(date: string): boolean {
    const data = getData();
    return data.some(entry => entry.Date === date);
}