import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

interface ChipProps {
    chipTitle: string;
    onRemove: () => void;
}

function Chip({ chipTitle, onRemove }: ChipProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.chipText}>{chipTitle}</Text>
            {onRemove && (
                <Pressable
                    onPress={onRemove}
                    style={styles.eraseButton}
                    accessibilityLabel={`Eliminar ${chipTitle}`}
                    testID={`chip-remove-${chipTitle}`}
                >
                    <Text style={styles.eraseText}>×</Text>
                </Pressable>
            )}
        </View>

    )
}

export default Chip;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#d4d4d4',
        borderWidth: 1,
        borderColor: '#989898',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
        alignItems: 'center',
        margin: 4,
        gap: 5,
        maxWidth: '30%',
        flexShrink: 1,
        justifyContent:'center'
    }    ,
    chipText: {
        color: '#1e1e1e',
        fontSize: 14,
    },
    eraseButton: {
        backgroundColor: '#959595ff',
        width: 18,
        height: 18,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent:'center'
    },
    eraseText: {
        color: '#fff',
        fontSize: 12,
        lineHeight: 14,
        textAlign:'center',
    },
});