import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ColorValue,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  MapPin,
  Star,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  CheckCircle2,
  ShoppingCart,
  Heart,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { adSpaces } from '@/constants/adSpaces';
import { useApp } from '@/contexts/AppContext';

const { width } = Dimensions.get('window');

export default function ServiceDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const service = adSpaces.find(s => s.id === id);

  if (!service) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.errorText}>Service not found</Text>
      </View>
    );
  }

  const durations = [
    { label: '1 Week', value: 1, discount: 0 },
    { label: '2 Weeks', value: 2, discount: 5 },
    { label: '1 Month', value: 4, discount: 10 },
    { label: '3 Months', value: 12, discount: 20 },
  ];

  const availableDates = [
    { date: new Date(2025, 0, 15), status: 'available' as const },
    { date: new Date(2025, 0, 20), status: 'available' as const },
    { date: new Date(2025, 0, 25), status: 'limited' as const },
    { date: new Date(2025, 1, 1), status: 'available' as const },
    { date: new Date(2025, 1, 10), status: 'available' as const },
    { date: new Date(2025, 1, 15), status: 'booked' as const },
  ];

  const priceRanges = [
    { period: 'Peak Season', price: service.price * 1.3, months: 'Dec - Feb' },
    { period: 'Regular', price: service.price, months: 'Mar - Aug' },
    { period: 'Off Season', price: service.price * 0.8, months: 'Sep - Nov' },
  ];

  const calculateTotal = () => {
    const selectedDurationData = durations.find(d => d.value === selectedDuration);
    const discount = selectedDurationData?.discount || 0;
    const subtotal = service.price * selectedDuration;
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const handleAddToCart = () => {
    addToCart(service, selectedDuration);
    router.push('/(tabs)/cart');
  };

  const handleWishlist = () => {
    if (isInWishlist(service.id)) {
      removeFromWishlist(service.id);
    } else {
      addToWishlist(service);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: service.image }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.text.inverse} />
          </TouchableOpacity>
          <View style={styles.imageInfo}>
            <Text style={styles.imageTitle}>{service.title}</Text>
            <View style={styles.imageLocation}>
              <MapPin size={16} color={Colors.text.inverse} />
              <Text style={styles.imageLocationText}>{service.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Star size={20} color={Colors.accent} fill={Colors.accent} />
              </View>
              <Text style={styles.statValue}>{service.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Users size={20} color={Colors.primary} />
              </View>
              <Text style={styles.statValue}>{service.reach.split(' ')[0]}</Text>
              <Text style={styles.statLabel}>Reach</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <TrendingUp size={20} color={Colors.success} />
              </View>
              <Text style={styles.statValue}>High</Text>
              <Text style={styles.statLabel}>Visibility</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{service.description}</Text>
            <Text style={styles.reach}>{service.reach}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresList}>
              {service.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <CheckCircle2 size={18} color={Colors.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Ranges</Text>
            <View style={styles.priceRangesList}>
              {priceRanges.map((range, index) => (
                <View key={index} style={styles.priceRangeItem}>
                  <View style={styles.priceRangeHeader}>
                    <Text style={styles.priceRangePeriod}>{range.period}</Text>
                    <Text style={styles.priceRangeMonths}>{range.months}</Text>
                  </View>
                  <Text style={styles.priceRangePrice}>
                    ₹{range.price.toLocaleString('en-IN')}
                    <Text style={styles.priceRangeUnit}> per {service.priceUnit}</Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Dates</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.datesContainer}
            >
              {availableDates.map((item, index) => {
                const isSelected = selectedDate?.getTime() === item.date.getTime();
                const isAvailable = item.status === 'available';
                const isLimited = item.status === 'limited';
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dateCard,
                      isSelected && styles.dateCardSelected,
                      !isAvailable && !isLimited && styles.dateCardDisabled,
                    ]}
                    onPress={() => isAvailable || isLimited ? setSelectedDate(item.date) : null}
                    disabled={!isAvailable && !isLimited}
                  >
                    <Text style={[
                      styles.dateMonth,
                      isSelected && styles.dateTextSelected,
                      !isAvailable && !isLimited && styles.dateTextDisabled,
                    ]}>
                      {item.date.toLocaleDateString('en-US', { month: 'short' })}
                    </Text>
                    <Text style={[
                      styles.dateDay,
                      isSelected && styles.dateTextSelected,
                      !isAvailable && !isLimited && styles.dateTextDisabled,
                    ]}>
                      {item.date.getDate()}
                    </Text>
                    <View style={[
                      styles.statusDot,
                      item.status === 'available' && styles.statusAvailable,
                      item.status === 'limited' && styles.statusLimited,
                      item.status === 'booked' && styles.statusBooked,
                    ]} />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.statusAvailable]} />
                <Text style={styles.legendText}>Available</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.statusLimited]} />
                <Text style={styles.legendText}>Limited</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.statusBooked]} />
                <Text style={styles.legendText}>Booked</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Duration</Text>
            <View style={styles.durationGrid}>
              {durations.map((duration) => {
                const isSelected = selectedDuration === duration.value;
                return (
                  <TouchableOpacity
                    key={duration.value}
                    style={[
                      styles.durationCard,
                      isSelected && styles.durationCardSelected,
                    ]}
                    onPress={() => setSelectedDuration(duration.value)}
                  >
                    <Text style={[
                      styles.durationLabel,
                      isSelected && styles.durationLabelSelected,
                    ]}>
                      {duration.label}
                    </Text>
                    {duration.discount > 0 && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>-{duration.discount}%</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Amount</Text>
          <Text style={styles.priceValue}>₹{calculateTotal().toLocaleString('en-IN')}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={handleWishlist}
          >
            <Heart 
              size={20} 
              color={isInWishlist(service.id) ? Colors.error : Colors.primary}
              fill={isInWishlist(service.id) ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleAddToCart}
          >
            <LinearGradient
              colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
              style={styles.bookButtonGradient}
            >
              <Text style={styles.bookButtonText}>Add to Cart</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  imageContainer: {
    width: width,
    height: 300,
    position: 'relative' as const,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  backButton: {
    position: 'absolute' as const,
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageInfo: {
    position: 'absolute' as const,
    bottom: 20,
    left: 20,
    right: 20,
  },
  imageTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
    marginBottom: 8,
  },
  imageLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  imageLocationText: {
    fontSize: 14,
    color: Colors.text.inverse,
    opacity: 0.9,
  },
  mainContent: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    ...Colors.shadow.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.text.secondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 22,
    marginBottom: 8,
  },
  reach: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '600' as const,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: Colors.text.primary,
    flex: 1,
  },
  priceRangesList: {
    gap: 12,
  },
  priceRangeItem: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    ...Colors.shadow.small,
  },
  priceRangeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceRangePeriod: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  priceRangeMonths: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  priceRangePrice: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  priceRangeUnit: {
    fontSize: 12,
    fontWeight: '400' as const,
    color: Colors.text.secondary,
  },
  datesContainer: {
    gap: 12,
    paddingBottom: 12,
  },
  dateCard: {
    width: 80,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Colors.shadow.small,
  },
  dateCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  dateCardDisabled: {
    opacity: 0.5,
  },
  dateMonth: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '600' as const,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  dateTextSelected: {
    color: Colors.primary,
  },
  dateTextDisabled: {
    color: Colors.text.tertiary,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  statusAvailable: {
    backgroundColor: Colors.success,
  },
  statusLimited: {
    backgroundColor: Colors.accent,
  },
  statusBooked: {
    backgroundColor: Colors.error,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  durationCard: {
    width: (width - 64) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border.light,
    position: 'relative' as const,
  },
  durationCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}10`,
  },
  durationLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  durationLabelSelected: {
    color: Colors.primary,
  },
  discountBadge: {
    position: 'absolute' as const,
    top: -8,
    right: -8,
    backgroundColor: Colors.accent,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  bottomSpacer: {
    height: 20,
  },
  footer: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    padding: 20,
    paddingBottom: 30,
    ...Colors.shadow.large,
  },
  priceContainer: {
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cartButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButton: {
    flex: 1,
    borderRadius: 28,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  errorText: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    marginTop: 100,
  },
});
