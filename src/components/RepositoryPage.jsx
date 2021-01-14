import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useSingleRepo from '../hooks/useSingleRepo';
import { useParams } from 'react-router-native';
import Text from './Text';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  separator: {
    height: 5,
    backgroundColor: '#e1e4e8',
  },
  ratingContainer: {
    width: 60,
    height: 60,
    borderWidth: 5,
    borderRadius: 30,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10
  },
  rating: {
    color: '#0366d6'
  },
  textBox: {
    padding: 10,
    width: 300

  }
});

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.node.createdAt), "dd.MM.yyyy");
  // console.log(date);
  return(
    <View style={styles.reviewContainer}>
    <View style={styles.ratingContainer}>
      <Text style={styles.rating}>{review.node.rating}</Text>
    </View>
    <View style={styles.textBox}>
      <Text fontWeight='bold'>{review.node.user.username}</Text>
      <Text color='textSecondary'>{date}</Text>
      <Text>{review.node.text}</Text>
    </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryPage = () => {

  const { id } = useParams();
  const vars = { id, first: 5} ;
  const { data, error, loading, fetchMore } = useSingleRepo({ vars });
  
  if (loading) return null;
  if (error) return null;
  const reviews = data.repository.reviews.edges;
  const onEndReach = () => fetchMore();
  console.log(data);
  // console.log(reviews);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item}/> }
      ItemSeparatorComponent={ItemSeparator} 
      keyExtractor={item => item.node.id}
      ListHeaderComponent={() => <RepositoryItem item={data.repository} /> }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.01}
    />
    
    
  );
};

export default RepositoryPage;
