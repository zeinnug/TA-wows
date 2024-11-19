// src/services/api.js
import axios from 'axios';

const API_KEY = 'b94a22db450ca2bfb2dee96c9cdb77c3';
const BASE_URL = 'https://api.worldofwarships.asia/wows';

export const fetchWarships = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/encyclopedia/ships/`, {
      params: {
        application_id: API_KEY
      }
    });
    
    if (response.data.status === 'ok') {
      return Object.values(response.data.data);
    }
    throw new Error('Failed to fetch warships');
  } catch (error) {
    console.error('Error fetching warships:', error);
    throw error;
  }
};

export const fetchWarshipDetails = async (shipId) => {
  try {
    const response = await axios.get(`${BASE_URL}/encyclopedia/ships/`, {
      params: {
        application_id: API_KEY,
        ship_id: shipId
      }
    });
    
    if (response.data.status === 'ok') {
      return response.data.data[shipId];
    }
    throw new Error('Failed to fetch warship details');
  } catch (error) {
    console.error('Error fetching warship details:', error);
    throw error;
  }
};