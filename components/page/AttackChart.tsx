import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface AttackSummaryItem {
    description: string;
    count: number;
  }

const AttackChart = () => {
    const [chartData, setChartData] = useState<ChartData<'bar', number[], string>>({
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: ''
          }
        ]
    });

    const options = {
        responsive: true,
        maintainAspectRatio: false, 
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/attack_summary/');
            const data: AttackSummaryItem[] = await response.json();
            
            const attackTypes = data.map(item => item.description);
            const attackCounts = data.map(item => item.count);

            setChartData({
                labels: attackTypes,
                datasets: [{
                    label: 'Number of Attacks',
                    data: attackCounts,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }]
            });
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default AttackChart;
