import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Pagination = ({
  pages,
  setPages,
}: {
  pages: number;
  setPages: (pages: number) => void;
}) => {
  const handlePrevPage = () => {
    if (pages > 1) setPages(pages - 1);
  };

  const handleNextPage = () => {
    setPages(pages + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePrevPage}
        disabled={pages === 1}
        style={[styles.button, pages === 1 && styles.disabled]}
      >
        <Text style={styles.text}>Previous</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNextPage} style={styles.button}>
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#aaa",
  },
});
