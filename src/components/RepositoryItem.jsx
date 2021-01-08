import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius:5,
    margin: 10
  },
  textBox: {
    margin: 10,
    width: 300,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    
  },
  flexRow: {
    flexDirection: 'row',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingBottom: 10
  },
  item: {
    alignItems: 'center'
  },
  buttonStyle: {
    backgroundColor: '#0366d6',
    marginTop: 5,
    padding: 5,
    borderRadius: 5
  }
});

const RepositoryItem = ({ item }) => {
  
  return (
    <View>
      <View style={styles.flexRow}>
        <Image 
          style={styles.thumbnail} 
          source={{uri: item.ownerAvatarUrl}}/>
          <View style={styles.textBox}>
            <Text fontWeight='bold'>{item.fullName}</Text>
            <Text color='textSecondary'>{item.description}</Text>
            <View style={styles.buttonStyle}>
              <Text color='textLight'>{item.language} </Text>
            </View>
          </View>
      </View>
      <View style={styles.itemRow}>
        <View style={styles.item}>
          <Text fontWeight='bold'>{(item.stargazersCount / 1000).toFixed(1)}k</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.item}>
          <Text fontWeight='bold'>{(item.forksCount / 1000).toFixed(1)}k</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.item}>
          <Text fontWeight='bold'>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.item}>
          <Text fontWeight='bold'>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;

