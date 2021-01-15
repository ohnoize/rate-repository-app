import React from 'react';
import { View, FlatList, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import Text from './Text';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  reviewContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    height: 10,
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

  },
  touchableStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 150,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#0366d6'
  },
  touchableErrorStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 150,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#db0b0b'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 10,
  }
});

export const ReviewItem = ({ review, refetch }) => {
  const history = useHistory();
  const date = format(new Date(review.node.createdAt), "dd.MM.yyyy");
  // console.log(date);
  // const id = review.node.repository.id;
  // console.log(id);
  const [deleteReview] = useMutation(DELETE_REVIEW);
  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete review?',
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => {
          console.log('Delete pressed', review.node.id);
          deleteReview({variables: { id: review.node.id }});
          refetch();
        } }
      ],
      { cancelable: false }
    );
    };
  
  return(
    <View style={styles.container}>
    <View style={styles.reviewContainer}>
    <View style={styles.ratingContainer}>
      <Text style={styles.rating}>{review.node.rating}</Text>
    </View>
    <View style={styles.textBox}>
      <Text fontWeight='bold'>{review.node.repository.name}</Text>
      <Text color='textSecondary'>{date}</Text>
      <Text>{review.node.text}</Text>
    </View>
    </View>
    <View style={styles.buttonsContainer}>
    <TouchableHighlight style={styles.touchableStyle} onPress={() => history.push(`/${review.node.repositoryId}`)}>
        <View>
          <Text testID='viewRepoButton' color='textLight'>View repository</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.touchableErrorStyle} onPress={handleDelete}>
      <View>
        <Text testID='deleteRepoButton' color='textLight'>Delete review</Text>
      </View>
      </TouchableHighlight>
      </View>
    </View>
  );
};

export const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {

  const { data, loading, error, refetch } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return (
    <View><Text>Loading...</Text></View>
  );
  if (error) return (
    console.log(error.message)
  );
  if (data) {
  console.log(data?.authorizedUser?.reviews.edges);
  }
  const reviews = data?.authorizedUser?.reviews.edges;
  return(
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch}/> }
      ItemSeparatorComponent={ItemSeparator} 
      keyExtractor={item => item.node.id}
    />
  );
};

export default MyReviews;


