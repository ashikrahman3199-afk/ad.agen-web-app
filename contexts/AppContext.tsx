import createContextHook from '@nkzw/create-context-hook';
import { useState, useCallback, useMemo } from 'react';
import { AdSpace } from '@/constants/adSpaces';

export interface CartItem extends AdSpace {
  quantity: number;
  duration: number;
}

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  designStyle: string;
  selectedServices: string[];
  budget: number;
  startDate?: string;
  endDate?: string;
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
}

export interface Booking {
  id: string;
  campaignName: string;
  orderDate: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled' | 'pending';
  amount: number;
  services: string[];
  items: CartItem[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking' | 'wallet';
  details: any;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export const [AppProvider, useApp] = createContextHook(() => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<AdSpace[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentCampaign, setCurrentCampaign] = useState<Partial<Campaign> | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Campaign Approved',
      message: 'Your Summer Sale 2025 campaign has been approved and is now live!',
      type: 'success',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
    },
    {
      id: '2',
      title: 'New Ad Space Available',
      message: 'Premium billboard spot at VR Mall is now available for booking.',
      type: 'info',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false,
    },
    {
      id: '3',
      title: 'Payment Successful',
      message: 'Your payment of ₹75,000 has been processed successfully.',
      type: 'success',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      read: true,
    },
  ]);
  const [selectedLocation, setSelectedLocation] = useState('All Chennai');
  const [activeGenre, setActiveGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = useCallback((adSpace: AdSpace, duration: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === adSpace.id);
      if (existing) {
        return prev.map(item =>
          item.id === adSpace.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...adSpace, quantity: 1, duration }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateCartItemDuration = useCallback((id: string, duration: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, duration } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity * item.duration);
  }, 0);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const createCampaign = useCallback((campaign: Omit<Campaign, 'id' | 'createdAt' | 'status'>) => {
    const newCampaign: Campaign = {
      ...campaign,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'draft',
    };
    setCampaigns(prev => [...prev, newCampaign]);
    return newCampaign;
  }, []);

  const updateCampaign = useCallback((id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev =>
      prev.map(campaign =>
        campaign.id === id ? { ...campaign, ...updates } : campaign
      )
    );
  }, []);

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  }, []);

  const createBooking = useCallback((booking: Omit<Booking, 'id' | 'orderDate'>) => {
    const newBooking: Booking = {
      ...booking,
      id: `ORD-${Date.now().toString().slice(-6)}`,
      orderDate: new Date().toISOString(),
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  }, []);

  const updateBooking = useCallback((id: string, updates: Partial<Booking>) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, ...updates } : booking
      )
    );
  }, []);

  const addPaymentMethod = useCallback((method: Omit<PaymentMethod, 'id'>) => {
    const newMethod: PaymentMethod = {
      ...method,
      id: Date.now().toString(),
    };
    setPaymentMethods(prev => [...prev, newMethod]);
    return newMethod;
  }, []);

  const removePaymentMethod = useCallback((id: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
  }, []);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const addToWishlist = useCallback((adSpace: AdSpace) => {
    setWishlist(prev => {
      const existing = prev.find(item => item.id === adSpace.id);
      if (existing) {
        return prev;
      }
      return [...prev, adSpace];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  }, []);

  const isInWishlist = useCallback((id: string) => {
    return wishlist.some(item => item.id === id);
  }, [wishlist]);

  return useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateCartItemDuration,
    clearCart,
    cartTotal,
    cartItemCount,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    campaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    currentCampaign,
    setCurrentCampaign,
    bookings,
    createBooking,
    updateBooking,
    paymentMethods,
    addPaymentMethod,
    removePaymentMethod,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    unreadNotificationCount,
    selectedLocation,
    setSelectedLocation,
    // Aliases for compatibility with new code
    location: selectedLocation,
    setLocation: setSelectedLocation,
    activeGenre,
    setActiveGenre,
    searchQuery,
    setSearchQuery,
  }), [cart, addToCart, removeFromCart, updateCartItemDuration, clearCart, cartTotal, cartItemCount, wishlist, addToWishlist, removeFromWishlist, isInWishlist, campaigns, createCampaign, updateCampaign, deleteCampaign, currentCampaign, bookings, createBooking, updateBooking, paymentMethods, addPaymentMethod, removePaymentMethod, notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, unreadNotificationCount, selectedLocation, activeGenre, searchQuery]);
});
