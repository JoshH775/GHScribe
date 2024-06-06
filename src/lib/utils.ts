import type { DiaryEntry } from "./databaseController";

export function readJsonFile(file: File): Promise<DiaryEntry[]> {
    const reader = new FileReader();
    return new Promise<DiaryEntry[]>((resolve, reject) => {
        reader.onload = () => {
            if (reader.result !== null) {
                resolve(JSON.parse(reader.result as string));
            } else {
                reject(new Error('Failed to read file.'));
            }
        };
        reader.onerror = reject;
        reader.readAsText(file);
    });
}