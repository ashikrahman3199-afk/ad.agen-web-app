import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { TrendingUp, Eye, Users, Calendar, DollarSign, User, Clock, Heart } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const router = useRouter();
  const { bookings } = useApp();
  const insets = useSafeAreaInsets();
  const lastScrollY = useRef(0);
  const headerTranslateY = useRef(new Animated.Value(0)).current;

  const recentBookings = bookings.slice(0, 3);

  const stats = [
    { id: '1', label: 'Reach', value: '4.5M', change: '+12%', icon: Users, color: Colors.primary },
    { id: '2', label: 'Visibility', value: '78%', change: '+5%', icon: Eye, color: Colors.info },
    { id: '4', label: 'Total Spend', value: '₹1.5L', change: '-3%', icon: DollarSign, color: Colors.accent },
  ];

  const recentCampaigns = [
    { id: '1', name: 'Summer Sale 2025', status: 'active', reach: '2.1M', budget: '₹75,000', daysLeft: 12 },
    { id: '2', name: 'Brand Awareness Q1', status: 'active', reach: '1.8M', budget: '₹50,000', daysLeft: 25 },
    { id: '3', name: 'Product Launch', status: 'completed', reach: '3.2M', budget: '₹1,20,000', daysLeft: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return Colors.success;
      case 'completed':
        return Colors.info;
      case 'pending':
        return Colors.accent;
      case 'cancelled':
        return Colors.error;
      default:
        return Colors.text.tertiary;
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollDiff = currentScrollY - lastScrollY.current;

    if (currentScrollY <= 0) {
      Animated.spring(headerTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }).start();
    } else if (scrollDiff > 0 && currentScrollY > 50) {
      Animated.spring(headerTranslateY, {
        toValue: -80,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }).start();
    } else if (scrollDiff < -5) {
      Animated.spring(headerTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }).start();
    }

    lastScrollY.current = currentScrollY;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      
      <Animated.View style={[
        styles.customHeader,
        {
          paddingTop: insets.top + 12,
          transform: [{ translateY: headerTranslateY }],
        },
      ]}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => router.push('/wishlist' as any)}
        >
          <Heart size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.customHeaderTitle}>Dashboard</Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => router.push('/(tabs)/profile')}
        >
          <User size={24} color={Colors.primary} />
        </TouchableOpacity>
      </Animated.View>
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <TouchableOpacity onPress={() => router.push('/bookings')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentBookings.length > 0 ? (
            recentBookings.map(booking => (
              <TouchableOpacity 
                key={booking.id} 
                style={styles.bookingCard}
                onPress={() => router.push('/bookings')}
              >
                <View style={styles.bookingHeader}>
                  <View style={styles.bookingInfo}>
                    <Text style={styles.bookingName}>{booking.campaignName}</Text>
                    <View style={[
                      styles.bookingStatusBadge,
                      { backgroundColor: `${getStatusColor(booking.status)}15` }
                    ]}>
                      <Text style={[
                        styles.bookingStatusText,
                        { color: getStatusColor(booking.status) }
                      ]}>
                        {booking.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.bookingAmount}>₹{booking.amount.toLocaleString('en-IN')}</Text>
                </View>

                <View style={styles.bookingDetails}>
                  <View style={styles.bookingDetailRow}>
                    <Calendar size={14} color={Colors.text.secondary} />
                    <Text style={styles.bookingDetailText}>
                      {new Date(booking.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(booking.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </Text>
                  </View>
                  <View style={styles.bookingDetailRow}>
                    <Clock size={14} color={Colors.text.secondary} />
                    <Text style={styles.bookingDetailText}>
                      Order: {new Date(booking.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </Text>
                  </View>
                </View>

                <View style={styles.bookingServices}>
                  {booking.services.slice(0, 3).map((service, idx) => (
                    <View key={idx} style={styles.serviceTag}>
                      <Text style={styles.serviceTagText}>{service}</Text>
                    </View>
                  ))}
                  {booking.services.length > 3 && (
                    <View style={styles.serviceTag}>
                      <Text style={styles.serviceTagText}>+{booking.services.length - 3}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Calendar size={48} color={Colors.text.tertiary} />
              <Text style={styles.emptyStateText}>No bookings yet</Text>
              <TouchableOpacity 
                style={styles.emptyStateButton}
                onPress={() => router.push('/(tabs)/home')}
              >
                <Text style={styles.emptyStateButtonText}>Browse Services</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.statsGrid}>
          {stats.map(stat => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            return (
              <View key={stat.id} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <Icon size={24} color={stat.color} />
                </View>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <View style={styles.statChange}>
                  <TrendingUp 
                    size={12} 
                    color={isPositive ? Colors.success : Colors.error}
                    style={{ transform: [{ rotate: isPositive ? '0deg' : '180deg' }] }}
                  />
                  <Text style={[
                    styles.statChangeText,
                    { color: isPositive ? Colors.success : Colors.error }
                  ]}>
                    {stat.change}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Campaigns</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentCampaigns.map(campaign => (
            <TouchableOpacity 
              key={campaign.id} 
              style={styles.campaignCard}
              onPress={() => {
                console.log('Campaign clicked:', campaign.id);
              }}
            >
              <View style={styles.campaignHeader}>
                <View style={styles.campaignInfo}>
                  <Text style={styles.campaignName}>{campaign.name}</Text>
                  <View style={[
                    styles.statusBadge,
                    campaign.status === 'active' ? styles.statusActive : styles.statusCompleted
                  ]}>
                    <Text style={[
                      styles.statusText,
                      campaign.status === 'active' ? styles.statusTextActive : styles.statusTextCompleted
                    ]}>
                      {campaign.status}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.campaignStats}>
                <View style={styles.campaignStat}>
                  <Users size={16} color={Colors.text.secondary} />
                  <Text style={styles.campaignStatLabel}>Reach</Text>
                  <Text style={styles.campaignStatValue}>{campaign.reach}</Text>
                </View>
                <View style={styles.campaignStat}>
                  <DollarSign size={16} color={Colors.text.secondary} />
                  <Text style={styles.campaignStatLabel}>Budget</Text>
                  <Text style={styles.campaignStatValue}>{campaign.budget}</Text>
                </View>
                {campaign.status === 'active' && (
                  <View style={styles.campaignStat}>
                    <Calendar size={16} color={Colors.text.secondary} />
                    <Text style={styles.campaignStatLabel}>Days Left</Text>
                    <Text style={styles.campaignStatValue}>{campaign.daysLeft}</Text>
                  </View>
                )}
              </View>

              {campaign.status === 'active' && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${(30 - campaign.daysLeft) / 30 * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {Math.round((30 - campaign.daysLeft) / 30 * 100)}% Complete
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>AI Insights</Text>
          <Text style={styles.insightsText}>
            Your campaigns are performing 15% better than industry average. Consider increasing budget for &quot;Summer Sale 2025&quot; to maximize reach during peak season.
          </Text>
          <TouchableOpacity 
            style={styles.insightsButton}
            onPress={() => router.push('/ai-recommendations')}
          >
            <Text style={styles.insightsButtonText}>View Recommendations</Text>
          </TouchableOpacity>
        </View>

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
  customHeader: {
    backgroundColor: Colors.surface,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    ...Colors.shadow.small,
  },
  customHeaderTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  bookingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Colors.shadow.small,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
    gap: 8,
  },
  bookingName: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  bookingStatusBadge: {
    alignSelf: 'flex-start' as const,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bookingStatusText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  bookingAmount: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  bookingDetails: {
    gap: 8,
    marginBottom: 12,
  },
  bookingDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookingDetailText: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  bookingServices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceTag: {
    backgroundColor: `${Colors.primary}15`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceTagText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    ...Colors.shadow.small,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 16,
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emptyStateButtonText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 56) / 3,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    ...Colors.shadow.small,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statChangeText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  campaignCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Colors.shadow.small,
  },
  campaignHeader: {
    marginBottom: 16,
  },
  campaignInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  campaignName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: `${Colors.success}15`,
  },
  statusCompleted: {
    backgroundColor: `${Colors.text.tertiary}15`,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  statusTextActive: {
    color: Colors.success,
  },
  statusTextCompleted: {
    color: Colors.text.tertiary,
  },
  campaignStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  campaignStat: {
    flex: 1,
    gap: 4,
  },
  campaignStatLabel: {
    fontSize: 11,
    color: Colors.text.secondary,
  },
  campaignStatValue: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border.light,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: Colors.text.secondary,
    textAlign: 'right' as const,
  },
  insightsCard: {
    backgroundColor: `${Colors.info}10`,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: `${Colors.info}30`,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  insightsText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  insightsButton: {
    alignSelf: 'flex-start' as const,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.info,
    borderRadius: 8,
  },
  insightsButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.inverse,
  },
  bottomSpacer: {
    height: 32,
  },
});
