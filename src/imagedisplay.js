import React, { Component } from 'react';
import GQL from 'graphql-tag';
import { Query } from 'react-apollo';
import { View, StyleSheet, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Tile } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import Share from 'react-native-share';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginBottom: 50
  },
});

const GetImages = GQL`
  query GetImages($start: Int, $type: String){
    imageList(start: $start, type: $type) {
      data {
        title
        link
        type
      }
      page {
        isLastPage
        nextStart
      }
    }
  }
`;

class ImageDisplay extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: `${navigation.state.params.name[0].toUpperCase()}${navigation.state.params.name.substr(1).toLowerCase()}`,
  });

  getBackgroundColor = (name) => {
    switch (name) {
      case 'morning':
        return '#FFAF00';
      case 'afternoon':
        return '#FDCEA6';
      case 'evening':
        return '#FD6051';
      case 'night':
        return '#2D5070';
    }
    return '#FFAF00';
  }

  onEndReached = (fetchMore, isLastPage, nextStart) => () => {
    if (isLastPage) {
      return
    }
    fetchMore({
      variables: {
        type: this.props.navigation.state.params.name,
        start: nextStart,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        const newData = fetchMoreResult.imageList.data;
        const newPage = fetchMoreResult.imageList.page;
        if (newData.length) {
          return Object.assign({}, previousResult, {
            imageList: {
              data: [...previousResult.imageList.data, ...newData],
              page: newPage,
              __typename: previousResult.imageList.__typename,
            },
          });
        }
        return previousResult;
      },
    });
  }

  onItemPress = (item) => async () => {
    try {
      await Share.open({
        url: item.link,
        type: item.type,
      });
    } catch {

    }
  }

  keyExtractor = (item, index) => `image_${item.link}_${item.title}_${index}`;

  renderLoading = () => (
    <Spinner
      style={styles.spinner}
      isVisible
      size={100}
      type="Bounce"
      color="#fff"
    />
  );

  renderDataItem = ({ item }) => (
    <Tile
      imageSrc={{ uri: item.link, cache: "force-cache" }}
      featured
      onPress={this.onItemPress(item)}
    />
  );

  renderData = (data, fetchMore) => (
    <FlatList
      data={data.imageList.data}
      keyExtractor={this.keyExtractor}
      renderItem={this.renderDataItem}
      onEndReached={this.onEndReached(fetchMore,
        data.imageList.page.isLastPage, data.imageList.page.nextStart)}
    />
  );

  renderError = () => (
    <Tile
      imageSrc={require('./assets/error.jpg')}
      featured
      activeOpacity={1}
      height={Dimensions.get('screen').height}
    />
  );

  render() {
    const backgroundColor =
      this.getBackgroundColor(this.props.navigation.state.params.name);
    return (
      <Query
        query={GetImages}
        variables={{
          type: this.props.navigation.state.params.name,
          start: 1,
        }}
        fetchPolicy="cache-first"
      >
        {({ loading, error, data, fetchMore }) => (
          <View style={[styles.wrapper, { backgroundColor }]}>
            {loading && this.renderLoading()}
            {!loading && data && this.renderData(data, fetchMore)}
            {!loading && !data && this.renderError()}
          </View>
        )}
      </Query>
    );
  }
}

export default ImageDisplay;