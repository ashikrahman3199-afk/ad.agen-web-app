import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Megaphone, DollarSign, Activity, XCircle, Calendar, Star } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

const { width } = Dimensions.get('window');

export default function MyCampaignsScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const stats = [
        { label: 'Total Campaign Spend (All-time)', value: '₹151.4K', icon: DollarSign, color: '#EF4444' },
        { label: 'Total no of Campaign', value: '1', icon: Megaphone, color: '#3B82F6' },
        { label: 'Campaigns Live', value: '0', icon: Activity, color: '#10B981' },
        { label: 'Campaigns Ended', value: '0', icon: XCircle, color: '#6B7280' },
    ];

    const campaigns = [
        {
            id: 1,
            name: 'ASHIK nontraditional - Bengaluru, Karnataka, India Campaign',
            isNew: true,
            duration: '21 Oct 2025 - 21 Oct 2025',
            budget: 'N/A',
            spend: '₹1,51,439',
            status: 'Active'
        }
    ];

    return (
        <WebLayout role="client" title="My Campaigns">
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Your Campaigns</Text>

                <View style={styles.topSection}>
                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <View key={index} style={styles.statCard}>
                                <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
                                    <stat.icon size={20} color={stat.color} />
                                </View>
                                <View style={styles.statContent}>
                                    <Text style={styles.statLabel}>{stat.label}</Text>
                                    <Text style={styles.statValue}>{stat.value}</Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Spend Graph Card */}
                    <View style={styles.graphCard}>
                        <View style={styles.graphHeader}>
                            <Text style={styles.graphTitle}>Spend Graph</Text>
                            <View style={styles.graphFilter}>
                                <Text style={styles.graphFilterText}>Spend by</Text>
                                <View style={styles.filterBadge}>
                                    <Text style={styles.filterBadgeText}>Campaign</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.graphContent}>
                            {/* CSS-only Donut Chart */}
                            <View style={styles.donutChart}>
                                <View style={styles.donutHole}>
                                    <Text style={styles.donutValue}>₹151.4K</Text>
                                    <Text style={styles.donutLabel}>Total Spend</Text>
                                </View>
                            </View>

                            <View style={styles.legend}>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                                    <Text style={styles.legendText} numberOfLines={1}>ASHIK nontraditional - ...</Text>
                                    <Text style={styles.legendPercent}>100 %</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>Campaign List</Text>
                    <View style={styles.searchContainer}>
                        <Search size={16} color={Colors.text.tertiary} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                <View style={styles.campaignList}>
                    {campaigns.map((campaign) => (
                        <View key={campaign.id} style={styles.campaignCard}>
                            <View style={styles.campaignHeader}>
                                <View style={styles.campaignIcon}>
                                    <Megaphone size={20} color="#F97316" />
                                </View>
                                <View style={styles.campaignTitleRow}>
                                    <Text style={styles.campaignName}>{campaign.name}</Text>
                                    {campaign.isNew && (
                                        <View style={styles.newBadge}>
                                            <Star size={10} color="#F59E0B" fill="#F59E0B" />
                                            <Text style={styles.newBadgeText}>New</Text>
                                        </View>
                                    )}
                                </View>
                            </View>

                            <View style={styles.campaignDetails}>
                                <View style={styles.detailCol}>
                                    <Text style={styles.detailLabel}>Duration</Text>
                                    <Text style={styles.detailValue}>{campaign.duration}</Text>
                                </View>
                                <View style={styles.detailCol}>
                                    <Text style={styles.detailLabel}>Budget:</Text>
                                    <Text style={styles.detailValue}>{campaign.budget}</Text>
                                </View>
                                <View style={styles.detailCol}>
                                    <Text style={styles.detailLabel}>Spend:</Text>
                                    <Text style={styles.detailValue}>{campaign.spend}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 1200,
        width: '100%',
        alignSelf: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 24,
    },
    topSection: {
        flexDirection: width > 1024 ? 'row' : 'column',
        gap: 24,
        marginBottom: 40,
    },
    statsGrid: {
        flex: 1,
        gap: 16,
    },
    statCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        gap: 16,
    },
    statIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statContent: {
        flex: 1,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.text.secondary,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    graphCard: {
        flex: 1.5,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 24,
    },
    graphHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    graphTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    graphFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    graphFilterText: {
        fontSize: 12,
        color: Colors.text.tertiary,
    },
    filterBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    filterBadgeText: {
        fontSize: 12,
        color: Colors.text.primary,
        fontWeight: '500',
    },
    graphContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
    },
    donutChart: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    donutHole: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    donutValue: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    donutLabel: {
        fontSize: 12,
        color: Colors.text.tertiary,
    },
    legend: {
        flex: 1,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    legendText: {
        flex: 1,
        fontSize: 14,
        color: Colors.text.secondary,
    },
    legendPercent: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
        width: 240,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: Colors.text.primary,
        outlineStyle: 'none',
    },
    campaignList: {
        gap: 16,
    },
    campaignCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 24,
    },
    campaignHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
    },
    campaignIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF7ED',
        justifyContent: 'center',
        alignItems: 'center',
    },
    campaignTitleRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    campaignName: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    newBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    newBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#F59E0B',
    },
    campaignDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    detailCol: {
        gap: 4,
    },
    detailLabel: {
        fontSize: 12,
        color: Colors.text.tertiary,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
    },
});
