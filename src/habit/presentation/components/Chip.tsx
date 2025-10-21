import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

interface ChipProps {
  chipTitle: string;
  selected: boolean;
  onToggle: (value: string) => void;
}

function Chip({ chipTitle, selected, onToggle }: ChipProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected ? styles.chipSelected : styles.chipUnselected]}
      onPress={() => onToggle(chipTitle)}
      accessibilityState={{ selected }}
      activeOpacity={0.2}
    >
      <Text style={selected ? styles.chipTextSelected : styles.chipTextUnselected}>
        {chipTitle}
      </Text>
    </TouchableOpacity>
  );
}

export default Chip;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: 'center',
    margin: 4,
    gap: 5,
    maxWidth: '30%',
    flexShrink: 1,
    justifyContent: 'center'
  },
  chipSelected: {
    backgroundColor: '#1e1e1e',
    borderColor: '#989898',
  },
  chipUnselected: {
    backgroundColor: '#e4e4e4ff',
    borderColor: '#989898',
  },
  chipTextSelected: {
    color: '#ededed',
    fontSize: 14,
  },
  chipTextUnselected: {
    color: '#1e1e1e',
    fontSize: 14,
  },
  eraseButton: {
    backgroundColor: '#959595ff',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center'
  },
  eraseText: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
  },
});