import React, { useEffect, useMemo, useState } from "react";
import { useMaterialReactTable, type MRT_ColumnDef, MaterialReactTable } from "material-react-table";


export interface DiaryEntry {
    Date: string;
    'Work Carried Out': string;
    'Knowledge Gained': string;
    Competencies: string;
}

export default function Table() {

    const [data, setData] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        const fetchData = async () => {

            console.log('env',process.env.ENVIRONMENT);

            const url = process.env.ENVIRONMENT === 'dev' ? '/api/diary' : 'http://localhost:5000/api/diary'

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
        
            });
            const data = await response.json();
            
          

            console.log('entries', data);

            setData(data);
        }

        fetchData();
    }, []);

    const columns = useMemo<MRT_ColumnDef<DiaryEntry>[]>(() => [
        {
            accessorKey: 'Date',
            header: 'Date'
        },
        {
            accessorKey: 'Work Carried Out',
            header: 'Work Carried Out'
        },
        {
            accessorKey: 'Knowledge Gained',
            header: 'Knowledge Gained'
        },
        {
            accessorKey: 'Competencies',
            header: 'Competencies'
        }
    ],[])

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnResizing: true,
    })

    return <MaterialReactTable table={table} />




}