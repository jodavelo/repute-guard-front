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

type DetectionTypeData = ChartData<'pie', number[], string>;

interface DetectionTypeItem {
    description: string;
    count: number;
}

const DetectionTypePieChart = () => {
    const [chartData, setChartData] = useState<DetectionTypeData>({
        labels: [],
        datasets: [{ data: [], backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)'] }]
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/attacks_by_detection_type/');
            const data: DetectionTypeItem[] = await response.json();
    
            setChartData({
                labels: data.map((item: DetectionTypeItem) => item.description),
                datasets: [{ ...chartData.datasets[0], data: data.map((item: DetectionTypeItem) => item.count) }]
            });
        };
    
        fetchData();
    }, []);

    const options: ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Attacks by Detection Type',
                font: {
                    size: 18
                }
            }
        }
    };

    return (
        <div style={{ width: '100%', height: '260px' }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default DetectionTypePieChart;
