/**
 * KhmerText
 *
 * Locale-aware text component.
 * - Khmer locale → Noto Serif Khmer, lineHeight 1.8
 * - English locale → Battambang, lineHeight 1.5
 *
 * Automatically reads locale from Zustand localeStore.
 */

import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../theme/tokens';
import { useLocaleStore } from '../../store/localeStore';

interface Props {
  children:  React.ReactNode;
  size?:     number;
  weight?:   TextStyle['fontWeight'];
  color?:    string;
  style?:    TextStyle;
}

export default function KhmerText({
  children,
  size   = 12,
  weight = '400',
  color  = Colors.text,
  style,
}: Props) {
  const locale = useLocaleStore(s => s.locale);

  return (
    <Text
      style={[
        {
          fontFamily:  locale === 'km' ? Fonts.khmer : Fonts.latin,
          fontSize:    size,
          fontWeight:  weight,
          color,
          lineHeight:  size * (locale === 'km' ? 1.8 : 1.5),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
