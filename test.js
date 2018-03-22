const generateID = require('sa-id-gen')

const RootInsuranceAPI = require('./')

const client = new RootInsuranceAPI({
  env: 'sandbox',
  key: process.env.ROOT_API_KEY
})

test('should be defined', () => {
  expect(typeof RootInsuranceAPI).toBe('function')
})

test('should retreive list of supported gadget models', async () => {
  const result = await client.getGadgets()
  expect(Array.isArray(result)).toBeTruthy()
  expect(result.length > 0).toBeTruthy()
})

test('should generate quotes', async () => {
  const gadget = await client.generateGadgetQuote('Redmi 3 32GB LTE - Gold')
  const funeral = await client.generateFuneralQuote({coverAmount: 15000})

  expect(Array.isArray(gadget)).toBeTruthy()
  expect(gadget.length > 0).toBeTruthy()

  expect(Array.isArray(funeral)).toBeTruthy()
  expect(funeral.length > 0).toBeTruthy()
})

test('should create a policyholder', async () => {
  const policyholder = await client.createPolicyholder({
    idNumber: generateID(),
    firstName: 'Test',
    lastName: 'User'
  })

  expect(typeof policyholder === 'object').toBeTruthy()
  expect(policyholder.policyholder_id).toBeDefined()
})
