import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search, MapPin, Star, ArrowRight,
  Plane, Clapperboard, MonitorPlay, User, BookOpen, Newspaper, Map, Radio, Tv, Smartphone,
  BarChart3, Calendar, ShoppingCart, ChevronRight, ChevronLeft
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();



  const topSpends = [
    { id: 1, name: 'JioHotstar', category: 'Digital', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80', rank: 1, color: '#A855F7' },
    { id: 2, name: 'Hyderabad Airport', category: 'Airport', image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=400&q=80', rank: 2, color: '#10B981' },
    { id: 3, name: 'Amazon MX Player', category: 'Digital', image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&q=80', rank: 3, color: '#3B82F6' },
    { id: 4, name: 'Delhi Metro', category: 'Nontraditional', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80', rank: 4, color: '#EF4444' },
  ];

  const latestAdditions = [
    { id: 1, name: 'Itanagar Airport', category: 'Airport', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80' },
    { id: 2, name: 'CP67 Mall, Mohali', category: 'Nontraditional', image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3d9f?w=400&q=80' },
    { id: 3, name: 'Chalo App', category: 'Digital', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80' },
    { id: 4, name: 'Kannada News', category: 'Television', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80' },
  ];

  const recentlyViewed = [
    { id: 1, name: 'Hoarding - Bandra West', image: 'https://images.unsplash.com/photo-1562613531-a1e13337c667?w=400&q=80' },
    { id: 2, name: 'Hoarding - Chennai', image: 'https://images.unsplash.com/photo-1570737146902-8d4d6347f136?w=400&q=80' },
    { id: 3, name: 'Times Of India', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80' },
    { id: 4, name: 'Mohamed Irfan', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  ];

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

        {/* Top Media Spends */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Media Spends</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {topSpends.map((item) => (
              <TouchableOpacity key={item.id} style={styles.mediaCard}>
                <Image source={{ uri: item.image }} style={styles.mediaImage} />
                <View style={[styles.rankBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.rankText}>#{item.rank}</Text>
                </View>
                <View style={styles.mediaContent}>
                  <Text style={styles.mediaName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.mediaCategory}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Latest Addition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Addition</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {latestAdditions.map((item) => (
              <TouchableOpacity key={item.id} style={styles.mediaCard}>
                <Image source={{ uri: item.image }} style={styles.mediaImage} />
                <View style={styles.mediaContent}>
                  <Text style={styles.mediaName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.mediaCategory}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recently Viewed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Viewed</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {recentlyViewed.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recentCard}>
                <Image source={{ uri: item.image }} style={styles.recentImage} />
                <Text style={styles.recentName} numberOfLines={2}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Agency Partner Banner */}
        <View style={styles.partnerBanner}>
          <View style={styles.partnerContent}>
            <Text style={styles.partnerTitle}>Become an Agency Partner</Text>
            <Text style={styles.partnerDesc}>
              Get exclusive access to Advantage 360 – Plan, Compare & Sell Media Smarter with Real-Time Rates & Tools.
            </Text>
            <TouchableOpacity style={styles.joinBtn} onPress={() => router.push('/login')}>
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
});
