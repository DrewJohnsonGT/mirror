import { type NextApiRequest, type NextApiResponse } from 'next';

const LATITUDE = '39.329239';
const LONGITUDE = '-82.101257';
const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';

const generateOpenWeatherEndpoint = () =>
  WEATHER_ENDPOINT +
  `?lon=${LONGITUDE}&lat=${LATITUDE}&units=imperial&exclude=hourly,minutely&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;

// eslint-disable-next-line import/no-default-export
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const apiEndpoint = generateOpenWeatherEndpoint();
    await fetch(apiEndpoint)
      .then(async (res) => await res.json())
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((e) => {
        console.log('ERROR FETCHING WEATHER');
        console.error(e);
        res.status(500).json({ error: e });
      });
  }
}
