import { Stack } from 'expo-router';
import Colors from '@/constants/colors';

export default function VendorLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.surface,
                },
                headerTintColor: Colors.text.primary,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: Colors.background,
                },
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="dashboard"
                options={{
                    title: 'Vendor Dashboard',
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="listings"
                options={{
                    title: 'My Listings'
                }}
            />
            <Stack.Screen
                name="requests"
                options={{
                    title: 'Booking Requests'
                }}
            />
        </Stack>
    );
}
