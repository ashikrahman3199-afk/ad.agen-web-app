import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, TextInput, Modal, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { useRouter, usePathname } from 'expo-router';
import { LayoutDashboard, ShoppingBag, Settings, Bell, Search, LogOut, Menu, X, Megaphone, MapPin, ChevronDown, Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useApp } from '@/contexts/AppContext';
import { SearchCommand } from './SearchCommand';
import { trpc } from '@/lib/trpc';

const clientLogo = require('@/assets/images/logo-client-black.png');
const vendorLogoBlack = require('@/assets/images/logo-vendor-black.png');

const { width } = Dimensions.get('window');
const IS_WEB = Platform.OS === 'web';
const SIDEBAR_WIDTH = 260;

interface WebLayoutProps {
    children: React.ReactNode;
    role: 'client' | 'vendor';
    title: string;
}

export default function WebLayout({ children, role, title }: WebLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(width > 768);
    const { location, setLocation, searchQuery, setSearchQuery, logout } = useApp();
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const { data: listings = [] } = trpc.listings.list.useQuery();
    const dynamicLocations = ['All Chennai', ...Array.from(new Set(listings.map((l: any) => l.location).filter(Boolean)))];

    const menuItems = role === 'client' ? [
        { icon: LayoutDashboard, label: 'Home', path: '/(tabs)/home' },
        { icon: Search, label: 'Ad Services', path: '/ad-services' }, // Moved up
        { icon: Megaphone, label: 'My Campaigns', path: '/campaigns' },
        { icon: Heart, label: 'Favourites', path: '/wishlist' },
        { icon: ShoppingBag, label: 'My Cart', path: '/(tabs)/cart' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ] : [
        { icon: LayoutDashboard, label: 'Overview', path: '/vendor/dashboard' },
        { icon: ShoppingBag, label: 'Listings', path: '/vendor/listings' },
        { icon: Bell, label: 'Requests', path: '/vendor/requests' },
        { icon: Settings, label: 'Settings', path: '/vendor/settings' },
    ];

    const handleLogout = () => {
        router.replace('/login');
    };

    const activeColor = role === 'client' ? Colors.primary : Colors.vendor.primary;
    const activeBgColor = role === 'client' ? '#FFF0E6' : '#F0FDFA'; // Teal 50 for vendor

    return (
        <View style={styles.container}>
            {/* Sidebar */}
            {(isSidebarOpen || width > 768) && (
                <View style={styles.sidebar}>
                    <View style={styles.sidebarHeader}>
                        <TouchableOpacity onPress={() => router.push(role === 'client' ? '/(tabs)/home' : '/vendor/dashboard')}>
                            <Image source={role === 'client' ? clientLogo : vendorLogoBlack} style={styles.logoImage} contentFit="contain" />
                        </TouchableOpacity>
                        {width <= 768 && (
                            <TouchableOpacity onPress={() => setIsSidebarOpen(false)}>
                                <X size={24} color={Colors.text.secondary} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.navContainer}>
                        {menuItems.map((item, index) => {
                            // Fix active state logic:
                            // 1. Check exact match
                            // 2. Check if pathname starts with item path (for nested routes)
                            // 3. Handle (tabs) group: if item.path has (tabs), check if pathname matches the part after (tabs)
                            const normalizedItemPath = item.path.replace('/(tabs)', '');
                            const isActive =
                                pathname === item.path ||
                                pathname === normalizedItemPath ||
                                (pathname.startsWith(item.path + '/') && item.path !== '/') ||
                                (pathname.startsWith(normalizedItemPath + '/') && normalizedItemPath !== '/');

                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.navItem, isActive && { backgroundColor: activeBgColor }]}
                                    onPress={() => router.push(item.path as any)}
                                >
                                    <item.icon
                                        size={20}
                                        color={isActive ? activeColor : Colors.text.secondary}
                                    />
                                    <Text style={[styles.navText, isActive && { color: activeColor, fontWeight: '600' }]}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    {/* Logout button removed from here */}
                </View>
            )}

            {/* Main Content */}
            <View style={styles.mainContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {width <= 768 && (
                            <TouchableOpacity onPress={() => setIsSidebarOpen(!isSidebarOpen)} style={{ marginRight: 16 }}>
                                <Menu size={24} color={Colors.text.primary} />
                            </TouchableOpacity>
                        )}
                        {/* Title removed for sleeker look as requested */}
                    </View>

                    <View style={styles.headerRight}>
                        <View style={styles.searchBar}>
                            <Search size={18} color={Colors.text.tertiary} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search..."
                                placeholderTextColor={Colors.text.tertiary}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        {/* Location Selector - Moved to Right of Search */}
                        <View style={{ position: 'relative', zIndex: 200 }}>
                            <TouchableOpacity
                                style={styles.locationSelector}
                                onPress={() => setShowLocationDropdown(!showLocationDropdown)}
                            >
                                <MapPin size={18} color={activeColor} />
                                <Text style={styles.locationText}>{location}</Text>
                                <ChevronDown size={16} color={Colors.text.secondary} />
                            </TouchableOpacity>

                            {showLocationDropdown && (
                                <View style={styles.locationDropdown}>
                                    {dynamicLocations.map((loc: unknown) => (
                                        <TouchableOpacity
                                            key={loc as string}
                                            style={styles.locationOption}
                                            onPress={() => {
                                                setLocation(loc as string);
                                                setShowLocationDropdown(false);
                                            }}
                                        >
                                            <Text style={[styles.locationOptionText, location === (loc as string) && { color: activeColor, fontWeight: '600' }]}>
                                                {loc as string}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={{ position: 'relative', zIndex: 100 }}>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfileDropdown(false);
                                    setShowLocationDropdown(false);
                                }}
                            >
                                <Bell size={20} color={Colors.text.primary} />
                            </TouchableOpacity>

                            {showNotifications && (
                                <View style={styles.notificationDropdown}>
                                    <Text style={styles.notificationTitle}>Notifications</Text>
                                    <View style={{ paddingVertical: 16, alignItems: 'center' }}>
                                        <Text style={{ color: Colors.text.tertiary, fontSize: 14 }}>No new notifications</Text>
                                    </View>
                                </View>
                            )}
                        </View>

                        <View style={{ position: 'relative', zIndex: 100 }}>
                            <TouchableOpacity
                                style={[styles.avatar, { backgroundColor: activeColor }]}
                                onPress={() => {
                                    setShowProfileDropdown(!showProfileDropdown);
                                    setShowNotifications(false);
                                    setShowLocationDropdown(false);
                                }}
                            >
                                <Text style={styles.avatarText}>{role === 'client' ? 'C' : 'V'}</Text>
                            </TouchableOpacity>

                            {showProfileDropdown && (
                                <View style={styles.profileDropdown}>
                                    <TouchableOpacity 
                                        style={styles.profileDropdownItem}
                                        onPress={() => {
                                            setShowProfileDropdown(false);
                                            router.push(role === 'client' ? '/(tabs)/profile' : '/vendor/profile');
                                        }}
                                    >
                                        <Settings size={18} color={Colors.text.primary} />
                                        <Text style={styles.profileDropdownText}>Profile Settings</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.profileDropdownItem, { borderTopWidth: 1, borderTopColor: '#F3F4F6' }]}
                                        onPress={() => {
                                            setShowProfileDropdown(false);
                                            if (logout) logout();
                                            else handleLogout();
                                        }}
                                    >
                                        <LogOut size={18} color={Colors.error} />
                                        <Text style={[styles.profileDropdownText, { color: Colors.error }]}>Log Out</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                {/* Page Content */}
                <ScrollView
                    style={styles.contentScroll}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        backgroundColor: '#FFFFFF',
        borderRightWidth: 1,
        borderRightColor: '#E5E7EB',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        position: width <= 768 ? 'absolute' : 'relative',
        height: '100%',
        zIndex: 50,
    },
    sidebarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    logoImage: {
        width: 120,
        height: 40,
    },
    navContainer: {
        gap: 8,
        flex: 1,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        gap: 12,
    },
    navItemActive: {
        backgroundColor: '#FFF0E6',
    },
    navText: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.text.secondary,
    },
    navTextActive: {
        color: Colors.primary,
        fontWeight: '600',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
        marginTop: 'auto',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 24,
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.text.secondary,
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        height: 80,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 32,
        zIndex: 100, // Ensure header is above content
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text.primary,
        letterSpacing: -0.5,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        zIndex: 100,
    },
    locationSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        minWidth: 140,
        justifyContent: 'space-between',
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.text.primary,
    },
    locationDropdown: {
        position: 'absolute',
        top: 45,
        right: 0,
        width: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 8,
        ...Colors.shadow.medium,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        zIndex: 200,
    },
    locationOption: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    locationOptionText: {
        fontSize: 14,
        color: Colors.text.primary,
    },
    locationOptionTextActive: {
        color: Colors.primary,
        fontWeight: '600',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
        height: 44,
        borderRadius: 22,
        gap: 10,
        width: 280,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: Colors.text.primary,
        outlineStyle: 'none',
        height: '100%',
    } as any,
    iconButton: {
        position: 'relative',
        padding: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary,
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },
    notificationDropdown: {
        position: 'absolute',
        top: 50,
        right: -100, // Adjusted to be more centered relative to bell or screen
        width: 320,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        ...Colors.shadow.medium,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        zIndex: 300, // High z-index for floating
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        color: Colors.text.primary,
    },
    notificationItem: {
        flexDirection: 'row',
        gap: 12,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    notificationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary,
        marginTop: 6,
    },
    notificationText: {
        fontSize: 14,
        color: Colors.text.primary,
        fontWeight: '500',
    },
    notificationTime: {
        fontSize: 12,
        color: Colors.text.tertiary,
        marginTop: 2,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...Colors.shadow.small,
    },
    avatarText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 18,
    },
    profileDropdown: {
        position: 'absolute',
        top: 50,
        right: 0,
        width: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 8,
        ...Colors.shadow.medium,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        zIndex: 300,
    },
    profileDropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        gap: 12,
    },
    profileDropdownText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text.primary,
    },
    contentScroll: {
        flex: 1,
    },
    contentContainer: {
        padding: 32,
        paddingBottom: 60,
    },
});
