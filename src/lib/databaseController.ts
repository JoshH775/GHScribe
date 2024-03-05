import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from '$env/static/private'

const url = 'https://qodlbtsmlinjycldnfuw.supabase.co'
export const supabase = createClient(url, SUPABASE_KEY)

export const getData = async (): Promise<DiaryEntry[]> => {
    const { data, error } = await supabase
        .from('log')
        .select('*')

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}
export const checkPrevious = async (date: string) => {
    const data = await getData()
    if (!data) return false
    return data.some((entry: DiaryEntry) => entry.date === date)

}

// 0 - Success (new entry)
// 1 - Success (replaced entry)
// 2 - Entry already exists
// 3 - Nothing to add
// 4 - Error

export const addRow = async (row: DiaryEntry, replace = false): Promise<number> => {
    const previousExists = await checkPrevious(row.date);
  
    if (previousExists && !replace) {
      return 2; // Entry already exists
    }
  
    if (!previousExists && Object.values(row).every(val => !val)) {
      return 3; // Nothing to add
    }
  
    const { error } = await supabase
      .from('log')
      .upsert([row], { onConflict: replace ? 'date' : undefined });
  
    if (error) {
      console.error(error);
      return 4; // Error
    }
  
    return previousExists ? 1 : 0; 
  }

export const deleteRow = async (date: string) => {
    const { error } = await supabase
        .from('log')
        .delete()
        .eq('date', date)
    if (error) {
        console.error(error);
    }

}

export const updateRow = async (row: DiaryEntry) => {
    const { error } = await supabase
        .from('log')
        .update(row)
        .eq('date', row.date)
    if (error) {
        console.error(error);
    }

}

export interface DiaryEntry {
    date: string;
    workcarriedout: string;
    knowledgegained: string;
    competencies: string;
}