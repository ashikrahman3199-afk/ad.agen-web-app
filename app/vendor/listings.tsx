import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, MapPin, MoreHorizontal, Edit } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

export default function VendorListings() {
    const router = useRouter();

    const listings = [
        { id: '1', name: 'VR Mall Billboard', location: 'Anna Nagar, Chennai', type: 'Billboard', price: '₹15,000/day', status: 'Active', image: 'https://images.unsplash.com/photo-1562613531-a1e13337c667?w=800&q=80' },
        { id: '2', name: 'Metro Station Digital', location: 'Central Station', type: 'Digital Screen', price: '₹5,000/day', status: 'Active', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80' },
        { id: '3', name: 'Bus Shelter Network', location: 'OMR, Chennai', type: 'Transit', price: '₹8,000/day', status: 'Maintenance', image: 'https://images.unsplash.com/photo-1570737146902-8d4d6347f136?w=800&q=80' },
    ];

    return (
        <WebLayout role="vendor" title="My Listings">
            <View style={styles.header}>
                <Text style={styles.subtitle}>Manage your ad spaces</Text>
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => router.push('/vendor/add-listing')}
                >
                    <Plus size={20} color="#FFFFFF" />
                    <Text style={styles.addBtnText}>Add New Listing</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.col, { flex: 3 }]}>Listing Details</Text>
                    <Text style={[styles.col, { flex: 1 }]}>Type</Text>
                    <Text style={[styles.col, { flex: 1 }]}>Price</Text>
                    <Text style={[styles.col, { flex: 1 }]}>Status</Text>
                    <Text style={[styles.col, { flex: 0.5, textAlign: 'right' }]}>Action</Text>
                </View>

                {listings.map((item, index) => (
                    <View key={item.id} style={[styles.tableRow, index !== listings.length - 1 && styles.borderBottom]}>
                        <View style={[styles.col, { flex: 3, flexDirection: 'row', gap: 16, alignItems: 'center' }]}>
                            <Image source={{ uri: item.image }} style={styles.thumb} />
                            <View>
                                <Text style={styles.listingName}>{item.name}</Text>
                                <View style={styles.locationRow}>
                                    <MapPin size={12} color={Colors.text.tertiary} />
                                    <Text style={styles.locationText}>{item.location}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[styles.col, { flex: 1 }]}>{item.type}</Text>
                        <Text style={[styles.col, { flex: 1, fontWeight: '600' }]}>{item.price}</Text>
                        <View style={[styles.col, { flex: 1 }]}>
                            <View style={[styles.statusBadge, item.status === 'Active' ? styles.activeBadge : styles.inactiveBadge]}>
                                <Text style={[styles.statusText, item.status === 'Active' ? styles.activeText : styles.inactiveText]}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[styles.col, { flex: 0.5, alignItems: 'flex-end' }]}
                            onPress={() => router.push(`/vendor/add-listing?id=${item.id}`)}
                        >
                            <Edit size={18} color={Colors.text.secondary} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.text.secondary,
    },
    addBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 8,
    },
    addBtnText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    tableContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        ...Colors.shadow.small,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginBottom: 8,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    col: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    thumb: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    listingName: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 4,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 12,
        color: Colors.text.tertiary,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    activeBadge: {
        backgroundColor: '#DCFCE7',
    },
    inactiveBadge: {
        backgroundColor: '#F3F4F6',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    activeText: {
        color: '#166534',
    },
    inactiveText: {
        color: Colors.text.secondary,
    },
});
