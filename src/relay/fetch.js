import Axios from 'axios';

const URL = 'http://localhost:8080/graphql';

export default async (request, variables) => {
  try {
    const response = await Axios.post(
      URL,
      JSON.stringify({
        query: request.text,
        variables
      }),
      {
        timeout: 15000,
      },
    );
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch {
    return null;
  }
}