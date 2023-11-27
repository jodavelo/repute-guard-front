// PositiveNegativesTable.tsx
import React, { useEffect, useState, ChangeEvent, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@material-ui/core';
import { LayoutContext } from '@/context/layout';

const lightThemeStyles = {
    backgroundColor: 'white',
    color: 'black',
};

const darkThemeStyles = {
    backgroundColor: '#424242',
    color: 'white',
};

interface PositiveNegativeData {
    ip_address: string;
    description: string;
    fraud_score: number;
    country_name: string;
    ISP: string;
    host: string;
    organization: string;
}

const PositiveNegativesTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState<PositiveNegativeData[]>([]);

    const { isDarkTheme, setIsLogged } = useContext(LayoutContext);

    const themeStyles = isDarkTheme ? darkThemeStyles : lightThemeStyles;

    useEffect(() => {
        fetch(`http://localhost:8000/positive-negatives/?page=${page + 1}&page_size=${rowsPerPage}`)
            .then(response => response.json())
            .then(data => setData(data));
    }, [page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper style={themeStyles}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>IP Address</TableCell>
                            <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>Description</TableCell>
                            <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>Fraud Score</TableCell>
                            <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>Country</TableCell>
                            <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>ISP</TableCell>
                            <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>Host</TableCell>
                            <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>Organization</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.ip_address}>
                                <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>{row.ip_address}</TableCell>
                                <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>{row.description}</TableCell>
                                <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>{row.fraud_score}</TableCell>
                                <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>{row.country_name}</TableCell>
                                <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>{row.ISP}</TableCell>
                                <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>{row.host}</TableCell>
                                <TableCell style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}>{row.organization}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={ isDarkTheme ?  { color: 'white' } : { color: 'black' }}
                component="div"
                count={-1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PositiveNegativesTable;
