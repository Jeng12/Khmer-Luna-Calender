import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../theme/tokens';

interface Props {
  label:   string;
  accent?: string;
  filled?: boolean;
}

export default function Tag({ label, accent = Colors.gold, filled = false }: Props) {
  return (
    <View style={[
      styles.base,
      { borderColor: `${accent}40` },
      filled
        ? { backgroundColor: accent }
        : { backgroundColor: `${accent}18` },
    ]}>
      <Text style={[
        styles.text,
        { color: filled ? Colors.night : accent },
      ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical:   3,
    paddingHorizontal: 9,
    borderRadius:      20,
    borderWidth:       1,
  },
  text: {
    fontSize:    9,
    fontWeight:  '600',
    fontFamily:  Fonts.mono,
    letterSpacing: 0.4,
  },
});
