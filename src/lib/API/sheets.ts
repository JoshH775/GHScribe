import { utils, writeFile, set_fs, readFile } from "xlsx";
import * as fs from 'fs';
set_fs(fs)

const diaryPath = `static/diary.xlsx`
const diary = readFile(diaryPath)

const sheet = diary.Sheets[diary.SheetNames[0]];

export function getData(): DiaryEntry[] {
    return utils.sheet_to_json(sheet, {defval: ''});
}

export function addRow(args: DiaryEntry): boolean {

    if (checkPrevious(args.Date)) {
        console.log('Row already exists for ' + args.Date);
        return false;
    }
    const origin = utils.encode_cell({c: 0, r: getData().length+1})
    utils.sheet_add_aoa(sheet, [[args.Date, args["Work Carried Out"], args["Knowledge Gained"]]], {origin: origin});
    writeFile(diary, diaryPath);
    console.log('Row added for ' + args.Date);
    return true
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

export function replace(){

}

export function toJson(){
    const json: JSONTemplate = {}
    getData().forEach((entry: DiaryEntry) => {
        const { Date, ...entryWithoutDate } = entry;
        json[Date] = entryWithoutDate;
    });
    return JSON.stringify(json);
}


interface JSONTemplate {
    [key: string]: Omit<DiaryEntry, 'Date'>;
}