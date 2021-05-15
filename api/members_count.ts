import { Handler } from "@netlify/functions";
import axios from 'axios';
import insert from './db/insert';

const handler: Handler = async (event, context) => {
  let count = 0;
  axios.defaults.headers.get['csrf-token'] = process.env.MEETUP_TOKEN;
  await axios.get('https://api.meetup.com/Ladies-of-Code-Paris?').then((response) => {
    console.log(response.data.members);
    count = response.data.members;
  });
  console.log('inserting data');
  insert('members_count_history', { members: count, month: Date.now() });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Stored members count ' + count}),
  };
};

export { handler };