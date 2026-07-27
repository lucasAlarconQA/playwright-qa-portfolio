function randomEmail() {
  return `qa.portfolio.${Date.now()}.${Math.floor(Math.random() * 10000)}@mailinator.com`;
}

function randomName() {
  return `QA Tester ${Date.now()}`;
}

module.exports = { randomEmail, randomName };
