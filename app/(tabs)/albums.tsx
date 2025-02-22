import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { Link } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface Album {
    userId: number;
    id: number;
    title: string;
}

export default function AlbumsScreen() {
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme ?? "light");

    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get<Album[]>("https://jsonplaceholder.typicode.com/albums")
            .then((response) => {
                setAlbums(response.data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Albums</Text>
            <FlatList
                data={albums}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Link href={{ pathname: "/detailAlbum/[id]", params: { id: item.id.toString() } }} asChild>
                        <TouchableOpacity style={styles.card}>
                            <Text style={styles.albumTitle}>{item.title}</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}

const getStyles = (colorScheme: string) =>
    StyleSheet.create({
        container: { 
            flex: 1, 
            backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background, 
            padding: 10 
        },
        title: { 
            fontSize: 24, 
            fontWeight: "bold", 
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text, 
            marginBottom: 24,
            marginTop: 16,
            textAlign: "center" 
        },
        loader: { 
            flex: 1, 
            justifyContent: "center" 
        },
        card: {
            backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
            padding: 15,
            marginVertical: 5,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: colorScheme === 'dark' ? Colors.dark.border : Colors.light.border
        },
        albumTitle: { 
            fontSize: 16, 
            fontWeight: "bold", 
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text 
        },
    })
