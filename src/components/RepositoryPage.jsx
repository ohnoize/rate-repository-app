import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { GET_SINGLE } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-native';
import Text from './Text';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: 'white'
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
    width: 350

  }
});

const ReviewItem = ({ review }) => {
  const date = format(new Date(review.node.createdAt), "dd.MM.yyyy");
  console.log(date);
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
  
  const item = useQuery(GET_SINGLE, { 
    fetchPolicy: 'cache-and-network',
    variables: { id } });
  if (item.loading) return null;
  if (item.error) return null;
  const reviews = item.data.repository.reviews.edges;
  console.log(reviews);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item}/> }
      ItemSeparatorComponent={ItemSeparator} 
      keyExtractor={item => item.node.id}
      ListHeaderComponent={() => <RepositoryItem item={item.data.repository} /> }
    />
    
    
  );
};

export default RepositoryPage;
