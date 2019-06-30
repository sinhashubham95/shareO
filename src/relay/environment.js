import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import CacheHandler from './cachehandler';

// Create a network layer from the fetch function
const network = Network.create(CacheHandler);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
  network,
  store
});