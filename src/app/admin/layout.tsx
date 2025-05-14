'use client';

import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

// Define types for our sidebar items
interface DropdownOption {
  text: string;
  path: string;
}

interface SidebarItem {
  text: string;
  icon: string;
  path?: string;
  hasDropdown?: boolean;
  options?: DropdownOption[];
}

// Define dropdown state type
interface DropdownState {
  [key: string]: boolean;
}

const sidebarItems: SidebarItem[] = [
  { text: 'Dashboard', icon: '/dashbord (2).png', path: '/admin/dashboard' },
  {
    text: 'Inventory',
    icon: '/inventory.png',
    hasDropdown: true,
    options: [
      { text: 'Delete Product/Category', path: '/admin/inventory/delete' },
      { text: 'Update Product', path: '/admin/inventory/update' },
      { text: 'View All Products', path: '/admin/inventory/view' },
    ],
  },
  {
    text: 'Orders',
    icon: '/order.png',
    hasDropdown: true,
    options: [
      { text: 'Orders', path: '/admin/order/orders' },
      { text: 'RFQs', path: '/admin/order/rfq' },
    ],
  },
  { text: 'Logistics', icon: '/logistics.png', path: '/admin/logistics' },
  { text: 'Sales Report', icon: '/sales-report.png', path: '/admin/sales' },
  { text: 'Messages', icon: '/customers.png', path: '/admin/messages' },
  { text: 'Settings', icon: '/settings.png', path: '/admin/settings' },
  { text: 'Sign Out', icon: '/sign-out.png', path: '/login' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Add mounted state to prevent hydration issues
  const [mounted, setMounted] = useState(false);
  
  // Create separate state for each dropdown
  const [openDropdowns, setOpenDropdowns] = useState<DropdownState>({
    Inventory: false,
    Orders: false
  });

  // Only execute client-side
  useEffect(() => {
    setMounted(true);
    
    // Set Dashboard as the default route on initial load
    if (pathname === '/admin' || pathname === '/admin/') {
      router.push('/admin/dashboard');
    }
    
    // Auto open appropriate dropdown based on current path
    if (pathname.startsWith('/admin/inventory/')) {
      setOpenDropdowns(prev => ({ ...prev, Inventory: true }));
    } else if (pathname.startsWith('/admin/orders')) {
      setOpenDropdowns(prev => ({ ...prev, Orders: true }));
    }
  }, [pathname, router]);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownName]: !prev[dropdownName]
    }));
  };

  // Function to determine if an item or its options are active
  const isItemActive = (item: SidebarItem): boolean => {
    if (!mounted) return false;
    
    if (item.hasDropdown) {
      if (item.text === 'Inventory') {
        return pathname.startsWith('/admin/inventory');
      } else if (item.text === 'Orders') {
        return pathname.startsWith('/admin/orders');
      }
      return false;
    }
    return pathname === item.path;
  };

  // Check if dropdown is open
  const isDropdownOpen = (itemText: string): boolean => {
    if (!mounted) return false;
    return openDropdowns[itemText] || false;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Navbar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fff', color: '#333' }}>
        <Toolbar>
          <Image src="/Logo.png" alt="ERMM Logo" width={130} height={65} />
          <Box sx={{ width: "80vw", mr: 5, ml: 10, height: "39px", borderRadius: "13px", backgroundColor: "#F9FAFB", display: "flex", alignItems: "center", pl: 2 }}>
            <Image src="/magnifier.svg" alt="Notifications" width={20} height={20} />
            <Typography variant="body2" sx={{ ml: 1 }}>Search Here...</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box sx={{ height: "39px", width: "39px", backgroundColor: "#FFFAF1", borderRadius: "13px", mr: 2, display: "grid", placeItems: "center" }}>
              <Image src="/notification.png" alt="User" width={21} height={21} />
            </Box>
            <Image src="/photo.jpg" alt="User" width={43} height={43} style={{ borderRadius: "12px", objectFit: "cover" }} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              <b>Chetan</b> <br />Admin
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            borderRight: 'none',
            overflowY: 'hidden',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'hidden' }}>
          <List>
            {sidebarItems.map((item) => (
              <React.Fragment key={item.text}>
                {item.hasDropdown ? (
                  <>
                    <ListItemButton
                      onClick={() => toggleDropdown(item.text)}
                      selected={isItemActive(item)}
                      sx={{
                        mr: 3,
                        ml: 3,
                        mt: 1,
                        mb: 1,
                        color: isItemActive(item) ? '#fff' : 'rgba(115, 119, 145, 1)',
                        borderRadius: "16px",
                        border: isDropdownOpen(item.text) ? '2px solid #f9a922' : 'none',
                        '&:hover': {
                          backgroundColor: isItemActive(item) ? '#f9a922' : '#f9a922',
                          color: '#fff'
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#f9a922',
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: '#f9a922',
                          }
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
                        <Image src={item.icon} alt={`${item.text} Icon`} width={24} height={24} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{ color: 'inherit' }}
                      />
                      {mounted && (
                        <Image
                          src={'/down.png'}
                          alt="Toggle Icon"
                          width={12}
                          height={8}
                          style={{
                            transition: 'transform 0.3s',
                            transform: isDropdownOpen(item.text) ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                        />
                      )}
                    </ListItemButton>
                    {isDropdownOpen(item.text) && item.options && (
                      <Box sx={{ ml: 1, mt: 0, mb: 1, display: "grid", placeItems: "center" }}>
                        {item.options.map((option) => {
                          const isActive = mounted && pathname === option.path;
                          
                          return (
                            <ListItemButton
                              key={option.text}
                              onClick={() => {
                                router.push(option.path);
                              }}
                              selected={isActive}
                              sx={{
                                color: isActive ? '#fff' : "#333",
                                fontFamily: 'Poppins, sans-serif',
                                '&:hover': { 
                                  backgroundColor: isActive ? '#f9a922' : '#f9a922', 
                                  color: '#fff' 
                                },
                                mt: 0.5,
                                textAlign: "center",
                                width: '200px',
                                minWidth: '180px',
                                maxWidth: '180px',
                                borderRadius: '0 0 20px 20px',
                                '&.Mui-selected': {
                                  backgroundColor: '#f9a922',
                                  color: '#fff',
                                  '&:hover': {
                                    backgroundColor: '#f9a922',
                                  }
                                },
                              }}
                            >
                              <ListItemText
                                primary={option.text}
                                primaryTypographyProps={{
                                  sx: {
                                    fontSize: '11px',
                                    color: 'inherit',
                                    fontFamily: 'Poppins, sans-serif' 
                                  },
                                }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </Box>
                    )}
                  </>
                ) : (
                  <ListItemButton
                    onClick={() => router.push(item.path || '')}
                    selected={mounted && pathname === item.path}
                    sx={{
                      mr: 3,
                      ml: 3,
                      mt: 1, // Consistent top margin for all items
                      mb: 1, // Consistent bottom margin
                      backgroundColor: mounted && pathname === item.path ? '#f9a922' : 'transparent',
                      color: mounted && pathname === item.path ? '#fff' : 'rgba(115, 119, 145, 1)',
                      borderRadius: "16px",
                      '&:hover': { 
                        backgroundColor: mounted && pathname === item.path ? '#f9a922' : '#f9a922', 
                        color: '#fff' 
                      },
                      '&.Mui-selected': { 
                        backgroundColor: '#f9a922', 
                        color: '#fff', 
                        borderRadius: "16px",
                        '&:hover': {
                          backgroundColor: '#f9a922',
                        }
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: '40px' }}>
                      <Image src={item.icon} alt={`${item.text} Icon`} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        color: 'inherit',
                      }}
                    />
                  </ListItemButton>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: "#F9FAFB", minHeight: "85vh" }}>
        {children}
      </Box>
    </Box>
  );
}