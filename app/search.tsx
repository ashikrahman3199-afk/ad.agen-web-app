import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Search, X, MapPin, Star, TrendingUp } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { adSpaces } from '@/constants/adSpaces';
import { useApp } from '@/contexts/AppContext';

export default function SearchScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { addToCart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResults = searchQuery.trim()
    ? adSpaces.filter(space =>
        space.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const recentSearches = ['Billboards Chennai', 'Digital Ads', 'Radio Spots'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ad spaces..."
            placeholderTextColor={Colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={Colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {searchQuery.trim() === '' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentItem}
                onPress={() => setSearchQuery(search)}
              >
                <TrendingUp size={18} color={Colors.text.secondary} />
                <Text style={styles.recentText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {filteredResults.length} Results
            </Text>
            {filteredResults.map(space => (
              <TouchableOpacity
                key={space.id}
                style={styles.resultCard}
                onPress={() => {
                  addToCart(space, 1);
                  router.push('/(tabs)/cart');
                }}
              >
                <Image source={{ uri: space.image }} style={styles.resultImage} />
                <View style={styles.resultContent}>
                  <Text style={styles.resultTitle} numberOfLines={1}>
                    {space.title}
                  </Text>
                  <View style={styles.resultMeta}>
                    <MapPin size={12} color={Colors.text.secondary} />
                    <Text style={styles.resultLocation} numberOfLines={1}>
                      {space.location}
                    </Text>
                  </View>
                  <View style={styles.resultFooter}>
                    <Text style={styles.resultPrice}>
                      ₹{space.price.toLocaleString('en-IN')}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Star size={12} color={Colors.accent} fill={Colors.accent} />
                      <Text style={styles.ratingText}>{space.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.primary,
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
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 8,
  },
  recentText: {
    fontSize: 15,
    color: Colors.text.primary,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    ...Colors.shadow.small,
  },
  resultImage: {
    width: 100,
    height: 120,
  },
  resultContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  resultLocation: {
    fontSize: 13,
    color: Colors.text.secondary,
    flex: 1,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultPrice: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
});
