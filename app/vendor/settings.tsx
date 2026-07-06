import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Modal, TextInput } from 'react-native';
import { Bell, Lock, Globe, DollarSign, ChevronRight, X, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

export default function VendorSettings() {
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);
    
    // Modals state
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // Password state
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordSave = () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }
        alert('Password updated successfully!');
        setShowPasswordModal(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <WebLayout role="vendor" title="Settings">
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Text style={styles.pageTitle}>Settings</Text>
                    <Text style={styles.pageSubtitle}>Manage your account preferences and notifications.</Text>
                </View>

                <View style={styles.contentGrid}>
                    {/* Notifications Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Bell size={20} color={Colors.text.primary} />
                            <Text style={styles.sectionTitle}>Notifications</Text>
                        </View>
                        
                        <View style={styles.card}>
                            <View style={styles.settingRow}>
                                <View style={styles.settingInfo}>
                                    <Text style={styles.settingTitle}>Email Alerts</Text>
                                    <Text style={styles.settingDesc}>Receive emails when a new booking request is made.</Text>
                                </View>
                                <Switch 
                                    value={emailAlerts} 
                                    onValueChange={setEmailAlerts}
                                    trackColor={{ false: '#E5E7EB', true: Colors.vendor.primary }}
                                    thumbColor="#FFFFFF"
                                />
                            </View>
                            <View style={[styles.settingRow, styles.borderTop]}>
                                <View style={styles.settingInfo}>
                                    <Text style={styles.settingTitle}>Push Notifications</Text>
                                    <Text style={styles.settingDesc}>Get instant alerts on your devices for important updates.</Text>
                                </View>
                                <Switch 
                                    value={pushNotifications} 
                                    onValueChange={setPushNotifications}
                                    trackColor={{ false: '#E5E7EB', true: Colors.vendor.primary }}
                                    thumbColor="#FFFFFF"
                                />
                            </View>
                            <View style={[styles.settingRow, styles.borderTop]}>
                                <View style={styles.settingInfo}>
                                    <Text style={styles.settingTitle}>Marketing Emails</Text>
                                    <Text style={styles.settingDesc}>Receive news, feature updates, and promotional offers.</Text>
                                </View>
                                <Switch 
                                    value={marketingEmails} 
                                    onValueChange={setMarketingEmails}
                                    trackColor={{ false: '#E5E7EB', true: Colors.vendor.primary }}
                                    thumbColor="#FFFFFF"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Security Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Lock size={20} color={Colors.text.primary} />
                            <Text style={styles.sectionTitle}>Security</Text>
                        </View>

                        <View style={styles.card}>
                            <TouchableOpacity style={styles.settingLinkRow} onPress={() => setShowPasswordModal(true)}>
                                <View style={styles.settingInfo}>
                                    <Text style={styles.settingTitle}>Change Password</Text>
                                    <Text style={styles.settingDesc}>Update your account password regularly to stay secure.</Text>
                                </View>
                                <ChevronRight size={20} color={Colors.text.tertiary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>

            {/* Password Modal */}
            <Modal visible={showPasswordModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Change Password</Text>
                            <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
                                <X size={24} color={Colors.text.secondary} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Current Password</Text>
                            <TextInput 
                                style={styles.input} 
                                secureTextEntry 
                                placeholder="Enter current password"
                                value={oldPassword}
                                onChangeText={setOldPassword}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput 
                                style={styles.input} 
                                secureTextEntry 
                                placeholder="Enter new password"
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Confirm New Password</Text>
                            <TextInput 
                                style={styles.input} 
                                secureTextEntry 
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>
                        <TouchableOpacity style={styles.saveBtn} onPress={handlePasswordSave}>
                            <Text style={styles.saveBtnText}>Update Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </WebLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 800,
        width: '100%',
    },
    headerRow: {
        marginBottom: 32,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.text.primary,
        marginBottom: 8,
    },
    pageSubtitle: {
        fontSize: 16,
        color: Colors.text.secondary,
    },
    contentGrid: {
        gap: 32,
    },
    section: {
        gap: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        ...Colors.shadow.small,
        overflow: 'hidden',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    settingLinkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    borderTop: {
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    settingInfo: {
        flex: 1,
        paddingRight: 16,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 4,
    },
    settingDesc: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    statusBadge: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.text.secondary,
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        ...Colors.shadow.medium,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    modalOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    modalOptionText: {
        fontSize: 16,
        color: Colors.text.primary,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        fontSize: 15,
        color: Colors.text.primary,
        backgroundColor: '#F9FAFB',
    },
    saveBtn: {
        backgroundColor: Colors.vendor.primary,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    saveBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
});
