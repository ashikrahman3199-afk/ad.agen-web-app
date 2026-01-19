import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {
  ArrowLeft,
  Search,
  MapPin,
  CheckCircle2,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';

const locations = [
  { id: '1', name: 'Anna Nagar', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '2', name: 'T Nagar', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '3', name: 'Velachery', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '4', name: 'OMR', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '5', name: 'Adyar', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '6', name: 'Mylapore', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '7', name: 'Nungambakkam', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '8', name: 'Porur', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '9', name: 'Tambaram', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '10', name: 'Guindy', city: 'Chennai', state: 'Tamil Nadu' },
  { id: '11', name: 'Koramangala', city: 'Bangalore', state: 'Karnataka' },
  { id: '12', name: 'Indiranagar', city: 'Bangalore', state: 'Karnataka' },
  { id: '13', name: 'Whitefield', city: 'Bangalore', state: 'Karnataka' },
  { id: '14', name: 'Andheri', city: 'Mumbai', state: 'Maharashtra' },
  { id: '15', name: 'Bandra', city: 'Mumbai', state: 'Maharashtra' },
  { id: '16', name: 'Connaught Place', city: 'Delhi', state: 'Delhi' },
  { id: '17', name: 'Saket', city: 'Delhi', state: 'Delhi' },
];

export default function LocationSelectorScreen() {
  const router = useRouter();
  const { selectedLocation, setSelectedLocation } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (locationName: string) => {
    setSelectedLocation(locationName);
    router.back();
  };

  const groupedLocations = filteredLocations.reduce((acc, location) => {
    const city = location.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(location);
    return acc;
  }, {} as Record<string, typeof locations>);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Select Location',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search location..."
          placeholderTextColor={Colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {Object.entries(groupedLocations).map(([city, cityLocations]) => (
          <View key={city} style={styles.section}>
            <Text style={styles.sectionTitle}>{city}</Text>
            <View style={styles.locationsList}>
              {cityLocations.map(location => {
                const isSelected = selectedLocation === location.name;
                return (
                  <TouchableOpacity
                    key={location.id}
                    style={[
                      styles.locationCard,
                      isSelected && styles.locationCardSelected,
                    ]}
                    onPress={() => handleSelectLocation(location.name)}
                  >
                    <View style={styles.locationLeft}>
                      <View
                        style={[
                          styles.iconContainer,
                          isSelected && styles.iconContainerSelected,
                        ]}
                      >
                        <MapPin
                          size={20}
                          color={isSelected ? Colors.primary : Colors.text.secondary}
                        />
                      </View>
                      <View style={styles.locationInfo}>
                        <Text
                          style={[
                            styles.locationName,
                            isSelected && styles.locationNameSelected,
                          ]}
                        >
                          {location.name}
                        </Text>
                        <Text style={styles.locationDetails}>
                          {location.city}, {location.state}
                        </Text>
                      </View>
                    </View>
                    {isSelected && (
                      <CheckCircle2 size={24} color={Colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

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
  headerButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
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
  locationsList: {
    gap: 8,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Colors.shadow.small,
  },
  locationCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: `${Colors.primary}05`,
  },
  locationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerSelected: {
    backgroundColor: `${Colors.primary}15`,
  },
  locationInfo: {
    flex: 1,
    gap: 4,
  },
  locationName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  locationNameSelected: {
    color: Colors.primary,
    fontWeight: '700' as const,
  },
  locationDetails: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  bottomSpacer: {
    height: 32,
  },
});
