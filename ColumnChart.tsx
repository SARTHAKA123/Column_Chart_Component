import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface MyChartComponentProps {
    data: { name: string; Score: number }[];
    customHeight: number;
    customWidth: number;
    customColor: string;
}

const MyChartComponent: React.FC<MyChartComponentProps> = ({ data, customHeight, customWidth, customColor }) => {

    return (
        <div className="chart-container">
            <style>{`
            .recharts-tooltip-cursor {
                display: none;
            }

            .recharts-bar-rectangles:hover {
                fill: #82ca9d !important;
            }
        `}</style>
            <BarChart width={customWidth} height={customHeight} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 100}} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={25} textAnchor="start" interval={0} tick={{ fontSize: 13 }} />
                <YAxis />
                <Tooltip />
                
                <Bar dataKey="Score" fill={customColor} barSize={50} />
            </BarChart>
        </div>
    );
};

export default MyChartComponent;