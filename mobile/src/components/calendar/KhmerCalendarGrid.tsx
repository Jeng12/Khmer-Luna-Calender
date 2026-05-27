/**
 * KhmerCalendarGrid
 *
 * Core calendar component — renders a monthly grid with:
 *  - Gregorian day number (large)
 *  - Khmer lunar day overlay (small, gold)
 *  - Moon phase emoji (tiny, top of cell)
 *  - Jade dot → auspicious day
 *  - Lotus dot → holiday
 *  - Gold ring → selected day
 *
 * Design reference: docs/screens/KhmerScreenLibrary.jsx — CalendarScreen
 *
 * Props:
 *  - data: MonthData       Full month grid from /api/calendar/{year}/{month}
 *  - selectedDay: number   Currently selected day (1–31)
 *  - onSelectDay: fn       Callback when a day cell is tapped
 *
 * Fonts used:
 *  - Noto Serif Khmer (Khmer numerals & month names)
 *  - DM Mono (Gregorian numbers)
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts, FontSize } from '../../theme/tokens';
import type { CalendarDay, MonthData } from '../../types/calendar';

const KH_DAY_LABELS = ['អា','ច','អ','ព','ព្រ','សុ','ស'];

interface Props {
  data:        MonthData;
  selectedDay: number;
  onSelectDay: (day: number) => void;
}

export default function KhmerCalendarGrid({ data, selectedDay, onSelectDay }: Props) {
  const { days } = data;

  // Build padded cell array (null for leading empty cells)
  const firstDow  = days[0]?.day_of_week ?? 0;
  const cells: (CalendarDay | null)[] = [
    ...Array(firstDow).fill(null),
    ...days,
  ];

  return (
    <View>
      {/* Day-of-week header */}
      <View style={styles.headerRow}>
        {KH_DAY_LABELS.map((d, i) => (
          <Text
            key={d}
            style={[styles.dowLabel, (i === 0 || i === 6) && styles.weekendLabel]}
          >
            {d}
          </Text>
        ))}
      </View>

      {/* Grid */}
      <View style={styles.grid}>
        {cells.map((cell, idx) => {
          if (!cell) return <View key={`e-${idx}`} style={styles.cell} />;

          const isSel     = cell.day === selectedDay;
          const isWeekend = cell.day_of_week === 0 || cell.day_of_week === 6;

          return (
            <TouchableOpacity
              key={cell.day}
              style={[styles.cell, isSel && styles.selectedCell]}
              onPress={() => onSelectDay(cell.day)}
              activeOpacity={0.7}
            >
              {/* Moon phase */}
              {cell.moon_phase ? (
                <Text style={styles.moonEmoji}>{cell.moon_phase}</Text>
              ) : null}

              {/* Gregorian day */}
              <Text style={[
                styles.gregDay,
                isSel      && styles.gregDaySel,
                isWeekend  && styles.gregDayWeekend,
                cell.is_holiday && styles.gregDayHoliday,
              ]}>
                {cell.day}
              </Text>

              {/* Khmer lunar day */}
              <Text style={styles.lunarDay}>{cell.lunar_day_km}</Text>

              {/* Dots */}
              <View style={styles.dotRow}>
                {cell.is_auspicious && (
                  <View style={[styles.dot, { backgroundColor: Colors.jade }]} />
                )}
                {cell.is_holiday && (
                  <View style={[styles.dot, { backgroundColor: Colors.lotus }]} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    marginBottom:  4,
  },
  dowLabel: {
    flex:       1,
    textAlign:  'center',
    fontSize:   FontSize.xs,
    color:      Colors.dim,
    fontFamily: Fonts.khmer,
  },
  weekendLabel: {
    color: Colors.crimson,
  },
  grid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
  },
  cell: {
    width:          `${100 / 7}%`,
    alignItems:     'center',
    paddingVertical: 3,
    paddingHorizontal: 1,
    borderRadius:   8,
    borderWidth:    1,
    borderColor:    'transparent',
    minHeight:      46,
    justifyContent: 'center',
  },
  selectedCell: {
    backgroundColor: `${Colors.gold}25`,
    borderColor:     `${Colors.gold}60`,
  },
  moonEmoji: {
    fontSize:    7,
    lineHeight:  9,
  },
  gregDay: {
    fontSize:   FontSize.base,
    fontFamily: Fonts.mono,
    color:      Colors.text,
  },
  gregDaySel: {
    color:      Colors.gold,
    fontWeight: '700',
  },
  gregDayWeekend: {
    color: Colors.crimson,
  },
  gregDayHoliday: {
    color: Colors.lotus,
  },
  lunarDay: {
    fontSize:   6,
    fontFamily: Fonts.khmer,
    color:      Colors.dim,
  },
  dotRow: {
    flexDirection: 'row',
    gap:           2,
    marginTop:     1,
    minHeight:     4,
  },
  dot: {
    width:        3,
    height:       3,
    borderRadius: 2,
  },
});
