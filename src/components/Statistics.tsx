import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Statistics() {
  // Sales data for the last 7 days (in EGP)
  const salesData = [
    { date: 'Sep 30', sales: 42000, profit: 12600 },
    { date: 'Oct 1', sales: 38000, profit: 11400 },
    { date: 'Oct 2', sales: 51000, profit: 15300 },
    { date: 'Oct 3', sales: 46000, profit: 13800 },
    { date: 'Oct 4', sales: 58000, profit: 17400 },
    { date: 'Oct 5', sales: 62000, profit: 18600 },
    { date: 'Oct 6', sales: 54000, profit: 16200 },
  ];

  // Top selling colors
  const colorData = [
    { name: 'Blue', value: 450, color: '#3B82F6' },
    { name: 'Black', value: 380, color: '#1F2937' },
    { name: 'White', value: 320, color: '#E5E7EB' },
    { name: 'Red', value: 280, color: '#EF4444' },
    { name: 'Green', value: 190, color: '#10B981' },
  ];

  // Top selling sizes
  const sizeData = [
    { size: 'XS', sold: 45 },
    { size: 'S', sold: 120 },
    { size: 'M', sold: 280 },
    { size: 'L', sold: 210 },
    { size: 'XL', sold: 95 },
    { size: 'XXL', sold: 50 },
  ];

  // Monthly revenue (in EGP)
  const monthlyData = [
    { month: 'Apr', revenue: 450000 },
    { month: 'May', revenue: 520000 },
    { month: 'Jun', revenue: 480000 },
    { month: 'Jul', revenue: 610000 },
    { month: 'Aug', revenue: 580000 },
    { month: 'Sep', revenue: 640000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Statistics</h1>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Select Date Range
        </Button>
      </div>

      {/* Sales Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Sales & Profit (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `${value.toLocaleString()} EGP`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#007BFF"
                strokeWidth={2}
                name="Sales (EGP)"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#FF6F61"
                strokeWidth={2}
                name="Profit (EGP)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={colorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {colorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Selling Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Sizes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sizeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="size" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sold" fill="#007BFF" name="Units Sold" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => `${value.toLocaleString()} EGP`}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#FF6F61" name="Revenue (EGP)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
