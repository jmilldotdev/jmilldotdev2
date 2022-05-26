import axios from 'axios';

const subscribeEndpoint = async (req, res) => {
  const { email } = req.body;
  const CONVERTKIT_NEWSLETTER_FORM_ID =
    process.env.CONVERTKIT_NEWSLETTER_FORM_ID;
  const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
  const API_ROUTE = `https://api.convertkit.com/v3/forms/${CONVERTKIT_NEWSLETTER_FORM_ID}/subscribe`;

  const data = {
    email,
    api_key: CONVERTKIT_API_KEY,
  };
  const r = await axios.post(API_ROUTE, data);
  res.status(200).json(r.data);
};

export default subscribeEndpoint;
