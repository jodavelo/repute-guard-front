import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend,
    ChartData,
    ChartOptions
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

type DetectionChartData = ChartData<'pie', number[], string>;

const initialState: DetectionChartData = {
    labels: ['True Positives', 'False Positives'],
    datasets: [{ data: [], backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'] }]
};

const DetectionPieChart = () => {
    const [chartData, setChartData] = useState<DetectionChartData>(initialState);

    useEffect(() => {
        const fetchData = async () => {
            const resTruePositives = await fetch('http://localhost:8000/true_positives_count/');
            const truePositives = await resTruePositives.json();

            const resFalsePositives = await fetch('http://localhost:8000/false_positives_count/');
            const falsePositives = await resFalsePositives.json();

            setChartData({
                ...initialState,
                datasets: [{ ...initialState.datasets[0], data: [truePositives.count, falsePositives.count] }]
            });
        };

        fetchData();
    }, []);

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const, // Posición de la leyenda en el lado izquierdo
            },
            title: {
                display: true,
                text: 'Detection Pie Chart',
                font: {
                    size: 18  
                }
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '260px' }}>
            {/* <h5>Detection</h5> */}
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default DetectionPieChart;
