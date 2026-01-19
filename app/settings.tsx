import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {
  Bell,
  Globe,
  Moon,
  Volume2,
  Lock,
  Database,
  Smartphone,
  Mail,
  ChevronRight,
} from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function SettingsScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  const settingsSections = [
    {
      title: 'Notifications',
      items: [
        {
          id: 'push',
          label: 'Push Notifications',
          icon: Bell,
          type: 'toggle' as const,
          value: pushNotifications,
          onToggle: setPushNotifications,
        },
        {
          id: 'email',
          label: 'Email Notifications',
          icon: Mail,
          type: 'toggle' as const,
          value: emailNotifications,
          onToggle: setEmailNotifications,
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          id: 'dark',
          label: 'Dark Mode',
          icon: Moon,
          type: 'toggle' as const,
          value: darkMode,
          onToggle: setDarkMode,
        },
        {
          id: 'sound',
          label: 'Sound Effects',
          icon: Volume2,
          type: 'toggle' as const,
          value: soundEffects,
          onToggle: setSoundEffects,
        },
      ],
    },
    {
      title: 'General',
      items: [
        {
          id: 'language',
          label: 'Language',
          icon: Globe,
          type: 'link' as const,
          value: 'English',
          onPress: () => console.log('Language'),
        },
        {
          id: 'device',
          label: 'Device Preferences',
          icon: Smartphone,
          type: 'link' as const,
          onPress: () => console.log('Device'),
        },
      ],
    },
    {
      title: 'Security & Privacy',
      items: [
        {
          id: 'security',
          label: 'Security Settings',
          icon: Lock,
          type: 'link' as const,
          onPress: () => console.log('Security'),
        },
        {
          id: 'data',
          label: 'Data & Storage',
          icon: Database,
          type: 'link' as const,
          onPress: () => console.log('Data'),
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Settings',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {settingsSections.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.settingItem,
                      index !== section.items.length - 1 && styles.settingItemBorder,
                    ]}
                  >
                    <View style={styles.settingItemLeft}>
                      <View style={styles.iconContainer}>
                        <Icon size={20} color={Colors.primary} />
                      </View>
                      <Text style={styles.settingItemText}>{item.label}</Text>
                    </View>
                    
                    {item.type === 'toggle' ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: Colors.border.light, true: Colors.primary }}
                        thumbColor={Colors.surface}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.settingItemRight}
                        onPress={item.onPress}
                      >
                        {item.value && (
                          <Text style={styles.settingItemValue}>{item.value}</Text>
                        )}
                        <ChevronRight size={20} color={Colors.text.tertiary} />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.dangerZone}>
          <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>Clear Cache</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dangerButton}>
            <Text style={styles.dangerButtonText}>Reset Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dangerButton, styles.deleteButton]}>
            <Text style={[styles.dangerButtonText, styles.deleteButtonText]}>Delete Account</Text>
          </TouchableOpacity>
        </View>

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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    ...Colors.shadow.small,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 15,
    color: Colors.text.primary,
    flex: 1,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingItemValue: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  dangerZone: {
    marginTop: 32,
    marginBottom: 16,
  },
  dangerZoneTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.error,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  dangerButton: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  dangerButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    textAlign: 'center' as const,
  },
  deleteButton: {
    borderColor: Colors.error,
    backgroundColor: `${Colors.error}10`,
  },
  deleteButtonText: {
    color: Colors.error,
  },
  bottomSpacer: {
    height: 32,
  },
});
