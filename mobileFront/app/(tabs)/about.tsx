import { StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TouchableOpacity } from "react-native";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Image
          source={require("@/assets/images/logo1.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          HOOP VISION
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Sobre o Projeto
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.contentBox}>
        <ThemedText style={styles.description}>
          O projeto Hoop Vision é um aplicativo desenvolvido para classificar o desempenho de qualquer jogador amador baseado nas estatísticas da NBA. Nosso objetivo é proporcionar uma experiência intuitiva e eficiente para jogadores e fãs do esporte!
        </ThemedText>
        <ThemedText type="subtitle" style={styles.devTitle}>
          Desenvolvedores:
        </ThemedText>
        <ThemedView style={styles.devList}>
          <ThemedText style={styles.devItem}>• Bruno Algarte</ThemedText>
          <ThemedText style={styles.devItem}>• Cristian Nascimento</ThemedText>
          <ThemedText style={styles.devItem}>• Eduardo Vilas Boas</ThemedText>
          <ThemedText style={styles.devItem}>• Rafael Veríssimo</ThemedText>
        </ThemedView>
      </ThemedView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/login")}
      >
        <ThemedText style={styles.buttonText}>Sair</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181d27",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingTop: 0,
    gap: 0,
  },
  headerContainer: {
    backgroundColor: "#e46827",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    height: 110,
    width: "100%",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 10,
  },
  titleContainer: {
    alignItems: "center",
    backgroundColor: "#181d27",
    marginBottom: 12,
    marginTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e46827",
    letterSpacing: 2,
    textShadowColor: "#232a38",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 17,
    color: "#fff",
    marginTop: 4,
    textAlign: "center",
    letterSpacing: 1,
    fontWeight: "300",
  },
  contentBox: {
    width: "90%",
    backgroundColor: "#232a38",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 8,
    gap: 12,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
  },
  devTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#e46827",
    textAlign: "center",
  },
  devList: {
    gap: 4,
    alignItems: "flex-start",
    marginTop: 6,
    marginBottom: 6,
    width: "100%",
    backgroundColor: "#232a38",
  },
  devItem: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 6,
  },
  button: {
    backgroundColor: "#e46827",
    paddingVertical: 14,
    paddingHorizontal: 38,
    borderRadius: 12,
    elevation: 2,
    marginTop: 10,
    marginBottom: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    letterSpacing: 1,
  },
});