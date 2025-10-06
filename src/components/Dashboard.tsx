import { DollarSign, FileText, TrendingUp, Package, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const miniChartData = [
    { value: 400 },
    { value: 300 },
    { value: 500 },
    { value: 450 },
    { value: 600 },
    { value: 520 },
    { value: 650 },
  ];

  const stats = [
    {
      title: 'Total Sales Today',
      value: '12,450 EGP',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Number of Invoices',
      value: '47',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: '+8.2%',
      trendUp: true,
    },
    {
      title: 'Profit',
      value: '3,280 EGP',
      icon: TrendingUp,
      color: 'text-[#FF6F61]',
      bgColor: 'bg-red-100',
      trend: '+15.3%',
      trendUp: true,
    },
    {
      title: 'Products in Stock',
      value: '1,234',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: '-2.1%',
      trendUp: false,
    },
  ];

  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trendUp ? ArrowUp : ArrowDown;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl" style={{ fontFamily: 'Roboto', fontWeight: 500 }}>
                  {stat.value}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{stat.trend}</span>
                  </div>
                  <div className="w-20 h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={miniChartData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={stat.trendUp ? '#16a34a' : '#dc2626'} 
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Alerts */}
      <div className="space-y-4">
        <h2>Quick Alerts</h2>
        <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <AlertDescription>
            <span className="text-yellow-800 dark:text-yellow-200">
              ⚠️ 5 products are running low on stock. Check the Stock page for details.
            </span>
          </AlertDescription>
        </Alert>
        <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
          <AlertDescription>
            <span className="text-blue-800 dark:text-blue-200">
              ℹ️ System backup completed successfully at 2:00 AM today.
            </span>
          </AlertDescription>
        </Alert>
      </div>

      {/* Recent Activity Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <p>Invoice #1042 created</p>
                <p className="text-sm text-muted-foreground">2 minutes ago</p>
              </div>
              <span className="text-[#FF6F61]" style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: '16px' }}>245.00 EGP</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <p>New product added: Blue T-Shirt</p>
                <p className="text-sm text-muted-foreground">15 minutes ago</p>
              </div>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <div>
                <p>Stock updated for Red Hoodie</p>
                <p className="text-sm text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
