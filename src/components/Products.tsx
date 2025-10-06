import { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface Product {
  id: string;
  barcode: string;
  name: string;
  size: string;
  color: string;
  type: string;
  price: number;
  quantity: number;
  dateAdded: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      barcode: '1234567890',
      name: 'Classic T-Shirt',
      size: 'M',
      color: 'Blue',
      type: 'Shirt',
      price: 299.99,
      quantity: 45,
      dateAdded: '2025-10-01',
    },
    {
      id: '2',
      barcode: '1234567891',
      name: 'Warm Hoodie',
      size: 'L',
      color: 'Red',
      type: 'Hoodie',
      price: 499.99,
      quantity: 23,
      dateAdded: '2025-10-02',
    },
    {
      id: '3',
      barcode: '1234567892',
      name: 'Casual Jeans',
      size: '32',
      color: 'Black',
      type: 'Pants',
      price: 599.99,
      quantity: 3,
      dateAdded: '2025-10-03',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterColor, setFilterColor] = useState('all');

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted successfully');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.barcode.includes(searchQuery);
    const matchesColor = filterColor === 'all' || product.color.toLowerCase() === filterColor.toLowerCase();
    return matchesSearch && matchesColor;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Products</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#007BFF] hover:bg-[#0056b3]">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Enter the product details below to add it to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode</Label>
                <Input id="barcode" placeholder="1234567890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Classic T-Shirt" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input id="color" placeholder="Blue" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shirt">Shirt</SelectItem>
                    <SelectItem value="hoodie">Hoodie</SelectItem>
                    <SelectItem value="pants">Pants</SelectItem>
                    <SelectItem value="jacket">Jacket</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="29.99" step="0.01" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="quantity">Initial Quantity</Label>
                <Input id="quantity" type="number" placeholder="50" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterColor} onValueChange={setFilterColor}>
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colors</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Barcode</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product, index) => (
                <TableRow key={product.id} className={index % 2 === 0 ? 'bg-white dark:bg-card' : 'bg-gray-50 dark:bg-gray-800/50'}>
                  <TableCell>{product.barcode}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.size}</TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell className="text-right" style={{ fontFamily: 'Roboto', fontWeight: 500, color: '#FF6F61', fontSize: '16px' }}>
                    {product.price.toFixed(2)} EGP
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        product.quantity <= 5
                          ? 'text-red-600 font-semibold'
                          : product.quantity <= 10
                          ? 'text-yellow-600 font-semibold'
                          : ''
                      }
                    >
                      {product.quantity}
                    </span>
                  </TableCell>
                  <TableCell>{product.dateAdded}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
