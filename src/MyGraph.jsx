import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex } from '@chakra-ui/core';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Link } from 'react-router-dom';

export function LinkMethod() {
    return <Link to="/">fred@bloggs.com</Link>;
}

export function MyGraph({ getFunc = getData }) {
    const [data, setData] = useState(null);

    const axiosResponse = getFunc();
    useEffect(() => {
        setData(axiosResponse.data);
    });

    return (
        <Flex role="navigation" flex="0 0 auto" height="100%" position="sticky">
            <AgGridReact
                rowData={data}
                suppressColumnVirtualisation={process.env.NODE_ENV === 'test'}
            >
                <AgGridColumn field="name" />
                <AgGridColumn field="value" />
                <AgGridColumn field="address" />
                <AgGridColumn
                    field="email"
                    cellRendererFramework={LinkMethod}
                />
                <AgGridColumn setRowData />
            </AgGridReact>
            <Link to="/">test</Link>
        </Flex>
    );
}

export async function getData() {
    return await axios.get('http://127.0.0.1/greeting');
}
