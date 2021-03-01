import { NavigationHelpersContext } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { SafeAreaView, FlatList, Button, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { MovieCell } from "./components/MovieCell";
import { styles } from "./MovieListScreen.styles";

// We can use JSON files by simply requiring them.
const TABLE_DATA = require("../../assets/movies.json");

// Input: navigation & route params, which we recieve through React Navigation
// Output: a screen containing the list of movies
export default function MovieListScreen({ navigation, route }) {
  const [actors, setActors] = useState([]);
  const [search, setSearch] = useState('');

  // Fill out the methods below.
  const selectedMovie = (movieItem) => {
    navigation.navigate('Detail', {chosenMovie: movieItem });
  };

  const selectedFilterButton = () => {
    if (actors == undefined){
      navigation.navigate('Main', {screen: 'Filter', params: {sentActors: actors}});
    }
    navigation.navigate('Filter', {sentActors: actors});
  };

  useEffect(
    () => {
      // Add a "Filter" button to the right bar button.
      // It should lead to the MovieFilterScreen, and pass the "actors" state
      // variable as a parameter.
      navigation.setOptions({
        headerLeft: null,
        headerRight: () => (
          <Button onPress={selectedFilterButton} title="Filter" />
        ),
      });
    },
    [
      /*  Insert dependencies here. */
      route.name
    ]
  );

  useEffect(
    () => {
      /* Recieve the updated list of actors from the filter screen here. 
          See https://reactnavigation.org/docs/params/#passing-params-to-a-previous-screen
          for an example of how to send data BACKWARDS in the navigation stack.
      */
      const {returnedActors} = route.params;
      setActors(returnedActors);
      console.log("NEW ACTORS" + returnedActors + "?");
      console.log(route);
    },
    [
      /* Insert dependencies here. What variable changes 
        when we come back from the filter screen? */
        route.params.returnedActors
    ]
  );

  // Renders a row of the FlatList.
  const renderItem = ({ item }) => {
    const overlapFound = (listA, listB) => {
      let foundActor = false;
      listA.forEach((x) => {
        if (listB.includes(x)) {
          foundActor = true;
        }
      });
      return foundActor;
    };

    // TODO: Set up search & filter criteria.
    let meetsSearchCriteria = true;
    if (!search.search==undefined){
      console.log(search.search);
      meetsSearchCriteria = overlapFound(search.search.split(''), item.title.split(''));
    } 
  
    let meetsActorsCriteria = true;

    if (meetsSearchCriteria && meetsActorsCriteria) {
      // TODO: Return a MovieCell, wrapped by a TouchableOpacity so we can handle taps.
      return (
      <TouchableOpacity onPress={() => selectedMovie(item)}>
        <MovieCell style={styles.movieCell} movieItem={item}/>
      </TouchableOpacity>);
    } else {
      // If the item doesn't meet search/filter criteria, then we can
      // simply return null and it won't be rendered in the list!
      return null;
    }
  };

  updateSearch = (search) => {
    setSearch({ search });
  };
  
  // Our final view consists of a search bar and flat list, wrapped in
  // a SafeAreaView to support iOS.
  return (
    
    <SafeAreaView style={styles.container}>

      {/* Add a SearchBar: https://reactnativeelements.com/docs/searchbar/.
                The third-party package should already be installed for you. */}
      <SearchBar placeholder="Search here..." onChangeText={updateSearch} value={search}/>
      {/* Add a FlatList: https://reactnative.dev/docs/flatlist */}
      
      <FlatList data ={TABLE_DATA} renderItem={renderItem} keyExtractor={movieItem => movieItem.id}/>
      
      
    </SafeAreaView>
  );
}
