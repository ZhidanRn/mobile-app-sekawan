import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PortfolioList from '@/components/PortfolioList';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { openBrowserAsync } from 'expo-web-browser';

const ProfileScreen = () => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme ?? "light");

  return (
    <ScrollView>
      {/* Cover & Profile */}
      <View style={styles.coverContainer}>
        <Image source={require('../../assets/images/FullStack-BG.jpg')} style={styles.coverImage} />
        <View style={styles.profileContainer}>
          <Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
          <Text style={styles.name}>Zhidani Ramadhan</Text>
          <Text style={styles.headline}>Full-Stack Developer</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutDescription}>
          I am a Full-Stack & Mobile Developer with a strong passion for building modern, efficient, and impactful web and mobile applications. I believe technology plays a crucial role in simplifying everyday life, and I strive to be part of that innovation.
        </Text>
        <Text style={styles.aboutDescription}>
          I have completed intensive bootcamps at Harisenin.com and Enigma Camp, equipping me with hands-on experience and a deep understanding of software development.
        </Text>
        <Text style={styles.aboutDescription}>
          I am always eager to learn and embrace new technologies to enhance my skills and stay ahead in this ever-evolving industry. My goal is to build seamless and scalable digital solutions that not only meet technical standards but also provide real value to users.
        </Text>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Place of Birthdate:</Text>
          <Text style={styles.aboutValue}>Tegal, 16 February 2001</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Gender:</Text>
          <Text style={styles.aboutValue}>Male</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Email:</Text>
          <Text style={styles.aboutValue}>zhidanir@gmail.com</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Phone:</Text>
          <Text style={styles.aboutValue}>+62 857-4710-8766</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>Address:</Text>
          <Text style={styles.aboutValue}>Jl. Raya Candi V A No.392a,{"\n"} karangbesuki, Kec. Sukun,{"\n"} Kota Malang, Jawa Timur 56149</Text>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          <View style={styles.skillBadge}><Text style={styles.skillText}>HTML</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>CSS</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>JavaScript</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>Java</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>PHP</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>Spring Boot</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>React Native</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>React.js</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>Next.js</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>Node.js</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>TypeScript</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>Tailwind CSS</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>Prisma</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>MySQL</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>PostgreSQL</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>Git</Text></View>
          <View style={styles.skillBadge}><Text style={styles.skillText}>Linux</Text></View>
        </View>
      </View>

      <PortfolioList />

      {/* Social */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media</Text>
        <TouchableOpacity style={styles.contactRow} onPress={() => openBrowserAsync("https://github.com/ZhidanRn")}>
          <Ionicons name="logo-github" size={20} color={colorScheme === 'dark' ? "#fff" : "#000"} />
          <Text style={styles.contact}> https://github.com/ZhidanRn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactRow} onPress={() => openBrowserAsync("https://www.linkedin.com/in/zhidanir/")}>
          <Ionicons name="logo-linkedin" size={20} color="#0077b5" />
          <Text style={styles.contact}>https://www.linkedin.com/in/zhidanir/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactRow} onPress={() => openBrowserAsync("mailto:zhidanir@gmail.com")}>
          <Ionicons name="mail" size={20} color="#d93025" />
          <Text style={styles.contact}> zhidanir@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactRow} onPress={() => openBrowserAsync("https://wa.me/6285747108766")}>
          <Ionicons name="logo-whatsapp" size={20} color="#25d366" />
          <Text style={styles.contact}> +62 857-4710-8766</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactRow} onPress={() => openBrowserAsync("https://zhidaniramadhan.vercel.app")}>
          <Ionicons name="link-outline" size={20} color={colorScheme === 'dark' ? "#fff" : "#000"} />
          <Text style={styles.contact}> zhidaniramadhan.vercel.app</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    coverContainer: {
      alignItems: 'center',
      backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
      paddingBottom: 20,
    },
    coverImage: {
      width: '100%',
      height: 200,
    },
    profileContainer: {
      alignItems: 'center',
      marginTop: -50,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: colorScheme === 'dark' ? Colors.dark.border : Colors.light.border,
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center',
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    },
    headline: {
      fontSize: 14,
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
      marginVertical: 5,
      textAlign: 'center',
    },
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
      marginBottom: 5,
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    },
    aboutRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    aboutLabel: {
      fontSize: 14,
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
      fontWeight: 'bold',
    },
    aboutValue: {
      fontSize: 14,
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
      textAlign: 'right',
    },
    aboutDescription: {
      fontSize: 14,
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
      textAlign: 'justify',
      marginTop: 10,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    skillBadge: {
      backgroundColor: '#0077b5',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 15,
      marginBottom: 10,
      marginRight: 10,
    },
    skillText: {
      color: '#fff',
      fontSize: 14,
    },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    contact: {
      fontSize: 14,
      marginLeft: 5,
      color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text,
    },
  });

export default ProfileScreen;
