import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator,
  Animated,
  TouchableOpacity
} from "react-native";
import { Link } from "expo-router";
import { axiosInstance } from "@/lib/api";
import PostCard from "@/components/PostCard";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  body: string;
}

export default function ListScreen() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? "light");

  const [data, setData] = useState<Post[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: { count: number; liked: boolean } }>({});
  const [commentCounts, setCommentCounts] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    axiosInstance
      .get<Post[]>("/posts")
      .then((response) => {
        setData(response.data);
        setLoading(false);

        const initialLikes = response.data.reduce((acc, post) => {
          acc[post.id] = { count: Math.floor(Math.random() * 100), liked: false };
          return acc;
        }, {} as { [key: number]: { count: number; liked: boolean } });

        setLikes(initialLikes);

        response.data.forEach((post) => {
          axiosInstance.get<Comment[]>(`/comments?postId=${post.id}`)
            .then((res) => {
              setCommentCounts((prev) => ({
                ...prev,
                [post.id]: res.data.length,
              }));
            })
            .catch((error) => console.error(`Error fetching comments for post ${post.id}:`, error));
        });

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleLike = (postId: number) => {
    setLikes((prev) => {
      const isLiked = prev[postId]?.liked || false;
      return {
        ...prev,
        [postId]: {
          count: isLiked ? prev[postId].count - 1 : prev[postId].count + 1,
          liked: !isLiked,
        },
      };
    });
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Posts</Text>

        {loading ? (
          <ActivityIndicator size="large" color={colorScheme === "dark" ? "#fff" : "#007BFF"} style={styles.loader} />
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <FlatList
              data={data}
              renderItem={({ item }) => {
                const scaleAnim = new Animated.Value(1);

                const handlePressIn = () => {
                  Animated.spring(scaleAnim, {
                    toValue: 0.96,
                    useNativeDriver: true,
                    speed: 30,
                  }).start();
                };

                const handlePressOut = () => {
                  Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    speed: 20,
                  }).start();
                };

                return (
                  <Link href={{ pathname: "/detailPost/[id]", params: { id: item.id.toString() } }} asChild>
                    <TouchableOpacity 
                      activeOpacity={0.7} 
                      onPressIn={handlePressIn} 
                      onPressOut={handlePressOut}
                    >
                      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <PostCard
                          title={item.title}
                          body={item.body}
                          likeCount={likes[item.id]?.count || 0}
                          commentCount={commentCounts[item.id] || 0}
                          liked={likes[item.id]?.liked || false}
                          onLikePress={() => handleLike(item.id)}
                        />
                      </Animated.View>
                    </TouchableOpacity>
                  </Link>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.list}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const getStyles = (colorScheme: string) =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? Colors.dark.background : Colors.light.background,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    header: {
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 24,
      marginTop: 16,
      color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
    },
    loader: {
      flex: 1,
      justifyContent: "center",
    },
    list: {
      paddingBottom: 20,
    },
  });