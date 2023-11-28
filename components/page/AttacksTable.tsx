import React, { useEffect, useState, ChangeEvent, useContext } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@material-ui/core';
import { LayoutContext } from '@/context/layout';
import { TableSortLabel } from '@mui/material';

interface AttackData {
    ip_address: string;
    description: string;
    fraud_score: number;
    country_name: string;
    ISP: string;
    host: string;
    detected_at: string;
}

const lightThemeStyles = {
    backgroundColor: 'white',
    color: 'black',
};

const darkThemeStyles = {
    backgroundColor: '#424242',
    color: 'white',
};

const AttacksTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState<AttackData[]>([]);

    const { isDarkTheme, setIsLogged } = useContext(LayoutContext);

    const themeStyles = isDarkTheme ? darkThemeStyles : lightThemeStyles;

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        // Aquí necesitarás implementar la lógica para ordenar tus datos
    };


    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const [orderBy, setOrderBy] = useState('detected_at');
    function getComparator(order: any, orderBy: any) {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a: any, b: any, orderBy: any) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        fetch(`http://localhost:8000/attacks/?page=${page + 1}&page_size=${rowsPerPage}`)
          .then(response => response.json())
          .then(data => {
            const comparator = getComparator(order, orderBy);
            const sortedData = data.sort(comparator);
            setData(sortedData);
          });
      }, [page, rowsPerPage, order, orderBy]);
      


    return (
        <Paper style={themeStyles}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>IP Address</TableCell>
                            <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>Description</TableCell>
                            <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>Fraud Score</TableCell>
                            <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>Country</TableCell>
                            <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>ISP</TableCell>
                            <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>Host</TableCell>
                            <TableCell sortDirection={orderBy === 'detected_at' ? order : false} style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>
                                <TableSortLabel
                                    style={isDarkTheme ? { color: 'white' } : { color: 'black' }}
                                    active={orderBy === 'detected_at'}
                                    direction={orderBy === 'detected_at' ? order : 'asc'}
                                    onClick={() => handleRequestSort('detected_at')}
                                >
                                    Detected At
                                </TableSortLabel>
                            </TableCell>
                            <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.ip_address}>
                                <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>{row.ip_address}</TableCell>
                                <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>{row.description}</TableCell>
                                <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>{row.fraud_score}</TableCell>
                                <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>{row.country_name}</TableCell>
                                <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>{row.ISP}</TableCell>
                                <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>{row.host}</TableCell>
                                <TableCell style={isDarkTheme ? { color: 'white' } : { color: 'black' }}>{row.detected_at}</TableCell>
                                <TableCell style={{ color: 'red', fontWeight: 'bold' }}>Blocked</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                style={isDarkTheme ? { color: 'white' } : { color: 'black' }}
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

export default AttacksTable;
