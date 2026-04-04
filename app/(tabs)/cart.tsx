import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Trash2, Plus, Minus } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';
import WebLayout from '@/components/WebLayout';

export default function CartScreen() {
  const { cart, removeFromCart, cartTotal } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'cart' | 'bookings'>('cart');

  const platformFee = cartTotal * 0.05; // 5% fee
  const gst = cartTotal * 0.18; // 18% GST
  const finalTotal = cartTotal + platformFee + gst;

  return (
    <WebLayout role="client" title="Cart">
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'cart' && styles.activeTab]}
            onPress={() => setActiveTab('cart')}
          >
            <Text style={[styles.tabText, activeTab === 'cart' && styles.activeTabText]}>My Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'bookings' && styles.activeTab]}
            onPress={() => setActiveTab('bookings')}
          >
            <Text style={[styles.tabText, activeTab === 'bookings' && styles.activeTabText]}>My Bookings</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'cart' ? (
          <View style={styles.contentGrid}>
            {/* Cart Items List */}
            <View style={styles.listSection}>
              {cart.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyText}>Your cart is empty.</Text>
                  <TouchableOpacity style={styles.browseBtn} onPress={() => router.push('/(tabs)/home')}>
                    <Text style={styles.browseBtnText}>Browse Ad Spaces</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                cart.map((item) => (
                  <View key={item.id} style={styles.card}>
                    <Image source={{ uri: item.image }} style={styles.thumb} />
                    <View style={styles.itemContent}>
                      <View style={styles.itemHeader}>
                        <View>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                          <Text style={styles.itemLocation}>{item.location}</Text>
                          <Text style={styles.itemType}>{item.category || 'Billboards'}</Text>
                        </View>
                        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                          <Trash2 size={20} color={Colors.error} />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.itemFooter}>
                        <View>
                          <Text style={styles.itemPrice}>₹{item.price.toLocaleString()}</Text>
                          <Text style={styles.itemPeriod}>per week</Text>
                        </View>

                        <View style={styles.stepper}>
                          <TouchableOpacity style={styles.stepBtn}>
                            <Minus size={16} color={Colors.text.secondary} />
                          </TouchableOpacity>
                          <View style={styles.stepValue}>
                            <Text style={styles.stepText}>{item.quantity}</Text>
                            <Text style={styles.stepLabel}>weeks</Text>
                          </View>
                          <TouchableOpacity style={styles.stepBtn}>
                            <Plus size={16} color={Colors.primary} />
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View style={styles.itemSubtotal}>
                        <Text style={styles.subtotalLabel}>Subtotal:</Text>
                        <Text style={styles.subtotalValue}>₹{(item.price * item.quantity).toLocaleString()}</Text>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>

            {/* Order Summary */}
            {cart.length > 0 && (
              <View style={styles.summarySection}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryTitle}>Order Summary</Text>

                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Items ({cart.length})</Text>
                    <Text style={styles.summaryValue}>₹{cartTotal.toLocaleString()}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Platform Fee</Text>
                    <Text style={styles.summaryValue}>₹{platformFee.toLocaleString()}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>GST (18%)</Text>
                    <Text style={styles.summaryValue}>₹{gst.toLocaleString()}</Text>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>₹{finalTotal.toLocaleString()}</Text>
                  </View>
                </View>

                <View style={styles.footer}>
                  <View>
                    <Text style={styles.footerLabel}>Total</Text>
                    <Text style={styles.footerTotal}>₹{finalTotal.toLocaleString()}</Text>
                  </View>
                  <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/booking')}>
                    <Text style={styles.checkoutText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.bookingsContainer}>
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No past bookings found.</Text>
              <TouchableOpacity style={styles.browseBtn} onPress={() => setActiveTab('cart')}>
                <Text style={styles.browseBtnText}>Go to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </WebLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  bookingsContainer: {
    width: '100%',
  },
  contentGrid: {
    flexDirection: 'row',
    gap: 32,
    flexWrap: 'wrap',
  },
  listSection: {
    flex: 1.5,
    minWidth: 400,
    gap: 24,
  },
  summarySection: {
    flex: 1,
    minWidth: 300,
    gap: 24,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  browseBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  browseBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 16,
    gap: 16,
    ...Colors.shadow.small,
  },
  thumb: {
    width: 120,
    height: 160,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  itemType: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  itemPeriod: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepValue: {
    alignItems: 'center',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  stepLabel: {
    fontSize: 10,
    color: Colors.text.secondary,
  },
  itemSubtotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  subtotalLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    ...Colors.shadow.small,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    marginTop: 24,
    ...Colors.shadow.medium,
  },
  footerLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  footerTotal: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text.primary,
  },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
    ...Colors.shadow.small,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
