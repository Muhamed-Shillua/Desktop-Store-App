import { AlertTriangle, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { toast } from 'sonner@2.0.3';

interface StockItem {
  id: string;
  barcode: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  reorderLevel: number;
}

export default function Stock() {
  const lowStockItems: StockItem[] = [
    {
      id: '1',
      barcode: '1234567892',
      name: 'Casual Jeans',
      size: '32',
      color: 'Black',
      quantity: 3,
      reorderLevel: 10,
    },
    {
      id: '2',
      barcode: '1234567893',
      name: 'Summer Dress',
      size: 'S',
      color: 'White',
      quantity: 2,
      reorderLevel: 10,
    },
    {
      id: '3',
      barcode: '1234567894',
      name: 'Winter Jacket',
      size: 'XL',
      color: 'Navy',
      quantity: 1,
      reorderLevel: 5,
    },
    {
      id: '4',
      barcode: '1234567895',
      name: 'Sports Sneakers',
      size: '10',
      color: 'Red',
      quantity: 4,
      reorderLevel: 8,
    },
    {
      id: '5',
      barcode: '1234567896',
      name: 'Leather Belt',
      size: 'M',
      color: 'Brown',
      quantity: 5,
      reorderLevel: 10,
    },
  ];

  const handleOrderMore = (productName: string) => {
    toast.success(`Order request sent for ${productName}`);
  };

  const getAlertLevel = (quantity: number) => {
    if (quantity <= 2) return 'critical';
    if (quantity <= 5) return 'warning';
    return 'normal';
  };

  const criticalCount = lowStockItems.filter(item => item.quantity <= 2).length;
  const warningCount = lowStockItems.filter(item => item.quantity > 2 && item.quantity <= 5).length;

  return (
    <div className="space-y-6">
      <h1>Stock Management</h1>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Alert className="border-red-500 bg-red-50 dark:bg-red-950/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription>
            <span className="text-red-800 dark:text-red-200">
              <strong>{criticalCount}</strong> products are critically low (≤2 units)
            </span>
          </AlertDescription>
        </Alert>
        <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <span className="text-yellow-800 dark:text-yellow-200">
              <strong>{warningCount}</strong> products need restocking soon (≤5 units)
            </span>
          </AlertDescription>
        </Alert>
      </div>

      {/* Low Stock Items */}
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead className="text-right">Current Stock</TableHead>
                <TableHead className="text-right">Reorder Level</TableHead>
                <TableHead className="w-[150px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockItems.map((item, index) => {
                const alertLevel = getAlertLevel(item.quantity);
                return (
                  <TableRow 
                    key={item.id}
                    className={`${index % 2 === 0 ? 'bg-white dark:bg-card' : 'bg-gray-50 dark:bg-gray-800/50'} ${
                      alertLevel === 'critical' ? 'border-l-4 border-red-500' : 'border-l-4 border-yellow-500'
                    }`}
                  >
                    <TableCell>
                      {alertLevel === 'critical' ? (
                        <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" title="Critical" />
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-yellow-500" title="Warning" />
                      )}
                    </TableCell>
                    <TableCell>{item.barcode}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          alertLevel === 'critical'
                            ? 'bg-red-600 font-bold'
                            : 'bg-yellow-600 font-semibold'
                        }`}
                      >
                        {item.quantity}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{item.reorderLevel}</TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        onClick={() => handleOrderMore(item.name)}
                        className="bg-[#FFA500] hover:bg-[#FF8C00] text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Order More
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" variant="outline">
            Export Low Stock Report (PDF)
          </Button>
          <Button className="w-full" variant="outline">
            Generate Purchase Order
          </Button>
          <Button className="w-full" variant="outline">
            Update Reorder Levels
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
