import React from "react";
import { SafeAreaView, Text, Image, ScrollView } from "react-native";
import { styles } from "./MovieDetailScreen.styles";

export default function MovieDetailScreen({ route, navigation }) {
  // Recieve the movieItem by destructuring route params.
  const { chosenMovie } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Image style={styles.posterImage} source={{uri: chosenMovie.posterurl}}/>
        <Text style={styles.h1} >{chosenMovie.title}</Text>
        <Text style={styles.h2}>{'Released ' + chosenMovie.year}</Text>
        <Text style={styles.h2}>{chosenMovie.genres.join(", ")}</Text>
        <Text style={styles.h2}>{chosenMovie.actors.join(", ")}</Text>
        <Text style={styles.h4}>{chosenMovie.storyline}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
