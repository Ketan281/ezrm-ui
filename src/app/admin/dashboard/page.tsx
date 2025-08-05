'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
} from '@mui/material';
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/api/services/dashboard';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
import Image from 'next/image';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotificationsIcon from '@mui/icons-material/Notifications';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'delivered':
    case 'completed':
      return '#4caf50';
    case 'pending':
      return '#ff9800';
    case 'cancelled':
    case 'error':
      return '#f44336';
    case 'shipped':
    case 'in transit':
      return '#2196f3';
    default:
      return '#757575';
  }
};

export default function Dashboard() {
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardService.getDashboardData(),
  });

  const { data: revenueData } = useQuery({
    queryKey: ['revenue'],
    queryFn: () => dashboardService.getRevenueData(),
  });

  const { data: orderData } = useQuery({
    queryKey: ['orders'],
    queryFn: () => dashboardService.getOrderData(),
  });

  const { data: customerData } = useQuery({
    queryKey: ['customers'],
    queryFn: () => dashboardService.getCustomerData(),
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Failed to load dashboard data
      </Alert>
    );
  }

  const overview = dashboardData?.data?.overview;
  const recentOrders = dashboardData?.data?.recent?.recentOrders || [];
  const topProducts = dashboardData?.data?.recent?.topProducts || [];

  const statsCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(overview?.totalRevenue || 0),
      icon: <AttachMoneyIcon sx={{ color: '#4caf50' }} />,
      bgColor: 'rgba(76, 175, 80, 0.1)',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Total Orders',
      value: formatNumber(overview?.totalOrders || 0),
      icon: <ShoppingCartIcon sx={{ color: '#2196f3' }} />,
      bgColor: 'rgba(33, 150, 243, 0.1)',
      trend: '+8.2%',
      trendUp: true,
    },
    {
      title: 'Total Customers',
      value: formatNumber(overview?.totalCustomers || 0),
      icon: <PeopleIcon sx={{ color: '#ff9800' }} />,
      bgColor: 'rgba(255, 152, 0, 0.1)',
      trend: '+15.3%',
      trendUp: true,
    },
    {
      title: 'Total Products',
      value: formatNumber(overview?.totalProducts || 0),
      icon: <InventoryIcon sx={{ color: '#9c27b0' }} />,
      bgColor: 'rgba(156, 39, 176, 0.1)',
      trend: '+5.7%',
      trendUp: true,
    },
    {
      title: 'Total RFQs',
      value: formatNumber(overview?.totalRFQs || 0),
      icon: <RequestQuoteIcon sx={{ color: '#607d8b' }} />,
      bgColor: 'rgba(96, 125, 139, 0.1)',
      trend: '+3.1%',
      trendUp: true,
    },
    {
      title: 'Total Shipments',
      value: formatNumber(overview?.totalShipments || 0),
      icon: <LocalShippingIcon sx={{ color: '#795548' }} />,
      bgColor: 'rgba(121, 85, 72, 0.1)',
      trend: '+9.8%',
      trendUp: true,
    },
  ];

  const revenueChartData =
    revenueData?.data?.revenueByMonth?.map((item) => ({
      month: item._id,
      revenue: item.revenue,
    })) || [];

  const orderStatusData =
    orderData?.data?.ordersByStatus?.map((item) => ({
      status: item._id || 'Unknown',
      count: item.count,
      revenue: item.revenue,
    })) || [];

  const customerStatusData =
    customerData?.data?.customerByStatus?.map((item) => ({
      status: item._id,
      count: item.count,
    })) || [];

  return (
    <Box sx={{ p: 3, backgroundColor: '#F9FAFB', minHeight: '85vh' }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#1F2A44',
          mb: 3,
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card
              sx={{
                backgroundColor: '#fff',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                },
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: '50%',
                      backgroundColor: card.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        color: '#1F2A44',
                        fontSize: '1.1rem',
                        fontFamily: 'Poppins, sans-serif',
                        lineHeight: 1.2,
                      }}
                    >
                      {card.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '0.85rem',
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {card.trendUp ? (
                    <TrendingUpIcon
                      sx={{ color: '#4caf50', fontSize: 14, mr: 0.5 }}
                    />
                  ) : (
                    <TrendingDownIcon
                      sx={{ color: '#f44336', fontSize: 14, mr: 0.5 }}
                    />
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      color: card.trendUp ? '#4caf50' : '#f44336',
                      fontWeight: 500,
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.75rem',
                    }}
                  >
                    {card.trend}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#fff',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              height: { xs: 350, md: 400 },
            }}
          >
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#1F2A44',
                  mb: 2,
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Revenue Trend
              </Typography>
              <Box sx={{ height: 'calc(100% - 60px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#666"
                      fontFamily="Poppins, sans-serif"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="#666"
                      fontFamily="Poppins, sans-serif"
                      fontSize={12}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip
                      formatter={(value: any) => [`₹${value}`, 'Revenue']}
                      labelStyle={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4caf50"
                      fill="#4caf50"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Status Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: '#fff',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              height: { xs: 350, md: 400 },
            }}
          >
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#1F2A44',
                  mb: 2,
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Order Status Distribution
              </Typography>
              <Box sx={{ height: 'calc(100% - 60px)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any) => [value, 'Orders']}
                      labelStyle={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Orders - Full Width */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Card
            sx={{
              backgroundColor: '#fff',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              height: 'fit-content',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#1F2A44',
                  mb: 3,
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Recent Orders
              </Typography>
              <Box>
                {recentOrders.map((order, index) => (
                  <Box key={order._id}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 2,
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', flex: 1 }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: getStatusColor(order.orderStatus),
                            width: 40,
                            height: 40,
                            mr: 2,
                          }}
                        >
                          <ShoppingCartIcon />
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              color: '#1F2A44',
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            {order.uniqueId}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: '#666',
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            {new Date(order.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right', ml: 2 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 'bold',
                            color: '#1F2A44',
                            fontFamily: 'Poppins, sans-serif',
                          }}
                        >
                          {formatCurrency(order.totalAmount)}
                        </Typography>
                        <Chip
                          label={order.orderStatus}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(order.orderStatus),
                            color: 'white',
                            fontSize: '10px',
                            fontFamily: 'Poppins, sans-serif',
                            mt: 0.5,
                          }}
                        />
                      </Box>
                    </Box>
                    {index < recentOrders.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
