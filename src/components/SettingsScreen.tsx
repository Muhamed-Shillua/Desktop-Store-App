import { Save, Download, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';

interface SettingsScreenProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export default function SettingsScreen({ isDarkMode, setIsDarkMode }: SettingsScreenProps) {
  const handleBackup = () => {
    toast.success('Database backup completed successfully');
  };

  const handleSaveStoreInfo = () => {
    toast.success('Store information saved');
  };

  const handleSaveTaxSettings = () => {
    toast.success('Tax settings saved');
  };

  return (
    <div className="space-y-6">
      <h1>Settings</h1>

      {/* Store Information */}
      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input id="store-name" placeholder="My Fashion Store" defaultValue="My Fashion Store" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="store-address">Address</Label>
            <Input
              id="store-address"
              placeholder="123 Main Street, City, State"
              defaultValue="123 Main Street, New York, NY 10001"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="store-phone">Phone Number</Label>
              <Input
                id="store-phone"
                placeholder="+1 (555) 123-4567"
                defaultValue="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-email">Email</Label>
              <Input
                id="store-email"
                type="email"
                placeholder="info@store.com"
                defaultValue="info@myfashionstore.com"
              />
            </div>
          </div>
          <Button onClick={handleSaveStoreInfo} className="bg-[#007BFF] hover:bg-[#0056b3]">
            <Save className="w-4 h-4 mr-2" />
            Save Store Info
          </Button>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Theme Mode</Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Moon className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Print Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="printer-type">Printer Type</Label>
            <Select defaultValue="pdf">
              <SelectTrigger id="printer-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Generator</SelectItem>
                <SelectItem value="thermal">Thermal Printer (58mm)</SelectItem>
                <SelectItem value="thermal-80">Thermal Printer (80mm)</SelectItem>
                <SelectItem value="laser">Laser Printer (A4)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-print invoices</Label>
              <p className="text-sm text-muted-foreground">
                Automatically print after saving invoice
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Include store logo</Label>
              <p className="text-sm text-muted-foreground">
                Add your logo to printed invoices
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Tax Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vat-rate">VAT / Sales Tax Rate (%)</Label>
            <Input id="vat-rate" type="number" placeholder="15" defaultValue="15" step="0.01" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-id">Tax ID / Registration Number</Label>
            <Input id="tax-id" placeholder="TAX-123456789" defaultValue="TAX-987654321" />
          </div>
          <Button onClick={handleSaveTaxSettings} className="bg-[#007BFF] hover:bg-[#0056b3]">
            <Save className="w-4 h-4 mr-2" />
            Save Tax Settings
          </Button>
        </CardContent>
      </Card>

      {/* Database & Backup */}
      <Card>
        <CardHeader>
          <CardTitle>Database & Backup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-backup</Label>
              <p className="text-sm text-muted-foreground">
                Automatically backup database daily at 2:00 AM
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Last backup: October 6, 2025 at 2:00 AM
            </p>
            <div className="flex gap-2">
              <Button onClick={handleBackup} className="bg-[#FFA500] hover:bg-[#FF8C00] text-white">
                <Download className="w-4 h-4 mr-2" />
                Backup Database Now
              </Button>
              <Button variant="outline">Restore from Backup</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version:</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Database Size:</span>
            <span>24.5 MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Products:</span>
            <span>1,234</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Invoices:</span>
            <span>3,456</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
