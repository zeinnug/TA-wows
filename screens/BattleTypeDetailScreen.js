// src/screens/BattleTypeDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const BattleTypeDetailScreen = ({ route }) => {
  const { battle } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <LinearGradient
          colors={['#565449', '#11120D']}
          style={styles.headerGradient}
        >
          {battle.image ? (
            <Image
              source={{ uri: battle.image }}
              style={styles.battleImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.iconContainer}>
              <Ionicons name="flash" size={60} color="#F5CB5C" />
            </View>
          )}
          <Text style={styles.battleName}>{battle.name}</Text>
          <View style={styles.tagsContainer}>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>{battle.game_mode || 'Standard'}</Text>
            </View>
            {battle.battle_type_tag && (
              <View style={[styles.tagContainer, { backgroundColor: 'rgba(30, 151, 243, 0.2)' }]}>
                <Text style={[styles.tagText, { color: '#1e97F3' }]}>
                  {battle.battle_type_tag}
                </Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{battle.description || 'No description available'}</Text>
        </View>

        {(battle.battle_limit || battle.credits_per_minute || battle.experience_per_minute) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Battle Information</Text>
            <View style={styles.infoContainer}>
              {battle.battle_limit && (
                <InfoItem 
                  label="Battle Limit" 
                  value={battle.battle_limit.toString()} 
                />
              )}
              {battle.credits_per_minute && (
                <InfoItem 
                  label="Credits per Minute" 
                  value={battle.credits_per_minute.toString()} 
                />
              )}
              {battle.experience_per_minute && (
                <InfoItem 
                  label="Experience per Minute" 
                  value={battle.experience_per_minute.toString()} 
                />
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF4',
  },
  header: {
    height: 300,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  battleImage: {
    width: '100%',
    height: 180,
    marginBottom: 16,
    borderRadius: 10,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  battleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFBF4',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tagContainer: {
    backgroundColor: 'rgba(245, 203, 92, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    color: '#F5CB5C',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    padding: 16,
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
  infoContainer: {
    backgroundColor: '#11120D',
    borderRadius: 10,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#565449',
  },
  infoLabel: {
    color: '#D8CFBC',
    fontSize: 16,
  },
  infoValue: {
    color: '#F5CB5C',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BattleTypeDetailScreen;