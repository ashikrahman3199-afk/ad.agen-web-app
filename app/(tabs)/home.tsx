import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TextInput, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search, MapPin, Star, ArrowRight,
  Plane, Clapperboard, MonitorPlay, User, BookOpen, Newspaper, Map, Radio, Tv, Smartphone,
  BarChart3, Calendar, ShoppingCart, ChevronRight, ChevronLeft, X
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';
import { trpc } from '@/lib/trpc';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [isJoinModalVisible, setJoinModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const handleJoinSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // In a real app, this would send data to backend
    Alert.alert('Success', 'Thank you for your interest! We will contact you shortly.');
    setJoinModalVisible(false);
    setFormData({ name: '', company: '', email: '', phone: '' });
  };



  const { data: listings = [], isLoading } = trpc.listings.list.useQuery();

  return (
    <WebLayout role="client" title="Home">
      <View style={styles.container}>

        {/* Advertisement Banner */}
        <View style={styles.adBanner}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80' }}
            style={styles.adImage}
          />
          <View style={styles.adOverlay}>
            <View style={styles.adContent}>
              <View style={styles.adTag}>
                <Text style={styles.adTagText}>Featured</Text>
              </View>
              <Text style={styles.adTitle}>Boost Your Brand Visibility</Text>
              <Text style={styles.adSubtitle}>Get 20% off on all Billboard bookings this week.</Text>
              <TouchableOpacity style={styles.adBtn} onPress={() => router.push('/ad-services')}>
                <Text style={styles.adBtnText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* What's New */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>What's New</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            <TouchableOpacity style={styles.mediaCard} onPress={() => router.push('/custom-bundle')}>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' }} style={styles.mediaImage} />
              <View style={styles.bundleBadge}>
                 <Text style={styles.bundleBadgeText}>Service</Text>
              </View>
              <View style={styles.bundleOverlay}>
                 <Text style={styles.bundleTitle}>Create Custom Bundle</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Hot Picks for You! */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hot Picks for You!</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {isLoading ? <Text>Loading...</Text> : listings.slice(0, 5).map((item: any) => (
              <TouchableOpacity key={item.id} style={styles.mediaCard} onPress={() => router.push(`/ad-space/${item.id}`)}>
                <Image source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' }} style={styles.mediaImage} />
                <View style={styles.mediaContent}>
                  <Text style={styles.mediaName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.mediaCategory}>{item.type || item.categoryId}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Ad Spaces */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Ad Spaces</Text>
            <Text style={styles.resultsText}>{listings.length} results</Text>
          </View>
          <View style={styles.verticalList}>
            {listings.map((item: any) => (
              <TouchableOpacity key={item.id} style={styles.verticalCard} onPress={() => router.push(`/ad-space/${item.id}`)}>
                <Image source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' }} style={styles.verticalImage} />
                <View style={styles.verticalContent}>
                    <Text style={styles.recentName} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.mediaCategory}>{item.type || item.categoryId}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Agency Partner Banner */}
        <View style={styles.partnerBanner}>
          <View style={styles.partnerContent}>
            <Text style={styles.partnerTitle}>Become an Agency Partner</Text>
            <Text style={styles.partnerDesc}>
              Get exclusive access to Advantage 360 – Plan, Compare & Sell Media Smarter with Real-Time Rates & Tools.
            </Text>
            <TouchableOpacity style={styles.joinBtn} onPress={() => setJoinModalVisible(true)}>
              <Text style={styles.joinBtnText}>JOIN NOW</Text>
            </TouchableOpacity>
          </View>
          {/* Decorative circle/image placeholder */}
          <View style={styles.partnerDecoration}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
          </View>
        </View>

      </View>

      <Modal
        visible={isJoinModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setJoinModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Become an Agency Partner</Text>
              <TouchableOpacity onPress={() => setJoinModalVisible(false)}>
                <X size={24} color={Colors.text.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Company Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter company name"
                  value={formData.company}
                  onChangeText={(text) => setFormData({ ...formData, company: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                />
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleJoinSubmit}>
                <Text style={styles.submitBtnText}>Submit Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </WebLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 24,
  },
  horizontalList: {
    gap: 24,
    paddingRight: 24,
  },
  mediaCard: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#F3F4F6',
  },
  mediaContent: {
    padding: 16,
  },
  mediaName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  mediaCategory: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  rankBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomLeftRadius: 16,
  },
  rankText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  adBanner: {
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 40,
    position: 'relative',
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  adOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    padding: 40,
  },
  adContent: {
    maxWidth: 600,
    gap: 16,
  },
  adTag: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  adTagText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  adTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  adSubtitle: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  adBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  adBtnText: {
    color: Colors.text.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  recentCard: {
    width: 240,
    gap: 12,
  },
  recentImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  recentName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  partnerBanner: {
    backgroundColor: Colors.primary, // Using primary as requested, or could be a gradient
    borderRadius: 24,
    padding: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  partnerContent: {
    flex: 1,
    maxWidth: 600,
    zIndex: 10,
  },
  partnerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  partnerDesc: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 32,
    lineHeight: 28,
  },
  joinBtn: {
    backgroundColor: '#10B981', // Green button as in reference
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  joinBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  partnerDecoration: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 400,
    opacity: 0.1,
  },
  circle1: {
    position: 'absolute',
    right: -50,
    top: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FFFFFF',
  },
  circle2: {
    position: 'absolute',
    right: 100,
    bottom: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 500,
    ...Colors.shadow.medium,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text.primary,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  seeAllText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  resultsText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  bundleBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  bundleBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  bundleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bundleTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  verticalList: {
    gap: 16,
  },
  verticalCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  verticalImage: {
    width: 100,
    height: 100,
    backgroundColor: '#F3F4F6',
  },
  verticalContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});
