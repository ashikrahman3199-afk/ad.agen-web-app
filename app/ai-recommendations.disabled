import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ColorValue,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { Sparkles, Send, TrendingUp, Target, DollarSign } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';
import { generateText } from '@rork/toolkit-sdk';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  estimatedReach: string;
  estimatedBudget: string;
  confidence: number;
}

export default function AIRecommendationsScreen() {
  const router = useRouter();
  const { cart, cartTotal } = useApp();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const handleGetRecommendations = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const prompt = `You are an advertising expert. Based on the following business description, recommend 3 specific advertising strategies with estimated reach and budget.

Business Description: ${input}

Current cart items: ${cart.length > 0 ? cart.map(item => `${item.title} (${item.category})`).join(', ') : 'None'}
Current budget: ₹${cartTotal.toLocaleString('en-IN')}

Provide 3 recommendations in this exact JSON format:
[
  {
    "title": "Strategy name",
    "description": "Detailed description of the strategy",
    "estimatedReach": "e.g., 2.5M people",
    "estimatedBudget": "e.g., ₹50,000-75,000",
    "confidence": 85
  }
]

Only return the JSON array, no other text.`;

      const response = await generateText({ messages: [{ role: 'user', content: prompt }] });
      
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const withIds = parsed.map((rec: Omit<Recommendation, 'id'>, index: number) => ({
          ...rec,
          id: `rec-${Date.now()}-${index}`,
        }));
        setRecommendations(withIds);
      } else {
        console.error('Could not parse recommendations');
      }
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'AI Recommendations',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <LinearGradient
          colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
          style={styles.header}
        >
          <Sparkles size={48} color={Colors.text.inverse} strokeWidth={1.5} />
          <Text style={styles.headerTitle}>AI-Powered Recommendations</Text>
          <Text style={styles.headerSubtitle}>
            Get personalized advertising strategies based on your business goals
          </Text>
        </LinearGradient>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Tell us about your business</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., We're a new restaurant in Chennai specializing in South Indian cuisine, targeting young professionals..."
            placeholderTextColor={Colors.text.tertiary}
            value={input}
            onChangeText={setInput}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleGetRecommendations}
            disabled={loading || !input.trim()}
          >
            <LinearGradient
              colors={Colors.gradient.primary as unknown as readonly [ColorValue, ColorValue, ...ColorValue[]]}
              style={styles.submitGradient}
            >
              {loading ? (
                <ActivityIndicator color={Colors.text.inverse} />
              ) : (
                <>
                  <Send size={20} color={Colors.text.inverse} />
                  <Text style={styles.submitText}>Get Recommendations</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {recommendations.length > 0 && (
          <View style={styles.recommendationsSection}>
            <Text style={styles.sectionTitle}>Recommended Strategies</Text>
            {recommendations.map((rec, index) => (
              <View key={rec.id} style={styles.recommendationCard}>
                <View style={styles.recHeader}>
                  <View style={styles.recNumber}>
                    <Text style={styles.recNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.confidenceBadge}>
                    <TrendingUp size={12} color={Colors.success} />
                    <Text style={styles.confidenceText}>{rec.confidence}% Match</Text>
                  </View>
                </View>

                <Text style={styles.recTitle}>{rec.title}</Text>
                <Text style={styles.recDescription}>{rec.description}</Text>

                <View style={styles.recStats}>
                  <View style={styles.recStat}>
                    <Target size={16} color={Colors.primary} />
                    <View>
                      <Text style={styles.recStatLabel}>Est. Reach</Text>
                      <Text style={styles.recStatValue}>{rec.estimatedReach}</Text>
                    </View>
                  </View>
                  <View style={styles.recStat}>
                    <DollarSign size={16} color={Colors.primary} />
                    <View>
                      <Text style={styles.recStatLabel}>Est. Budget</Text>
                      <Text style={styles.recStatValue}>{rec.estimatedBudget}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.exploreButton}
                  onPress={() => router.back()}
                >
                  <Text style={styles.exploreButtonText}>Explore Ad Spaces</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {recommendations.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <Sparkles size={64} color={Colors.text.tertiary} strokeWidth={1.5} />
            <Text style={styles.emptyTitle}>No recommendations yet</Text>
            <Text style={styles.emptySubtitle}>
              Tell us about your business to get personalized advertising strategies
            </Text>
          </View>
        )}

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
    paddingBottom: 32,
  },
  header: {
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.text.inverse,
    opacity: 0.9,
    textAlign: 'center' as const,
    paddingHorizontal: 16,
  },
  inputCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    ...Colors.shadow.medium,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: Colors.text.primary,
    minHeight: 120,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  submitButton: {
    borderRadius: 12,
    overflow: 'hidden',
    ...Colors.shadow.small,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  recommendationsSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  recommendationCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Colors.shadow.medium,
  },
  recHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recNumberText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.success,
  },
  recTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  recDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  recStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  recStat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recStatLabel: {
    fontSize: 11,
    color: Colors.text.secondary,
  },
  recStatValue: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  exploreButton: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  exploreButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
    textAlign: 'center' as const,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 32,
  },
});
