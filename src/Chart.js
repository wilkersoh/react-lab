import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Box from "@material-ui/core/Box";

//recharts.org/en-US/guide/customize

const data = [
  { name: "Page A", uv: 400, value2: 150 },
  { name: "Page B", uv: 200, value2: 0 },
  { name: "Page C", uv: 300, value2: 240 },
  { name: "Page D", uv: 500, value2: 100 },
  { name: "Page E", uv: 500, value2: 220 },
  { name: "Page F", uv: 200, value2: 100 },
];

export default function Chart() {
  return (
    <Box>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type='monotone' dataKey='uv' stroke='#8884d8' />
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
      </LineChart>

      <Box bgcolor=''>
        <ResponsiveContainer width={"100%"} height={400}>
          <AreaChart data={data}>
            {/* Add custom svg attribute */}
            <defs>
              <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#2451B7' stopOpacity='0.4'></stop>
                <stop
                  offset='75%'
                  stopColor='#2451B7'
                  stopOpacity='0.05'></stop>
              </linearGradient>
              <linearGradient id='colorvalue2' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#ad3187' stopOpacity='0.4'></stop>
                <stop
                  offset='75%'
                  stopColor='#ad3187'
                  stopOpacity='0.05'></stop>
              </linearGradient>
            </defs>
            {/* fill url #color from linearGradient */}
            <Area dataKey='uv' stroke='#2451B7' fill='url(#color)' />
            <Area dataKey='value2' stroke='#ad3187' fill='url(#colorvalue2)' />

            <XAxis dataKey='name' axisLine={false} tickLine={false} />
            {/* axisLine: false, remove side line, tickLine */}
            <YAxis
              dataKey='uv'
              axisLine={false}
              tickLine={false}
              tickCount={6}
              tickFormatter={(number) => `$${number}`}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* vertical false, hide the vertical line */}
            <CartesianGrid opacity='0.3' vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className='tooltip'>
        <h4>{label}</h4>
        <p>${payload[0].value}</p>
        <p>${payload[1].value}</p>
      </div>
    );
  }
  return null;
};
