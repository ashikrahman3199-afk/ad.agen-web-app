import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ColorValue,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Building2, Mail, Phone, MapPin, Globe, Hash, Save } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function CompanyDetailsScreen() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState('Tech Innovations Pvt Ltd');
  const [designation, setDesignation] = useState('Marketing Manager');
  const [email, setEmail] = useState('info@techinnovations.com');
  const [phone, setPhone] = useState('+91 80 1234 5678');
  const [address, setAddress] = useState('456 Tech Park, Whitefield, Bangalore');
  const [website, setWebsite] = useState('www.techinnovations.com');
  const [gstNumber, setGstNumber] = useState('29ABCDE1234F1Z5');

  const handleSave = () => {
    console.log('Saving company details...');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Company Details',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <View style={styles.companyIcon}>
            <Building2 size={48} color={Colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Business Information</Text>
          <Text style={styles.headerSubtitle}>
            Update your company profile for better ad targeting
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <Building2 size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Company Name</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter company name"
              placeholderTextColor={Colors.text.tertiary}
              value={companyName}
              onChangeText={setCompanyName}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <Building2 size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Your Designation</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your designation"
              placeholderTextColor={Colors.text.tertiary}
              value={designation}
              onChangeText={setDesignation}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <Mail size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Company Email</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="company@example.com"
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
                <Phone size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Company Phone</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="+91 80 1234 5678"
              placeholderTextColor={Colors.text.tertiary}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <MapPin size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Company Address</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter company address"
              placeholderTextColor={Colors.text.tertiary}
              multiline
              numberOfLines={3}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <Globe size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Website</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="www.company.com"
              placeholderTextColor={Colors.text.tertiary}
              keyboardType="url"
              autoCapitalize="none"
              value={website}
              onChangeText={setWebsite}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <Hash size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>GST Number</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter GST number"
              placeholderTextColor={Colors.text.tertiary}
              autoCapitalize="characters"
              value={gstNumber}
              onChangeText={setGstNumber}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient
            colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
            style={styles.saveButtonGradient}
          >
            <Save size={20} color={Colors.text.inverse} />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  companyIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...Colors.shadow.small,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    paddingHorizontal: 32,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 32,
    ...Colors.shadow.medium,
  },
  saveButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  bottomSpacer: {
    height: 32,
  },
});
