import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Bell, Shield, CreditCard, HelpCircle, ChevronRight, LogOut } from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

export default function ServicesScreen() {
  const router = useRouter();
  const sections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Information', type: 'link' },
        { icon: CreditCard, label: 'Payment Methods', type: 'link' },
        { icon: Shield, label: 'Security', type: 'link' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', type: 'switch', value: true },
        { icon: HelpCircle, label: 'Help & Support', type: 'link' },
      ]
    }
  ];

  const handleLogout = () => {
    // In a real app, clear auth state here
    router.replace('/login');
  };

  return (
    <WebLayout role="client" title="Settings">
      <View style={styles.container}>
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.card}>
              {section.items.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.row, i !== section.items.length - 1 && styles.borderBottom]}
                  disabled={item.type === 'switch'}
                >
                  <View style={styles.rowLeft}>
                    <View style={styles.iconBox}>
                      <item.icon size={20} color={Colors.text.secondary} />
                    </View>
                    <Text style={styles.label}>{item.label}</Text>
                  </View>
                  {item.type === 'switch' ? (
                    <Switch value={item.value} trackColor={{ true: Colors.primary }} />
                  ) : (
                    <ChevronRight size={20} color={Colors.text.tertiary} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </WebLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 800,
    gap: 32,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    ...Colors.shadow.small,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#FEF2F2',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});
