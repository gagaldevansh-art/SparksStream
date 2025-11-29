
import React from 'react';
import { Users, DollarSign, AlertTriangle, CheckCircle, BarChart3, Shield } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
             <Shield className="text-indigo-600" />
             <span>Admin Dashboard</span>
           </h2>
           <p className="text-gray-500 mt-1">Platform overview and management.</p>
        </div>
        <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-mono text-sm border border-indigo-100">
           v2.0.1 (Stable)
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-blue-100 rounded-lg text-blue-600"><Users size={20} /></div>
             <span className="text-green-500 text-sm font-bold">+12%</span>
          </div>
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">1,248</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-green-100 rounded-lg text-green-600"><DollarSign size={20} /></div>
             <span className="text-green-500 text-sm font-bold">+24%</span>
          </div>
          <p className="text-gray-500 text-sm">Revenue (Collabs)</p>
          <p className="text-2xl font-bold text-gray-900">$4,320</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-amber-100 rounded-lg text-amber-600"><AlertTriangle size={20} /></div>
             <span className="text-red-500 text-sm font-bold">+5</span>
          </div>
          <p className="text-gray-500 text-sm">Reports Pending</p>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-purple-100 rounded-lg text-purple-600"><BarChart3 size={20} /></div>
             <span className="text-green-500 text-sm font-bold">98%</span>
          </div>
          <p className="text-gray-500 text-sm">System Uptime</p>
          <p className="text-2xl font-bold text-gray-900">30d</p>
        </div>
      </div>

      {/* Content Moderation Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900">Recent Transactions</h3>
              <button className="text-sm text-indigo-600 font-semibold hover:underline">View All</button>
           </div>
           <div className="divide-y divide-gray-100">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">U{i}</div>
                      <div>
                         <p className="text-sm font-bold text-gray-900">Premium Collab Unlock</p>
                         <p className="text-xs text-gray-500">2 mins ago</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-bold text-green-600">+$150.00</p>
                      <p className="text-xs text-gray-400">Success</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-900">Flagged Content</h3>
              <button className="text-sm text-indigo-600 font-semibold hover:underline">Moderation Queue</button>
           </div>
           <div className="divide-y divide-gray-100">
              {[1, 2].map((i) => (
                <div key={i} className="p-4 flex items-start gap-4 hover:bg-gray-50">
                   <div className="mt-1"><AlertTriangle size={16} className="text-red-500" /></div>
                   <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">"How to hack university grades..."</p>
                      <p className="text-xs text-red-500 mt-1">Reason: Academic Dishonesty</p>
                      <div className="flex gap-2 mt-2">
                         <button className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-md font-bold">Remove</button>
                         <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-md">Ignore</button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
