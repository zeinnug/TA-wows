// src/screens/WarshipsListScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const WarshipsListScreen = ({ navigation }) => {
  const [warships, setWarships] = useState([]);
  const [filteredWarships, setFilteredWarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNation, setSelectedNation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableNations, setAvailableNations] = useState([]);

  useEffect(() => {
    fetchWarships();
  }, []);

  const fetchWarships = async () => {
    try {
      const response = await axios.get(
        'https://api.worldofwarships.asia/wows/encyclopedia/ships/',
        {
          params: {
            application_id: 'b94a22db450ca2bfb2dee96c9cdb77c3',
          }
        }
      );
      
      if (response.data.status === 'ok') {
        const shipsData = Object.entries(response.data.data).map(([id, ship]) => ({
          ...ship,
          ship_id: id
        }));
        
        // Extract unique nations from the ships data
        const nations = [...new Set(shipsData.map(ship => ship.nation))].sort();
        setAvailableNations(nations);
        
        setWarships(shipsData);
        setFilteredWarships(shipsData);
      }
    } catch (error) {
      console.error('Error fetching warships:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterWarships();
  }, [searchQuery, selectedNation]);

  const filterWarships = () => {
    let filtered = warships;

    if (searchQuery) {
      filtered = filtered.filter(ship => 
        ship.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedNation) {
      filtered = filtered.filter(ship => 
        ship.nation === selectedNation
      );
    }

    setFilteredWarships(filtered);
  };

  const renderNationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.nationItem,
        selectedNation === item && styles.selectedNationItem
      ]}
      onPress={() => setSelectedNation(item === selectedNation ? null : item)}
    >
      <Text style={[
        styles.nationText,
        selectedNation === item && styles.selectedNationText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderWarshipCard = ({ item }) => (
    <TouchableOpacity
      style={styles.shipCard}
      onPress={() => navigation.navigate('WarshipDetail', { ship: item })}
    >
      <LinearGradient
        colors={['#565449', '#11120D']}
        style={styles.cardGradient}
      >
        <View style={styles.shipImageContainer}>
          {item.images?.small ? (
            <Image
              source={{ uri: item.images.small }}
              style={styles.shipImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.shipImagePlaceholder}>
              <Ionicons name="boat-outline" size={40} color="#F5CB5C" />
            </View>
          )}
        </View>

        <View style={styles.shipInfo}>
          <Text style={[
            styles.shipName,
            item.is_premium && styles.premiumShipName,
            item.is_special && styles.specialShipName
          ]}>
            {item.name}
          </Text>
          <Text style={styles.nationText}>{item.nation}</Text>
          <View style={styles.tierContainer}>
            <Text style={styles.tierText}>Tier {item.tier}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#565449" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search warships..."
          placeholderTextColor="#565449"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.nationFilterContainer}>
        <FlatList
          data={['All', ...availableNations]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.nationItem,
                (item === 'All' ? !selectedNation : selectedNation === item) && styles.selectedNationItem
              ]}
              onPress={() => setSelectedNation(item === 'All' ? null : item)}
            >
              <Text style={[
                styles.nationText,
                (item === 'All' ? !selectedNation : selectedNation === item) && styles.selectedNationText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item}
          contentContainerStyle={styles.nationList}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#F5CB5C" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredWarships}
          renderItem={renderWarshipCard}
          keyExtractor={item => item.ship_id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF4',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D8CFBC',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    color: '#11120D',
  },
  nationFilterContainer: {
    marginBottom: 16,
  },
  nationList: {
    paddingHorizontal: 16,
  },
  nationItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#D8CFBC',
  },
  selectedNationItem: {
    backgroundColor: '#F5CB5C',
  },
  nationText: {
    color: '#11120D',
    fontWeight: '500',
  },
  selectedNationText: {
    color: '#11120D',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  shipCard: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardGradient: {
    flexDirection: 'row',
    padding: 12,
  },
  shipImageContainer: {
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  shipImage: {
    width: '100%',
    height: '100%',
  },
  shipImagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shipInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  shipName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFBF4',
    marginBottom: 4,
  },
  premiumShipName: {
    color: '#F5CB5C',
  },
  specialShipName: {
    color: '#1e97F3',
  },
  tierContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  tierText: {
    color: '#D8CFBC',
    fontSize: 12,
  },
  loader: {
    flex: 1,
  },
});

export default WarshipsListScreen;