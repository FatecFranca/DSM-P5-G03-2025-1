import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  console.log('isOpen', isOpen);
  return (
    <ThemedView style={styles.mainview}>
      <TouchableOpacity
        style={isOpen ? styles.heading : styles.heading2}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? "black" : "white"}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e46827',
    padding: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e46827',
    padding: 12,
    borderRadius: 20,
  },
  content: {
    backgroundColor: '#222b38',
    paddingLeft: 32,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
