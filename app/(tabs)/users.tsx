import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UsersScreen() {
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme ?? "light");

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get<User[]>("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Link href={{ pathname: "/detailUser/[id]", params: { id: item.id.toString() } }} asChild>
                        <TouchableOpacity
                            style={styles.userCard}
                        >
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.userEmail}>{item.email}</Text>
                        </TouchableOpacity>
                    </Link>
                )}
            />
        </View>
    );
}

const getStyles = (scheme: "light" | "dark") =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: 10,
            backgroundColor: scheme === "dark" ? Colors.dark.background : Colors.light.background,
        },
        title: {
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 24,
            marginTop: 16,
            textAlign: "center",
            color: scheme === "dark" ? Colors.dark.text : Colors.light.text,
        },
        loader: {
            flex: 1,
            justifyContent: "center",
        },
        userCard: {
            padding: 15,
            marginBottom: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: scheme === "dark" ? Colors.dark.border : Colors.light.border,
            elevation: 2,
        },
        userName: {
            fontSize: 18,
            fontWeight: "bold",
            color: scheme === "dark" ? "#fff" : "#000",
        },
        userEmail: {
            fontSize: 14,
            color: scheme === "dark" ? "#ccc" : "#6c757d",
        },
    });