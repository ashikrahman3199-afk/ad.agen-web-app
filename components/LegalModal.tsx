import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { userTerms, vendorTerms, privacyPolicy } from '@/constants/legalText';

interface LegalModalProps {
    visible: boolean;
    onClose: () => void;
    type: 'terms' | 'vendor-terms' | 'privacy' | null;
    role?: 'client' | 'vendor';
}

const { height } = Dimensions.get('window');

export default function LegalModal({ visible, onClose, type, role = 'client' }: LegalModalProps) {
    const slideAnim = useRef(new Animated.Value(height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 8,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: height,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [visible]);

    const getTitle = () => {
        switch (type) {
            case 'terms': return 'Terms & Conditions';
            case 'vendor-terms': return 'Vendor Terms & Conditions';
            case 'privacy': return 'Privacy Policy';
            default: return '';
        }
    };

    const getContent = () => {
        switch (type) {
            case 'terms':
                return userTerms;
            case 'vendor-terms':
                return vendorTerms;
            case 'privacy':
                return privacyPolicy;
            default:
                return "";
        }
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} activeOpacity={1} />
            </Animated.View>
            
            <View style={styles.modalContainer}>
                <Animated.View 
                    style={[
                        styles.modalContent,
                        { transform: [{ translateY: slideAnim }] }
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>{getTitle()}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                            <X size={24} color={Colors.text.primary} />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.bodyText}>
                            {getContent()}
                        </Text>
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity 
                            style={[
                                styles.acceptBtn, 
                                { backgroundColor: (role === 'vendor' || type === 'vendor-terms') ? Colors.vendor.primary : Colors.primary }
                            ]} 
                            onPress={onClose}
                        >
                            <Text style={styles.acceptBtnText}>I Understand</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlayTouchable: {
        flex: 1,
    },
    modalContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        pointerEvents: 'box-none',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '80%',
        paddingBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.text.primary,
    },
    closeBtn: {
        padding: 4,
    },
    scrollArea: {
        padding: 24,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    bodyText: {
        fontSize: 16,
        color: Colors.text.secondary,
        lineHeight: 24,
    },
    footer: {
        padding: 24,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    acceptBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    acceptBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    }
});
