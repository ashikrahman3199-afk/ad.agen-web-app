import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { 
  ArrowLeft, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Package,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';

type BookingStatus = 'active' | 'completed' | 'cancelled' | 'pending';

interface Booking {
  id: string;
  campaignName: string;
  orderDate: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  amount: number;
  services: string[];
}

export default function BookingsScreen() {
  const insets = useSafeAreaInsets();
  const { bookings } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<BookingStatus | 'all'>('all');

  const allBookings = [
    ...bookings,
    {
      id: 'ORD-123456',
      campaignName: 'Summer Sale 2024',
      orderDate: '2024-01-15',
      startDate: '2024-02-01',
      endDate: '2024-03-01',
      status: 'active' as BookingStatus,
      amount: 250000,
      services: ['Billboards', 'Digital', 'Social Media'],
      items: [],
    },
    {
      id: 'ORD-123455',
      campaignName: 'Product Launch',
      orderDate: '2024-01-10',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      status: 'completed' as BookingStatus,
      amount: 180000,
      services: ['Print Media', 'Radio'],
      items: [],
    },
    {
      id: 'ORD-123454',
      campaignName: 'Brand Awareness',
      orderDate: '2024-01-05',
      startDate: '2024-01-25',
      endDate: '2024-02-25',
      status: 'pending' as BookingStatus,
      amount: 320000,
      services: ['Cinema', 'Influencers', 'Digital'],
      items: [],
    },
  ];

  const filters: { id: BookingStatus | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filteredBookings = selectedFilter === 'all'
    ? allBookings
    : allBookings.filter(b => b.status === selectedFilter);

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case 'active':
        return <TrendingUp size={18} color={Colors.success} />;
      case 'completed':
        return <CheckCircle2 size={18} color={Colors.primary} />;
      case 'cancelled':
        return <XCircle size={18} color={Colors.error} />;
      case 'pending':
        return <Clock size={18} color={Colors.warning} />;
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'active':
        return Colors.success;
      case 'completed':
        return Colors.primary;
      case 'cancelled':
        return Colors.error;
      case 'pending':
        return Colors.warning;
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.safeBackground} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookings & History</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                selectedFilter === filter.id && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter.id && styles.filterChipTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Package size={64} color={Colors.text.tertiary} strokeWidth={1.5} />
            <Text style={styles.emptyStateTitle}>No bookings found</Text>
            <Text style={styles.emptyStateText}>
              {selectedFilter === 'all'
                ? 'You have not made any bookings yet'
                : `No ${selectedFilter} bookings`}
            </Text>
          </View>
        ) : (
          <View style={styles.bookingsList}>
            {filteredBookings.map(booking => (
              <TouchableOpacity key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingHeaderLeft}>
                    <Text style={styles.bookingName}>{booking.campaignName}</Text>
                    <Text style={styles.bookingId}>{booking.id}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(booking.status) + '20' },
                    ]}
                  >
                    {getStatusIcon(booking.status)}
                    <Text
                      style={[
                        styles.statusText,
                        { color: getStatusColor(booking.status) },
                      ]}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <Calendar size={16} color={Colors.text.secondary} />
                    <Text style={styles.detailLabel}>Order Date:</Text>
                    <Text style={styles.detailValue}>
                      {new Date(booking.orderDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Clock size={16} color={Colors.text.secondary} />
                    <Text style={styles.detailLabel}>Duration:</Text>
                    <Text style={styles.detailValue}>
                      {new Date(booking.startDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                      {' - '}
                      {new Date(booking.endDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </Text>
                  </View>
                </View>

                <View style={styles.servicesContainer}>
                  <Text style={styles.servicesLabel}>Services:</Text>
                  <View style={styles.servicesTags}>
                    {booking.services.map(service => (
                      <View key={service} style={styles.serviceTag}>
                        <Text style={styles.serviceTagText}>{service}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.bookingFooter}>
                  <View>
                    <Text style={styles.amountLabel}>Total Amount</Text>
                    <Text style={styles.amountValue}>
                      ₹{booking.amount.toLocaleString('en-IN')}
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.viewButton}
                    onPress={() => router.push(`/service-detail?id=1`)}
                  >
                    <Text style={styles.viewButtonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeBackground: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  filtersContainer: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  filtersContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border.light,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  filterChipTextActive: {
    color: Colors.text.inverse,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  emptyStateText: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
  },
  bookingsList: {
    gap: 16,
  },
  bookingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    ...Colors.shadow.small,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bookingHeaderLeft: {
    flex: 1,
    marginRight: 12,
  },
  bookingName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  bookingId: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
  bookingDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  servicesContainer: {
    gap: 8,
  },
  servicesLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  servicesTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceTag: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceTagText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  amountLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  viewButton: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  bottomSpacer: {
    height: 20,
  },
});
