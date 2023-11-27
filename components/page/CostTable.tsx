import React, { useContext, useEffect, useState } from 'react';
import styles from './CostTable.module.css';
import { LayoutContext } from '@/context/layout';

const CostTable = () => {
    const { isDarkTheme } = useContext(LayoutContext);
    const [indicatorsOfCompromiseDB, setIndicatorsOfCompromiseDB] = useState(0);
    const [ipReputationDB, setIpReputationDB] = useState(0);
    const [indicatorsOfCompromiseTotal, setIndicatorsOfCompromiseTotal] = useState(0);
    const [ipReputationTotal, setIpReputationTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const apiCost = 500000;
            const response = await fetch('http://localhost:8000/attacks_by_detection_type');
            const data = await response.json();
            setIndicatorsOfCompromiseDB(data[0].count)
            setIpReputationDB(data[1].count)
            setIndicatorsOfCompromiseTotal( apiCost - ( data[0].count * 0.002 ) )
            setIpReputationTotal( data[1].count * 0.002 )
        };

        fetchData();
    }, []);

    return (
        <table className={`${styles.costTable} ${isDarkTheme ? styles.dark : styles.light}`}>
            <thead>
                <tr>
                    <th colSpan={3}>Cost of 1 attack based on IP reputation:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td># Request: 1000</td>
                    <td>Total cost API: 500000</td>
                    <td>1 Value: 0.002</td>
                </tr>
                <tr style={ isDarkTheme ?  { background: '#333', color: '#fff', fontWeight: 'bolder' } : { background: '#f2f2f2', color: '#000', fontWeight: 'bolder' }}>
                    <td>Number of Detections</td>
                    <td>Type of detection</td>
                    <td>Total</td>
                </tr>
                <tr>
                    <td>{ indicatorsOfCompromiseDB }</td>
                    <td>Value saved BD IOC</td>
                    <td># EVENTS * VALUE : <span style={ isDarkTheme ? { color: '#fff', fontWeight: 'bolder' } : { color: '#000', fontWeight: 'bolder' } }>{ indicatorsOfCompromiseTotal } USD </span></td>
                </tr>
                <tr>
                    <td>{ ipReputationDB }</td>
                    <td>Value IP reputation</td>
                    <td># EVENTS * VALUE: <span style={ isDarkTheme ? { color: '#fff', fontWeight: 'bolder' } : { color: '#000', fontWeight: 'bolder' } }>{ ipReputationTotal } USD </span></td>
                </tr>
            </tbody>
        </table>
    );
};

export default CostTable;
