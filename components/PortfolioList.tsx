import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { openBrowserAsync } from 'expo-web-browser';

const projects = [
    { id: '1', name: 'HikeSafe', link: 'https://github.com/HikeSafe-Project/mobile', description: 'Mobile application for hikers tracking and booking' },
    { id: '2', name: 'LinkUp', link: 'https://zhidaniramadhan.vercel.app/projects.html?id=5', description: 'Platform sosial networking real-time' },
    { id: '3', name: 'Netflix Clone', link: 'https://zhidaniramadhan.vercel.app/projects.html?id=4', description: 'The application aims to replicate key features of Netflix with NextJs' },
    { id: '4', name: 'Seven Commerce', link: 'https://zhidaniramadhan.vercel.app/projects.html?id=3', description: 'E-commerce website with ReactJs' },
];

const PortfolioList = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? "light");

  const handleOpenLink = (link: string) => {
    openBrowserAsync(link);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Portfolio</Text>
      {projects.map((item) => (
        <TouchableOpacity key={item.id} style={styles.projectCard} onPress={() => handleOpenLink(item.link)}>
          <Ionicons name="briefcase-outline" size={24} color={ colorScheme === 'dark' ? Colors.dark.portoTitle : Colors.light.portoTitle} />
          <View style={styles.projectInfo}>
            <Text style={styles.projectTitle}>{item.name}</Text>
            <Text style={styles.projectDescription}>{item.description}</Text>
          </View>
          <Ionicons name="open-outline" size={24} color={ colorScheme === 'dark' ? Colors.dark.portoDesc : Colors.light.portoDesc} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const getStyles = (colorScheme: "light" | "dark" | null) =>
  StyleSheet.create({
      section: {
        backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        marginHorizontal: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    },
    projectCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorScheme === 'dark' ? Colors.dark.portoCard : Colors.light.portoCard,
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    projectInfo: {
        flex: 1,
        marginLeft: 10,
    },
    projectTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colorScheme === 'dark' ? Colors.dark.portoTitle : Colors.light.portoTitle,
    },
    projectDescription: {
        fontSize: 14,
        color: colorScheme === 'dark' ? Colors.dark.portoDesc : Colors.light.portoDesc,
    },
  })

export default PortfolioList;
