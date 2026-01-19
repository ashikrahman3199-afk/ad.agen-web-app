import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { 
  ArrowLeft, 
  Heart,
  MapPin,
  Star,
  ShoppingCart,
  Trash2,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();
  const { wishlist, removeFromWishlist, addToCart } = useApp();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.safeBackground} />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {wishlist.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart size={64} color={Colors.text.tertiary} strokeWidth={1.5} />
            <Text style={styles.emptyStateTitle}>No items in wishlist</Text>
            <Text style={styles.emptyStateText}>
              Start adding services you like to your wishlist
            </Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push('/(tabs)/home')}
            >
              <Text style={styles.browseButtonText}>Browse Services</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.wishlistGrid}>
            {wishlist.map(item => (
              <View key={item.id} style={styles.wishlistCard}>
                <TouchableOpacity onPress={() => router.push(`/service-detail?id=${item.id}`)}>
                  <Image source={{ uri: item.image }} style={styles.wishlistImage} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 size={16} color={Colors.text.inverse} />
                  </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.wishlistContent}>
                  <TouchableOpacity onPress={() => router.push(`/service-detail?id=${item.id}`)}>
                    <Text style={styles.wishlistTitle} numberOfLines={2}>{item.title}</Text>
                    <View style={styles.wishlistLocation}>
                      <MapPin size={12} color={Colors.text.secondary} />
                      <Text style={styles.wishlistLocationText} numberOfLines={1}>{item.location}</Text>
                    </View>
                    <View style={styles.wishlistFooter}>
                      <View>
                        <Text style={styles.wishlistPrice}>₹{(item.price / 1000).toFixed(0)}K</Text>
                        <Text style={styles.wishlistPriceUnit}>per {item.priceUnit}</Text>
                      </View>
                      <View style={styles.ratingContainer}>
                        <Star size={14} color={Colors.accent} fill={Colors.accent} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => {
                      addToCart(item, 1);
                    }}
                  >
                    <ShoppingCart size={14} color={Colors.text.inverse} />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  browseButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
  },
  browseButtonText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  wishlistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  wishlistCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    ...Colors.shadow.small,
  },
  wishlistImage: {
    width: '100%',
    height: 140,
  },
  removeButton: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    ...Colors.shadow.medium,
  },
  wishlistContent: {
    padding: 12,
  },
  wishlistTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
    minHeight: 36,
  },
  wishlistLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  wishlistLocationText: {
    fontSize: 12,
    color: Colors.text.secondary,
    flex: 1,
  },
  wishlistFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  wishlistPrice: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  wishlistPriceUnit: {
    fontSize: 10,
    color: Colors.text.secondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    ...Colors.shadow.small,
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  bottomSpacer: {
    height: 20,
  },
});
