import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { axiosInstance } from "@/lib/api";
import PostCard from "@/components/PostCard";
import CommentCard from "@/components/CommentCard";

interface Post {
  title: string;
  body: string;
  likeCount: number;
  commentCount: number;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    if (!id) {
      setError("ID is undefined");
      setLoading(false);
      return;
    }

    Promise.all([
      axiosInstance.get(`/posts/${id}`),
      axiosInstance.get(`/posts/${id}/comments`)
    ])
      .then(([postRes, commentsRes]) => {
        if (postRes.data) {
          setPost({ 
            ...postRes.data, 
            likeCount: Math.floor(Math.random() * 100),  
            commentCount: commentsRes.data.length
          });
          setLikeCount(Math.floor(Math.random() * 100)); 
        } else {
          setError("Post not found");
        }

        if (commentsRes.data) {
          setComments(commentsRes.data);
        }
      })
      .catch(() => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#1877F2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {post && (
        <PostCard
          title={post.title}
          body={post.body}
          likeCount={likeCount}
          commentCount={post.commentCount}
          liked={liked}
          onLikePress={handleLike}
        />
      )}

      <Text style={styles.commentHeader}>Comments</Text>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CommentCard {...item} />}
        contentContainerStyle={styles.commentList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f2f5",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#65676B",
  },
  commentList: {
    flexGrow: 1,
  },
});
