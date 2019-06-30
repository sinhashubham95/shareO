import RelayQueryResponseCache from 'relay-runtime/lib/RelayQueryResponseCache';
import { isMutation, isQuery, forceFetch } from './helper';
import Fetch from './fetch';

const tenMinutes = 10 * 60 * 1000;
const relayResponseCache = new RelayQueryResponseCache({ size: 250, ttl: tenMinutes });

export default async (request, variables, cacheConfig, uploadables) => {
  const queryID = request.text;
  if (isMutation(request)) {
    relayResponseCache.clear();
    return Fetch(request, variables);
  }
  const fromCache = relayResponseCache.get(queryID, variables);
  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    return fromCache;
  }
  const fromServer = await Fetch(request, variables);
  if (fromServer) {
    relayResponseCache.set(queryID, variables, fromServer);
  }
  return fromServer;
}