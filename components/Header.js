import React from 'react';
import { Text, View } from 'react-native';

const Header = ({ headerText, flexPosition = 'center' }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: flexPosition,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 16,
        marginBottom: 16,
        marginTop: 32,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '600' }}>
        {headerText}
      </Text>
    </View>
  );
};

export default Header;
