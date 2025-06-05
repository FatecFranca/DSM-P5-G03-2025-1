import { StyleSheet, Image, ScrollView } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HistoryScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.headerContainer}>
          <Image
            source={require("@/assets/images/nbalogoextend.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Histórico
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.subtitleContainer}>
          <ThemedText
            style={{
              textAlign: "center",
              marginBottom: 16,
              color: "#fff",
            }}
          >
            Confira aqui todas as estatísticas que você já registrou no HOOP
            VISION!
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Collapsible title="ALL-STAR 10/02/2025">
            <ThemedView style={styles.itemContainer}>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Posição:
                </ThemedText>{" "}
                Armador
              </ThemedText>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Pontos:
                </ThemedText>{" "}
                33
              </ThemedText>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Assintências:
                </ThemedText>{" "}
                9
              </ThemedText>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Rebotes:
                </ThemedText>{" "}
                11
              </ThemedText>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Tocos:
                </ThemedText>{" "}
                1
              </ThemedText>
            </ThemedView>
          </Collapsible>
          <Collapsible title="ROLE PLAYER 04/04/2025">
            <ThemedView style={styles.itemContainer}>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Posição:
                </ThemedText>{" "}
                Armador
              </ThemedText>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Pontos:
                </ThemedText>{" "}
                33
              </ThemedText>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Assintências:
                </ThemedText>{" "}
                9
              </ThemedText>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Rebotes:
                </ThemedText>{" "}
                11
              </ThemedText>
              <ThemedText style={{ color: "#fff" }}>
                <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
                  Tocos:
                </ThemedText>{" "}
                1
              </ThemedText>
            </ThemedView>
          </Collapsible>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: "#1a1f2b",
  },
  headerContainer: {
    backgroundColor: "#e46827",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    height: 110,
    width: "100%",
    marginBottom: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  titleContainer: {
    flexDirection: "column",
    backgroundColor: "#1a1f2b",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#e46827",
    textAlignVertical: "center",

    margin: 0,
    padding: 0,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: 60,
    height: 60,
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#1a1f2b",
  },
  stepContainer: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
    backgroundColor: "#1a1f2b",
  },
  itemContainer: {
    width: "80%",
    backgroundColor: "#222b38",
    flexDirection: "column",
    gap: 10,
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
    borderRadius: 20,
  },
});
