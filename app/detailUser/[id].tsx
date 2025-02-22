import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function UserDetailScreen() {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? "light");

  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loader} />;
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User tidak ditemukan!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.username}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📧 Email</Text>
          <Text style={styles.sectionContent}>{user.email}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📞 Phone</Text>
          <Text style={styles.sectionContent}>{user.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🌍 Website</Text>
          <Text style={styles.sectionContent}>{user.website}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏠 Address</Text>
          <Text style={styles.sectionContent}>
            {user.address.street}, {user.address.suite}, {user.address.city} ({user.address.zipcode})
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏢 Company</Text>
          <Text style={styles.sectionContent}>{user.company.name}</Text>
          <Text style={styles.companyCatchphrase}>"{user.company.catchPhrase}"</Text>
          <Text style={styles.sectionContent}>💼 {user.company.bs}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (colorScheme: "light" | "dark") => 
  StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
          padding: 10
      },
      loader: {
          flex: 1,
          justifyContent: "center"
      },
      errorText: {
          fontSize: 18,
          color: "red",
          textAlign: "center"
      },

      card: {
          backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
          padding: 20,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colorScheme === 'dark' ? Colors.dark.border : Colors.light.border,
          marginBottom: 10,
      },
      name: {
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 5,
          color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
      },
      username: {
          fontSize: 16,
          textAlign: "center",
          color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text, 
          marginBottom: 15
      },
      section: {
          marginTop: 15
      },
      sectionTitle: {
          fontSize: 16,
          fontWeight: "bold",
          color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
      },
      sectionContent: {
          fontSize: 14,
          color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
          marginTop: 5
      },
      companyCatchphrase: {
          fontSize: 14,
          fontStyle: "italic",
          color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
          marginTop: 5
      },
  })