import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Upload, MapPin, DollarSign, Tag, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';
import { useApp } from '@/contexts/AppContext';

export default function AddListing() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isEdit = !!params.id;

    // In a real app, we would fetch the listing details if isEdit is true
    // For now, we'll just use some dummy state or empty state

    const [form, setForm] = useState({
        name: '',
        type: 'Billboard',
        price: '',
        location: '',
        status: 'Active',
        description: '',
    });

    useEffect(() => {
        if (isEdit) {
            // Simulate fetching data
            setForm({
                name: 'VR Mall Billboard',
                type: 'Billboard',
                price: '15000',
                location: 'Anna Nagar, Chennai',
                status: 'Active',
                description: 'Premium billboard location with high visibility.',
            });
        }
    }, [isEdit]);

    const handleSave = () => {
        // Handle save logic
        router.back();
    };

    return (
        <WebLayout role="vendor" title={isEdit ? "Edit Listing" : "Add New Listing"}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <ArrowLeft size={20} color={Colors.text.secondary} />
                    <Text style={styles.backText}>Back to Listings</Text>
                </TouchableOpacity>

                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{isEdit ? 'Edit Listing Details' : 'Create New Listing'}</Text>
                        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                            <Check size={18} color="#FFFFFF" />
                            <Text style={styles.saveBtnText}>{isEdit ? 'Update Listing' : 'Publish Listing'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGrid}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Listing Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. VR Mall Billboard"
                                value={form.name}
                                onChangeText={(t) => setForm({ ...form, name: t })}
                            />
                        </View>

                        <View style={styles.col}>
                            <Text style={styles.label}>Ad Type</Text>
                            <View style={styles.row}>
                                {['Billboard', 'Digital Screen', 'Transit'].map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[styles.typeChip, form.type === type && styles.activeTypeChip]}
                                        onPress={() => setForm({ ...form, type })}
                                    >
                                        <Text style={[styles.typeText, form.type === type && styles.activeTypeText]}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.col}>
                            <Text style={styles.label}>Price (per day)</Text>
                            <View style={styles.inputWrapper}>
                                <DollarSign size={18} color={Colors.text.tertiary} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="0.00"
                                    value={form.price}
                                    onChangeText={(t) => setForm({ ...form, price: t })}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={styles.col}>
                            <Text style={styles.label}>Location</Text>
                            <View style={styles.inputWrapper}>
                                <MapPin size={18} color={Colors.text.tertiary} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Anna Nagar, Chennai"
                                    value={form.location}
                                    onChangeText={(t) => setForm({ ...form, location: t })}
                                />
                            </View>
                        </View>

                        <View style={[styles.col, { width: '100%' }]}>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Describe your ad space..."
                                value={form.description}
                                onChangeText={(t) => setForm({ ...form, description: t })}
                                multiline
                                numberOfLines={4}
                            />
                        </View>

                        <View style={[styles.col, { width: '100%' }]}>
                            <Text style={styles.label}>Photos</Text>
                            <TouchableOpacity style={styles.uploadBox}>
                                <Upload size={32} color={Colors.text.tertiary} />
                                <Text style={styles.uploadText}>Click to upload images</Text>
                                <Text style={styles.uploadSubtext}>JPG, PNG up to 5MB</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 800,
        gap: 20,
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'flex-start',
    },
    backText: {
        color: Colors.text.secondary,
        fontSize: 14,
        fontWeight: '500',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 32,
        ...Colors.shadow.small,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    saveBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 8,
    },
    saveBtnText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    formGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 24,
    },
    col: {
        width: '48%', // 2 columns
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text.secondary,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        fontSize: 15,
        color: Colors.text.primary,
        outlineStyle: 'none',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        gap: 10,
    },
    textArea: {
        height: 120,
        paddingTop: 12,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    typeChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    activeTypeChip: {
        backgroundColor: '#FFF0E6',
        borderColor: Colors.primary,
    },
    typeText: {
        fontSize: 13,
        color: Colors.text.secondary,
        fontWeight: '500',
    },
    activeTypeText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    uploadBox: {
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        borderRadius: 16,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        gap: 8,
    },
    uploadText: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.text.primary,
    },
    uploadSubtext: {
        fontSize: 13,
        color: Colors.text.tertiary,
    },
});
