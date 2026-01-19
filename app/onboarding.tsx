import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ColorValue,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { User, Mail, Building2, Briefcase, ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');

  const isFormValid = name.trim() && email.trim() && email.includes('@');

  const handleComplete = () => {
    if (isFormValid) {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
        style={[styles.header, { paddingTop: insets.top + 40 }]}
      >
        <Text style={styles.headerTitle}>Complete Your Profile</Text>
        <Text style={styles.headerSubtitle}>
          Help us personalize your experience
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <ScrollView
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <User size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Full Name *</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor={Colors.text.tertiary}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <Mail size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Email Address *</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              placeholderTextColor={Colors.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <Building2 size={20} color={Colors.text.secondary} />
              </View>
              <Text style={styles.inputLabel}>Company Name (Optional)</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Your company name"
              placeholderTextColor={Colors.text.tertiary}
              value={companyName}
              onChangeText={setCompanyName}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <Briefcase size={20} color={Colors.text.secondary} />
              </View>
              <Text style={styles.inputLabel}>Designation (Optional)</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Your job title"
              placeholderTextColor={Colors.text.tertiary}
              value={designation}
              onChangeText={setDesignation}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.completeButton,
              !isFormValid && styles.completeButtonDisabled,
            ]}
            onPress={handleComplete}
            disabled={!isFormValid}
          >
            <LinearGradient
              colors={
                isFormValid
                  ? (Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]])
                  : ['#ccc', '#999'] as readonly [ColorValue, ColorValue, ...ColorValue[]]
              }
              style={styles.completeGradient}
            >
              <Text style={styles.completeText}>Get Started</Text>
              <ArrowRight size={20} color={Colors.text.inverse} />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.requiredText}>* Required fields</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: Colors.text.inverse,
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
    marginTop: -24,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  formContent: {
    padding: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  completeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    ...Colors.shadow.medium,
    marginTop: 8,
    marginBottom: 16,
  },
  completeButtonDisabled: {
    opacity: 0.5,
  },
  completeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  completeText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  requiredText: {
    fontSize: 12,
    color: Colors.text.tertiary,
    textAlign: 'center' as const,
  },
});
