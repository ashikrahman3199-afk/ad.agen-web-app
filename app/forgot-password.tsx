import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Alert, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Mail, Lock, ArrowLeft, KeyRound } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { trpc } from '@/lib/trpc';

const clientLogoWhite = require('@/assets/images/logo-client-white.png');
const vendorLogoWhite = require('@/assets/images/logo-vendor-white.png');
const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const isVendor = role === 'vendor';
  
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const forgotPasswordMutation = trpc.auth.forgotPassword.useMutation({
    onSuccess: () => {
      setErrorMessage('');
      setStep(2);
    },
    onError: (err) => {
      setErrorMessage(err.message || "Failed to send reset code.");
    }
  });

  const resetPasswordMutation = trpc.auth.resetPassword.useMutation({
    onSuccess: () => {
      setErrorMessage('');
      if (Platform.OS === 'web') {
        alert("Password reset successfully! You can now log in.");
        router.replace('/login');
      } else {
        Alert.alert("Success", "Password reset successfully! You can now log in.", [
          { text: "OK", onPress: () => router.replace('/login') }
        ]);
      }
    },
    onError: (err) => {
      setErrorMessage(err.message || "Failed to reset password. Please check your code.");
    }
  });

  const handleSendCode = () => {
    setErrorMessage('');
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    forgotPasswordMutation.mutate({ email });
  };

  const handleReset = () => {
    setErrorMessage('');
    if (!code || !newPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    resetPasswordMutation.mutate({ email, code, newPassword });
  };

  return (
    <View style={styles.container}>
      {/* Left Side - Hidden on Mobile */}
      {width > 900 && (
        <View style={[styles.leftPanel, { backgroundColor: isVendor ? Colors.vendor.primary : Colors.primary }]}>
          <View style={styles.brandContainer}>
            <Image source={isVendor ? vendorLogoWhite : clientLogoWhite} style={styles.brandLogoImage} contentFit="contain" />
            <Text style={styles.brandTagline}>The Future of Ad Booking</Text>
          </View>
          <View style={styles.overlay} />
          <View style={[styles.bgPlaceholder, { backgroundColor: isVendor ? Colors.vendor.primaryDark : Colors.primaryDark }]} />
        </View>
      )}

      {/* Right Side */}
      <View style={styles.rightPanel}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
            <ArrowLeft size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>{step === 1 ? 'Reset Password' : 'New Password'}</Text>
            <Text style={styles.subtitle}>
              {step === 1 
                ? "Enter your email and we'll send you a verification code." 
                : "Enter the verification code sent to your email and your new password."}
            </Text>
          </View>

          {step === 1 ? (
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
          ) : (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Verification Code</Text>
                <View style={styles.inputWrapper}>
                  <KeyRound size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="123456"
                    placeholderTextColor={Colors.text.tertiary}
                    value={code}
                    onChangeText={setCode}
                    keyboardType="number-pad"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputWrapper}>
                  <Lock size={20} color={Colors.text.tertiary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="********"
                    placeholderTextColor={Colors.text.tertiary}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                  />
                </View>
              </View>
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
              { backgroundColor: isVendor ? Colors.vendor.primary : Colors.primary },
              (forgotPasswordMutation.isPending || resetPasswordMutation.isPending) && { opacity: 0.7 }
            ]}
            onPress={step === 1 ? handleSendCode : handleReset}
            disabled={forgotPasswordMutation.isPending || resetPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending || resetPasswordMutation.isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>{step === 1 ? 'Send Reset Code' : 'Update Password'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  leftPanel: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 60,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  brandContainer: {
    zIndex: 10,
  },
  brandLogoImage: {
    width: 200,
    height: 60,
    marginBottom: 24,
  },
  brandTagline: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '500',
    opacity: 0.9,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  bgPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.primaryDark,
    zIndex: 0,
    opacity: 0.5,
  },
  rightPanel: {
    flex: 1,
    maxWidth: width > 900 ? 600 : '100%',
    width: '100%',
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  formContainer: {
    padding: width > 900 ? 60 : 24,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  backLink: {
    alignSelf: 'flex-start',
    marginBottom: 32,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
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
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 24,
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    height: '100%',
    outlineStyle: 'none',
  } as any,
  submitButton: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    ...Colors.shadow.medium,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
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
