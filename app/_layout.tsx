import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from '@/contexts/AppContext';
import { trpc, trpcClient } from '@/lib/trpc';

// Prevent auto hide to test if we can manually hide it
SplashScreen.preventAutoHideAsync().catch(() => { });

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: 'Back', headerShown: false }}>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="ai-recommendations" options={{ presentation: 'modal' }} />
      <Stack.Screen name="vendor" options={{ headerShown: false }} />
    </Stack>
  );
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: 'red' }}>Something went wrong!</Text>
          <Text style={{ marginBottom: 20 }}>{this.state.error?.message}</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>Check console for more details.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default function RootLayout() {
  useEffect(() => {
    // Force hide splash screen after a short delay to ensure app is ready
    setTimeout(() => {
      SplashScreen.hideAsync().catch(console.warn);
    }, 1000);
  }, []);

  return (
    <ErrorBoundary>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootLayoutNav />
            </GestureHandlerRootView>
          </AppProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </ErrorBoundary>
  );
}
