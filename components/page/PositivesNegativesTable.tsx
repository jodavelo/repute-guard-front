import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { LayoutContext } from '@/context/layout';
import { getScoreClass } from '@/helpers';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TablePagination, 
    Paper, 
    IconButton, 
    TableFooter 
} from '@mui/material';

type IpDetail = {
    ip_address: string;
    description: string;
};

const PositivesNegativesTable = () => {
    const { isDarkTheme } = useContext(LayoutContext);
    const [data, setData] = useState<IpDetail[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetch('http://localhost:8000/positives-negatives')
            .then(response => response.json())
            .then(data => setData(data.data))
            .catch(error => console.error('Error:', error));
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
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>IP Address</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage).map((row) => (
                            <TableRow key={row.ip_address}>
                                <TableCell>{row.ip_address}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                {/* <TableCell>
                                    <IconButton onClick={() => handleClick(row.ip_address)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </IconButton>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={data.length}
                                rowsPerPage={itemsPerPage}
                                page={currentPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default PositivesNegativesTable;
