import React, { useEffect, useRef } from "react";
import { Text, Animated, StyleSheet } from 'react-native';

interface ToastProps {
    message: string,
    duration: number,
    visible: boolean,
    toastColor?: string
    textColor?: string
}

function Toast({ message = 'Texto del Toast', duration = 3000, visible = false, toastColor = '#33333c', textColor = '#fff' }: ToastProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();

            const timer = setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }).start();
            }, duration)

            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    backgroundColor: toastColor,
                    opacity: fadeAnim,
                },
            ]}
            pointerEvents={visible ? "auto" : "none"}
        >
            <Text style={[styles.toastText, {
                color: textColor
            }]}>
                {message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        padding: 12,
        borderRadius: 8,
        elevation: 5,
    },
    toastText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Toast;