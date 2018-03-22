const RootInsuranceAPI = require('./')

const client = new RootInsuranceAPI({
  env: 'sandbox',
  key: process.env.ROOT_API_KEY
})

client.getGadgets().then(console.log).catch(console.error)
client.generateGadgetQuote('Redmi 3 32GB LTE - Gold').then(console.log).catch(console.error)
client.generateFuneralQuote({coverAmount: 15000}).then(console.log).catch(console.error)

client
  .generateLifeQuote({
    coverAmount: 1000000,
    coverPeriod: '1_year',
    smoker: false,
    monthyBasicIncome: 15000,
    educationStatus: 'diploma_or_btech',
    gender: 'female',
    age: 26
  })
  .then(console.log)
  .catch(console.error)

client.createPolicyholder({
  idNumber: '3703264836087',
  firstName: 'Tiaan',
  lastName: 'du Plessis',
  email: 'tiaanduplessis@hotmail.com',
  data: {
    hobbies: ['eating']
  }
})
  .then(console.log)
  .catch(console.error)
