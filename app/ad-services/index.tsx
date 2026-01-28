import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import {
    Plane, Clapperboard, MonitorPlay, User, BookOpen, Newspaper, Map, Radio, Tv, Smartphone,
    MapPin, Star, Filter, Clock, X
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';
import { useApp } from '@/contexts/AppContext';
import { categories } from '@/constants/adSpaces';
import {
    Users, Bus, Car, Zap, Train, Box, Truck
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AdServicesScreen() {
    const router = useRouter();
    const { location } = useApp();
    const [activeGenre, setActiveGenre] = useState('All');
    const [activeFilter, setActiveFilter] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    // Mock Data with Chennai locations
    const spaces = [
        {
            id: 1,
            name: 'Prime Billboard - Adyar Signal',
            type: 'Billboards',
            image: 'https://images.unsplash.com/photo-1562613531-a1e13337c667?w=800&q=80',
            rating: 4.8,
            location: 'Adyar',
            price: 75000,
            available: true,
            genre: 'Outdoor',
        },
        {
            id: 2,
            name: 'Metro Station Digital Display',
            type: 'Transit',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
            rating: 4.5,
            location: 'Anna Nagar',
            price: 50000,
            available: true,
            genre: 'Digital',
        },
        {
            id: 3,
            name: 'T. Nagar Bus Stand Hoarding',
            type: 'Billboards',
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
            rating: 4.9,
            location: 'T. Nagar',
            price: 105000,
            available: true,
            genre: 'Outdoor',
        },
        {
            id: 4,
            name: 'Phoenix Marketcity Screen',
            type: 'Digital',
            image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80',
            rating: 4.7,
            location: 'Velachery',
            price: 45000,
            available: true,
            genre: 'Digital',
        },
        {
            id: 5,
            name: 'PVR Cinemas - VR Mall',
            type: 'Cinema',
            image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
            rating: 4.6,
            location: 'Anna Nagar',
            price: 60000,
            available: false,
            genre: 'Cinema',
        },
        {
            id: 6,
            name: 'Airport Lounge Display',
            type: 'Airport',
            image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80',
            rating: 4.9,
            location: 'Guindy',
            price: 90000,
            available: true,
            genre: 'Airline',
        },
        {
            id: 7,
            name: 'OMR IT Park Kiosk',
            type: 'Digital',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
            rating: 4.5,
            location: 'OMR',
            price: 30000,
            available: true,
            genre: 'Digital',
        },
    ];

    // Icon mapping for dynamic categories
    const iconMap: Record<string, any> = {
        film: Clapperboard,
        newspaper: Newspaper,
        users: Users,
        bus: Bus,
        car: Car,
        zap: Zap,
        train: Train,
        tv: Tv,
        smartphone: Smartphone,
        box: Box,
        truck: Truck,
        billboard: MonitorPlay,
        radio: Radio,
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

    const filters = ['All', 'Billboards', 'Digital', 'Transit', 'Cinema', 'Airport'];

    // Filter Logic
    const filteredSpaces = spaces.filter(space => {
        const matchesLocation = location === 'All Chennai' || space.location === location;

        // Match genre (category). Note: spaces mock data uses different casing/values than IDs.
        // In a real app, data should be normalized. For now, we loosen the check or rely on ID if available.
        // Checking if the space.genre matches the selected activeGenre (which is now an ID like 'cinema', 'newspaper')
        // OR if activeGenre is 'All'.
        // Existing mock data uses 'Outdoor', 'Digital', 'Cinema', 'Airline'.
        // New IDs are lowercase: 'cinema', 'newspaper'.
        // We might need to normalize the comparison.
        const normalizedSpaceGenre = space.genre?.toLowerCase();
        const normalizedActiveGenre = activeGenre.toLowerCase();

        // This is a rough match for the mock data compatibility
        const matchesGenre = activeGenre === 'All' ||
            normalizedSpaceGenre === normalizedActiveGenre ||
            space.type.toLowerCase() === normalizedActiveGenre;

        const matchesFilter = activeFilter === 'All' || space.type === activeFilter;
        return matchesLocation && matchesGenre && matchesFilter;
    });

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
                    <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilters(!showFilters)}>
                        <Filter size={18} color={Colors.text.primary} />
                        <Text style={styles.filterText}>Filters</Text>
                    </TouchableOpacity>
                </View>

                {/* Filter Tabs */}
                <View style={styles.filterTabs}>
                    {filters.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.filterTab, activeFilter === filter && styles.activeFilterTab]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[styles.filterTabText, activeFilter === filter && styles.activeFilterTabText]}>
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Spaces Grid */}
                <View style={styles.grid}>
                    {filteredSpaces.length > 0 ? (
                        filteredSpaces.map((space) => (
                            <TouchableOpacity key={space.id} style={styles.card} onPress={() => router.push(`/(ad-space)/${space.id}`)}>
                                <Image source={{ uri: space.image }} style={styles.cardImage} />
                                <View style={styles.cardContent}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.typeTag}>
                                            <Text style={styles.typeText}>{space.type}</Text>
                                        </View>
                                        <View style={styles.ratingBadge}>
                                            <Star size={14} color="#F59E0B" fill="#F59E0B" />
                                            <Text style={styles.ratingText}>{space.rating}</Text>
                                        </View>
                                    </View>

                                    <Text style={styles.cardTitle} numberOfLines={2}>{space.name}</Text>

                                    <View style={styles.locationRow}>
                                        <MapPin size={14} color={Colors.text.tertiary} />
                                        <Text style={styles.locationText}>{space.location}, Chennai</Text>
                                    </View>

                                    <View style={styles.divider} />

                                    <View style={styles.cardFooter}>
                                        <View>
                                            <Text style={styles.priceLabel}>Starting from</Text>
                                            <Text style={styles.priceValue}>
                                                ₹{space.price.toLocaleString()}
                                                <Text style={styles.priceUnit}>/day</Text>
                                            </Text>
                                        </View>
                                        {space.available && (
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
});
