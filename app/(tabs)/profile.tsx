import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ColorValue,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import {
  User,
  Mail,
  Phone,
  Building2,
  Bell,
  Settings,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
  ShoppingBag,
  Package,
  ArrowLeft,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';

export default function ProfileScreen() {
  const { campaigns } = useApp();
  const insets = useSafeAreaInsets();

  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const completedCampaigns = campaigns.filter(c => c.status === 'completed').length;

  const menuSections = [
    {
      title: 'Bookings',
      items: [
        { id: '0', label: 'My Bookings', icon: ShoppingBag, onPress: () => router.push('/bookings') },
        { id: '1', label: 'Create Custom Bundle', icon: Package, onPress: () => router.push('/custom-bundle') },
      ],
    },
    {
      title: 'Account',
      items: [
        { id: '2', label: 'Personal Information', icon: User, onPress: () => router.push('/personal-info' as any) },
        { id: '3', label: 'Company Details', icon: Building2, onPress: () => router.push('/company-details' as any) },
        { id: '4', label: 'Notification Settings', icon: Bell, onPress: () => router.push('/notification-settings' as any) },
        { id: '5', label: 'App Preferences', icon: Settings, onPress: () => router.push('/app-preferences' as any) },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: '6', label: 'Help Center', icon: HelpCircle, onPress: () => router.push('/help-center') },
        { id: '7', label: 'Terms of Service', icon: FileText, onPress: () => router.push('/terms') },
        { id: '8', label: 'Privacy Policy', icon: Shield, onPress: () => router.push('/privacy') },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={[styles.customHeader, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.customHeaderTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <LinearGradient
          colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
          style={styles.profileCard}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AS</Text>
            </View>
          </View>
          <Text style={styles.profileName}>Ashik Kumar</Text>
          <Text style={styles.profileEmail}>ashik@example.com</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{activeCampaigns}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedCampaigns}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Mail size={20} color={Colors.text.secondary} />
            <Text style={styles.infoText}>ashik@example.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Phone size={20} color={Colors.text.secondary} />
            <Text style={styles.infoText}>+91 98765 43210</Text>
          </View>
          <View style={styles.infoRow}>
            <Building2 size={20} color={Colors.text.secondary} />
            <Text style={styles.infoText}>Tech Innovations Pvt Ltd</Text>
          </View>
        </View>

        {menuSections.map(section => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      index !== section.items.length - 1 && styles.menuItemBorder,
                    ]}
                    onPress={item.onPress}
                  >
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuIconContainer}>
                        <Icon size={20} color={Colors.primary} />
                      </View>
                      <Text style={styles.menuItemText}>{item.label}</Text>
                    </View>
                    <ChevronRight size={20} color={Colors.text.tertiary} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>

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
  customHeader: {
    backgroundColor: Colors.surface,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    ...Colors.shadow.small,
  },
  customHeaderTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  backButton: {
    padding: 8,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  profileCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    ...Colors.shadow.medium,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.text.inverse,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.text.inverse,
    opacity: 0.9,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 16,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.inverse,
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.text.inverse,
    opacity: 0.3,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    marginBottom: 24,
    ...Colors.shadow.small,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text.primary,
    flex: 1,
  },
  menuSection: {
    marginBottom: 24,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    ...Colors.shadow.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
    color: Colors.text.primary,
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.error,
    ...Colors.shadow.small,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.error,
  },
  version: {
    fontSize: 12,
    color: Colors.text.tertiary,
    textAlign: 'center' as const,
    marginTop: 24,
  },
  bottomSpacer: {
    height: 32,
  },
});
