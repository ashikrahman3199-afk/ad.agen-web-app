import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ColorValue,
  ActivityIndicator,
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
  Minus,
  Plus,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';
import { trpc } from '@/lib/trpc';
import { categoryFieldsMap } from '@/constants/categoryFields';

const { width } = Dimensions.get('window');

export default function ServiceDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  
  const { data: service, isLoading, error } = trpc.listings.get.useQuery({ id: id as string });

  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
      if (service) {
          setSelectedDuration(service.minDuration || 1);
      }
  }, [service]);

  if (isLoading) {
      return (
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
              <ActivityIndicator size="large" color={Colors.primary} />
          </View>
      );
  }

  if (!service || error) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.errorText}>Service not found</Text>
      </View>
    );
  }

  const handleIncrement = () => {
      setSelectedDuration(prev => prev + 1);
  };

  const handleDecrement = () => {
      setSelectedDuration(prev => (prev > (service.minDuration || 1) ? prev - 1 : prev));
  };

  const calculateTotal = () => {
    return service.price * selectedDuration;
  };

  const handleAddToCart = () => {
    addToCart(service as any, selectedDuration); // Type cast for now as app context might expect older type
    router.push('/(tabs)/cart');
  };

  const handleWishlist = () => {
    if (isInWishlist(service.id)) {
      removeFromWishlist(service.id);
    } else {
      addToWishlist(service as any);
    }
  };

  // Get field definitions for nice labels
  const categoryConfig = categoryFieldsMap[service.category] || null;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: service.image || 'https://via.placeholder.com/800x600' }} style={styles.image} />
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
            <Text style={styles.imageTitle}>{service.name || service.title}</Text>
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
              <Text style={styles.statValue}>{service.rating || 'New'}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <View style={styles.statIcon}>
                <Users size={20} color={Colors.primary} />
              </View>
              <Text style={styles.statValue}>{service.reach?.split(' ')[0] || 'TBD'}</Text>
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
            <Text style={styles.sectionTitle}>About This Space</Text>
            <Text style={styles.description}>{service.description || 'No description provided.'}</Text>
          </View>

          {/* Dynamic Metadata Details */}
          {service.metadata && Object.keys(service.metadata).length > 0 && (
              <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Specifications</Text>
                  <View style={styles.metaGrid}>
                      {Object.entries(service.metadata).map(([key, value]) => {
                          if (!value) return null;
                          const fieldConfig = categoryConfig?.fields.find(f => f.name === key);
                          const label = fieldConfig ? fieldConfig.label : key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                          return (
                              <View key={key} style={styles.metaItem}>
                                  <Text style={styles.metaLabel}>{label}</Text>
                                  <Text style={styles.metaValue}>{String(value)}</Text>
                              </View>
                          );
                      })}
                  </View>
              </View>
          )}

          {/* Sub Services */}
          {service.subServices && service.subServices.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Included Services</Text>
                <View style={styles.featuresList}>
                  {service.subServices.map((feat: string, index: number) => (
                    <View key={index} style={styles.featureItem}>
                      <CheckCircle2 size={18} color={Colors.success} />
                      <Text style={styles.featureText}>{feat}</Text>
                    </View>
                  ))}
                </View>
              </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pricing Structure</Text>
            <View style={styles.priceRangesList}>
                <View style={styles.priceRangeItem}>
                  <View style={styles.priceRangeHeader}>
                    <Text style={styles.priceRangePeriod}>Vendor Rate</Text>
                    <Text style={styles.priceRangeMonths}>Minimum required: {service.minDuration} {service.priceUnit || 'Days'}</Text>
                  </View>
                  <Text style={styles.priceRangePrice}>
                    ₹{service.price?.toLocaleString('en-IN') || 0}
                    <Text style={styles.priceRangeUnit}> per {service.priceUnit || 'Days'}</Text>
                  </Text>
                </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Duration</Text>
            <View style={styles.counterContainer}>
                <TouchableOpacity style={styles.counterBtn} onPress={handleDecrement} disabled={selectedDuration <= (service.minDuration || 1)}>
                    <Minus size={20} color={selectedDuration <= (service.minDuration || 1) ? Colors.text.tertiary : Colors.primary} />
                </TouchableOpacity>
                <View style={styles.counterValueContainer}>
                    <Text style={styles.counterValue}>{selectedDuration}</Text>
                    <Text style={styles.counterUnit}>{service.priceUnit ? service.priceUnit.toUpperCase() : 'DAYS'}</Text>
                </View>
                <TouchableOpacity style={styles.counterBtn} onPress={handleIncrement}>
                    <Plus size={20} color={Colors.primary} />
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Amount</Text>
          <View style={{flexDirection: 'row', alignItems: 'baseline', gap: 6}}>
             <Text style={styles.priceValue}>₹{calculateTotal().toLocaleString('en-IN')}</Text>
             <Text style={styles.priceRangeUnit}>for {selectedDuration} {service.priceUnit || 'Days'}</Text>
          </View>
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
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 8,
  },
  metaGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      backgroundColor: '#F9FAFB',
      padding: 16,
      borderRadius: 12,
  },
  metaItem: {
      width: '45%',
      marginBottom: 8,
  },
  metaLabel: {
      fontSize: 12,
      color: Colors.text.tertiary,
      marginBottom: 4,
  },
  metaValue: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors.text.primary,
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    fontWeight: '500' as const,
    color: Colors.text.secondary,
  },
  counterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#E5E7EB',
      alignSelf: 'flex-start',
  },
  counterBtn: {
      padding: 16,
  },
  counterValueContainer: {
      alignItems: 'center',
      paddingHorizontal: 24,
  },
  counterValue: {
      fontSize: 18,
      fontWeight: '700',
      color: Colors.text.primary,
  },
  counterUnit: {
      fontSize: 10,
      color: Colors.text.tertiary,
      marginTop: 2,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  priceContainer: {
    flex: 1,
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
    flex: 1,
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
