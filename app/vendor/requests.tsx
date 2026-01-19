import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, X, Clock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

export default function VendorRequests() {
    const requests = [
        { id: '1', client: 'Nike India', space: 'VR Mall Billboard', date: 'Oct 15 - Nov 15', budget: '₹1.5L', status: 'Pending', time: '2h ago' },
        { id: '2', client: 'Swiggy', space: 'Metro Station Digital', date: 'Oct 20 - Oct 25', budget: '₹45K', status: 'Pending', time: '5h ago' },
        { id: '3', client: 'Zomato', space: 'Bus Shelter Network', date: 'Nov 01 - Nov 30', budget: '₹2.1L', status: 'Approved', time: '1d ago' },
    ];

    return (
        <WebLayout role="vendor" title="Booking Requests">
            <View style={styles.container}>
                {requests.map((req) => (
                    <View key={req.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View>
                                <Text style={styles.clientName}>{req.client}</Text>
                                <Text style={styles.spaceName}>{req.space}</Text>
                            </View>
                            <View style={styles.timeBadge}>
                                <Clock size={12} color={Colors.text.tertiary} />
                                <Text style={styles.timeText}>{req.time}</Text>
                            </View>
                        </View>

                        <View style={styles.detailsGrid}>
                            <View style={styles.detailItem}>
                                <Text style={styles.label}>Duration</Text>
                                <Text style={styles.value}>{req.date}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.label}>Budget</Text>
                                <Text style={styles.value}>{req.budget}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.label}>Status</Text>
                                <Text style={[styles.value, { color: req.status === 'Pending' ? '#D97706' : '#059669' }]}>{req.status}</Text>
                            </View>
                        </View>

                        {req.status === 'Pending' && (
                            <View style={styles.actions}>
                                <TouchableOpacity style={[styles.btn, styles.declineBtn]}>
                                    <X size={18} color={Colors.error} />
                                    <Text style={styles.declineText}>Decline</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.btn, styles.acceptBtn]}>
                                    <Check size={18} color="#FFFFFF" />
                                    <Text style={styles.acceptText}>Accept Request</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        maxWidth: 800,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        ...Colors.shadow.small,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    clientName: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 4,
    },
    spaceName: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    timeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    timeText: {
        fontSize: 12,
        color: Colors.text.tertiary,
    },
    detailsGrid: {
        flexDirection: 'row',
        gap: 40,
        marginBottom: 24,
    },
    detailItem: {
        gap: 4,
    },
    label: {
        fontSize: 12,
        color: Colors.text.tertiary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    actions: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'flex-end',
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
    },
    declineBtn: {
        backgroundColor: '#FEF2F2',
    },
    declineText: {
        color: Colors.error,
        fontWeight: '600',
    },
    acceptBtn: {
        backgroundColor: Colors.primary,
    },
    acceptText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});
