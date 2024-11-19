// src/screens/WarshipDetailScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,  // Ditambahkan ke daftar import
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const WarshipDetailScreen = ({ route }) => {
  const { ship } = route.params;

  // Fetch English description when component mounts
  React.useEffect(() => {
    fetchEnglishDescription();
  }, []);

  const [description, setDescription] = React.useState(ship.description);

  const fetchEnglishDescription = async () => {
    try {
      const response = await axios.get(
        'https://api.worldofwarships.asia/wows/encyclopedia/ships/',
        {
          params: {
            application_id: 'b94a22db450ca2bfb2dee96c9cdb77c3',
            ship_id: ship.ship_id,
            language: 'en'
          }
        }
      );

      if (response.data.status === 'ok' && response.data.data[ship.ship_id]) {
        setDescription(response.data.data[ship.ship_id].description);
      }
    } catch (error) {
      console.error('Error fetching English description:', error);
    }
  };

  const InfoItem = ({ label, value }) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          {ship.images?.large ? (
            <Image
              source={{ uri: ship.images.large }}
              style={styles.shipImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="boat" size={100} color="#F5CB5C" />
            </View>
          )}
          <LinearGradient
            colors={['transparent', '#11120D']}
            style={styles.imageGradient}
          />
        </View>

        <View style={styles.content}>
          <Text style={[
            styles.shipName,
            ship.is_premium && styles.premiumShipName,
            ship.is_special && styles.specialShipName
          ]}>
            {ship.name}
          </Text>

          <View style={styles.basicInfo}>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>Tier {ship.tier}</Text>
            </View>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>{ship.nation}</Text>
            </View>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>{ship.type}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{description || 'No description available'}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsContainer}>
              {/* Hull Armor */}
              {ship.default_profile?.armour?.total && (
                <InfoItem 
                  label="Hull Armor" 
                  value={`${ship.default_profile.armour.total} mm`} 
                />
              )}

              {/* Maximum Speed */}
              {ship.default_profile?.mobility?.max_speed && (
                <InfoItem 
                  label="Maximum Speed" 
                  value={`${ship.default_profile.mobility.max_speed} knots`} 
                />
              )}

              {/* Main Gun Caliber */}
              {ship.default_profile?.weaponry?.main_caliber && (
                <InfoItem 
                  label="Main Gun Caliber" 
                  value={`${ship.default_profile.weaponry.main_caliber} mm`} 
                />
              )}

              {/* Turning Radius */}
              {ship.default_profile?.mobility?.turning_radius && (
                <InfoItem 
                  label="Turning Radius" 
                  value={`${ship.default_profile.mobility.turning_radius} m`} 
                />
              )}

              {/* Surface Detectability */}
              {ship.default_profile?.concealment?.detect_distance_by_ship && (
                <InfoItem 
                  label="Surface Detectability" 
                  value={`${ship.default_profile.concealment.detect_distance_by_ship} km`} 
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFBF4',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFBF4',
  },
  imageContainer: {
    height: 250,
    width: '100%',
    position: 'relative',
  },
  shipImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#11120D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  content: {
    padding: 20,
  },
  shipName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#11120D',
    marginBottom: 10,
  },
  premiumShipName: {
    color: '#F5CB5C',
  },
  specialShipName: {
    color: '#1e97F3',
  },
  basicInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 10,
  },
  tagContainer: {
    backgroundColor: '#565449',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagText: {
    color: '#FFFBF4',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#11120D',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#565449',
    lineHeight: 24,
  },
  specsContainer: {
    backgroundColor: '#11120D',
    borderRadius: 10,
    padding: 15,
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

export default WarshipDetailScreen;