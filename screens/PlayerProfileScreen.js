// src/screens/PlayerProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const API_KEY = 'b94a22db450ca2bfb2dee96c9cdb77c3';

const PlayerProfileScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [clanData, setClanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPlayer = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a player name');
      return;
    }

    setLoading(true);
    setError(null);
    setClanData(null);

    try {
      // First, search for player ID
      const searchResponse = await axios.get(
        'https://api.worldofwarships.asia/wows/account/list/',
        {
          params: {
            application_id: API_KEY,
            search: searchQuery,
          }
        }
      );

      if (searchResponse.data.status === 'ok' && searchResponse.data.data.length > 0) {
        const playerId = searchResponse.data.data[0].account_id;

        // Then get player details
        const playerResponse = await axios.get(
          'https://api.worldofwarships.asia/wows/account/info/',
          {
            params: {
              application_id: API_KEY,
              account_id: playerId,
            }
          }
        );

        if (playerResponse.data.status === 'ok') {
          setPlayerData(playerResponse.data.data[playerId]);

          // Get clan info
          try {
            const clanAccountResponse = await axios.get(
              'https://api.worldofwarships.asia/wows/clans/accountinfo/',
              {
                params: {
                  application_id: API_KEY,
                  account_id: playerId,
                  fields: 'clan_id,joined_at'
                }
              }
            );

            if (clanAccountResponse.data.status === 'ok' && 
                clanAccountResponse.data.data[playerId]?.clan_id) {
              
              const clanId = clanAccountResponse.data.data[playerId].clan_id;
              
              // Get clan details using clan info endpoint
              const clanResponse = await axios.get(
                'https://api.worldofwarships.asia/wows/clans/info/',
                {
                  params: {
                    application_id: API_KEY,
                    clan_id: clanId,
                    fields: 'tag,name,members_count,leader_name,created_at'
                  }
                }
              );

              if (clanResponse.data.status === 'ok') {
                const currentClan = clanResponse.data.data[clanId];
                if (currentClan) {
                  setClanData({
                    ...currentClan,
                    joined_at: clanAccountResponse.data.data[playerId].joined_at
                  });
                }
              }
            } else {
              setClanData(null);
            }
          } catch (error) {
            console.error('Error fetching clan info:', error);
            setClanData(null);
          }
        }
      } else {
        setError('Player not found');
      }
    } catch (error) {
      console.error('Error searching player:', error);
      setError('Error searching player. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const StatItem = ({ label, value }) => (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter player name..."
          placeholderTextColor="#565449"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchPlayer}>
          <Ionicons name="search" size={24} color="#FFFBF4" />
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#F5CB5C" style={styles.loader} />
      ) : playerData && (
        <View style={styles.profileContainer}>
          <View style={styles.headerSection}>
            <Text style={styles.playerName}>{playerData.nickname}</Text>
            <Text style={styles.clanTag}>
              {clanData ? `[${clanData.tag}]` : 'No Clan'}
            </Text>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.statsContainer}>
              <StatItem 
                label="Account Created" 
                value={formatDate(playerData.created_at)} 
              />
              <StatItem 
                label="Last Battle" 
                value={formatDate(playerData.last_battle_time)} 
              />
              <StatItem 
                label="Karma" 
                value={playerData.karma || 'N/A'} 
              />
            </View>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Clan Information</Text>
            <View style={styles.statsContainer}>
              {clanData ? (
                <>
                  <StatItem 
                    label="Clan Name" 
                    value={clanData.name} 
                  />
                  <StatItem 
                    label="Clan Tag" 
                    value={`[${clanData.tag}]`} 
                  />
                  <StatItem 
                    label="Members" 
                    value={clanData.members_count.toString()} 
                  />
                  <StatItem 
                    label="Joined Clan" 
                    value={formatDate(clanData.joined_at)} 
                  />
                  {clanData.leader_name && (
                    <StatItem 
                      label="Clan Leader" 
                      value={clanData.leader_name} 
                    />
                  )}
                  {clanData.created_at && (
                    <StatItem 
                      label="Clan Created" 
                      value={formatDate(clanData.created_at)} 
                    />
                  )}
                </>
              ) : (
                <Text style={[styles.statValue, { textAlign: 'center' }]}>
                  No Clan Information
                </Text>
              )}
            </View>
          </View>

          {playerData.statistics?.pvp && (
            <>
              <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>Battle Statistics</Text>
                <View style={styles.statsContainer}>
                  <StatItem 
                    label="Battles Played" 
                    value={playerData.statistics.pvp.battles.toLocaleString()} 
                  />
                  <StatItem 
                    label="Victories" 
                    value={playerData.statistics.pvp.wins.toLocaleString()} 
                  />
                  <StatItem 
                    label="Win Rate" 
                    value={`${((playerData.statistics.pvp.wins / playerData.statistics.pvp.battles) * 100).toFixed(2)}%`} 
                  />
                  <StatItem 
                    label="Survival Rate" 
                    value={`${((playerData.statistics.pvp.survived_battles / playerData.statistics.pvp.battles) * 100).toFixed(2)}%`} 
                  />
                </View>
              </View>

              <View style={styles.statsSection}>
                <Text style={styles.sectionTitle}>Combat Statistics</Text>
                <View style={styles.statsContainer}>
                  <StatItem 
                    label="Average Damage" 
                    value={Math.round(playerData.statistics.pvp.damage_dealt / playerData.statistics.pvp.battles).toLocaleString()} 
                  />
                  <StatItem 
                    label="Total Ships Destroyed" 
                    value={playerData.statistics.pvp.frags.toLocaleString()} 
                  />
                  <StatItem 
                    label="Hit Ratio" 
                    value={`${((playerData.statistics.pvp.hits / playerData.statistics.pvp.shots) * 100).toFixed(2)}%`} 
                  />
                  <StatItem 
                    label="Main Battery Hits" 
                    value={playerData.statistics.pvp.main_battery.hits.toLocaleString()} 
                  />
                </View>
              </View>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBF4',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D8CFBC',
    color: '#11120D',
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: '#11120D',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#FFE5E5',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  loader: {
    marginTop: 50,
  },
  profileContainer: {
    padding: 16,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#11120D',
  },
  clanTag: {
    fontSize: 16,
    color: '#565449',
    marginTop: 4,
  },
  statsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#11120D',
    marginBottom: 10,
  },
  statsContainer: {
    backgroundColor: '#11120D',
    borderRadius: 10,
    padding: 15,
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#565449',
  },
  statLabel: {
    color: '#D8CFBC',
    fontSize: 16,
  },
  statValue: {
    color: '#F5CB5C',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PlayerProfileScreen;