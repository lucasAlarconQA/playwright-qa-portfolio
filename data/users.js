const { randomEmail, randomName } = require('../utils/helpers');

function buildRandomUser() {
  return {
    name: randomName(),
    email: randomEmail(),
    password: 'Test1234!',
    firstName: 'QA',
    lastName: 'Tester',
    address: '123 Test Street',
    state: 'Test State',
    city: 'Test City',
    zipcode: '00000',
    mobileNumber: '5555555555',
    country: 'United States',
    day: '10',
    month: '5',
    year: '1995',
  };
}

const invalidCredentials = {
  email: 'not-a-real-user@example.com',
  password: 'wrongpassword123',
};

module.exports = { buildRandomUser, invalidCredentials };
