import { View, Text, FlatList } from "react-native";
import React,{useState} from "react";
import * as Animatable from 'react-native-animatable';

const TrendingItem = () =>{
  return(
    <Animatable.View>

    </Animatable.View>
  )
}

const Trending = ({ posts }) => {

  const [activeItem, setActiveItem] = useState(posts[0])

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} />
      )}
    />
  );
};

export default Trending;
