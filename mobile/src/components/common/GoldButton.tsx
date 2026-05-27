import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Fonts, Radius } from '../../theme/tokens';

interface Props {
  label:    string;
  onPress:  () => void;
  outline?: boolean;
  full?:    boolean;
  accent?:  string;
  style?:   ViewStyle;
  disabled?: boolean;
}

export default function GoldButton({
  label,
  onPress,
  outline  = false,
  full     = false,
  accent   = Colors.gold,
  style,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        full && styles.full,
        outline
          ? { borderWidth: 1, borderColor: `${accent}70`, backgroundColor: 'transparent' }
          : { backgroundColor: accent },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[
        styles.label,
        outline
          ? { color: accent }
          : { color: Colors.night },
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical:   10,
    paddingHorizontal: 20,
    borderRadius:      Radius.md,
    alignItems:        'center',
  },
  full: {
    width: '100%',
  },
  label: {
    fontSize:    13,
    fontWeight:  '700',
    fontFamily:  Fonts.latin,
  },
  disabled: {
    opacity: 0.45,
  },
});
