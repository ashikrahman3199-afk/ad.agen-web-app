import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Stack } from 'expo-router';
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function HelpCenterScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'How do I book an ad space?',
      answer: 'Browse available ad spaces on the home page, select your preferred space, choose dates and duration, then proceed to checkout. You can also create custom bundles for better deals.',
    },
    {
      id: '2',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All transactions are secure and encrypted.',
    },
    {
      id: '3',
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify bookings up to 48 hours before the start date. Cancellation fees may apply depending on how close to the start date you cancel.',
    },
    {
      id: '4',
      question: 'How does AI recommendation work?',
      answer: 'Our AI analyzes your business objectives, target audience, budget, and past campaign performance to suggest the most effective ad spaces and strategies for your needs.',
    },
    {
      id: '5',
      question: 'What is included in campaign analytics?',
      answer: 'You get comprehensive metrics including reach, impressions, visibility scores, conversion tracking, demographic insights, and ROI calculations.',
    },
    {
      id: '6',
      question: 'How do I create a custom bundle?',
      answer: 'Go to the profile section and select "Create Custom Bundle". Choose multiple ad spaces, set your preferred dates and budget, and our system will create an optimized package for you.',
    },
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const contactMethods = [
    {
      id: '1',
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat',
    },
    {
      id: '2',
      icon: Mail,
      title: 'Email Support',
      description: 'support@adplatform.com',
      action: 'Send Email',
    },
    {
      id: '3',
      icon: Phone,
      title: 'Phone Support',
      description: '+91 1800 123 4567',
      action: 'Call Now',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Help Center',
          headerShown: true,
        }} 
      />
      
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            placeholderTextColor={Colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {filteredFAQs.map(faq => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqCard}
              onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                {expandedFAQ === faq.id ? (
                  <ChevronUp size={20} color={Colors.primary} />
                ) : (
                  <ChevronDown size={20} color={Colors.text.tertiary} />
                )}
              </View>
              {expandedFAQ === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          {contactMethods.map(method => {
            const Icon = method.icon;
            return (
              <TouchableOpacity key={method.id} style={styles.contactCard}>
                <View style={styles.contactIcon}>
                  <Icon size={24} color={Colors.primary} />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{method.title}</Text>
                  <Text style={styles.contactDescription}>{method.description}</Text>
                </View>
                <View style={styles.contactAction}>
                  <Text style={styles.contactActionText}>{method.action}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

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
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    marginBottom: 24,
    ...Colors.shadow.small,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  faqCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Colors.shadow.small,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  faqAnswer: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
    marginTop: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Colors.shadow.small,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  contactAction: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  contactActionText: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: Colors.text.inverse,
  },
  bottomSpacer: {
    height: 32,
  },
});
