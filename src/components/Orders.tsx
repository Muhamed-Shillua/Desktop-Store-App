import { useState, useEffect } from 'react';
import { Plus, Trash2, Printer, Save, Barcode } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { toast } from 'sonner@2.0.3';

interface InvoiceItem {
  id: string;
  product: string;
  price: number;
  quantity: number;
  discount: number;
  total: number;
}

export default function Orders() {
  const [barcode, setBarcode] = useState('');
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: '1', product: 'Blue T-Shirt (M)', price: 299.99, quantity: 2, discount: 0, total: 599.98 },
    { id: '2', product: 'Red Hoodie (L)', price: 499.99, quantity: 1, discount: 50, total: 449.99 },
  ]);

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const vat = subtotal * 0.14; // 14% VAT for Egypt
  const total = subtotal + vat;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Enter key to add product
      if (e.key === 'Enter' && barcode.trim() && document.activeElement?.id === 'barcode-input') {
        handleAddByBarcode();
      }
      // Ctrl+N for new invoice
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        handleNewInvoice();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [barcode]);

  const handleRemoveItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter(item => item.id !== id));
    toast.success('Item removed from invoice');
  };

  const handleNewInvoice = () => {
    setInvoiceItems([]);
    setBarcode('');
    toast.info('New invoice created');
  };

  const handleAddByBarcode = () => {
    if (barcode.trim()) {
      // Mock: Add a sample product
      const newItem: InvoiceItem = {
        id: Date.now().toString(),
        product: 'Sample Product',
        price: 199.99,
        quantity: 1,
        discount: 0,
        total: 199.99,
      };
      setInvoiceItems([...invoiceItems, newItem]);
      setBarcode('');
      toast.success('Product added to invoice');
    }
  };

  const handleSaveInvoice = () => {
    toast.success('Invoice saved successfully');
  };

  const handlePrintInvoice = () => {
    toast.success('Invoice sent to printer');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1>Orders / POS</h1>
        <div className="flex gap-2">
          <Button onClick={handleNewInvoice} className="bg-[#FFA500] hover:bg-[#FF8C00] text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Barcode Scanner Section */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Product</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Barcode className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="barcode-input"
                placeholder="Enter or scan barcode... (Press Enter to add)"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            <Button onClick={handleAddByBarcode} className="bg-[#007BFF] hover:bg-[#0056b3]">
              <Plus className="w-4 h-4 mr-2" />
              Add by Barcode
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Keyboard shortcuts: <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> to add product, 
            <kbd className="px-2 py-1 bg-muted rounded ml-2">Ctrl+N</kbd> for new invoice
          </p>
        </CardContent>
      </Card>

      {/* Invoice Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Invoice</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Discount</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground h-24">
                    No items in invoice. Scan a barcode to add products.
                  </TableCell>
                </TableRow>
              ) : (
                invoiceItems.map((item, index) => (
                  <TableRow key={item.id} className={index % 2 === 0 ? 'bg-white dark:bg-card' : 'bg-gray-50 dark:bg-gray-800/50'}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell className="text-right" style={{ fontFamily: 'Roboto', fontWeight: 400 }}>{item.price.toFixed(2)} EGP</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.discount > 0 ? `${item.discount.toFixed(2)} EGP` : '-'}</TableCell>
                    <TableCell className="text-right" style={{ fontFamily: 'Roboto', fontWeight: 500, color: '#FF6F61', fontSize: '16px' }}>
                      {item.total.toFixed(2)} EGP
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Totals */}
          {invoiceItems.length > 0 && (
            <div className="mt-6 space-y-2 max-w-xs ml-auto">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span style={{ fontFamily: 'Roboto', fontWeight: 400 }}>{subtotal.toFixed(2)} EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (14%):</span>
                <span style={{ fontFamily: 'Roboto', fontWeight: 400 }}>{vat.toFixed(2)} EGP</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span style={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '18px' }}>Total:</span>
                <span className="text-[#FF6F61]" style={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: '18px' }}>{total.toFixed(2)} EGP</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-6 justify-end">
            <Button 
              variant="outline" 
              disabled={invoiceItems.length === 0}
              onClick={handleSaveInvoice}
              className="disabled:bg-[#CCCCCC] disabled:text-gray-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Invoice
            </Button>
            <Button 
              disabled={invoiceItems.length === 0}
              onClick={handlePrintInvoice}
              className="bg-[#007BFF] hover:bg-[#0056b3] disabled:bg-[#CCCCCC] disabled:text-gray-500"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
