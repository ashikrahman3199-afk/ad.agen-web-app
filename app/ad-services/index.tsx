import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import {
    Plane, Clapperboard, MonitorPlay, User, BookOpen, Newspaper, Map, Radio, Tv, Smartphone,
    MapPin, Star, Filter, Clock, X, Navigation, Monitor
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';
import { useApp } from '@/contexts/AppContext';
import { categories } from '@/constants/adSpaces';
import { trpc } from '@/lib/trpc';
import {
    Users, Bus, Car, Zap, Train, Box, Truck
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AdServicesScreen() {
    const router = useRouter();
    const { location } = useApp();
    const [activeGenre, setActiveGenre] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const { data: adSpaces = [], isLoading } = trpc.listings.list.useQuery();

    const [priceRange, setPriceRange] = useState('All');
    const [minRating, setMinRating] = useState(0);
    const [onlyAvailable, setOnlyAvailable] = useState(false);

    const iconMap: Record<string, any> = {
        film: Clapperboard,
        newspaper: Newspaper,
        users: Users,
        bus: Bus,
        car: Car,
        navigation: Navigation,
        zap: Zap,
        train: Train,
        tv: Tv,
        smartphone: Smartphone,
        box: Box,
        truck: Truck,
        billboard: MonitorPlay,
        led_billboard: MonitorPlay,
        radio: Radio,
        monitor: Monitor,
        'minimize-2': MapPin,
    };

    // Transform categories for the UI
    const genres = [
        { id: 'All', label: 'All', icon: Star },
        ...categories.map(cat => ({
            id: cat.id, // Use ID for filtering
            label: cat.name,
            icon: iconMap[cat.icon] || MapPin
        }))
    ];



    // Filter Logic
    const filteredSpaces = adSpaces.filter((space: any) => {
        const matchesLocation = location === 'All Chennai' || location === 'All Locations' || space.location === location;

        const spaceCat = space.category || space.categoryId || space.type;
        const matchesGenre = activeGenre === 'All' || spaceCat === activeGenre;

        let matchesPrice = true;
        if (priceRange === 'Under 50k') matchesPrice = space.price < 50000;
        else if (priceRange === '50k - 1L') matchesPrice = space.price >= 50000 && space.price <= 100000;
        else if (priceRange === 'Above 1L') matchesPrice = space.price > 100000;

        const matchesRating = space.rating >= minRating;
        const matchesAvailability = onlyAvailable ? space.available : true;

        return matchesLocation && matchesGenre && matchesPrice && matchesRating && matchesAvailability;
    });

    // Count active filters
    const activeFilterCount = (priceRange !== 'All' ? 1 : 0) + (minRating > 0 ? 1 : 0) + (onlyAvailable ? 1 : 0);

    return (
        <WebLayout role="client" title="Ad Services">
            <View style={styles.container}>

                {/* Genre List - Interactive */}
                <View style={styles.genreSection}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.genreList}>
                        {genres.map((genre) => (
                            <TouchableOpacity
                                key={genre.id}
                                style={[styles.genreChip, activeGenre === genre.id && styles.activeGenreChip]}
                                onPress={() => setActiveGenre(genre.id)}
                            >
                                <genre.icon size={16} color={activeGenre === genre.id ? '#FFFFFF' : Colors.text.secondary} />
                                <Text style={[styles.genreLabel, activeGenre === genre.id && styles.activeGenreLabel]}>{genre.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Browse Spaces Header & Filters */}
                <View style={styles.headerSection}>
                    <View>
                        <Text style={styles.pageTitle}>Browse Spaces</Text>
                        <Text style={styles.subtitle}>Showing results for {location}</Text>
                    </View>
                    <TouchableOpacity style={[styles.filterBtn, activeFilterCount > 0 && { backgroundColor: Colors.primary, borderColor: Colors.primary }]} onPress={() => setShowFilters(true)}>
                        <Filter size={18} color={activeFilterCount > 0 ? '#FFFFFF' : Colors.text.primary} />
                        <Text style={[styles.filterText, activeFilterCount > 0 && { color: '#FFFFFF' }]}>
                            Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Filter Modal */}
                <Modal
                    visible={showFilters}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowFilters(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Filter Spaces</Text>
                                <TouchableOpacity onPress={() => setShowFilters(false)}>
                                    <X size={24} color={Colors.text.primary} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.modalBody}>
                                {/* Price Filter */}
                                <View style={styles.filterSection}>
                                    <Text style={styles.filterSectionTitle}>Price Range</Text>
                                    <View style={styles.filterOptionsGrid}>
                                        {['All', 'Under 50k', '50k - 1L', 'Above 1L'].map(range => (
                                            <TouchableOpacity 
                                                key={range}
                                                style={[styles.filterOptionBtn, priceRange === range && styles.filterOptionBtnActive]}
                                                onPress={() => setPriceRange(range)}
                                            >
                                                <Text style={[styles.filterOptionText, priceRange === range && styles.filterOptionTextActive]}>{range}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Rating Filter */}
                                <View style={styles.filterSection}>
                                    <Text style={styles.filterSectionTitle}>Minimum Rating</Text>
                                    <View style={styles.filterOptionsGrid}>
                                        {[
                                            { label: 'Any', value: 0 },
                                            { label: '3+ Stars', value: 3 },
                                            { label: '4+ Stars', value: 4 },
                                            { label: '4.5+ Stars', value: 4.5 }
                                        ].map(rating => (
                                            <TouchableOpacity 
                                                key={rating.label}
                                                style={[styles.filterOptionBtn, minRating === rating.value && styles.filterOptionBtnActive]}
                                                onPress={() => setMinRating(rating.value)}
                                            >
                                                <Text style={[styles.filterOptionText, minRating === rating.value && styles.filterOptionTextActive]}>{rating.label}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                {/* Availability Toggle */}
                                <View style={[styles.filterSection, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0 }]}>
                                    <View>
                                        <Text style={styles.filterSectionTitle}>Availability</Text>
                                        <Text style={{fontSize: 12, color: Colors.text.tertiary}}>Show only spaces available now</Text>
                                    </View>
                                    <Switch 
                                        value={onlyAvailable}
                                        onValueChange={setOnlyAvailable}
                                        trackColor={{ false: '#E5E7EB', true: Colors.primary }}
                                        thumbColor="#FFFFFF"
                                        activeThumbColor="#FFFFFF"
                                    />
                                </View>
                            </ScrollView>

                            <View style={styles.modalFooter}>
                                <TouchableOpacity 
                                    style={styles.clearBtn}
                                    onPress={() => {
                                        setPriceRange('All');
                                        setMinRating(0);
                                        setOnlyAvailable(false);
                                    }}
                                >
                                    <Text style={styles.clearBtnText}>Clear All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.applyBtn}
                                    onPress={() => setShowFilters(false)}
                                >
                                    <Text style={styles.applyBtnText}>Apply Filters</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                {/* Spaces Grid */}
                <View style={styles.grid}>
                    {filteredSpaces.length > 0 ? (
                        filteredSpaces.map((space) => (
                            <TouchableOpacity key={space.id} style={styles.card} onPress={() => router.push(`/ad-space/${space.id}`)}>
                                <Image source={{ uri: space.imageUrl || space.image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' }} style={styles.cardImage} />
                                <View style={styles.cardContent}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.typeTag}>
                                            <Text style={styles.typeText}>{categories.find(c => c.id === (space.category || space.categoryId || space.type))?.name || (space.category || space.categoryId || space.type)}</Text>
                                        </View>
                                        <View style={styles.ratingBadge}>
                                            <Star size={14} color="#F59E0B" fill="#F59E0B" />
                                            <Text style={styles.ratingText}>{space.rating || '4.5'}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.cardTitle} numberOfLines={2}>{space.title || space.name}</Text>

                                    <View style={styles.locationRow}>
                                        <MapPin size={14} color={Colors.text.tertiary} />
                                        <Text style={styles.locationText}>{space.location || 'Chennai'}</Text>
                                    </View>

                                    <View style={styles.divider} />

                                    <View style={styles.cardFooter}>
                                        <View>
                                            <Text style={styles.priceLabel}>Starting from</Text>
                                            <Text style={styles.priceValue}>
                                                ₹{space.price ? space.price.toLocaleString() : 'N/A'}
                                                <Text style={styles.priceUnit}>{space.priceUnit ? `/${space.priceUnit}` : ''}</Text>
                                            </Text>
                                        </View>
                                        {(space.available || space.status === 'ACTIVE') && (
                                            <View style={styles.availableBadge}>
                                                <Clock size={14} color="#10B981" />
                                                <Text style={styles.availableText}>Available Now</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.noResults}>
                            <Text style={styles.noResultsText}>No spaces found in {location} for this category.</Text>
                        </View>
                    )}
                </View>

            </View>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
    },
    genreSection: {
        marginBottom: 8,
    },
    genreList: {
        gap: 12,
        paddingRight: 24,
    },
    genreChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    activeGenreChip: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    genreLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text.secondary,
    },
    activeGenreLabel: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.text.tertiary,
        marginTop: 4,
    },
    filterBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    filterTabs: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    filterTab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    activeFilterTab: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    filterTabText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text.secondary,
    },
    activeFilterTabText: {
        color: '#FFFFFF',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
    },
    card: {
        width: 340,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        ...Colors.shadow.small,
    },
    cardImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#F3F4F6',
    },
    cardContent: {
        padding: 16,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    typeTag: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    typeText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.text.secondary,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text.primary,
        lineHeight: 24,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationText: {
        fontSize: 14,
        color: Colors.text.tertiary,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 4,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    priceLabel: {
        fontSize: 12,
        color: Colors.text.tertiary,
        marginBottom: 2,
    },
    priceValue: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.primary,
    },
    priceUnit: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.text.secondary,
    },
    availableBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    availableText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#10B981',
    },
    noResults: {
        padding: 40,
        alignItems: 'center',
        width: '100%',
    },
    noResultsText: {
        fontSize: 16,
        color: Colors.text.secondary,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        maxWidth: 500,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        ...Colors.shadow.large,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    modalBody: {
        padding: 24,
    },
    filterSection: {
        marginBottom: 24,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 16,
    },
    filterOptionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    filterOptionBtn: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    filterOptionBtnActive: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    filterOptionText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text.secondary,
    },
    filterOptionTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    modalFooter: {
        flexDirection: 'row',
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        gap: 16,
    },
    clearBtn: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.secondary,
    },
    applyBtn: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
