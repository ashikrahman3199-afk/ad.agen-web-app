import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import {
  ArrowLeft,
  CheckCheck,
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
} from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, unreadNotificationCount } = useApp();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={24} color={Colors.success} />;
      case 'warning':
        return <AlertCircle size={24} color={Colors.accent} />;
      case 'error':
        return <AlertCircle size={24} color={Colors.error} />;
      default:
        return <Info size={24} color={Colors.info} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return Colors.success;
      case 'warning':
        return Colors.accent;
      case 'error':
        return Colors.error;
      default:
        return Colors.info;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Notifications',
          headerLeft: () => (
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            unreadNotificationCount > 0 ? (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={markAllNotificationsAsRead}
              >
                <CheckCheck size={24} color={Colors.primary} />
              </TouchableOpacity>
            ) : null
          ),
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Bell size={64} color={Colors.text.tertiary} />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyText}>
              You're all caught up! Check back later for updates.
            </Text>
          </View>
        ) : (
          <>
            {unreadNotificationCount > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>New</Text>
                {notifications
                  .filter(n => !n.read)
                  .map(notification => (
                    <TouchableOpacity
                      key={notification.id}
                      style={[styles.notificationCard, styles.notificationUnread]}
                      onPress={() => markNotificationAsRead(notification.id)}
                    >
                      <View style={styles.notificationLeft}>
                        <View
                          style={[
                            styles.iconContainer,
                            { backgroundColor: `${getNotificationColor(notification.type)}15` },
                          ]}
                        >
                          {getNotificationIcon(notification.type)}
                        </View>
                        <View style={styles.notificationContent}>
                          <Text style={styles.notificationTitle}>
                            {notification.title}
                          </Text>
                          <Text style={styles.notificationMessage}>
                            {notification.message}
                          </Text>
                          <Text style={styles.notificationTime}>
                            {formatTimestamp(notification.timestamp)}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                      >
                        <X size={20} color={Colors.text.tertiary} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
              </View>
            )}

            {notifications.filter(n => n.read).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Earlier</Text>
                {notifications
                  .filter(n => n.read)
                  .map(notification => (
                    <TouchableOpacity
                      key={notification.id}
                      style={styles.notificationCard}
                    >
                      <View style={styles.notificationLeft}>
                        <View
                          style={[
                            styles.iconContainer,
                            { backgroundColor: `${getNotificationColor(notification.type)}15` },
                          ]}
                        >
                          {getNotificationIcon(notification.type)}
                        </View>
                        <View style={styles.notificationContent}>
                          <Text style={[styles.notificationTitle, styles.notificationTitleRead]}>
                            {notification.title}
                          </Text>
                          <Text style={[styles.notificationMessage, styles.notificationMessageRead]}>
                            {notification.message}
                          </Text>
                          <Text style={styles.notificationTime}>
                            {formatTimestamp(notification.timestamp)}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                      >
                        <X size={20} color={Colors.text.tertiary} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
              </View>
            )}
          </>
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
  headerButton: {
    padding: 8,
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
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Colors.shadow.small,
  },
  notificationUnread: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  notificationLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  notificationTitleRead: {
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  notificationMessageRead: {
    color: Colors.text.tertiary,
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.text.tertiary,
    marginTop: 4,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 32,
  },
});
