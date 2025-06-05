// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  'house.fill': { library: 'Ionicons', name: 'logo-dribbble' },
  'history.fill': { library: 'MaterialIcons', name: 'history' },
  'info.fill': { library: 'MaterialIcons', name: 'info' },
  // 'paperplane.fill': { library: 'MaterialIcons', name: 'send' },
  'chevron.left.forwardslash.chevron.right': { library: 'MaterialIcons', name: 'code' },
  'chevron.right': { library: 'MaterialIcons', name: 'chevron-right' },
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const icon = MAPPING[name];

  if (!icon) {
    console.warn(`Icon "${name}" not found in MAPPING.`);
    return null;
  }

  switch (icon.library) {
    case 'Ionicons':
      return <Ionicons name={icon.name} size={size} color={color} />;
    case 'MaterialIcons':
      return <MaterialIcons name={icon.name} size={size} color={color} />;
    default:
      // console.warn(`Library "${icon.library}" not supported.`);
      return null;
  }
}
