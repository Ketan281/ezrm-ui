'use client';

import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const sidebarItems = [
  { text: 'Dashboard', icon: '/dashbord.png', path: '/admin/dashboard' },
  {
    text: 'Inventory',
    icon: '/inventory.png',
    options: [
      { text: 'Delete Product/Category', path: '/admin/inventory/delete' },
      { text: 'Update Product', path: '/admin/inventory/update' },
      { text: 'View All Products', path: '/admin/inventory/view' },
    ],
  },
  { text: 'Logistics', icon: '/logistics.png', path: '/admin/logistics' },
  { text: 'Sales Report', icon: '/sales-report.png', path: '/admin/sales' },
  { text: 'Customers', icon: '/customers.png', path: '/admin/customers' },
  { text: 'Settings', icon: '/settings.png', path: '/admin/settings' },
  { text: 'Sign Out', icon: '/sign-out.png', path: '/login' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  // Set Dashboard as the default route on initial load
  useEffect(() => {
    if (pathname === '/admin' || pathname === '/admin/') {
      router.push('/admin/dashboard');
    }
  }, [pathname, router]);

  const handleInventoryClick = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  // Function to determine if an item or its options are active
  const isItemActive = (item: typeof sidebarItems[number]) => {
    if (item.options) {
      return item.options.some((option) => pathname === option.path) || pathname.startsWith('/admin/inventory');
    }
    return pathname === item.path;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Navbar - unchanged */}
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
                {item.options ? (
                  <>
                    <ListItemButton
                      onClick={handleInventoryClick}
                      selected={isItemActive(item)}
                      sx={{
                        mr: 3,
                        ml: 3,
                        mt: item.text === "Dashboard" ? 2 : 0,
                        mb: 0,
                        backgroundColor: isItemActive(item) ? '#f9a922' : 'transparent',
                        color: isItemActive(item) ? '#fff' : 'rgba(115, 119, 145, 1)',
                        borderRadius: "16px",
                        '&:hover': { backgroundColor: '#f9a922', color: '#fff' },
                        '&.Mui-selected': {
                          backgroundColor: '#f9a922',
                          color: '#fff',
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
                      <Image
                        src={'/down.png'}
                        alt="Toggle Icon"
                        width={12}
                        height={8}
                        style={{
                          transition: 'transform 0.3s',
                          transform: isInventoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </ListItemButton>
                    {isInventoryOpen && (
                      <Box sx={{ ml: 1, mt: 0, mb: 1, display: "grid", placeItems: "center" }}>
                        {item.options.map((option) => (
                          <ListItemButton
                            key={option.text}
                            href={option.path}
                            selected={pathname === option.path}
                            onClick={() => setIsInventoryOpen(false)} // Close dropdown on option click
                            sx={{
                              color: pathname === option.path ? '#f9a922' : "#333",
                              '&:hover': { 
                                backgroundColor: 'rgba(249, 169, 34, 0.1)', 
                                color: '#f9a922' 
                              },
                              background: "rgba(249, 250, 251, 1)",
                              mt: 0.5,
                              textAlign: "center",
                              width: '200px',
                              minWidth: '180px',
                              maxWidth: '180px',
                              borderRadius: '0 0 20px 20px',
                              '&.Mui-selected': {
                                backgroundColor: 'rgba(249, 169, 34, 0.1)',
                                color: '#f9a922',
                              },
                            }}
                          >
                            <ListItemText
                              primary={option.text}
                              primaryTypographyProps={{
                                sx: {
                                  fontSize: '11px',
                                  color: 'inherit',
                                },
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </Box>
                    )}
                  </>
                ) : (
                  <ListItemButton
                    href={item.path}
                    selected={pathname === item.path}
                    sx={{
                      mr: 3,
                      ml: 3,
                      mt: item.text === "Dashboard" ? 2 : 0,
                      mb: 1,
                      backgroundColor: pathname === item.path ? '#f9a922' : 'transparent',
                      color: pathname === item.path ? '#fff' : 'rgba(115, 119, 145, 1)',
                      borderRadius: "16px",
                      '&:hover': { 
                        backgroundColor: '#f9a922', 
                        color: '#fff' 
                      },
                      '&.Mui-selected': { 
                        backgroundColor: '#f9a922', 
                        color: '#fff', 
                        borderRadius: "16px" 
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

      {/* Main Content - unchanged */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: "#F9FAFB", minHeight: "85vh" }}>
        {children}
      </Box>
    </Box>
  );
}