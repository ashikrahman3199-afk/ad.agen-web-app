import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { User, Mail, Phone, Building, FileText, MapPin, Save, LogOut, CreditCard } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

export default function VendorProfile() {
    const router = useRouter();
    const [profile, setProfile] = useState({
        companyName: 'AdMedia Solutions Pvt Ltd',
        gstNumber: '33AABCU9603R1Z2',
        email: 'contact@admedia.com',
        phone: '+91 98765 43210',
        address: '123, Anna Salai, Chennai - 600002',
        contactPerson: 'Rajesh Kumar'
    });

    const handleSave = () => {
        // Handle save logic here
        alert('Profile updated successfully!');
    };

    return (
        <WebLayout role="vendor" title="Company Profile">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.subtitle}>Manage your company details</Text>
                    <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                        <Save size={20} color="#FFFFFF" />
                        <Text style={styles.saveBtnText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Company Information</Text>

                        <View style={styles.row}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Company Name</Text>
                                <View style={styles.inputWrapper}>
                                    <Building size={20} color={Colors.text.tertiary} />
                                    <TextInput
                                        style={styles.input}
                                        value={profile.companyName}
                                        onChangeText={(text) => setProfile({ ...profile, companyName: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>GST Number</Text>
                                <View style={styles.inputWrapper}>
                                    <FileText size={20} color={Colors.text.tertiary} />
                                    <TextInput
                                        style={styles.input}
                                        value={profile.gstNumber}
                                        onChangeText={(text) => setProfile({ ...profile, gstNumber: text })}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Registered Address</Text>
                            <View style={styles.inputWrapper}>
                                <MapPin size={20} color={Colors.text.tertiary} />
                                <TextInput
                                    style={styles.input}
                                    value={profile.address}
                                    onChangeText={(text) => setProfile({ ...profile, address: text })}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact Details</Text>

                        <View style={styles.row}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Contact Person</Text>
                                <View style={styles.inputWrapper}>
                                    <User size={20} color={Colors.text.tertiary} />
                                    <TextInput
                                        style={styles.input}
                                        value={profile.contactPerson}
                                        onChangeText={(text) => setProfile({ ...profile, contactPerson: text })}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Phone Number</Text>
                                <View style={styles.inputWrapper}>
                                    <Phone size={20} color={Colors.text.tertiary} />
                                    <TextInput
                                        style={styles.input}
                                        value={profile.phone}
                                        onChangeText={(text) => setProfile({ ...profile, phone: text })}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Mail size={20} color={Colors.text.tertiary} />
                                <TextInput
                                    style={styles.input}
                                    value={profile.email}
                                    onChangeText={(text) => setProfile({ ...profile, email: text })}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Bank Details</Text>
                        <View style={styles.row}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Account Number</Text>
                                <View style={styles.inputWrapper}>
                                    <CreditCard size={20} color={Colors.text.tertiary} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="XXXXXXXXXXXX"
                                        secureTextEntry
                                    />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>IFSC Code</Text>
                                <View style={styles.inputWrapper}>
                                    <Building size={20} color={Colors.text.tertiary} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ABCD0123456"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/login')}>
                        <LogOut size={20} color="#EF4444" />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </WebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 800,
        gap: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.text.secondary,
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
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 32,
        ...Colors.shadow.small,
    },
    section: {
        gap: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text.primary,
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        gap: 24,
    },
    inputGroup: {
        flex: 1,
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text.secondary,
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
        gap: 12,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Colors.text.primary,
        outlineStyle: 'none',
        height: '100%',
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 32,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: '#FEE2E2',
        backgroundColor: '#FEF2F2',
        borderRadius: 12,
        marginTop: 8,
    },
    logoutText: {
        color: '#EF4444',
        fontWeight: '600',
        fontSize: 15,
    },
});
