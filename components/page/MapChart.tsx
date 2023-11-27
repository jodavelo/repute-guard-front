import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const MapChart = () => {
    const [attacksData, setAttacksData] = useState<Record<string, number>>({});
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/attacks_by_country/');
            const data = await response.json();

            const newAttacksData: Record<string, number> = {};
            data.forEach((item: { country_code: string; count: number }) => {
                newAttacksData[item.country_code] = item.count;
            });

            setAttacksData(newAttacksData);
        };

        fetchData();
    }, []);

    const colorScale = scaleLinear<string>()
        .domain([0, Math.max(...Object.values(attacksData))])
        .range(["#ffedea", "#ff5233"]);

    return (
        <>
            <ComposableMap projectionConfig={{ scale: 200 }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            const countryCode = geo.properties.ISO_A2;
                            const attackCount = attacksData[countryCode];
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill={attackCount ? colorScale(attackCount) : "#DDD"}
                                    onMouseEnter={(evt) => {
                                        const { NAME } = geo.properties;
                                        setTooltipContent(`${NAME}: ${attackCount || 0} attacks`);
                                        setTooltipPosition({ x: evt.clientX, y: evt.clientY });
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent('');
                                    }}
                                    style={{
                                        default: { outline: "none" },
                                        hover: { outline: "none" },
                                        pressed: { outline: "none" },
                                    }}
                                />
                            );
                        })
                    }
                </Geographies>
            </ComposableMap>
            <div
                className="tooltip"
                style={{
                    position: 'absolute',
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                    border: '1px solid black',
                    backgroundColor: 'white',
                    padding: '5px',
                    display: tooltipContent ? 'block' : 'none',
                    zIndex: 1000,
                    pointerEvents: 'none',
                }}
            >
                {tooltipContent}
            </div>
        </>
    );
};

export default MapChart;
