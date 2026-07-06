import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { ArrowLeft, Upload, MapPin, DollarSign, Tag, Check, Calendar as CalendarIcon } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';
import { useApp } from '@/contexts/AppContext';
import { categories } from '@/constants/adSpaces';
import { categoryFieldsMap, CategoryField } from '@/constants/categoryFields';
import { Calendar } from 'react-native-calendars';

export default function AddListing() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const isEdit = !!params.id;

    const [form, setForm] = useState({
        name: '',
        type: categories[0].name,
        categoryId: categories[0].id,
        price: '',
        location: '',
        status: 'Active',
        description: '',
        minDuration: '1',
    });

    const [metadata, setMetadata] = useState<Record<string, any>>({});
    const [subServices, setSubServices] = useState<string[]>([]);
    const [blockedDates, setBlockedDates] = useState<string[]>([]);
    const [showCalendar, setShowCalendar] = useState(false);

    const utils = trpc.useUtils();
    const createListing = trpc.listings.create.useMutation({
        onSuccess: () => {
            utils.listings.list.invalidate();
            router.back();
        },
    });

    useEffect(() => {
        if (isEdit) {
            // Simulate fetching data for edit mode
            setForm({
                name: 'VR Mall Billboard',
                type: 'Billboard',
                categoryId: 'billboards',
                price: '15000',
                location: 'Anna Nagar, Chennai',
                status: 'Active',
                description: 'Premium billboard location with high visibility.',
                minDuration: '1',
            });
            setMetadata({
                size: '40x20 ft',
                lighting: 'Front-lit'
            });
            setSubServices(['Hoarding']);
            setBlockedDates(['2026-07-01']);
        }
    }, [isEdit]);

    // Update metadata and subservices when category changes
    useEffect(() => {
        if (!isEdit) {
            setMetadata({});
            setSubServices([]);
        }
    }, [form.categoryId]);

    const handleSave = () => {
        if (isEdit) {
            router.back();
        } else {
            createListing.mutate({
                name: form.name,
                categoryId: form.categoryId,
                price: parseFloat(form.price) || 0,
                location: form.location,
                description: form.description,
                status: 'Pending',
                minDuration: parseInt(form.minDuration) || 1,
                metadata: metadata,
                subServices: subServices,
                blockedDates: blockedDates,
            });
        }
    };

    const toggleSubService = (service: string) => {
        if (subServices.includes(service)) {
            setSubServices(subServices.filter(s => s !== service));
        } else {
            setSubServices([...subServices, service]);
        }
    };

    const toggleDate = (dateString: string) => {
        if (blockedDates.includes(dateString)) {
            setBlockedDates(blockedDates.filter(d => d !== dateString));
        } else {
            setBlockedDates([...blockedDates, dateString]);
        }
    };

    const currentCategoryConfig = categoryFieldsMap[form.categoryId] || categoryFieldsMap['billboards'];

    const markedDates = blockedDates.reduce((acc: any, date) => {
        acc[date] = { selected: true, selectedColor: Colors.vendor.primary, disableTouchEvent: false };
        return acc;
    }, {});

    const renderDynamicField = (field: CategoryField) => {
        return (
            <View style={styles.col} key={field.name}>
                <Text style={styles.label}>{field.label}</Text>
                {field.type === 'select' && field.options ? (
                    <View style={styles.pickerContainer}>
                        {field.options.map((opt) => (
                            <TouchableOpacity
                                key={opt}
                                style={[styles.typeChip, metadata[field.name] === opt && styles.activeTypeChip]}
                                onPress={() => setMetadata({ ...metadata, [field.name]: opt })}
                            >
                                <Text style={[styles.typeText, metadata[field.name] === opt && styles.activeTypeText]}>{opt}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <TextInput
                        style={styles.input}
                        placeholder={field.placeholder}
                        value={metadata[field.name] ? String(metadata[field.name]) : ''}
                        onChangeText={(t) => setMetadata({ ...metadata, [field.name]: field.type === 'number' ? parseFloat(t) || '' : t })}
                        keyboardType={field.type === 'number' ? 'numeric' : 'default'}
                    />
                )}
            </View>
        );
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
                        <TouchableOpacity
                            style={[styles.saveBtn, createListing.isPending && { opacity: 0.7 }]}
                            onPress={handleSave}
                            disabled={createListing.isPending}
                        >
                            <Check size={18} color="#FFFFFF" />
                            <Text style={styles.saveBtnText}>
                                {createListing.isPending ? 'Saving...' : (isEdit ? 'Update Listing' : 'Publish Listing')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGrid}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Listing Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. VR Mall Billboard"
                                value={form.name}
                                onChangeText={(t) => setForm({ ...form, name: t })}
                            />
                        </View>

                        <View style={styles.col}>
                            <Text style={styles.label}>Category *</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                                {categories.map((cat) => (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[styles.typeChip, form.categoryId === cat.id && styles.activeTypeChip]}
                                        onPress={() => setForm({ ...form, type: cat.name, categoryId: cat.id })}
                                    >
                                        <Text style={[styles.typeText, form.categoryId === cat.id && styles.activeTypeText]}>{cat.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <View style={styles.col}>
                            <Text style={styles.label}>Base Price *</Text>
                            <View style={styles.inputWrapper}>
                                <DollarSign size={18} color={Colors.text.tertiary} />
                                <TextInput
                                    style={[styles.input, { borderWidth: 0, flex: 1, paddingHorizontal: 0 }]}
                                    placeholder="0.00"
                                    value={form.price}
                                    onChangeText={(t) => setForm({ ...form, price: t })}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View style={styles.col}>
                            <Text style={styles.label}>Min Duration (Days)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="1"
                                value={form.minDuration}
                                onChangeText={(t) => setForm({ ...form, minDuration: t })}
                                keyboardType="numeric"
                            />
                        </View>

                        <View style={styles.col}>
                            <Text style={styles.label}>Location *</Text>
                            <View style={styles.inputWrapper}>
                                <MapPin size={18} color={Colors.text.tertiary} />
                                <TextInput
                                    style={[styles.input, { borderWidth: 0, flex: 1, paddingHorizontal: 0 }]}
                                    placeholder="e.g. City Square"
                                    value={form.location}
                                    onChangeText={(t) => setForm({ ...form, location: t })}
                                />
                            </View>
                        </View>

                        {/* Dynamic Category Fields */}
                        <View style={styles.fullWidthDivider} />
                        <Text style={styles.sectionTitle}>Service Specific Details</Text>
                        
                        {currentCategoryConfig.fields.map(renderDynamicField)}

                        {/* Sub-Services Checklist */}
                        <View style={styles.fullWidthDivider} />
                        <View style={styles.colFull}>
                            <Text style={styles.sectionTitle}>Available Sub-Services</Text>
                            <Text style={styles.uploadSubtext}>Select the specific services you offer for this listing.</Text>
                            <View style={styles.servicesContainer}>
                                {currentCategoryConfig.services.map((service) => (
                                    <TouchableOpacity 
                                        key={service} 
                                        style={[styles.serviceCheck, subServices.includes(service) && styles.serviceCheckActive]}
                                        onPress={() => toggleSubService(service)}
                                    >
                                        <View style={[styles.checkbox, subServices.includes(service) && styles.checkboxActive]}>
                                            {subServices.includes(service) && <Check size={14} color="#FFF" />}
                                        </View>
                                        <Text style={styles.serviceText}>{service}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Availability Calendar */}
                        <View style={styles.fullWidthDivider} />
                        <View style={styles.colFull}>
                            <Text style={styles.sectionTitle}>Block Booked Dates</Text>
                            <Text style={styles.uploadSubtext}>Select dates on the calendar that are already booked or unavailable.</Text>
                            
                            <TouchableOpacity style={styles.calendarToggleBtn} onPress={() => setShowCalendar(!showCalendar)}>
                                <CalendarIcon size={20} color={Colors.vendor.primary} />
                                <Text style={styles.calendarToggleText}>
                                    {showCalendar ? "Hide Calendar" : `Show Calendar (${blockedDates.length} blocked)`}
                                </Text>
                            </TouchableOpacity>

                            {showCalendar && (
                                <View style={styles.calendarContainer}>
                                    <Calendar
                                        onDayPress={(day: any) => toggleDate(day.dateString)}
                                        markedDates={markedDates}
                                        theme={{
                                            todayTextColor: Colors.vendor.primary,
                                            arrowColor: Colors.vendor.primary,
                                            selectedDayBackgroundColor: Colors.vendor.primary,
                                        }}
                                    />
                                </View>
                            )}
                        </View>

                        <View style={styles.fullWidthDivider} />

                        <View style={[styles.col, { width: '100%' }]}>
                            <Text style={styles.label}>Description *</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Describe the advertising medium..."
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
        backgroundColor: Colors.vendor.primary,
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
        width: '48%',
        gap: 8,
    },
    colFull: {
        width: '100%',
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
    categoryScroll: {
        gap: 12,
        paddingBottom: 4,
    },
    pickerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    textArea: {
        height: 120,
        paddingTop: 12,
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
        backgroundColor: '#F0FDFA',
        borderColor: Colors.vendor.primary,
    },
    typeText: {
        fontSize: 13,
        color: Colors.text.secondary,
        fontWeight: '500',
    },
    activeTypeText: {
        color: Colors.vendor.primary,
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
    fullWidthDivider: {
        width: '100%',
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.primary,
        width: '100%',
    },
    servicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 8,
    },
    serviceCheck: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 10,
        width: '31%',
    },
    serviceCheckActive: {
        backgroundColor: '#F0FDFA',
        borderColor: Colors.vendor.primary,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    checkboxActive: {
        backgroundColor: Colors.vendor.primary,
        borderColor: Colors.vendor.primary,
    },
    serviceText: {
        fontSize: 14,
        color: Colors.text.secondary,
        fontWeight: '500',
    },
    calendarToggleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0FDFA',
        padding: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
        gap: 8,
    },
    calendarToggleText: {
        color: Colors.vendor.primary,
        fontWeight: '600',
    },
    calendarContainer: {
        marginTop: 16,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFF',
    }
});
