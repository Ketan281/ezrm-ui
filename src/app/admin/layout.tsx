"use client"

import React, { useState, useEffect } from "react"
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

// Define types for our sidebar items with nested dropdowns
interface NestedDropdownOption {
  text: string
  path: string
}

interface DropdownOption {
  text: string
  path: string
  hasNestedDropdown?: boolean
  nestedOptions?: NestedDropdownOption[]
}

interface SidebarItem {
  text: string
  icon: string
  path?: string
  hasDropdown?: boolean
  options?: DropdownOption[]
}

// Define dropdown state type with nested dropdowns
interface DropdownState {
  [key: string]: boolean
}

interface NestedDropdownState {
  [key: string]: boolean
}

const sidebarItems: SidebarItem[] = [
  { text: "Dashboard", icon: "/dashbord (2).png", path: "/admin/dashboard" },
  {
    text: "Inventory",
    icon: "/inventory.png",
    hasDropdown: true,
    options: [
      { text: "Add Product", path: "/admin/inventory/add-product" },
      { text: "Delete Product/Category", path: "/admin/inventory/delete" },
      { text: "Update Product", path: "/admin/inventory/update" },
      { text: "View All Products", path: "/admin/inventory/view" },
    ],
  },
  {
    text: "Payments",
    icon: "/order.png",
    hasDropdown: true,
    options: [
      { text: "Payments", path: "/admin/payments/payment" },
      { text: "Refunds", path: "/admin/payments/refund" },
    ],
  },
  {
    text: "Orders",
    icon: "/order.png",
    hasDropdown: true,
    options: [
      { text: "Orders", path: "/admin/order/orders" },
      { text: "RFQs", path: "/admin/order/rfq" },
    ],
  },
  {
    text: "Logistics",
    icon: "/logistics.png",
    hasDropdown: true,
    options: [
      {
        text: "Payment Management",
        path: "/admin/logistics/payment-management",
        hasNestedDropdown: true,
        nestedOptions: [
          { text: "Pending/Completed Payment", path: "/admin/logistics/payment-management/payment" },
          { text: "Refund", path: "/admin/logistics/payment-management/refund" },
        ],
      },
      {
        text: "Warehouse",
        path: "/admin/logistics/warehouse",
        hasNestedDropdown: true,
        nestedOptions: [
          { text: "Add Product", path: "/admin/logistics/warehouse/add-product" },
          { text: "Delete Product", path: "/admin/logistics/warehouse/delete-product" },
          { text: "Update Product", path: "/admin/logistics/warehouse/update-product" },
          { text: "View Products", path: "/admin/logistics/warehouse/view-products" },
        ],
      },
      { text: "Document Tracking", path: "/admin/logistics/document-tracking" },
    ],
  },
  { text: "Sales Report", icon: "/sales-report.png", path: "/admin/sales" },
  { text: "Messages", icon: "/customers.png", path: "/admin/messages" },
  { text: "Settings", icon: "/settings.png", path: "/admin/settings" },
  { text: "Sign Out", icon: "/sign-out.png", path: "/login" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  // Add mounted state to prevent hydration issues
  const [mounted, setMounted] = useState(false)

  // Create separate state for each dropdown
  const [openDropdowns, setOpenDropdowns] = useState<DropdownState>({
    Inventory: false,
    Orders: false,
    Payments: false,
    Logistics: false,
  })

  // State for nested dropdowns
  const [openNestedDropdowns, setOpenNestedDropdowns] = useState<NestedDropdownState>({
    "Payment Management": false,
    Warehouse: false,
  })

  // Only execute client-side
  useEffect(() => {
    setMounted(true)

    // Set Dashboard as the default route on initial load
    if (pathname === "/admin" || pathname === "/admin/") {
      router.push("/admin/dashboard")
    }

    // Auto open appropriate dropdown based on current path
    if (pathname.startsWith("/admin/inventory/")) {
      setOpenDropdowns((prev) => ({ ...prev, Inventory: true }))
    } else if (pathname.startsWith("/admin/orders")) {
      setOpenDropdowns((prev) => ({ ...prev, Orders: true }))
    } else if (pathname.startsWith("/admin/payments/")) {
      setOpenDropdowns((prev) => ({ ...prev, Payments: true }))
    } else if (pathname.startsWith("/admin/logistics/")) {
      setOpenDropdowns((prev) => ({ ...prev, Logistics: true }))

      // Auto open nested dropdown if on a nested path
      if (pathname.startsWith("/admin/logistics/payment-management/")) {
        setOpenNestedDropdowns((prev) => ({ ...prev, "Payment Management": true }))
      } else if (pathname.startsWith("/admin/logistics/warehouse/")) {
        setOpenNestedDropdowns((prev) => ({ ...prev, Warehouse: true }))
      }
    }
  }, [pathname, router])

  const toggleDropdown = (dropdownName: string) => {
    // Close all other dropdowns when opening a new one
    const newDropdownState = Object.keys(openDropdowns).reduce<DropdownState>(
      (acc, key) => ({ ...acc, [key]: key === dropdownName ? !openDropdowns[dropdownName] : false }),
      {} as DropdownState,
    )
    setOpenDropdowns(newDropdownState)

    // Reset nested dropdowns when closing parent or switching to different parent
    if (openDropdowns[dropdownName] || dropdownName !== "Logistics") {
      setOpenNestedDropdowns({
        "Payment Management": false,
        Warehouse: false,
      })
    }
  }

  const toggleNestedDropdown = (e: React.MouseEvent, nestedDropdownName: string) => {
    e.stopPropagation() // Prevent parent dropdown from closing
    setOpenNestedDropdowns((prev) => ({
      ...prev,
      [nestedDropdownName]: !prev[nestedDropdownName],
    }))
  }

  // Function to determine if an item or its options are active
  const isItemActive = (item: SidebarItem): boolean => {
    if (!mounted) return false

    if (item.hasDropdown) {
      if (item.text === "Inventory") {
        return pathname.startsWith("/admin/inventory")
      } else if (item.text === "Orders") {
        return pathname.startsWith("/admin/orders")
      } else if (item.text === "Logistics") {
        return pathname.startsWith("/admin/logistics")
      } else if (item.text === "Payments") {
        return pathname.startsWith("/admin/payments")
      }
      return false
    }
    return pathname === item.path
  }

  // Check if dropdown is open
  const isDropdownOpen = (itemText: string): boolean => {
    if (!mounted) return false
    return openDropdowns[itemText] || false
  }

  // Check if nested dropdown is open
  const isNestedDropdownOpen = (itemText: string): boolean => {
    if (!mounted) return false
    return openNestedDropdowns[itemText] || false
  }

  // Check if a nested option is active
  const isNestedOptionActive = (path: string): boolean => {
    if (!mounted) return false
    return pathname === path
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#fff", color: "#333" }}
      >
        <Toolbar>
          <Image src="/Logo.png" alt="ERMM Logo" width={130} height={65} />
          <Box
            sx={{
              width: "80vw",
              mr: 5,
              ml: 10,
              height: "39px",
              borderRadius: "13px",
              backgroundColor: "#F9FAFB",
              display: "flex",
              alignItems: "center",
              pl: 2,
            }}
          >
            <Image src="/magnifier.svg" alt="Notifications" width={20} height={20} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Search Here...
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                height: "39px",
                width: "39px",
                backgroundColor: "#FFFAF1",
                borderRadius: "13px",
                mr: 2,
                display: "grid",
                placeItems: "center",
              }}
            >
              <Image src="/notification.png" alt="User" width={21} height={21} />
            </Box>
            <Image
              src="/photo.jpg"
              alt="User"
              width={43}
              height={43}
              style={{ borderRadius: "12px", objectFit: "cover" }}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              <b>Chetan</b> <br />
              Admin
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
            boxSizing: "border-box",
            borderRight: "none",
            overflowY: "auto",
            // Hide scrollbar for webkit browsers
            "&::-webkit-scrollbar": {
              display: "none",
            },
            // Hide scrollbar for Firefox
            scrollbarWidth: "none",
            // Hide scrollbar for IE
            msOverflowStyle: "none",
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
            // Hide scrollbar for webkit browsers
            "&::-webkit-scrollbar": {
              display: "none",
            },
            // Hide scrollbar for Firefox
            scrollbarWidth: "none",
            // Hide scrollbar for IE
            msOverflowStyle: "none",
          }}
        >
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
                        mt: 0.5,
                        mb: 0.5,
                        color: isItemActive(item) ? "#fff" : "rgba(115, 119, 145, 1)",
                        borderRadius: "16px",
                        border: isDropdownOpen(item.text) ? "2px solid #f9a922" : "none",
                        "&:hover": {
                          backgroundColor: isItemActive(item) ? "#f9a922" : "#f9a922",
                          color: "#fff",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "#f9a922",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#f9a922",
                          },
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: "inherit", minWidth: "40px" }}>
                        <Image src={item.icon || "/placeholder.svg"} alt={`${item.text} Icon`} width={24} height={24} />
                      </ListItemIcon>
                      <ListItemText primary={item.text} sx={{ color: "inherit" }} />
                      {mounted && (
                        <Image
                          src={"/down.png"}
                          alt="Toggle Icon"
                          width={12}
                          height={8}
                          style={{
                            transition: "transform 0.3s",
                            transform: isDropdownOpen(item.text) ? "rotate(0deg)" : "rotate(180deg)",
                          }}
                        />
                      )}
                    </ListItemButton>
                    {isDropdownOpen(item.text) && item.options && (
                      <Box sx={{ ml: 1, mt: 0, mb: 0.5, display: "grid", placeItems: "center" }}>
                        {item.options.map((option) => {
                          const isActive = mounted && pathname === option.path
                          const hasNestedDropdown = option.hasNestedDropdown && option.nestedOptions

                          return (
                            <React.Fragment key={option.text}>
                              <ListItemButton
                                onClick={(e) => {
                                  if (hasNestedDropdown) {
                                    toggleNestedDropdown(e, option.text)
                                  } else {
                                    router.push(option.path)
                                  }
                                }}
                                selected={isActive}
                                sx={{
                                  color: isActive ? "#fff" : "#333",
                                  fontFamily: "Poppins, sans-serif",
                                  "&:hover": {
                                    backgroundColor: isActive ? "#f9a922" : "#f9a922",
                                    color: "#fff",
                                  },
                                  py: 0.25, // Reduced padding
                                  mt: 0.25, // Reduced margin
                                  textAlign: "center",
                                  width: "200px",
                                  minWidth: "180px",
                                  maxWidth: "180px",
                                  borderRadius:
                                    hasNestedDropdown && isNestedDropdownOpen(option.text) ? "20px 20px 0 0" : "20px",
                                  "&.Mui-selected": {
                                    backgroundColor: "#f9a922",
                                    color: "#fff",
                                    "&:hover": {
                                      backgroundColor: "#f9a922",
                                    },
                                  },
                                }}
                              >
                                <ListItemText
                                  primary={option.text}
                                  primaryTypographyProps={{
                                    sx: {
                                      fontSize: "11px",
                                      color: "inherit",
                                      fontFamily: "Poppins, sans-serif",
                                    },
                                  }}
                                />
                                {hasNestedDropdown && mounted && (
                                  <Image
                                    src={"/down.png"}
                                    alt="Toggle Icon"
                                    width={8}
                                    height={6}
                                    style={{
                                      transition: "transform 0.3s",
                                      transform: isNestedDropdownOpen(option.text) ? "rotate(0deg)" : "rotate(180deg)",
                                    }}
                                  />
                                )}
                              </ListItemButton>

                              {/* Nested Dropdown Options */}
                              {hasNestedDropdown && isNestedDropdownOpen(option.text) && option.nestedOptions && (
                                <Box sx={{ mt: 0, mb: 0.25, display: "grid", placeItems: "center" }}>
                                  {option.nestedOptions.map((nestedOption) => {
                                    const isNestedActive = isNestedOptionActive(nestedOption.path)

                                    return (
                                      <ListItemButton
                                        key={nestedOption.text}
                                        onClick={() => {
                                          router.push(nestedOption.path)
                                        }}
                                        selected={isNestedActive}
                                        sx={{
                                          color: isNestedActive ? "#fff" : "#333",
                                          fontFamily: "Poppins, sans-serif",
                                          "&:hover": {
                                            backgroundColor: isNestedActive ? "#f9a922" : "#f9a922",
                                            color: "#fff",
                                          },
                                          py: 0.1, // Minimal padding
                                          mt: 0.1, // Minimal margin
                                          textAlign: "center",
                                          width: "160px",
                                          minWidth: "160px",
                                          maxWidth: "160px",
                                          borderRadius: "16px",
                                          fontSize: "10px",
                                          "&.Mui-selected": {
                                            backgroundColor: "#f9a922",
                                            color: "#fff",
                                            "&:hover": {
                                              backgroundColor: "#f9a922",
                                            },
                                          },
                                        }}
                                      >
                                        <ListItemText
                                          primary={nestedOption.text}
                                          primaryTypographyProps={{
                                            sx: {
                                              fontSize: "8px",
                                              color: "inherit",
                                              fontFamily: "Poppins, sans-serif",
                                              mt: 0.5,
                                              mb: 0.5,
                                            },
                                          }}
                                        />
                                      </ListItemButton>
                                    )
                                  })}
                                </Box>
                              )}
                            </React.Fragment>
                          )
                        })}
                      </Box>
                    )}
                  </>
                ) : (
                  <ListItemButton
                    onClick={() => router.push(item.path || "")}
                    selected={mounted && pathname === item.path}
                    sx={{
                      mr: 3,
                      ml: 3,
                      mt: 0.5, // Reduced margin
                      mb: 0.5, // Reduced margin
                      backgroundColor: mounted && pathname === item.path ? "#f9a922" : "transparent",
                      color: mounted && pathname === item.path ? "#fff" : "rgba(115, 119, 145, 1)",
                      borderRadius: "16px",
                      "&:hover": {
                        backgroundColor: mounted && pathname === item.path ? "#f9a922" : "#f9a922",
                        color: "#fff",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "#f9a922",
                        color: "#fff",
                        borderRadius: "16px",
                        "&:hover": {
                          backgroundColor: "#f9a922",
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit", minWidth: "40px" }}>
                      <Image src={item.icon || "/placeholder.svg"} alt={`${item.text} Icon`} width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        color: "inherit",
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
  )
}
