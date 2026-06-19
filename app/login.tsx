import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, ArrowRight, CheckCircle2, Mail, Lock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';
import { trpc } from '@/lib/trpc';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useApp();
  const [role, setRole] = useState<'client' | 'vendor'>('client');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      setErrorMessage('');
      if (data.success && data.token) {
        login(role, data.token);
      }
    },
    onError: (err) => {
      console.error("Login Error:", err);
      setErrorMessage(err.message || "Failed to connect to the server. Please check your connection.");
    }
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data) => {
      setErrorMessage('');
      if (data.success && data.token) {
        login(role, data.token);
      }
    },
    onError: (err) => {
      console.error("Registration Error:", err);
      setErrorMessage(err.message || "Failed to connect to the server.");
    }
  });

  const handleSubmit = () => {
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    
    if (mode === 'register') {
      if (!phoneNumber || phoneNumber.length < 10) {
        setErrorMessage("Please enter a valid phone number.");
        return;
      }
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      registerMutation.mutate({ email, password, phoneNumber: formattedPhone, role });
    } else {
      loginMutation.mutate({ email, password, role });
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Side - Image/Brand (Hidden on mobile) */}
      {width > 900 && (
        <View style={[styles.leftPanel, { backgroundColor: role === 'client' ? Colors.primary : Colors.vendor.primary }]}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandLogo}>ad<Text style={[styles.brandHighlight, { color: role === 'client' ? Colors.accent : Colors.vendor.accent }]}>.</Text>agen</Text>
            <Text style={styles.brandTagline}>The Future of Ad Booking</Text>
          </View>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <CheckCircle2 size={24} color="#FFFFFF" />
              <View>
                <Text style={styles.featureTitle}>Premium Ad Spaces</Text>
                <Text style={styles.featureDesc}>Access thousands of verified locations.</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle2 size={24} color="#FFFFFF" />
              <View>
                <Text style={styles.featureTitle}>Real-time Analytics</Text>
                <Text style={styles.featureDesc}>Track your campaign performance instantly.</Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <CheckCircle2 size={24} color="#FFFFFF" />
              <View>
                <Text style={styles.featureTitle}>Secure Payments</Text>
                <Text style={styles.featureDesc}>Hassle-free transactions for everyone.</Text>
              </View>
            </View>
          </View>

          <View style={styles.overlay} />
          {/* Placeholder for background image */}
          <View style={[styles.bgPlaceholder, { backgroundColor: role === 'client' ? Colors.primaryDark : Colors.vendor.primaryDark }]} />
        </View>
      )}

      {/* Right Side - Login Form */}
      <View style={styles.rightPanel}>
        <View style={styles.formContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</Text>
            <Text style={styles.subtitle}>
              {mode === 'login'
                ? 'Enter your credentials to sign in.'
                : 'Sign up to get started.'
              }
            </Text>
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
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="hello@example.com"
                placeholderTextColor={Colors.text.tertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Lock size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor={Colors.text.tertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          {mode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <Phone size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="9876543210"
                  placeholderTextColor={Colors.text.tertiary}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>
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
              (loginMutation.isPending || registerMutation.isPending) && { opacity: 0.7 }
            ]}
            onPress={handleSubmit}
            disabled={loginMutation.isPending || registerMutation.isPending}
          >
            {loginMutation.isPending || registerMutation.isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.submitButtonText}>{mode === 'login' ? 'Sign In' : 'Sign Up'}</Text>
                <ArrowRight size={20} color="#FFFFFF" />
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'register' : 'login')} style={styles.backLink}>
            <Text style={styles.termsText}>
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <Text style={[styles.footerLink, { color: role === 'client' ? Colors.primary : Colors.vendor.primary }]}>
                {mode === 'login' ? "Sign Up" : "Sign In"}
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={[styles.termsLink, { color: role === 'client' ? Colors.primary : Colors.vendor.primary }]}>Terms & Conditions</Text>
              {' '}and{' '}
              <Text style={[styles.termsLink, { color: role === 'client' ? Colors.primary : Colors.vendor.primary }]}>Privacy Policy</Text>.
            </Text>
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
    marginBottom: 40,
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
    marginBottom: 32,
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
    marginBottom: 20,
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
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
    ...Colors.shadow.medium,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  termsContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
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
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  backLink: {
    alignSelf: 'center',
    marginBottom: 24,
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
