import {
  PropsWithChildren,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type CollapsibleProps = PropsWithChildren & {
  title: string;
  rightContent?: ReactNode;
};

export function Collapsible({
  children,
  title,
  rightContent,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <ThemedView style={styles.mainview}>
      <TouchableOpacity
        style={isOpen ? styles.heading : styles.heading2}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <ThemedView style={styles.headingContent}>
          <ThemedView style={styles.titleContainer}>
            <Animated.View
              style={{ transform: [{ rotate: rotateInterpolate }] }}
            >
              <IconSymbol
                name="chevron.right"
                size={18}
                weight="medium"
                color={theme === "light" ? "black" : "white"}
              />
            </Animated.View>

            <ThemedText type="defaultSemiBold">{title}</ThemedText>
          </ThemedView>

          {rightContent && (
            <ThemedView style={styles.rightContentContainer}>
              {rightContent}
            </ThemedView>
          )}
        </ThemedView>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  heading: {
    backgroundColor: "#e46827",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  heading2: {
    backgroundColor: "#e46827",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  headingContent: {
    flexDirection: "row",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    flex: 1,
    backgroundColor: "#e46827",
  },
  rightContentContainer: {
    paddingLeft: 8,
    backgroundColor: "#e46827",
  },
  content: {
    backgroundColor: "#222b38",
    paddingLeft: 32,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
