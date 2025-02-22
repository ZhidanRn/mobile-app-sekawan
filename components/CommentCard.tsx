import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface CommentCardProps {
  name: string;
  email: string;
  body: string;
}

export default function CommentCard({ name, email, body }: CommentCardProps) {
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

const styles = StyleSheet.create({
  commentCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
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
    color: "#050505",
  },
  commentEmail: {
    fontSize: 12,
    color: "#65676B",
    marginBottom: 3,
  },
  commentBody: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
