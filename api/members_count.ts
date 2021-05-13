import { Handler } from "@netlify/functions";
import axios from 'axios';

const handler: Handler = async (event, context) => {
  let count = 0;
  axios.defaults.headers.get['csrf-token'] = 'cbeacf40-4612-4a68-a866-c4288b5aa287';
  await axios.get('https://api.meetup.com/Ladies-of-Code-Paris?').then((response) => {
    console.log(response.data.members);
    count = response.data.members;
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Stored members count ' + count}),
  };
};

export { handler };