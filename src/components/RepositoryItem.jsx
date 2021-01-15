import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useHistory, useParams } from 'react-router-native';
import Text from './Text';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
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
  },
  gitButStyle: {
    backgroundColor: '#0366d6',
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 375
  },
  touchableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 375,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#0366d6'
  }
});

const RepositoryItem = ({ item }) => {
  const { id } = useParams();
  
  const history = useHistory();
  return (
    <View testID='repositoryItem' style={styles.main}>
    <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
      <View style={styles.flexRow}>
        <Image 
          style={styles.thumbnail} 
          source={{uri: item.ownerAvatarUrl}}/>
          <View style={styles.textBox}>
            <Text testID='name' fontWeight='bold'>{item.fullName}</Text>
            <Text testID='description' color='textSecondary'>{item.description}</Text>
            <View style={styles.buttonStyle}>
              <Text testID='language' color='textLight'>{item.language} </Text>
            </View>
          </View>
      </View>
      <View style={styles.itemRow}>
        <View style={styles.item}>
          <Text testID='starCount' fontWeight='bold'>{(item.stargazersCount / 1000).toFixed(1)}k</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.item}>
          <Text testID='forksCount' fontWeight='bold'>{(item.forksCount / 1000).toFixed(1)}k</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.item}>
          <Text testID='reviewCount' fontWeight='bold'>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.item}>
          <Text testID='ratingAverage' fontWeight='bold'>{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      { id ?
      <TouchableHighlight style={styles.touchableStyle} onPress={() => Linking.openURL(item.url)}>
        <View>
          <Text testID='gitHubURL' color='textLight'>Open in GitHub</Text>
        </View>
      </TouchableHighlight>
     : null }
    </TouchableOpacity>
    </View>
  );
};

export default RepositoryItem;

