import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const data = [
  { name: 'Mon', engagement: 400, views: 2400 },
  { name: 'Tue', engagement: 300, views: 1398 },
  { name: 'Wed', engagement: 200, views: 9800 },
  { name: 'Thu', engagement: 278, views: 3908 },
  { name: 'Fri', engagement: 189, views: 4800 },
  { name: 'Sat', engagement: 239, views: 3800 },
  { name: 'Sun', engagement: 349, views: 4300 },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Performance Analytics</h2>
        <p className="text-gray-500 mt-1">Track how your student voice is reaching the campus.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Weekly Engagement</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="engagement" fill="#fb7185" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Total Reach (Views)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="views" stroke="#e11d48" strokeWidth={3} dot={{r: 4, fill: '#e11d48'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Top Performing Posts - Static Mock */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top Performing Content</h3>
          <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">"5 ways to survive finals week..."</span>
                  <span className="text-green-600 font-bold">+12.5k views</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium text-gray-700">"Campus food hacks you didn't know"</span>
                  <span className="text-green-600 font-bold">+8.2k views</span>
              </div>
          </div>
      </div>
    </div>
  );
};