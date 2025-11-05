import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_bKExEZTKw',
      userPoolClientId: '7k180jqn0j334dp8qf2bn7l270',
      loginWith: {
        username: true,
      }
    }
  }
};

Amplify.configure(amplifyConfig);

export default amplifyConfig;
