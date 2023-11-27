import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend,
    ChartData,
    ChartOptions
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


interface AttackData {
    x: string;  // Fecha del ataque
    y: number;  // Cantidad de ataques
}

interface AttackDataset {
    label: string;
    data: AttackData[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
}

const AttacksLineChart = () => {
    const [chartData, setChartData] = useState<ChartData<'line'>>({
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/attacks_by_day/');
            const rawData = await response.json();

            // Organizar los datos para Chart.js
            const dataMap = rawData.reduce((acc: any, item: any) => {
                const { description, attack_day, count } = item;
                if (!acc[description]) {
                    acc[description] = [];
                }
                acc[description].push({ x: attack_day, y: count });
                return acc;
            }, {});

            const datasets = Object.keys(dataMap).map((description, index) => {
                const colors = ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)']; // Puedes expandir esta lista
                return {
                    label: description,
                    data: dataMap[description],
                    fill: false,
                    backgroundColor: colors[index % colors.length],
                    borderColor: colors[index % colors.length]
                };
            });

            setChartData({
                datasets: datasets
            });
        };

        fetchData();
    }, []);

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                position: 'bottom' as const
            },
            title: {
                display: true,
                text: 'Attacks history by type',
                font: {
                    size: 18
                }
            }
        }
    };

    return (
        <div style={{ width: '85%', height: '200px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default AttacksLineChart;
