import React, {useState} from 'react';
import axios from 'axios';
import {Flex} from '@chakra-ui/core';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {Link} from 'react-router-dom';

/* import "ag-grid-community/dist/styles/ag-grid.css";
 * import "ag-grid-community/dist/styles/ag-theme-alpine.css";
 *  */

/* import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; */

export function LinkMethod() {
    return <Link to="/link">fred@bloggs.com</Link>;
}

export function MyGraph() {
    const response = [
        {
            name: 'Fred',
            value: '1234'.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            address: 'My Address',
            email: 'fred@bloggs.com',
        },
    ];
    const [rowData, setRowData] = useState();
    const data = getData(setRowData);
    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }
    console.log('data = ', rowData);
    console.log('data2 = ', JSON.stringify(data.da));
    return (
        <Flex role="navigation" flex="0 0 auto" height="100%" position="sticky">
            <AgGridReact
                onGridReady={onGridReady}
                rowData={response}
                suppressColumnVirtualisation={process.env.NODE_ENV === 'test'}
            >
                <AgGridColumn field="name" />
                <AgGridColumn field="value" />
                <AgGridColumn field="address" />
                <AgGridColumn setRowData />
            </AgGridReact>
            <Link to="/">test</Link>
        </Flex>
    );
}

async function getData(setRowData) {
    console.log('get data');
    return await axios.get('/greeting').then((res) => {
        console.log('res = ', res);
        console.log('res = ', res.data);
        setRowData(res.data);
    });
}
