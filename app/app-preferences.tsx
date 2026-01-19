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
import {
  Settings,
  Moon,
  Globe,
  Volume2,
  Eye,
  Zap,
  Database,
  Wifi,
  Save,
  ChevronRight,
} from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function AppPreferencesScreen() {
  const router = useRouter();
  
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [autoPlayVideos, setAutoPlayVideos] = useState(false);
  const [highQualityImages, setHighQualityImages] = useState(true);
  const [dataOptimization, setDataOptimization] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('INR (₹)');

  const handleSave = () => {
    console.log('Saving app preferences...');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'App Preferences',
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
            <Settings size={48} color={Colors.primary} />
          </View>
          <Text style={styles.headerTitle}>Customize Your Experience</Text>
          <Text style={styles.headerSubtitle}>
            Personalize the app to match your preferences
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Moon size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Dark Mode</Text>
                  <Text style={styles.settingDescription}>
                    Switch to dark theme
                  </Text>
                </View>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interaction</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Volume2 size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Sound Effects</Text>
                  <Text style={styles.settingDescription}>
                    Play sounds for interactions
                  </Text>
                </View>
              </View>
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Zap size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Haptic Feedback</Text>
                  <Text style={styles.settingDescription}>
                    Vibrate on touch interactions
                  </Text>
                </View>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={setHapticFeedback}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Media</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Eye size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Auto-play Videos</Text>
                  <Text style={styles.settingDescription}>
                    Play videos automatically
                  </Text>
                </View>
              </View>
              <Switch
                value={autoPlayVideos}
                onValueChange={setAutoPlayVideos}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Eye size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>High Quality Images</Text>
                  <Text style={styles.settingDescription}>
                    Load images in best quality
                  </Text>
                </View>
              </View>
              <Switch
                value={highQualityImages}
                onValueChange={setHighQualityImages}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Storage</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Database size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Data Optimization</Text>
                  <Text style={styles.settingDescription}>
                    Reduce data usage
                  </Text>
                </View>
              </View>
              <Switch
                value={dataOptimization}
                onValueChange={setDataOptimization}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>

            <View style={[styles.settingItem, styles.settingItemBorder]}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Wifi size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Offline Mode</Text>
                  <Text style={styles.settingDescription}>
                    Access cached content offline
                  </Text>
                </View>
              </View>
              <Switch
                value={offlineMode}
                onValueChange={setOfflineMode}
                trackColor={{ false: Colors.border.light, true: Colors.primary }}
                thumbColor={Colors.surface}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Regional</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => console.log('Change language')}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Globe size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Language</Text>
                  <Text style={styles.settingDescription}>
                    Choose your preferred language
                  </Text>
                </View>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>{language}</Text>
                <ChevronRight size={20} color={Colors.text.tertiary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingItem, styles.settingItemBorder]}
              onPress={() => console.log('Change currency')}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Globe size={20} color={Colors.primary} />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>Currency</Text>
                  <Text style={styles.settingDescription}>
                    Set your display currency
                  </Text>
                </View>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>{currency}</Text>
                <ChevronRight size={20} color={Colors.text.tertiary} />
              </View>
            </TouchableOpacity>
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
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
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
