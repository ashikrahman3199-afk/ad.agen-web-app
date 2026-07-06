import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, Star, CheckCircle2, Heart, ArrowLeft, Calendar } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { trpc } from '@/lib/trpc';
import WebLayout from '@/components/WebLayout';
import { useApp } from '@/contexts/AppContext';
import { categoryFieldsMap } from '@/constants/categoryFields';

const { width } = Dimensions.get('window');

export default function AdSpaceDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { addToCart, wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
    const [duration, setDuration] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { data: adSpace, isLoading } = trpc.listings.get.useQuery({ id: id as string });
    
    const isFavourite = adSpace ? isInWishlist(adSpace.id) : false;
    const categoryConfig = adSpace ? categoryFieldsMap[adSpace.category || adSpace.categoryId || adSpace.type] || null : null;

    const handleToggleWishlist = () => {
        if (isFavourite) {
            removeFromWishlist(adSpace.id);
        } else {
            addToWishlist(adSpace);
        }
    };

    // Set initial duration when data loads
    React.useEffect(() => {
        if (adSpace) {
            setDuration(adSpace.minDuration || 1);
        }
    }, [adSpace]);

    const handleAddToCart = () => {
        if (!adSpace) return;
        addToCart({
            id: adSpace.id,
            name: adSpace.title,
            price: adSpace.price,
            image: adSpace.images?.length ? adSpace.images[0] : adSpace.image,
            location: adSpace.location,
            duration: duration,
            quantity: duration,
        });
        router.push('/(tabs)/cart');
    };

    const handleScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        setActiveImageIndex(index);
    };

    if (isLoading) {
        return (
            <WebLayout role="client" title="Space Details">
                <View style={[styles.container, { padding: 40, alignItems: 'center' }]}>
                    <Text>Loading details...</Text>
                </View>
            </WebLayout>
        );
    }

    if (!adSpace) {
        return (
            <WebLayout role="client" title="Space Details">
                <View style={[styles.container, { padding: 40, alignItems: 'center' }]}>
                    <Text>Space not found.</Text>
                </View>
            </WebLayout>
        );
    }

    const images = adSpace.images?.length > 0 ? adSpace.images : [adSpace.image || 'https://via.placeholder.com/600x400'];
    const minDuration = adSpace.minDuration || 1;
    const durationUnit = adSpace.priceUnit || 'Days';
    const totalPrice = adSpace.price * duration;

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
                        <View style={styles.carouselContainer}>
                            <Image source={{ uri: images[activeImageIndex] }} style={styles.heroImage} />
                            {images.length > 1 && (
                                <View style={styles.pagination}>
                                    {images.map((_, idx) => (
                                        <View key={idx} style={[styles.dot, activeImageIndex === idx && styles.activeDot]} />
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={styles.headerSection}>
                            <Text style={styles.title}>{adSpace.name || adSpace.title}</Text>
                            <View style={styles.locationRow}>
                                <MapPin size={16} color={Colors.text.tertiary} />
                                <Text style={styles.locationText}>{adSpace.location}, Chennai</Text>
                            </View>
                            <Text style={styles.impressions}>{adSpace.reach}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>About This Space</Text>
                            <Text style={styles.descriptionText}>{adSpace.description}</Text>
                        </View>

                        {/* Dynamic Metadata Details */}
                        {adSpace.metadata && Object.keys(adSpace.metadata).length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Specifications</Text>
                                <View style={styles.metaGrid}>
                                    {Object.entries(adSpace.metadata).map(([key, value]) => {
                                        if (!value) return null;
                                        const fieldConfig = categoryConfig?.fields.find((f: any) => f.name === key);
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

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Features</Text>
                            <View style={styles.featuresList}>
                                {adSpace.features && adSpace.features.length > 0 ? adSpace.features.map((feature: string, index: number) => (
                                    <View key={index} style={styles.featureItem}>
                                        <CheckCircle2 size={20} color={Colors.success} />
                                        <Text style={styles.featureText}>{feature}</Text>
                                    </View>
                                )) : <Text style={{ color: Colors.text.tertiary }}>No features listed</Text>}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Pricing Structure</Text>
                            <View style={styles.priceCard}>
                                <View style={styles.priceHeader}>
                                    <Text style={styles.priceLabel}>Vendor Rate</Text>
                                    <Text style={styles.priceDates}>Minimum required: {minDuration} {durationUnit}</Text>
                                </View>
                                <Text style={styles.rangePrice}>₹{adSpace.price.toLocaleString()} <Text style={styles.rangePeriod}>per {durationUnit}</Text></Text>
                            </View>
                        </View>
                    </View>

                    {/* Right Column - Sticky Booking Card */}
                    <View style={styles.sidebar}>
                        <View style={styles.bookingCard}>
                            <View style={styles.dateSelector}>
                                <Text style={styles.durationLabel}>Select Dates</Text>
                                <View style={styles.dateInputRow}>
                                    <View style={styles.dateInputContainer}>
                                        <Text style={styles.dateInputLabel}>Start Date</Text>
                                        <TextInput 
                                            style={styles.dateInput} 
                                            placeholder="YYYY-MM-DD"
                                            value={startDate}
                                            onChangeText={setStartDate}
                                        />
                                    </View>
                                    <View style={styles.dateInputContainer}>
                                        <Text style={styles.dateInputLabel}>End Date</Text>
                                        <TextInput 
                                            style={styles.dateInput} 
                                            placeholder="YYYY-MM-DD"
                                            value={endDate}
                                            onChangeText={setEndDate}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.durationSelector}>
                                <Text style={styles.durationLabel}>Select Duration</Text>
                                <View style={styles.stepperContainer}>
                                    <TouchableOpacity 
                                        style={[styles.stepperBtn, duration <= minDuration && styles.stepperBtnDisabled]} 
                                        onPress={() => setDuration(prev => Math.max(minDuration, prev - 1))}
                                        disabled={duration <= minDuration}
                                    >
                                        <Text style={styles.stepperBtnText}>-</Text>
                                    </TouchableOpacity>
                                    <View style={styles.stepperValueContainer}>
                                        <Text style={styles.stepperValue}>{duration}</Text>
                                        <Text style={styles.stepperUnit}>{durationUnit}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.stepperBtn} 
                                        onPress={() => setDuration(prev => prev + 1)}
                                    >
                                        <Text style={styles.stepperBtnText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalPrice}>₹{totalPrice.toLocaleString()} <Text style={styles.rangePeriod}>for {duration} {durationUnit}</Text></Text>

                            <View style={styles.actionRow}>
                                <TouchableOpacity style={styles.wishlistBtn} onPress={handleToggleWishlist}>
                                    <Heart size={24} color={isFavourite ? "#EF4444" : Colors.primary} fill={isFavourite ? "#EF4444" : "none"} />
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
        alignSelf: 'flex-start',
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
        height: 350,
        borderRadius: 24,
        marginBottom: 24,
        backgroundColor: '#F3F4F6',
        resizeMode: 'cover',
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
    descriptionText: {
        fontSize: 16,
        color: Colors.text.secondary,
        lineHeight: 24,
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
    carouselContainer: {
        marginBottom: 24,
    },
    carousel: {
        width: '100%',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeDot: {
        backgroundColor: '#FFFFFF',
        width: 12,
    },
    durationSelector: {
        marginBottom: 24,
    },
    durationLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 12,
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    stepperBtn: {
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        ...Colors.shadow.small,
    },
    stepperBtnDisabled: {
        opacity: 0.5,
    },
    stepperBtnText: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.primary,
    },
    metaGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    metaItem: {
        width: '45%',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    metaLabel: {
        fontSize: 14,
        color: Colors.text.tertiary,
        marginBottom: 4,
    },
    metaValue: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    dateSelector: {
        marginBottom: 24,
    },
    dateInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    dateInputContainer: {
        flex: 1,
    },
    dateInputLabel: {
        fontSize: 12,
        color: Colors.text.secondary,
        marginBottom: 6,
    },
    dateInput: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 12,
        fontSize: 14,
        color: Colors.text.primary,
    },
    stepperValueContainer: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.primary,
    },
    stepperValueContainer: {
        alignItems: 'center',
    },
    stepperValue: {
        fontSize: 20,
        fontWeight: '800',
        color: Colors.text.primary,
    },
    stepperUnit: {
        fontSize: 12,
        color: Colors.text.secondary,
        textTransform: 'uppercase',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginBottom: 24,
    },
});
