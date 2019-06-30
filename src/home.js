import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-material-ui';

class Home extends Component {
  render() {
    return (
      <View>
        <Card>
          <Text>Hello World!!</Text>
        </Card>
      </View>
    );
  }
}

export default Home;