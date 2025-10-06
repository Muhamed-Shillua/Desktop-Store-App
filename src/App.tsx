import { useState } from 'react';
import { Home, FileText, Package, BarChart3, TrendingDown, Settings, LogOut } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Products from './components/Products';
import Stock from './components/Stock';
import Statistics from './components/Statistics';
import SettingsScreen from './components/SettingsScreen';

type Screen = 'home' | 'orders' | 'products' | 'statistics' | 'stock' | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Dashboard />;
      case 'orders':
        return <Orders />;
      case 'products':
        return <Products />;
      case 'stock':
        return <Stock />;
      case 'statistics':
        return <Statistics />;
      case 'settings':
        return <SettingsScreen isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default:
        return <Dashboard />;
    }
  };

  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'orders' as Screen, icon: FileText, label: 'Orders / POS' },
    { id: 'products' as Screen, icon: Package, label: 'Products' },
    { id: 'statistics' as Screen, icon: BarChart3, label: 'Statistics' },
    { id: 'stock' as Screen, icon: TrendingDown, label: 'Stock' },
    { id: 'settings' as Screen, icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-[#F5F5F5] dark:bg-background">
        {/* Left Sidebar */}
        <div className="w-64 bg-gradient-to-b from-[#001F3F] to-[#003366] flex flex-col shadow-xl">
          <div className="p-6">
            <h1 className="text-white">Management</h1>
          </div>
          
          <nav className="flex-1 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentScreen(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                    currentScreen === item.id
                      ? 'bg-white/20 text-white shadow-md border-l-4 border-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white hover:translate-x-1 transition-all duration-200">
              <LogOut className="w-5 h-5" />
              <span>Exit</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white dark:bg-card border-b border-border px-8 py-4 flex justify-between items-center">
            <div className="text-muted-foreground">{getCurrentDate()}</div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#007BFF] flex items-center justify-center text-white">
                A
              </div>
              <span>Admin User</span>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="flex-1 overflow-auto p-8">
            {renderScreen()}
          </div>
        </div>
      </div>
    </div>
  );
}
