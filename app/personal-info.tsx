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
import { User, Mail, Phone, MapPin, Calendar, Save } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function PersonalInfoScreen() {
  const router = useRouter();
  const [name, setName] = useState('Ashik Kumar');
  const [email, setEmail] = useState('ashik@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('123 MG Road, Bangalore');
  const [dateOfBirth, setDateOfBirth] = useState('15/01/1990');

  const handleSave = () => {
    console.log('Saving personal info...');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Personal Information',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AK</Text>
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <View style={styles.iconContainer}>
                <User size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Full Name</Text>
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
              <Text style={styles.inputLabel}>Email Address</Text>
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
                <Phone size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Phone Number</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="+91 98765 43210"
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
              <Text style={styles.inputLabel}>Address</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter your address"
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
                <Calendar size={20} color={Colors.primary} />
              </View>
              <Text style={styles.inputLabel}>Date of Birth</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              placeholderTextColor={Colors.text.tertiary}
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    ...Colors.shadow.medium,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
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
