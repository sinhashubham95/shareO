import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { QueryRenderer } from 'react-relay';
import hoistStatics from 'hoist-non-react-statics';
import { Card } from 'react-native-elements';
import Environment from './environment';

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    justfyContent: 'center',
    alignItems: 'center',
  },
});

export default (fragmentComponent, component, config) => {
  const { query, queriesParams } = config;

  const queryRendererWrapper = (props) => {
    const variables = queriesParams ? queriesParams(this.props) : config.variables;
    return (
      <QueryRenderer
        environment={Environment}
        query={query}
        variables={variables}
        render={({ error, props }) => {
          if (error) {
            return (
              <Card image={require('../assets/error.jpg')} />
            );
          }
          if (props) {
            return <FragmentComponent {...this.props} query={props} />;
          }
          return (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#03A9F4" />
            </View>
          );
        }}
      />
    );
  }

  return hoistStatics(queryRendererWrapper, Component);
}