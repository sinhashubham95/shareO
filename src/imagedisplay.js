import React, { Component } from 'react';
import GQL from 'graphql-tag';
import { Query } from 'react-apollo';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Tile } from 'react-native-elements';

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GetImages = GQL`
  query GetImages($start: Int, $type: String){
    imageList(start: $start, type: $type) {
      data {
        title
        link
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

  keyExtractor = (item, index) => `image_${item.link}_${item.title}_${index}`;

  renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#03A9F4" />
    </View>
  );

  renderDataItem = ({ item }) => (
    <Tile
      imageSrc={{ uri: item.link }}
      title={item.title}
      featured
      imageContainerStyle={styles.image}
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

  render() {
    return (
      <Query
        query={GetImages}
        variables={{
          type: this.props.navigation.state.params.name,
          start: 1,
        }}
        fetchPolicy="cache-first"
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) {
            return this.renderLoading();
          }
          if (data) {
            return this.renderData(data, fetchMore);
          }
          console.log(error);
          return null;
        }}
      </Query>
    );
  }
}

export default ImageDisplay;