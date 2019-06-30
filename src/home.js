import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Tile } from 'react-native-elements';

const styles = StyleSheet.create({
  image: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});

class Home extends Component {
  onPress = (name) => () => {
    this.props.navigation.navigate(name, {
      name,
    });
  }

  render() {
    return (
      <ScrollView>
        <Tile
          key="morning"
          imageSrc={require('./assets/morning.png')}
          featured
          imageContainerStyle={styles.image}
          onPress={this.onPress('morning')}
        />
        <Tile
          key="afternoon"
          imageSrc={require('./assets/afternoon.png')}
          featured
          imageContainerStyle={styles.image}
          onPress={this.onPress('afternoon')}
        />
        <Tile
          key="evening"
          imageSrc={require('./assets/evening.png')}
          featured
          imageContainerStyle={styles.image}
          onPress={this.onPress('evening')}
        />
        <Tile
          key="night"
          imageSrc={require('./assets/night.png')}
          featured
          imageContainerStyle={styles.image}
          onPress={this.onPress('night')}
        />
      </ScrollView>
    );
  }
}

export default Home;