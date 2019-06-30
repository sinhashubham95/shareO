import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const fetchQuery = (operation, variables, cacheConfig, uploadables) => {
  return fetch("http://localhost:8080/graphql" , {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Auth Headers goes here
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables
    })
  }).then(response => {
    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network,
  store
});