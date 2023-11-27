import React, { useEffect, useState } from 'react';
import styles from './SoarBlocksCard.module.css'; // Asume que tienes un archivo CSS para estilos

const SoarBlocksCard = () => {
    const [soarBlocksCount, setSoarBlocksCount] = useState(0);

    useEffect(() => {
        const fetchSoarBlocksCount = async () => {
            const response = await fetch('http://localhost:8000/soar_blocks_count/');
            const data = await response.json();
            setSoarBlocksCount(data.count);
        };

        fetchSoarBlocksCount();
    }, []);

    return (
        <div className={styles.card}>
            <h2>SOAR Blocks</h2>
            <p className={styles.count}>{soarBlocksCount}</p>
        </div>
    );
};

export default SoarBlocksCard;
