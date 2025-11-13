import { StyleSheet } from "react-native";
import { ThemeColors } from "./theme";

export const authStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.borderColor,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 16,
      width: "100%",
    },
    input: {
      flex: 1,
      color: theme.textColor,
      // fontFamily: "HKGrotesk",
    },
    errorText: {
      alignSelf: "flex-start",
      marginBottom: 16,
      marginLeft: 5,
      marginTop: -8,
    },
  });
