import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, Area, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

const Chart = ({ type, data, dataKey, nameKey, title, secondaryDataKey, showArea }) => {
  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-800/95 backdrop-blur-sm p-3 shadow-2xl">
          <p className="text-xs font-medium text-slate-400 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-300">{entry.name}:</span>
              <span className="font-semibold text-white">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#334155" opacity={0.3} vertical={false} />
            <XAxis 
              dataKey={nameKey} 
              tick={{ fontSize: 12 }} 
              stroke="#94a3b8"
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              stroke="#94a3b8"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        );

      case 'line':
        return (
          <ComposedChart 
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="4 4" 
              stroke="#334155" 
              horizontal={true}
              vertical={false}
            />
            
            <XAxis
              dataKey={nameKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              dy={5}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {showArea && (
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="transparent"
                fill="url(#areaGradient)"
                strokeWidth={0}
                dot={false}
              />
            )}
            
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#3b82f6"
              strokeWidth={2}
              name="Actual"
              dot={{
                fill: '#0f172a',
                strokeWidth: 2,
                r: 6,
                stroke: '#3b82f6',
              }}
            />
            
            {secondaryDataKey && (
              <Line
                type="monotone"
                dataKey={secondaryDataKey}
                stroke="#ec4899"
                strokeWidth={2}
                strokeDasharray="4 4"
                name="Target"
                dot={{
                  fill: '#0f172a',
                  strokeWidth: 2,
                  r: 6,
                  stroke: '#ec4899',
                }}
              />
            )}
          </ComposedChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl">
      <h3 className="text-base font-semibold text-white px-6 py-4 border-b border-slate-700/50">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        {renderChart()}
      </ResponsiveContainer>
      {type === 'line' && secondaryDataKey && (
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
            <span className="text-slate-300">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 rounded-full" style={{ borderColor: '#ec4899' }} />
            <span className="text-slate-300">Target</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;