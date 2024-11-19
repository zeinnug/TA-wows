// src/screens/BattleTypeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const API_KEY = 'b94a22db450ca2bfb2dee96c9cdb77c3';

const BattleTypeScreen = ({ navigation }) => {
  const [battleTypes, setBattleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBattleTypes();
  }, []);

  const fetchBattleTypes = async () => {
    try {
      const response = await axios.get(
        'https://api.worldofwarships.asia/wows/encyclopedia/battletypes/',
        {
          params: {
            application_id: API_KEY,
            language: 'en' // Set language to English
          }
        }
      );

      if (response.data.status === 'ok') {
        const battlesData = Object.entries(response.data.data).map(([id, battle]) => ({
          id,
          ...battle,
          image: battle.image || null
        }));
        setBattleTypes(battlesData);
      } else {
        setError('Failed to fetch battle types');
      }
    } catch (error) {
      console.error('Error fetching battle types:', error);
      setError('Error loading battle types. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderBattleTypeCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('BattleTypeDetail', { battle: item })}
    >
      <LinearGradient
        colors={['#565449', '#11120D']}
        style={styles.cardContent}
      >
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.battleImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="flash" size={40} color="#F5CB5C" />
            </View>
          )}
        </View>
        <View style={styles.battleInfo}>
          <Text style={styles.battleName}>{item.name}</Text>
          {item.description && (
            <Text style={styles.battleDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}
          <View style={styles.tagsContainer}>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>{item.game_mode || 'Standard'}</Text>
            </View>
            {item.battle_type_tag && (
              <View style={[styles.tagContainer, { backgroundColor: 'rgba(30, 151, 243, 0.2)' }]}>
                <Text style={[styles.tagText, { color: '#1e97F3' }]}>
                  {item.battle_type_tag}
                </Text>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#F5CB5C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchBattleTypes}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={battleTypes}
        renderItem={renderBattleTypeCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF4',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBF4',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    width: 120,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  battleImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  battleInfo: {
    flex: 1,
    marginLeft: 16,
  },
  battleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFBF4',
    marginBottom: 4,
  },
  battleDescription: {
    fontSize: 14,
    color: '#D8CFBC',
    marginBottom: 8,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagContainer: {
    backgroundColor: 'rgba(245, 203, 92, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  tagText: {
    color: '#F5CB5C',
    fontSize: 12,
    fontWeight: '500',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#11120D',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#F5CB5C',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BattleTypeScreen;