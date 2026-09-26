import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Phone, User, Building2, ArrowRight, CheckCircle2, Mail, Lock, FileText, Square, CheckSquare } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { trpc } from '@/lib/trpc';
import { useApp } from '@/contexts/AppContext';


const clientLogoWhite = require('@/assets/images/logo-client-white.png');
const vendorLogoWhite = require('@/assets/images/logo-vendor-white.png');

const { width } = Dimensions.get('window');

export default function SignupScreen() {
    const router = useRouter();
    const { login } = useApp();
    const [role, setRole] = useState<'client' | 'vendor'>('client');
    const [step, setStep] = useState<'details'>('details');

    // Form Data
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [gst, setGst] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const registerMutation = trpc.auth.register.useMutation({
        onSuccess: (data) => {
            setErrorMessage('');
            if (data.success && data.token) {
                login(role, data.token, data.user);
            }
        },
        onError: (err) => {
            console.error("Signup Error:", err);
            setErrorMessage(err.message || "Failed to connect to the server.");
        }
    });

    const handleSignup = () => {
        setErrorMessage('');
        if (!name || !email || !password || phoneNumber.length < 10) {
            setErrorMessage("Please fill in all required details.");
            return;
        }
        if (role === 'vendor' && !agreed) {
            setErrorMessage("You must agree to the Terms & Conditions and Privacy Policy.");
            return;
        }
        if (role === 'vendor' && !company) {
             setErrorMessage("Please provide your Business / Company name.");
             return;
        }
        
        const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
        registerMutation.mutate({ 
            name, 
            email, 
            password, 
            phoneNumber: formattedPhone, 
            company, 
            gst, 
            role 
        });
    };

    return (
        <View style={styles.container}>
            {/* Left Side - Image/Brand (Hidden on mobile) */}
            {width > 900 && (
                <View style={[styles.leftPanel, { backgroundColor: role === 'client' ? Colors.primary : Colors.vendor.primary }]}>
                    <View style={styles.brandContainer}>
                        <Image source={role === 'client' ? clientLogoWhite : vendorLogoWhite} style={styles.brandLogoImage} contentFit="contain" />
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
                <ScrollView 
                    style={styles.scrollView} 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.formContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>
                            {role === 'vendor' ? 'Sign up to start receiving ad requests' : 'Start your journey with Ad.Agen today.'}
                        </Text>
                    </View>

                    {/* Role Selector */}
                    {step === 'details' && (
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
                    )}

                    {/* Inputs */}
                    {role === 'client' ? (
                        <>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <User size={20} color={Colors.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Your Full Name" placeholderTextColor={Colors.text.tertiary} value={name} onChangeText={setName} />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <Mail size={20} color={Colors.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor={Colors.text.tertiary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <Phone size={20} color={Colors.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Mobile Number" placeholderTextColor={Colors.text.tertiary} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" maxLength={10} />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <Lock size={20} color={Colors.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Colors.text.tertiary} value={password} onChangeText={setPassword} secureTextEntry />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <Building2 size={20} color={Colors.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Company OR Brand Name (Optional)" placeholderTextColor={Colors.text.tertiary} value={company} onChangeText={setCompany} />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <FileText size={20} color={Colors.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="GST Number (Optional)" placeholderTextColor={Colors.text.tertiary} value={gst} onChangeText={setGst} autoCapitalize="characters" />
                                </View>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <User size={20} color={Colors.vendor.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Your Full Name" placeholderTextColor={Colors.text.tertiary} value={name} onChangeText={setName} />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <Building2 size={20} color={Colors.vendor.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Business / Company" placeholderTextColor={Colors.text.tertiary} value={company} onChangeText={setCompany} />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <Mail size={20} color={Colors.vendor.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor={Colors.text.tertiary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <Phone size={20} color={Colors.vendor.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Mobile Number" placeholderTextColor={Colors.text.tertiary} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" maxLength={10} />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <Lock size={20} color={Colors.vendor.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Colors.text.tertiary} value={password} onChangeText={setPassword} secureTextEntry />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <FileText size={20} color={Colors.vendor.primary} style={styles.inputIcon} />
                                    <TextInput style={styles.input} placeholder="Valid GST Number (Optional)" placeholderTextColor={Colors.text.tertiary} value={gst} onChangeText={setGst} autoCapitalize="characters" />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreed(!agreed)}>
                                {agreed ? <CheckSquare size={20} color={Colors.vendor.primary} /> : <Square size={20} color={Colors.text.tertiary} />}
                                <Text style={styles.checkboxText}>I agree to the Terms & Conditions and Privacy Policy</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    ) : null}

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            { backgroundColor: role === 'client' ? Colors.primary : Colors.vendor.primary },
                            registerMutation.isPending && { opacity: 0.7 }
                        ]}
                        onPress={handleSignup}
                        disabled={registerMutation.isPending}
                    >
                        {registerMutation.isPending ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <>
                                <Text style={styles.submitButtonText}>Sign Up</Text>
                            </>
                        )}
                    </TouchableOpacity>



                    <View style={styles.termsContainer}>
                        <Text style={styles.termsText}>
                            By continuing, you agree to our{' '}
                            <Text 
                                style={[styles.termsLink, { color: role === 'client' ? Colors.primary : Colors.vendor.primary }]}
                                onPress={() => router.push(role === 'vendor' ? '/vendor-terms' : '/terms')}
                            >
                                {role === 'vendor' ? 'Vendor Terms & Conditions' : 'Terms & Conditions'}
                            </Text>
                            {' '}and{' '}
                            <Text 
                                style={[styles.termsLink, { color: role === 'client' ? Colors.primary : Colors.vendor.primary }]}
                                onPress={() => router.push('/privacy')}
                            >
                                Privacy Policy
                            </Text>.
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/login')}>
                            <Text style={[styles.footerLink, { color: role === 'client' ? Colors.primary : Colors.vendor.primary }]}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
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
    brandLogoImage: {
        width: 180,
        height: 60,
        marginBottom: 8,
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
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
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
        marginBottom: 12,
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
    backLink: {
        alignSelf: 'center',
        marginBottom: 24,
    },
    termsContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 24,
    },
    termsText: {
        fontSize: 12,
        color: Colors.text.secondary,
        textAlign: 'center',
        lineHeight: 18,
    },
    termsLink: {
        fontWeight: '600',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 8,
        gap: 8,
    },
    checkboxText: {
        fontSize: 12,
        color: Colors.text.secondary,
        flex: 1,
    },
    errorContainer: {
        backgroundColor: '#FEE2E2',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FCA5A5',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    }
});
