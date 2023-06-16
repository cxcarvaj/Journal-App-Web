import 'isomorphic-fetch';
import { config } from 'dotenv';

config({ path: '.env.test' });

jest.mock('./src/helpers/getEnvironmentVariables', () => ({
  getEnvironmentVariables: () => ({ ...process.env })
}));
