import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { LayoutContext } from '@/context/layout';
import { getScoreClass } from '@/helpers';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton, TableFooter } from '@mui/material';

type IpDetail = {
    ip_address: string;
    score: number;
};

const IPTable = () => {
    const { isDarkTheme } = useContext(LayoutContext);
    const [data, setData] = useState<IpDetail[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/get-ips-small-detail-list')
            .then(response => {
                const originalData = response.data;
                const duplicatedData = originalData.concat(originalData, originalData, originalData, originalData, originalData, originalData, originalData, originalData, originalData, originalData);
                setData(duplicatedData);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }, []);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const handleClick = (ip: string) => {
        console.log("IP seleccionada:", ip);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>IP Address</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Detail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage).map((item) => (
                        <TableRow key={item.ip_address}>
                            <TableCell>{item.ip_address}</TableCell>
                            <TableCell className={getScoreClass(item.score)}>{item.score}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleClick(item.ip_address)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5]}
                            count={data.length}
                            rowsPerPage={itemsPerPage}
                            page={currentPage}
                            onPageChange={handleChangePage}    // aquí cambia a onPageChange
                            onRowsPerPageChange={handleChangeRowsPerPage}  // y aquí a onRowsPerPageChange
                        />

                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default IPTable;
