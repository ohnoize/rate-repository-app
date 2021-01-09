import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  
  const { repositories, error, loading } = useRepositories();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  console.log(repositories);
  const repositoryNodes = repositories?.edges?.map(edge => edge.node)
    ?? [];

  const renderItem = ({ item }) => <RepositoryItem item={item} />;
  
  return (
    <View>
      <FlatList
       data={repositoryNodes}
       ItemSeparatorComponent={ItemSeparator} 
       renderItem={renderItem}
       keyExtractor={item => item.id}
      />
    </View>
  );
};

export default RepositoryList;