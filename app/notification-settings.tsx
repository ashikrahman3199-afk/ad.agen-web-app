import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  ColorValue,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Mail, MessageCircle, ShoppingCart, TrendingUp, Save } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function NotificationSettingsScreen() {
  const router = useRouter();
  
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  const [bookingUpdates, setBookingUpdates] = useState(true);
  const [campaignAlerts, setCampaignAlerts] = useState(true);
  const [promotionalOffers, setPromotionalOffers] = useState(true);
  const [newServices, setNewServices] = useState(false);
  const [priceDrops, setPriceDrops] = useState(true);
  const [recommendations, setRecommendations] = useState(true);

  const handleSave = () => {
    console.log('Saving notification settings...');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Notification Settings',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Bell size={48} color={Colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Stay Updated</Text>
          <Text style={styles.headerSubtitle}>
            Manage how you receive notifications about your campaigns and bookings
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Channels</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Bell size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Push Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Receive instant updates on your device
                  </Text>
                </View>
              </View>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Mail size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Email Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Get detailed updates in your inbox
                  </Text>
                </View>
              </View>
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <MessageCircle size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>SMS Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Receive important alerts via text
                  </Text>
                </View>
              </View>
              <Switch
                value={smsNotifications}
                onValueChange={setSmsNotifications}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Preferences</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <ShoppingCart size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Booking Updates</Text>
                  <Text style={styles.settingDescription}>
                    Status changes and confirmations
                  </Text>
                </View>
              </View>
              <Switch
                value={bookingUpdates}
                onValueChange={setBookingUpdates}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <TrendingUp size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Campaign Alerts</Text>
                  <Text style={styles.settingDescription}>
                    Performance metrics and insights
                  </Text>
                </View>
              </View>
              <Switch
                value={campaignAlerts}
                onValueChange={setCampaignAlerts}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Bell size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Promotional Offers</Text>
                  <Text style={styles.settingDescription}>
                    Special deals and discounts
                  </Text>
                </View>
              </View>
              <Switch
                value={promotionalOffers}
                onValueChange={setPromotionalOffers}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Bell size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>New Services</Text>
                  <Text style={styles.settingDescription}>
                    Alerts about new ad spaces
                  </Text>
                </View>
              </View>
              <Switch
                value={newServices}
                onValueChange={setNewServices}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <TrendingUp size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Price Drops</Text>
                  <Text style={styles.settingDescription}>
                    Notify when prices decrease
                  </Text>
                </View>
              </View>
              <Switch
                value={priceDrops}
                onValueChange={setPriceDrops}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <TrendingUp size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>AI Recommendations</Text>
                  <Text style={styles.settingDescription}>
                    Personalized ad space suggestions
                  </Text>
                </View>
              </View>
              <Switch
                value={recommendations}
                onValueChange={setRecommendations}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient
            colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
            style={styles.saveButtonGradient}
          >
            <Save size={20} color={Colors.text.inverse} />
            <Text style={styles.saveButtonText}>Save Preferences</Text>
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
  iconContainer: {
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
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
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
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
