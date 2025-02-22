import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface CommentCardProps {
  name: string;
  email: string;
  body: string;
}

export default function CommentCard({ name, email, body }: CommentCardProps) {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? "light");

  return (
    <View style={styles.commentCard}>
      <Image
        source={{ uri: `https://robohash.org/${email}.png?size=40x40` }}
        style={styles.avatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.commentName}>{name}</Text>
        <Text style={styles.commentEmail}>{email}</Text>
        <Text style={styles.commentBody}>{body}</Text>
      </View>
    </View>
  );
}

const getStyles = (colorScheme: "light" | "dark" | null) => 
    StyleSheet.create({
        commentCard: {
            flexDirection: "row",
            backgroundColor: colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
            padding: 10,
            marginBottom: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colorScheme === "dark" ? Colors.dark.border : Colors.light.border,
            alignItems: "flex-start",
        },
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 10,
        },
        commentContent: {
            flex: 1,
        },
        commentName: {
            fontSize: 14,
            fontWeight: "bold",
            color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
        },
        commentEmail: {
            fontSize: 12,
            color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
            marginBottom: 3,
        },
        commentBody: {
            fontSize: 14,
            color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
            lineHeight: 20,
        },
    });