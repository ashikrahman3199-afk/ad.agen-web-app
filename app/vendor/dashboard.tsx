import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { TrendingUp, Users, DollarSign, Calendar, ArrowUpRight, MoreHorizontal, Check, X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

const { width } = Dimensions.get('window');

export default function VendorDashboard() {
    const router = useRouter();

    // Mock Data
    const stats = [
        { label: 'Total Revenue', value: '₹12.5L', change: '+15.3%', icon: DollarSign, color: Colors.success },
        { label: 'Active Listings', value: '24', change: '+2', icon: Calendar, color: Colors.primary },
        { label: 'Pending Requests', value: '8', change: '-1', icon: Users, color: Colors.warning },
        { label: 'Avg. Occupancy', value: '85%', change: '+5%', icon: TrendingUp, color: Colors.info },
    ];

    const requests = [
        { id: '1', client: 'Nike India', space: 'VR Mall Billboard', date: 'Oct 15 - Nov 15', budget: '₹1.5L', status: 'Pending' },
        { id: '2', client: 'Swiggy', space: 'Metro Station Digital', date: 'Oct 20 - Oct 25', budget: '₹45K', status: 'Pending' },
        { id: '3', client: 'Zomato', space: 'Bus Shelter Network', date: 'Nov 01 - Nov 30', budget: '₹2.1L', status: 'Approved' },
        { id: '4', client: 'Amazon Prime', space: 'Cinema Hall Foyer', date: 'Dec 01 - Dec 15', budget: '₹85K', status: 'Rejected' },
        { id: '5', client: 'Coca Cola', space: 'Highway Hoarding', date: 'Jan 01 - Jan 31', budget: '₹3.5L', status: 'Pending' },
    ];

    return (
        <WebLayout role="vendor" title="Overview">
            {/* Stats Grid */}
            <View style={styles.statsGrid}>
                {stats.map((stat, index) => (
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
                            <Text style={[styles.col, { flex: 1, textAlign: 'right' }]}>Actions</Text>
                        </View>
                        {requests.map((req, index) => (
                            <View key={req.id} style={[styles.tableRow, index !== requests.length - 1 && styles.borderBottom]}>
                                <Text style={[styles.col, { flex: 2, fontWeight: '600', color: Colors.text.primary }]}>{req.client}</Text>
                                <Text style={[styles.col, { flex: 2, color: Colors.text.secondary }]}>{req.space}</Text>
                                <Text style={[styles.col, { flex: 2, color: Colors.text.tertiary }]}>{req.date}</Text>
                                <Text style={[styles.col, { flex: 1, fontWeight: '600' }]}>{req.budget}</Text>
                                <View style={[styles.col, { flex: 1 }]}>
                                    <View style={[styles.statusBadge,
                                    req.status === 'Pending' ? { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' } :
                                        req.status === 'Approved' ? { backgroundColor: '#DCFCE7', borderColor: '#10B981' } :
                                            { backgroundColor: '#FEE2E2', borderColor: '#EF4444' }
                                    ]}>
                                        <Text style={[styles.statusText,
                                        req.status === 'Pending' ? { color: '#B45309' } :
                                            req.status === 'Approved' ? { color: '#15803D' } :
                                                { color: '#B91C1C' }
                                        ]}>{req.status}</Text>
                                    </View>
                                </View>
                                <View style={[styles.col, { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }]}>
                                    <TouchableOpacity style={styles.actionBtn}>
                                        <Check size={16} color={Colors.success} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionBtn}>
                                        <X size={16} color={Colors.error} />
                                    </TouchableOpacity>
                                </View>
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
                        <TouchableOpacity style={styles.quickAction}>
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
        height: 'fit-content',
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
        color: Colors.primary,
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
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
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
});
