import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, MapPin, MoreHorizontal, Edit, Trash2, Pause, Play } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

import { trpc } from '@/lib/trpc';

export default function VendorListings() {
    const router = useRouter();

    const { data: rawListings } = trpc.listings.myListings.useQuery();
    
    const listings = rawListings?.map(item => ({
        id: item.id,
        name: item.title,
        location: item.location,
        type: item.category,
        price: `₹${item.price}/${item.priceUnit}`,
        status: item.status || 'Active',
        approvalStatus: item.approvalStatus || 'PENDING',
        image: item.images?.length ? item.images[0] : (item.image || 'https://via.placeholder.com/400x300')
    })) || [];

    const utils = trpc.useUtils();

    const deleteMutation = trpc.listings.delete.useMutation({
        onSuccess: () => {
            utils.listings.myListings.invalidate();
        }
    });

    const updateStatusMutation = trpc.listings.updateStatus.useMutation({
        onSuccess: () => {
            utils.listings.myListings.invalidate();
        }
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this listing?')) {
            deleteMutation.mutate({ id });
        }
    };

    const handleToggleStatus = (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        updateStatusMutation.mutate({ id, status: newStatus as any });
    };

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
                    <Text style={[styles.col, { flex: 1 }]}>Visibility</Text>
                    <Text style={[styles.col, { flex: 1 }]}>Approval</Text>
                    <Text style={[styles.col, { flex: 0.5, textAlign: 'right' }]}>Action</Text>
                </View>

                {listings.length === 0 ? (
                    <View style={{ padding: 24, alignItems: 'center' }}>
                        <Text style={{ color: Colors.text.secondary }}>No listings found.</Text>
                    </View>
                ) : listings.map((item: any, index: number) => (
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
                        <View style={[styles.col, { flex: 1 }]}>
                            <View style={[
                                styles.statusBadge, 
                                item.approvalStatus === 'APPROVED' ? styles.activeBadge : 
                                item.approvalStatus === 'REJECTED' ? styles.rejectedBadge : 
                                styles.pendingBadge
                            ]}>
                                <Text style={[
                                    styles.statusText, 
                                    item.approvalStatus === 'APPROVED' ? styles.activeText : 
                                    item.approvalStatus === 'REJECTED' ? styles.rejectedText : 
                                    styles.pendingText
                                ]}>
                                    {item.approvalStatus}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.col, { flex: 0.5, flexDirection: 'row', justifyContent: 'flex-end', gap: 12, alignItems: 'center' }]}>
                            <TouchableOpacity onPress={() => handleToggleStatus(item.id, item.status)}>
                                {item.status === 'Active' ? (
                                    <Pause size={18} color={Colors.text.secondary} />
                                ) : (
                                    <Play size={18} color={Colors.text.secondary} />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push(`/vendor/add-listing?id=${item.id}`)}>
                                <Edit size={18} color={Colors.text.secondary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <Trash2 size={18} color={Colors.error} />
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: Colors.vendor.primary,
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
    rejectedBadge: {
        backgroundColor: '#FEE2E2',
    },
    rejectedText: {
        color: '#DC2626',
    },
    pendingBadge: {
        backgroundColor: '#FEF3C7',
    },
    pendingText: {
        color: '#D97706',
    }
});
