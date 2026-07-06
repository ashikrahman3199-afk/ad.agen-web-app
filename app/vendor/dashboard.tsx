import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { trpc } from '@/lib/trpc';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert, Modal, TextInput } from 'react-native';
import { TrendingUp, Users, DollarSign, Calendar, ArrowUpRight, MoreHorizontal, Check, X, Plus } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

const { width } = Dimensions.get('window');

export default function VendorDashboard() {
    const router = useRouter();

    const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');

    const { data: bookings } = trpc.bookings.list.useQuery();
    const { data: listings } = trpc.listings.list.useQuery();

    interface Booking {
        id: string;
        clientId?: string;
        startDate: string;
        endDate: string;
        totalAmount: number;
        status: string;
        createdAt: string;
    }

    const totalRevenue = bookings ? bookings.reduce((sum, b: any) => sum + (b.totalAmount || 0), 0) : 0;
    const activeListingsCount = listings ? listings.length : 0;
    const pendingCount = bookings ? bookings.filter((b: any) => b.status === 'Pending').length : 0;

    const availableBalance = totalRevenue;
    const tdsDeduction = availableBalance * 0.01; // 1% TDS
    const platformFeeDeduction = availableBalance * 0.05; // 5% Platform Fees
    const totalDeductions = tdsDeduction + platformFeeDeduction;
    const netBalance = availableBalance - totalDeductions;

    const stats = [
        { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, change: '0%', icon: DollarSign, color: Colors.success },
        { label: 'Active Listings', value: `${activeListingsCount}`, change: '0', icon: Calendar, color: Colors.vendor.primary },
        { label: 'Pending Requests', value: `${pendingCount}`, change: '0', icon: Users, color: Colors.warning },
        { label: 'Avg. Occupancy', value: '0%', change: '0%', icon: TrendingUp, color: Colors.info },
    ];

    const pickImage = async (requestId: string) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            Alert.alert("Success", "Progress updated with image for request #" + requestId);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedRequestId(prev => prev === id ? null : id);
    };

    const handleWithdraw = () => {
        if (!withdrawAmount || isNaN(Number(withdrawAmount))) return;
        if (Number(withdrawAmount) > netBalance) {
            Alert.alert('Error', 'Amount exceeds available balance.');
            return;
        }
        Alert.alert('Success', `Withdrawal request for ₹${Number(withdrawAmount).toLocaleString()} submitted!`);
        setShowWithdrawModal(false);
        setWithdrawAmount('');
    };

    const requests = (bookings as Booking[] | undefined)?.map((booking) => ({
        id: booking.id,
        client: booking.clientId || 'Client',
        space: 'Start Date: ' + booking.startDate,
        date: `${booking.startDate} - ${booking.endDate}`,
        budget: `₹${booking.totalAmount}`,
        status: booking.status,
        details: 'Fetched from backend', // Placeholder
    })) || [];

    return (
        <WebLayout role="vendor" title="Overview">
            {/* Stats Grid */}
            <View style={styles.statsGrid}>
                {stats.map((stat, index: number) => (
                    <View key={index} style={styles.statCard}>
                        <View style={styles.statHeader}>
                            <View style={[styles.iconBox, { backgroundColor: `${stat.color}15` }]}>
                                <stat.icon size={20} color={stat.color} />
                            </View>
                            <View style={[styles.changeBadge, { backgroundColor: stat.change.startsWith('+') ? '#DCFCE7' : '#FEE2E2' }]}>
                                <Text style={[styles.changeText, { color: stat.change.startsWith('+') ? '#166534' : '#991B1B' }]}>
                                    {stat.change}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.sectionRow}>
                {/* Recent Requests Table */}
                <View style={styles.mainSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Requests</Text>
                        <TouchableOpacity onPress={() => router.push('/vendor/requests')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={[styles.col, { flex: 2 }]}>Client</Text>
                            <Text style={[styles.col, { flex: 2 }]}>Space</Text>
                            <Text style={[styles.col, { flex: 2 }]}>Duration</Text>
                            <Text style={[styles.col, { flex: 1 }]}>Budget</Text>
                            <Text style={[styles.col, { flex: 1 }]}>Status</Text>
                            <Text style={[styles.col, { flex: 1, textAlign: 'right' }]}>Progress</Text>
                        </View>
                        {requests.map((req, index: number) => (
                            <View key={req.id} style={index !== requests.length - 1 && styles.borderBottom}>
                                <TouchableOpacity
                                    style={styles.tableRow}
                                    onPress={() => toggleExpand(req.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.col, { flex: 2, fontWeight: '600', color: Colors.text.primary }]}>{req.client}</Text>
                                    <Text style={[styles.col, { flex: 2, color: Colors.text.secondary }]}>{req.space}</Text>
                                    <Text style={[styles.col, { flex: 2, color: Colors.text.tertiary }]}>{req.date}</Text>
                                    <Text style={[styles.col, { flex: 1, fontWeight: '600' }]}>{req.budget}</Text>
                                    <View style={{ flex: 1 }}>
                                        <View style={[styles.statusBadge,
                                        req.status === 'Upcoming' ? { backgroundColor: '#E0F2FE', borderColor: '#38BDF8' } :
                                            req.status === 'Active' ? { backgroundColor: '#DCFCE7', borderColor: '#10B981' } :
                                                { backgroundColor: '#F3F4F6', borderColor: '#9CA3AF' }
                                        ]}>
                                            <Text style={[styles.statusText,
                                            req.status === 'Upcoming' ? { color: '#0369A1' } :
                                                req.status === 'Active' ? { color: '#15803D' } :
                                                    { color: '#4B5563' }
                                            ]}>{req.status}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
                                        <TouchableOpacity style={styles.actionBtn} onPress={(e) => {
                                            e.stopPropagation();
                                            pickImage(req.id);
                                        }}>
                                            <Plus size={16} color={Colors.vendor.primary} />
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                                {expandedRequestId === req.id && (
                                    <View style={styles.expandedContent}>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Campaign Details:</Text>
                                            <Text style={styles.detailValue}>{req.details}</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Contact:</Text>
                                            <Text style={styles.detailValue}>Shared via Admin (Mobile Hidden)</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Side Panel (e.g., Notifications or Quick Actions) */}
                <View style={styles.sideSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Quick Actions</Text>
                    </View>
                    <View style={styles.actionList}>
                        <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/vendor/listings')}>
                            <View style={[styles.actionIcon, { backgroundColor: '#E0F2FE' }]}>
                                <ArrowUpRight size={20} color={Colors.info} />
                            </View>
                            <View>
                                <Text style={styles.actionTitle}>Add New Listing</Text>
                                <Text style={styles.actionDesc}>List a new ad space</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.quickAction} onPress={() => setShowWithdrawModal(true)}>
                            <View style={[styles.actionIcon, { backgroundColor: '#FCE7F3' }]}>
                                <DollarSign size={20} color="#DB2777" />
                            </View>
                            <View>
                                <Text style={styles.actionTitle}>Withdraw Earnings</Text>
                                <Text style={styles.actionDesc}>Transfer to bank</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Withdraw Modal */}
            <Modal
                transparent
                visible={showWithdrawModal}
                animationType="fade"
                onRequestClose={() => setShowWithdrawModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Withdraw Earnings</Text>
                            <TouchableOpacity onPress={() => setShowWithdrawModal(false)}>
                                <X size={24} color={Colors.text.secondary} />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.balanceContainer}>
                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceLabel}>Total Balance</Text>
                                <Text style={styles.balanceValue}>₹{availableBalance.toLocaleString()}</Text>
                            </View>
                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceLabel}>TDS (1%)</Text>
                                <Text style={styles.balanceDeduction}>-₹{tdsDeduction.toLocaleString()}</Text>
                            </View>
                            <View style={styles.balanceRow}>
                                <Text style={styles.balanceLabel}>Platform Fees (5%)</Text>
                                <Text style={styles.balanceDeduction}>-₹{platformFeeDeduction.toLocaleString()}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.balanceRow}>
                                <Text style={styles.netBalanceLabel}>Net Available Balance</Text>
                                <Text style={styles.netBalanceValue}>₹{netBalance.toLocaleString()}</Text>
                            </View>
                        </View>

                        <Text style={styles.inputLabel}>Enter Amount to Withdraw</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="₹ 0.00"
                            keyboardType="numeric"
                            value={withdrawAmount}
                            onChangeText={setWithdrawAmount}
                            placeholderTextColor={Colors.text.tertiary}
                        />

                        <TouchableOpacity 
                            style={[
                                styles.withdrawSubmitBtn, 
                                (!withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > netBalance) && styles.withdrawSubmitBtnDisabled
                            ]}
                            onPress={handleWithdraw}
                            disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || Number(withdrawAmount) > netBalance}
                        >
                            <Text style={styles.withdrawSubmitText}>Withdraw Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    statsGrid: {
        flexDirection: 'row',
        gap: 24,
        flexWrap: 'wrap',
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        minWidth: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        ...Colors.shadow.small,
    },
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    changeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    statValue: {
        fontSize: 28,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    sectionRow: {
        flexDirection: 'row',
        gap: 24,
        flexWrap: 'wrap',
    },
    mainSection: {
        flex: 2,
        minWidth: 500,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        ...Colors.shadow.small,
    },
    sideSection: {
        flex: 1,
        minWidth: 300,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        ...Colors.shadow.small,
        height: 'fit-content' as any,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.vendor.primary,
    },
    table: {
        width: '100%',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginBottom: 16,
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
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    actionBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 107, 53, 0.1)', // Transparent orange
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionList: {
        gap: 16,
    },
    quickAction: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 2,
    },
    actionDesc: {
        fontSize: 13,
        color: Colors.text.secondary,
    },
    expandedContent: {
        padding: 16,
        backgroundColor: '#F9FAFB',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    detailLabel: {
        fontWeight: '600',
        width: 150,
        color: Colors.text.secondary,
        fontSize: 14,
    },
    detailValue: {
        flex: 1,
        color: Colors.text.primary,
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        ...Colors.shadow.large,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    balanceContainer: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
    },
    balanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    balanceLabel: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    balanceValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    balanceDeduction: {
        fontSize: 14,
        fontWeight: '600',
        color: '#EF4444',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 8,
    },
    netBalanceLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    netBalanceValue: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.vendor.primary,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 8,
    },
    amountInput: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
        fontSize: 20,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 24,
        backgroundColor: '#FFFFFF',
    },
    withdrawSubmitBtn: {
        backgroundColor: Colors.vendor.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    withdrawSubmitBtnDisabled: {
        opacity: 0.5,
    },
    withdrawSubmitText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
