import axios from 'axios';

const subscribeEndpoint = async (req, res) => {
  const { email } = req.body;
  const API_ROUTE = 'https://api.buttondown.email/v1/subscribers';
  const API_KEY = process.env.BUTTONDOWN_API_KEY;

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${API_KEY}`,
  };
  const data = await axios.post(API_ROUTE, { email }, { headers });
  res.status(200).json(data.data);
};

export default subscribeEndpoint;
