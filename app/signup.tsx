import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Lock, Mail, User, Building2, ArrowRight, CheckCircle2 } from 'lucide-react-native';
import Colors from '@/constants/colors';

const { width } = Dimensions.get('window');

export default function SignupScreen() {
    const router = useRouter();
    const [role, setRole] = useState<'client' | 'vendor'>('client');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {
        if (role === 'client') {
            router.replace('/(tabs)/home');
        } else {
            router.replace('/vendor/dashboard');
        }
    };

    return (
        <View style={styles.container}>
            {/* Left Side - Image/Brand (Hidden on mobile) */}
            {width > 900 && (
                <View style={[styles.leftPanel, { backgroundColor: role === 'client' ? Colors.primary : Colors.vendor.primary }]}>
                    <View style={styles.brandContainer}>
                        <Text style={styles.brandLogo}>Altd<Text style={[styles.brandHighlight, { color: role === 'client' ? Colors.accent : Colors.vendor.accent }]}>.</Text></Text>
                        <Text style={styles.brandTagline}>Join the Network</Text>
                    </View>

                    <View style={styles.featureList}>
                        <View style={styles.featureItem}>
                            <CheckCircle2 size={24} color="#FFFFFF" />
                            <View>
                                <Text style={styles.featureTitle}>Expand Your Reach</Text>
                                <Text style={styles.featureDesc}>Connect with top brands and media owners.</Text>
                            </View>
                        </View>
                        <View style={styles.featureItem}>
                            <CheckCircle2 size={24} color="#FFFFFF" />
                            <View>
                                <Text style={styles.featureTitle}>Transparent Pricing</Text>
                                <Text style={styles.featureDesc}>No hidden fees, just clear value.</Text>
                            </View>
                        </View>
                        <View style={styles.featureItem}>
                            <CheckCircle2 size={24} color="#FFFFFF" />
                            <View>
                                <Text style={styles.featureTitle}>24/7 Support</Text>
                                <Text style={styles.featureDesc}>Dedicated team to help you succeed.</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.overlay} />
                    <View style={[styles.bgPlaceholder, { backgroundColor: role === 'client' ? Colors.primaryDark : Colors.vendor.primaryDark }]} />
                </View>
            )}

            {/* Right Side - Signup Form */}
            <View style={styles.rightPanel}>
                <View style={styles.formContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Start your journey with Rork today.</Text>
                    </View>

                    {/* Role Selector */}
                    <View style={styles.roleSelector}>
                        <TouchableOpacity
                            style={[styles.roleButton, role === 'client' && styles.roleButtonActive]}
                            onPress={() => setRole('client')}
                        >
                            <Text style={[styles.roleText, role === 'client' && styles.roleTextActive]}>Advertiser</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.roleButton, role === 'vendor' && styles.roleButtonActive]}
                            onPress={() => setRole('vendor')}
                        >
                            <Text style={[styles.roleText, role === 'vendor' && styles.roleTextActive]}>Media Owner</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Inputs */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <View style={styles.inputWrapper}>
                            <User size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="John Doe"
                                placeholderTextColor={Colors.text.tertiary}
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Company Name</Text>
                        <View style={styles.inputWrapper}>
                            <Building2 size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Acme Corp"
                                placeholderTextColor={Colors.text.tertiary}
                                value={company}
                                onChangeText={setCompany}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputWrapper}>
                            <Mail size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="name@company.com"
                                placeholderTextColor={Colors.text.tertiary}
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputWrapper}>
                            <Lock size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor={Colors.text.tertiary}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, { backgroundColor: role === 'client' ? Colors.primary : Colors.vendor.primary }]}
                        onPress={handleSignup}
                    >
                        <Text style={styles.submitButtonText}>Create Account</Text>
                        <ArrowRight size={20} color="#FFFFFF" />
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/login')}>
                            <Text style={[styles.footerLink, { color: role === 'client' ? Colors.primary : Colors.vendor.primary }]}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    leftPanel: {
        flex: 1,
        backgroundColor: Colors.primary,
        position: 'relative',
        justifyContent: 'space-between',
        padding: 60,
    },
    bgPlaceholder: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.primaryDark,
        opacity: 0.5,
        zIndex: -1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    brandContainer: {
        zIndex: 10,
    },
    brandLogo: {
        fontSize: 48,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    brandHighlight: {
        color: Colors.accent,
    },
    brandTagline: {
        fontSize: 20,
        color: 'rgba(255,255,255,0.9)',
        fontWeight: '500',
    },
    featureList: {
        gap: 32,
        zIndex: 10,
    },
    featureItem: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    featureDesc: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
    },
    rightPanel: {
        flex: 1,
        maxWidth: 600,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.text.primary,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.text.secondary,
    },
    roleSelector: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        padding: 4,
        borderRadius: 12,
        marginBottom: 24,
    },
    roleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    roleButtonActive: {
        backgroundColor: '#FFFFFF',
        ...Colors.shadow.small,
    },
    roleText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.secondary,
    },
    roleTextActive: {
        color: Colors.text.primary,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        height: 48,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.text.primary,
        outlineStyle: 'none',
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginTop: 16,
        marginBottom: 32,
        ...Colors.shadow.medium,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
    },
    footerText: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    footerLink: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.primary,
    },
});
