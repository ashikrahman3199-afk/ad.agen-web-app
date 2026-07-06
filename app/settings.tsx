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
  Moon,
  Volume2,
  Mail,
  ChevronRight,
  FileText,
  Shield,
  RotateCcw,
  Briefcase,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

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
          id: 'terms',
          label: 'Terms & Conditions',
          icon: FileText,
          type: 'link' as const,
          onPress: () => router.push('/terms'),
        },
        {
          id: 'privacy',
          label: 'Privacy Policy',
          icon: Shield,
          type: 'link' as const,
          onPress: () => router.push('/privacy'),
        },
        {
          id: 'refund-policy',
          label: 'Refund Policy',
          icon: RotateCcw,
          type: 'link' as const,
          onPress: () => router.push('/refund-policy'),
        },
      ],
    },

  ];

  return (
    <WebLayout role="client" title="Settings">
      <View style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: 'Settings',
            headerShown: false, // hide header since WebLayout provides it
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



        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
    </WebLayout>
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

  bottomSpacer: {
    height: 32,
  },
});
