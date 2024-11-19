// screens/AboutScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Definisikan FeatureItem terlebih dahulu
const FeatureItem = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      <Ionicons name={icon} size={24} color="#F5CB5C" />
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#11120D', '#565449']}
        style={styles.header}
      >
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../assets/profile.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.name}>Muhammad Zein Al-Kautsar</Text>
          <Text style={styles.nim}>21120122140151</Text>
          <Text style={styles.major}>Teknik Komputer</Text>
          <Text style={styles.university}>Universitas Diponegoro</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.description}>
            Saya? oh saya adalah mahasiswa Teknik Komputer yang sedang menyelesaikan Tugas Akhir.
            Aplikasi ini dibuat sebagai bagian dari tugas akhir saya, dengan fokus pada
            pengembangan aplikasi mobile menggunakan React Native.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This App</Text>
          <Text style={styles.description}>
            World of Warships Info adalah aplikasi mobile yang menyediakan informasi
            lengkap tentang kapal game World of Warships. Aplikasi ini menggunakan API resmi
            dari Wargaming untuk menampilkan informasi kapal perang, statistik pemain,
            dan mode pertempuran yang tersedia dalam game.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <FeatureItem 
              icon="boat"
              title="Warships Database"
              description="Informasi lengkap tentang kapal perang termasuk spesifikasi dan statistik"
            />
            <FeatureItem 
              icon="person"
              title="Player Statistics"
              description="Statistik detail pemain dan informasi clan"
            />
            <FeatureItem 
              icon="flash"
              title="Battle Types"
              description="Informasi tentang berbagai mode pertempuran yang tersedia"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Created with React Native
          </Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF4',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#F5CB5C',
    backgroundColor: '#11120D',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  headerContent: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFBF4',
    marginBottom: 4,
  },
  nim: {
    fontSize: 18,
    color: '#F5CB5C',
    marginBottom: 4,
  },
  major: {
    fontSize: 16,
    color: '#D8CFBC',
    marginBottom: 2,
  },
  university: {
    fontSize: 16,
    color: '#D8CFBC',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11120D',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#565449',
    lineHeight: 24,
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#11120D',
    padding: 16,
    borderRadius: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(245, 203, 92, 0.1)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFBF4',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#D8CFBC',
    lineHeight: 20,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#565449',
    marginBottom: 4,
  },
  version: {
    fontSize: 12,
    color: '#565449',
  },
});

export default AboutScreen;