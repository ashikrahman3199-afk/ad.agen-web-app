import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Star, CheckCircle2, Heart, ArrowLeft, Calendar } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { adSpaces } from '@/constants/adSpaces';
import WebLayout from '@/components/WebLayout';
import { useApp } from '@/contexts/AppContext';

const { width } = Dimensions.get('window');

export default function AdSpaceDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart } = useApp();
    const [selectedDuration, setSelectedDuration] = useState('1 Week');

    const adSpace = adSpaces.find(s => s.id === id) || adSpaces[0];

    const features = [
        'Prime location',
        'LED display',
        '24/7 visibility',
        'High traffic area'
    ];

    const priceRanges = [
        { label: 'Peak Season', price: '₹97,500', period: 'per week', dates: 'Dec - Feb' },
        { label: 'Regular', price: '₹75,000', period: 'per week', dates: 'Mar - Aug' },
        { label: 'Off Season', price: '₹60,000', period: 'per week', dates: 'Sep - Nov' },
    ];

    const durations = [
        { label: '1 Week', discount: null },
        { label: '2 Weeks', discount: '-5%' },
        { label: '1 Month', discount: '-10%' },
        { label: '3 Months', discount: '-20%' },
    ];

    const handleAddToCart = () => {
        addToCart({
            id: adSpace.id,
            name: adSpace.name,
            price: adSpace.price,
            image: adSpace.image,
            location: adSpace.location,
            duration: 7, // Default to 1 week for now
            quantity: 1
        });
        router.push('/(tabs)/cart');
    };

    return (
        <WebLayout role="client" title="Space Details">
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={20} color={Colors.text.secondary} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>

                <View style={styles.contentGrid}>
                    {/* Left Column - Images & Main Info */}
                    <View style={styles.mainContent}>
                        <Image source={{ uri: adSpace.image }} style={styles.heroImage} />

                        <View style={styles.headerSection}>
                            <Text style={styles.title}>{adSpace.name}</Text>
                            <View style={styles.locationRow}>
                                <MapPin size={16} color={Colors.text.tertiary} />
                                <Text style={styles.locationText}>{adSpace.location.address}</Text>
                            </View>
                            <Text style={styles.impressions}>500K+ daily impressions</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Features</Text>
                            <View style={styles.featuresList}>
                                {features.map((feature, index) => (
                                    <View key={index} style={styles.featureItem}>
                                        <CheckCircle2 size={20} color={Colors.success} />
                                        <Text style={styles.featureText}>{feature}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Price Ranges</Text>
                            <View style={styles.priceGrid}>
                                {priceRanges.map((range, index) => (
                                    <View key={index} style={styles.priceCard}>
                                        <View style={styles.priceHeader}>
                                            <Text style={styles.priceLabel}>{range.label}</Text>
                                            <Text style={styles.priceDates}>{range.dates}</Text>
                                        </View>
                                        <Text style={styles.rangePrice}>{range.price} <Text style={styles.rangePeriod}>{range.period}</Text></Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Available Dates</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datesScroll}>
                                {[15, 20, 25, 1].map((day, i) => (
                                    <View key={i} style={styles.dateCard}>
                                        <Text style={styles.dateMonth}>{i === 3 ? 'Feb' : 'Jan'}</Text>
                                        <Text style={styles.dateDay}>{day}</Text>
                                        <View style={[styles.statusDot, { backgroundColor: i === 1 ? '#10B981' : i === 2 ? '#F59E0B' : '#10B981' }]} />
                                    </View>
                                ))}
                            </ScrollView>
                            <View style={styles.legend}>
                                <View style={styles.legendItem}><View style={[styles.statusDot, { backgroundColor: '#10B981' }]} /><Text style={styles.legendText}>Available</Text></View>
                                <View style={styles.legendItem}><View style={[styles.statusDot, { backgroundColor: '#F59E0B' }]} /><Text style={styles.legendText}>Limited</Text></View>
                                <View style={styles.legendItem}><View style={[styles.statusDot, { backgroundColor: '#EF4444' }]} /><Text style={styles.legendText}>Booked</Text></View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Select Duration</Text>
                            <View style={styles.durationGrid}>
                                {durations.map((item) => (
                                    <TouchableOpacity
                                        key={item.label}
                                        style={[styles.durationCard, selectedDuration === item.label && styles.durationCardActive]}
                                        onPress={() => setSelectedDuration(item.label)}
                                    >
                                        {item.discount && (
                                            <View style={styles.discountBadge}>
                                                <Text style={styles.discountText}>{item.discount}</Text>
                                            </View>
                                        )}
                                        <Text style={[styles.durationText, selectedDuration === item.label && styles.durationTextActive]}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Right Column - Sticky Booking Card (Desktop) / Bottom Bar (Mobile style) */}
                    <View style={styles.sidebar}>
                        <View style={styles.bookingCard}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalPrice}>₹75,000</Text>

                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.wishlistBtn}>
                                    <Heart size={24} color={Colors.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
                                    <Text style={styles.addToCartText}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
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
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 24,
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.secondary,
    },
    contentGrid: {
        flexDirection: 'row',
        gap: 40,
        flexWrap: 'wrap',
    },
    mainContent: {
        flex: 2,
        minWidth: 400,
    },
    sidebar: {
        flex: 1,
        minWidth: 300,
    },
    heroImage: {
        width: '100%',
        height: 300,
        borderRadius: 24,
        marginBottom: 24,
        backgroundColor: '#F3F4F6',
    },
    headerSection: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.text.primary,
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    locationText: {
        fontSize: 16,
        color: Colors.text.secondary,
    },
    impressions: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.secondary,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 16,
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
        fontSize: 16,
        color: Colors.text.primary,
    },
    priceGrid: {
        gap: 12,
    },
    priceCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    priceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    priceLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    priceDates: {
        fontSize: 14,
        color: Colors.text.tertiary,
    },
    rangePrice: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.primary,
    },
    rangePeriod: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.text.secondary,
    },
    datesScroll: {
        gap: 12,
        paddingBottom: 12,
    },
    dateCard: {
        width: 80,
        height: 90,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        ...Colors.shadow.small,
    },
    dateMonth: {
        fontSize: 12,
        color: Colors.text.secondary,
        marginBottom: 4,
    },
    dateDay: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 4,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legend: {
        flexDirection: 'row',
        gap: 24,
        marginTop: 12,
        justifyContent: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    legendText: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    durationGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    durationCard: {
        width: '48%',
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        position: 'relative',
    },
    durationCardActive: {
        borderColor: Colors.primary,
        backgroundColor: '#FFF5EB',
    },
    durationText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    durationTextActive: {
        color: Colors.primary,
    },
    discountBadge: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#F59E0B',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 1,
    },
    discountText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    bookingCard: {
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 24,
        ...Colors.shadow.medium,
        position: 'sticky',
        top: 24,
    },
    totalLabel: {
        fontSize: 14,
        color: Colors.text.secondary,
        marginBottom: 4,
    },
    totalPrice: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.primary,
        marginBottom: 24,
    },
    actionRow: {
        flexDirection: 'row',
        gap: 16,
    },
    wishlistBtn: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartBtn: {
        flex: 1,
        height: 56,
        backgroundColor: Colors.primary,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        ...Colors.shadow.small,
    },
    addToCartText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
