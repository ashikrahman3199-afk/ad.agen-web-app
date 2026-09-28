import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Mail, Trash2, ArrowLeft } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { trpc } from '@/lib/trpc';

const clientLogoWhite = require('@/assets/images/logo-client-white.png');
const vendorLogoWhite = require('@/assets/images/logo-vendor-white.png');

const { width } = Dimensions.get('window');

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [role, setRole] = useState<'client' | 'vendor'>('client');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const deleteAccountMutation = trpc.auth.deleteAccount.useMutation({
    onSuccess: (data) => {
      setIsError(false);
      setMessage("Your account and all associated data have been permanently deleted.");
      setEmail('');
    },
    onError: (err) => {
      setIsError(true);
      setMessage(err.message || "Failed to process account deletion.");
    }
  });

  const handleSubmit = () => {
    setMessage('');
    if (!email) {
      setIsError(true);
      setMessage("Please enter your email address.");
      return;
    }
    
    deleteAccountMutation.mutate({ email, role });
  };

  return (
    <View style={styles.container}>
      {/* Left Side - Image/Brand (Hidden on mobile) */}
      {width > 900 && (
        <View style={[styles.leftPanel, { backgroundColor: role === 'client' ? Colors.primary : Colors.vendor.primary }]}>
          <View style={styles.brandContainer}>
            <Image source={role === 'client' ? clientLogoWhite : vendorLogoWhite} style={styles.brandLogoImage} contentFit="contain" />
            <Text style={styles.brandTagline}>The Future of Ad Booking</Text>
          </View>
          <View style={styles.overlay} />
          <View style={[styles.bgPlaceholder, { backgroundColor: role === 'client' ? Colors.primaryDark : Colors.vendor.primaryDark }]} />
        </View>
      )}

      {/* Right Side - Form */}
      <View style={styles.rightPanel}>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={Colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
                <Trash2 size={32} color="#DC2626" />
            </View>
            <Text style={styles.title}>Delete Account</Text>
            <Text style={styles.subtitle}>Enter your email address to permanently delete your account and all associated data. This action cannot be undone.</Text>
          </View>

          {/* Role Selector */}
          <View style={styles.roleSelector}>
            <TouchableOpacity 
              style={[styles.roleButton, role === 'client' && styles.roleButtonActive]}
              onPress={() => setRole('client')}
            >
              <Text style={[styles.roleText, role === 'client' && styles.roleTextActive]}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.roleButton, role === 'vendor' && styles.roleButtonActive]}
              onPress={() => setRole('vendor')}
            >
              <Text style={[styles.roleText, role === 'vendor' && styles.roleTextActive]}>Vendor</Text>
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

          {message ? (
            <View style={[styles.messageContainer, { backgroundColor: isError ? '#FEF2F2' : '#F0FDF4', borderColor: isError ? '#FECACA' : '#BBF7D0' }]}>
              <Text style={[styles.messageText, { color: isError ? '#991B1B' : '#166534' }]}>{message}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={[
              styles.submitButton,
              deleteAccountMutation.isPending && { opacity: 0.7 }
            ]}
            onPress={handleSubmit}
            disabled={deleteAccountMutation.isPending}
          >
            {deleteAccountMutation.isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Delete My Account</Text>
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
  rightPanel: {
    flex: 1,
    maxWidth: 600,
    width: '100%',
    padding: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  backButton: {
    marginBottom: 32,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },
  roleSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  roleButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  roleText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.tertiary,
  },
  roleTextActive: {
    color: Colors.text.primary,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    height: '100%',
  },
  messageContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#DC2626',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});
