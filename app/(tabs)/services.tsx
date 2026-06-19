import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
    Bus, Car, Navigation, Train, Tv, Smartphone, Box, Truck, Grid
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import WebLayout from '@/components/WebLayout';
import { categories } from '@/constants/adSpaces';

const IconMap: Record<string, React.ElementType> = {
    bus: Bus,
    car: Car,
    navigation: Navigation,
    train: Train,
    tv: Tv,
    smartphone: Smartphone,
    box: Box,
    truck: Truck,
};

export default function ServicesScreen() {
  const router = useRouter();

  return (
    <WebLayout role="client" title="Services">
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {categories.map((category) => {
            const Icon = IconMap[category.icon] || Grid;
            return (
              <TouchableOpacity 
                key={category.id} 
                style={styles.card}
                onPress={() => router.push(`/ad-services?category=${category.id}`)}
              >
                <View style={styles.iconCircle}>
                  <Icon size={24} color={Colors.primary} />
                </View>
                <Text style={styles.cardText}>{category.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        
        {/* Floating Action Button from the screenshot */}
        <TouchableOpacity style={styles.fab}>
          <Grid size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </WebLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    maxWidth: 800,
    marginHorizontal: 'auto',
    width: '100%',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80, // Space for FAB
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    ...Colors.shadow.small,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0E6', // Light primary color based on screenshot
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Colors.shadow.medium,
  }
});
