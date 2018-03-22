<div align="center">
    <img width="20%" src="logo.jpg" alt="logo">
</div>

# root-insurance-api (WIP)

[![package version](https://img.shields.io/npm/v/root-insurance-api.svg?style=flat-square)](https://npmjs.org/package/root-insurance-api)
[![package downloads](https://img.shields.io/npm/dm/root-insurance-api.svg?style=flat-square)](https://npmjs.org/package/root-insurance-api)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/root-insurance-api.svg?style=flat-square)](https://npmjs.org/package/root-insurance-api)
[![make a pull request](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> Wrapper for Root's insurance API

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)
-   [API](#api)
-   [Contribute](#contribute)
-   [License](#License)

## Install

This project uses [node](https://nodejs.org) and [npm](https://www.npmjs.com). 

```sh
$ npm installl root-insurance-api
$ # OR
$ yarn add root-insurance-api
```

## Usage

```js
const RootInsuranceAPI = require('./')

const client = new RootInsuranceAPI({
    env: 'sandbox',
    key: process.env.ROOT_API_KEY
})

client.getGadgets().then(console.log).catch(console.error)

client.generateGadgetQuote('Redmi 3 32GB LTE - Gold').then(console.log).catch(console.error)

client.generateFuneralQuote({coverAmount: 15000}).then(console.log).catch(console.error)

client.generateLifeQuote({
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
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [getGadgets](#getgadgets)
-   [generateGadgetQuote](#generategadgetquote)
-   [generateFuneralQuote](#generatefuneralquote)
-   [generateLifeQuote](#generatelifequote)
-   [createPolicyholder](#createpolicyholder)
-   [createGadgetApplication](#creategadgetapplication)
-   [createFuneralApplication](#createfuneralapplication)
-   [createLifeApplication](#createlifeapplication)
-   [issuePolicy](#issuepolicy)

### getGadgets

Get supported model names.

**Parameters**

-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config additional request configuration (optional, default `{}`)

**Examples**

```javascript
client.getGadgets().then(console.log).catch(console.error)
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### generateGadgetQuote

Generate quote for chosen device make and model.

**Parameters**

-   `modelName` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** device make and model, (optional, default `''`)
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config additional request configuration (optional, default `{}`)

**Examples**

```javascript
client.generateGadgetQuote('Redmi 3 32GB LTE - Gold').then(console.log).catch(console.error)
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### generateFuneralQuote

Generate a quote for funeral cover.

**Parameters**

-   `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** options for generated funeral quote (optional, default `{}`)
    -   `opts.coverAmount` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** amount to cover in cents (R10 000 and R50 000, inclusive)
    -   `opts.hasSpouse` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** should a spouse also be covered
    -   `opts.children` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of children
    -   `opts.extendedFamilyAges` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** ages of extended family members to cover
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config additional request configuration (optional, default `{}`)

**Examples**

```javascript
client.generateFuneralQuote({coverAmount: 15000}).then(console.log).catch(console.error)
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### generateLifeQuote

Generate a quote for life term cover that is only valid for a certain period of time.

**Parameters**

-   `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** options for generating life term quote (optional, default `{}`)
    -   `opts.coverAmount` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** amount to cover in cents (between R100 000 and R5 000 000, inclusive)
    -   `opts.coverPeriod` **Stirng** duration to cover (`1_year`, `2_years`, `5_years`, `10_years`, `15_years`, `20_years` or `whole_life`)
    -   `opts.monthyBasicIncome` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** policyholder's basic monthly income in cents
    -   `opts.educationStatus` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** policyholder’s education class (`grade_12_no_matric`, `grade_12_matric`, `diploma_or_btech`, `undergraduate_degree` or `professional_degree`)
    -   `opts.smoker` **[Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** is the policyholder a smoker
    -   `opts.gender` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** gender of policyholder (`male` or `female`)
    -   `opts.age` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** age of policyholder (between 18 and 63, inclusive)
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config additional request configuration (optional, default `{}`)

**Examples**

```javascript
client.generateLifeQuote({
 coverAmount: 1000000,
 coverPeriod: '1_year',
 smoker: false,
 monthyBasicIncome: 15000,
 educationStatus: 'diploma_or_btech',
 gender: 'female',
 age: 26
 }).then(console.log).catch(res => console.log(res.response.data))
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### createPolicyholder

Create a policyholder.

**Parameters**

-   `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** options for creating a policyholder (optional, default `{}`)
    -   `opts.idType` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** either `id` or `passport` (default `id`)
    -   `opts.idNumber` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** either ID or passport number
    -   `opts.idCountry` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** a ISO Alpha-2 country code (default `ZA`)
    -   `opts.firstName` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** policyholder's legal first name
    -   `opts.lastName` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** policyholder's legal last name
    -   `opts.dateOfBirth` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** policyholder's date of birth in the format `YYYYMMDD` (optional if type `id`)
    -   `opts.email` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** policyholder's contact email address (optional)
    -   `opts.cellphoneNumber` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** policyholder's cellphone number
    -   `opts.cellphoneCountry` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** policyholder's cellphone number's ISO Alpha-2 country code (default `ZA`)
    -   `opts.data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** object containing additional custom data for the policyholder
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config additional request configuration (optional, default `{}`)

**Examples**

```javascript
client.createPolicyholder({
 idNumber: '3703264836087',
 firstName: 'Tiaan',
 lastName: 'du Plessis',
 email: 'tiaanduplessis@hotmail.com',
 data: {
     hobbies: ['eating']
 }
}).then(console.log).catch(console.log)
```

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### createGadgetApplication

Create application for gadget.

**Parameters**

-   `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** options for creating gadget application (optional, default `{}`)
    -   `opts.packageId` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ID of quote package retrieved
    -   `opts.policyholderId` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ID of the policyholder that is applying
    -   `opts.monthlyPremium` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** premium amount, in cents, to write on policy
    -   `opts.serial` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** device to insure's serial number
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config additional request configuration (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### createFuneralApplication

Create a funeral application.

**Parameters**

-   `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** options for creating funeral applicaiton (optional, default `{}`)
    -   `opts.packageId` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ID of quote package retrieved
    -   `opts.policyholderId` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ID of the policyholder that is applying
    -   `opts.monthlyPremium` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** premium amount, in cents, to write on policy
    -   `opts.spouseId` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** SA ID number of the policyholder's spouse. Required if `hasSpouse` is true on the quote
    -   `opts.childrenIds` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** SA ID numbers of the policyholder's children. Required if `children` is greater than 0 on the quote
    -   `opts.extendedFamilyIds` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** SA ID numbers of the policyholder's extended family members. Required if the length of `extendedFamilyAges` is greater than 0 on the quote
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config additional request configuration (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### createLifeApplication

Create a life term application.

**Parameters**

-   `opts` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** options for creating life term application (optional, default `{}`)
    -   `opts.packageId` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ID of quote package retrieved
    -   `opts.policyholderId` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ID of the policyholder that is applying
    -   `opts.monthlyPremium` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** premium amount, in cents, to write on policy
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config additional request configuration (optional, default `{}`)

Returns **any** [Promise]

### issuePolicy

Issue a policy

**Parameters**

-   `opts` **([Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))** options for issuing policy or `applicationID` (optional, default `{}`)
    -   `opts.applicationId` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ID of created application
    -   `opts.data` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** an object containing additional custom data for the policy.
-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** config additional request configuration (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

## Contribute

1.  Fork it and create your feature branch: git checkout -b my-new-feature
2.  Commit your changes: git commit -am 'Add some feature'
    3.Push to the branch: git push origin my-new-feature 
3.  Submit a pull request

## License

MIT
    