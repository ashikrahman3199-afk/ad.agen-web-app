import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ShieldCheck, Check, X, MapPin } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { trpc } from '@/lib/trpc';
import WebLayout from '@/components/WebLayout';

export default function AdminDashboard() {
    const router = useRouter();
    const utils = trpc.useContext();
    const [activeTab, setActiveTab] = React.useState<'services' | 'vendors'>('services');

    const { data: pendingServices, isLoading: isLoadingServices } = trpc.admin.getPendingServices.useQuery();
    const { data: vendors, isLoading: isLoadingVendors } = trpc.admin.getVendors.useQuery();
    const approveMutation = trpc.admin.approveService.useMutation({
        onSuccess: () => {
            utils.admin.getPendingServices.invalidate();
            utils.listings.list.invalidate();
        }
    });
    const rejectMutation = trpc.admin.rejectService.useMutation({
        onSuccess: () => {
            utils.admin.getPendingServices.invalidate();
        }
    });

    return (
        <WebLayout role="client" title="Admin Control Panel">
            <View style={styles.container}>
                <View style={styles.header}>
                    <ShieldCheck size={32} color={Colors.primary} />
                    <Text style={styles.pageTitle}>Admin Dashboard</Text>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'services' && styles.activeTab]}
                        onPress={() => setActiveTab('services')}
                    >
                        <Text style={[styles.tabText, activeTab === 'services' && styles.activeTabText]}>Pending Services</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'vendors' && styles.activeTab]}
                        onPress={() => setActiveTab('vendors')}
                    >
                        <Text style={[styles.tabText, activeTab === 'vendors' && styles.activeTabText]}>Registered Vendors</Text>
                    </TouchableOpacity>
                </View>

                {activeTab === 'services' && (
                    <>
                        <Text style={styles.sectionTitle}>Pending Vendor Approvals</Text>
                        {isLoadingServices ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={Colors.primary} />
                            </View>
                        ) : (
                            <ScrollView contentContainerStyle={styles.listContainer}>
                                {(!pendingServices || pendingServices.length === 0) ? (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyText}>No pending services to approve.</Text>
                                    </View>
                                ) : (
                                    pendingServices.map((service: any) => (
                                        <View key={service.id} style={styles.card}>
                                            <Image source={{ uri: service.image || 'https://images.unsplash.com/photo-1562613531-a1e13337c667?w=800&q=80' }} style={styles.cardImage} />
                                            <View style={styles.cardContent}>
                                                <View style={styles.cardHeader}>
                                                    <Text style={styles.cardTitle}>{service.name}</Text>
                                                    <Text style={styles.categoryBadge}>{service.category}</Text>
                                                </View>
                                                
                                                <View style={styles.locationRow}>
                                                    <MapPin size={14} color={Colors.text.tertiary} />
                                                    <Text style={styles.locationText}>{service.location}</Text>
                                                </View>
                                                
                                                <Text style={styles.vendorText}>Vendor: {service.vendorId || service.owner}</Text>
                                                <Text style={styles.priceText}>Price: ₹{service.price} {service.priceUnit ? `per ${service.priceUnit}` : ''}</Text>
                                            </View>
                                            
                                            <View style={styles.actionColumn}>
                                                <TouchableOpacity 
                                                    style={[styles.actionBtn, styles.approveBtn]}
                                                    onPress={() => approveMutation.mutate({ id: service.id })}
                                                    disabled={approveMutation.isLoading}
                                                >
                                                    <Check size={18} color="#FFFFFF" />
                                                    <Text style={styles.btnText}>Approve</Text>
                                                </TouchableOpacity>
                                                
                                                <TouchableOpacity 
                                                    style={[styles.actionBtn, styles.rejectBtn]}
                                                    onPress={() => rejectMutation.mutate({ id: service.id })}
                                                    disabled={rejectMutation.isLoading}
                                                >
                                                    <X size={18} color="#EF4444" />
                                                    <Text style={[styles.btnText, { color: '#EF4444' }]}>Reject</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))
                                )}
                            </ScrollView>
                        )}
                    </>
                )}

                {activeTab === 'vendors' && (
                    <>
                        <Text style={styles.sectionTitle}>Vendor Bank Details</Text>
                        {isLoadingVendors ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={Colors.primary} />
                            </View>
                        ) : (
                            <ScrollView contentContainerStyle={styles.listContainer}>
                                {(!vendors || vendors.length === 0) ? (
                                    <View style={styles.emptyState}>
                                        <Text style={styles.emptyText}>No vendors registered yet.</Text>
                                    </View>
                                ) : (
                                    vendors.map((vendor: any) => (
                                        <View key={vendor.id} style={styles.vendorCard}>
                                            <View style={styles.vendorHeader}>
                                                <Text style={styles.vendorName}>{vendor.companyName || vendor.name || vendor.email}</Text>
                                                <Text style={styles.vendorEmail}>{vendor.email}</Text>
                                            </View>
                                            
                                            <View style={styles.vendorDetailsRow}>
                                                <View style={styles.vendorDetailItem}>
                                                    <Text style={styles.detailLabel}>Contact Person</Text>
                                                    <Text style={styles.detailValue}>{vendor.contactPerson || 'N/A'}</Text>
                                                </View>
                                                <View style={styles.vendorDetailItem}>
                                                    <Text style={styles.detailLabel}>Phone</Text>
                                                    <Text style={styles.detailValue}>{vendor.phone || vendor.phoneNumber || 'N/A'}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.bankSection}>
                                                <Text style={styles.bankSectionTitle}>Banking Information</Text>
                                                
                                                <View style={styles.bankGrid}>
                                                    <View style={styles.bankItem}>
                                                        <Text style={styles.bankLabel}>Bank Name</Text>
                                                        <Text style={styles.bankValue}>{vendor.bankName || 'Not Provided'}</Text>
                                                    </View>
                                                    <View style={styles.bankItem}>
                                                        <Text style={styles.bankLabel}>Branch</Text>
                                                        <Text style={styles.bankValue}>{vendor.branchName || 'Not Provided'}</Text>
                                                    </View>
                                                    <View style={styles.bankItem}>
                                                        <Text style={styles.bankLabel}>Account Holder</Text>
                                                        <Text style={styles.bankValue}>{vendor.accountHolderName || 'Not Provided'}</Text>
                                                    </View>
                                                    <View style={styles.bankItem}>
                                                        <Text style={styles.bankLabel}>Account Number</Text>
                                                        <Text style={styles.bankValue}>{vendor.accountNumber || 'Not Provided'}</Text>
                                                    </View>
                                                    <View style={styles.bankItem}>
                                                        <Text style={styles.bankLabel}>IFSC Code</Text>
                                                        <Text style={styles.bankValue}>{vendor.ifscCode || 'Not Provided'}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                )}
                            </ScrollView>
                        )}
                    </>
                )}
                        <ActivityIndicator size="large" color={Colors.primary} />

            </View>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 1000,
        marginHorizontal: 'auto',
        width: '100%',
        paddingTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 32,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.text.primary,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 16,
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
    },
    listContainer: {
        gap: 16,
    },
    emptyState: {
        padding: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    emptyText: {
        fontSize: 16,
        color: Colors.text.secondary,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
        padding: 16,
        gap: 16,
    },
    cardImage: {
        width: 120,
        height: 100,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    categoryBadge: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.primary,
        backgroundColor: '#FFF0E6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    locationText: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    vendorText: {
        fontSize: 14,
        color: Colors.text.tertiary,
        marginBottom: 4,
    },
    priceText: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.primary,
    },
    actionColumn: {
        justifyContent: 'center',
        gap: 12,
        width: 140,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
    },
    approveBtn: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    rejectBtn: {
        backgroundColor: '#FFFFFF',
        borderColor: '#EF4444',
    },
    btnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        gap: 24,
    },
    tab: {
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: Colors.primary,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.secondary,
    },
    activeTabText: {
        color: Colors.primary,
    },
    vendorCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 24,
    },
    vendorHeader: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 16,
    },
    vendorName: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 4,
    },
    vendorEmail: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    vendorDetailsRow: {
        flexDirection: 'row',
        gap: 32,
        marginBottom: 24,
    },
    vendorDetailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.text.tertiary,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    detailValue: {
        fontSize: 14,
        color: Colors.text.primary,
        fontWeight: '500',
    },
    bankSection: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    bankSectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 16,
    },
    bankGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    bankItem: {
        width: '30%',
        minWidth: 150,
        marginBottom: 8,
    },
    bankLabel: {
        fontSize: 12,
        color: Colors.text.secondary,
        marginBottom: 4,
    },
    bankValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
    },
});
