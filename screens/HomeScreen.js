// src/screens/HomeScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const FeatureCard = ({ title, icon, onPress }) => (
    <TouchableOpacity 
      style={styles.featureCard}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#31511E', '#11120D']}
        style={styles.cardGradient}
      >
        <Ionicons name={icon} size={40} color="#F5CB5C" />
        <Text style={styles.cardTitle}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>World of Warships</Text>
        <Text style={styles.subtitle}>
          Experience epic naval warfare in this tactical multiplayer game
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>About World of Warships</Text>
          <Text style={styles.descriptionText}>
            World of Warships is an epic naval warfare game featuring historic vessels, 
            strategic battles, and stunning maritime environments. Command legendary 
            warships from different nations and engage in thrilling naval combat.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Main Features</Text>
        <View style={styles.featureGrid}>
          <FeatureCard 
            title="Warships"
            icon="boat"
            onPress={() => navigation.navigate('Warships')}
          />
          <FeatureCard 
            title="Player Profile"
            icon="person"
            onPress={() => navigation.navigate('Players')}
          />
          <FeatureCard 
            title="Battle Types"
            icon="flash"
            onPress={() => navigation.navigate('Battles')}
          />
          <FeatureCard 
            title="About"
            icon="information-circle"
            onPress={() => navigation.navigate('About')}
          />
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
    backgroundColor: '#11120D',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F5CB5C',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#D8CFBC',
  },
  content: {
    padding: 20,
  },
  descriptionContainer: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#11120D',
    borderRadius: 10,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F5CB5C',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#D8CFBC',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#11120D',
    marginBottom: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    height: 150,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardGradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFBF4',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;