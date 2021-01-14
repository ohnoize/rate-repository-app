import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Menu, Provider, Button, Searchbar } from 'react-native-paper';
import { useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8'
  },
  menu: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

const MenuComponent = ({ setArgs, title, setTitle, setFilter, value, setValue }) => {
  const [ visible, setVisible ] = useState(false);
  
  const debounced = useDebouncedCallback((value) => {
    setFilter(value);
  }, 500);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const onChangeFilter = query => {
    setValue(query);
    debounced.callback(query);
  };
  return (

      <View style={styles.menu}>
        <Searchbar
          placeholder='Filter'
          onChangeText={onChangeFilter}
          value={value}
         />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{title}</Button>}
        >
        <Menu.Item onPress={() => {
          setTitle('Latest repositories');
          setArgs({ orderBy: 'CREATED_AT', orderDirection: 'DESC'});
          closeMenu();
          }} title='Latest repositories' />
        <Menu.Item onPress={() => {
          setArgs({ orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'});
          setTitle('Highest rated repositories');
          closeMenu();
          }} title='Highest rated repositories' />
          <Menu.Item onPress={() => {
          setTitle('Lowest rated repositories');
          setArgs({ orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'});
          closeMenu();
          }} title='Lowest rated repositories' />
        </Menu>
      </View>
    
  );
};


const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  
  renderHeader = () => {
    const props = this.props;
    const setArgs = props.setArgs;
    const title = props.title;
    const setTitle = props.setTitle;
    const filter = props.filter;
    const setFilter = props.setFilter;
    const value = props.value;
    const setValue = props.setValue;
    return(
      <MenuComponent 
        setArgs={setArgs} 
        title={title} 
        setTitle={setTitle} 
        setFilter={setFilter} 
        filter={filter}
        value={value}
        setValue={setValue}
        />
    );
  }
  
  render() {
    const repositories = this.props.repositories;
    const repositoryNodes = repositories?.edges?.map((edge) => edge.node) ?? [];
    const renderItem = ({ item }) => <RepositoryItem item={item} />;
    return (
      <FlatList
       data={repositoryNodes}
       ItemSeparatorComponent={ItemSeparator} 
       renderItem={renderItem}
       keyExtractor={item => item.id}
       ListHeaderComponent={this.renderHeader}
     />
    );
  }
}



const RepositoryList = () => {
  const [ args, setArgs ] = useState({});
  const [ filter, setFilter ] = useState('');
  const [ value, setValue ] = useState('');
  const vars = {
    ...args,
    searchKeyword: filter
  };
  const { repositories, error, loading } = useRepositories({ vars });
  const [ title, setTitle ] = useState('Latest repositories');
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;
  console.log(filter);
  return (
    <Provider>
    <View>
      <RepositoryListContainer repositories={repositories} setArgs={setArgs} title={title} setTitle={setTitle} setFilter={setFilter} filter={filter} value={value} setValue={setValue} />      
    </View>
    </Provider>
  );
};

export default RepositoryList;
