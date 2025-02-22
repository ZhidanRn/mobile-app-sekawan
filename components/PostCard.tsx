import React, { forwardRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface PostCardProps {
  title: string;
  body: string;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  onLikePress: () => void;
}

const PostCard = forwardRef<View, PostCardProps>(
  ({ title, body, likeCount, commentCount, liked, onLikePress }, ref) => {
    return (
      <View ref={ref} style={styles.postCard}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postBody}>{body}</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={onLikePress}>
            <FontAwesome
              name={liked ? "thumbs-up" : "thumbs-o-up"}
              size={20}
              color={liked ? "#1877F2" : "#333"}
            />
            <Text style={styles.actionText}>{likeCount}</Text>
          </TouchableOpacity>

          <View style={styles.actionButton}>
            <FontAwesome name="comment-o" size={20} color="#333" />
            <Text style={styles.actionText}>{commentCount}</Text>
          </View>
        </View>
      </View>
    );
  }
);

export default PostCard;

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  postBody: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 5,
  },
});
