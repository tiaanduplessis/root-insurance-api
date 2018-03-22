const axios = require('axios')

class RootInsuranceAPI {
    constructor(opts = {}) {
        const { env = 'api', version = 'v1', key = '', rawResponse = false } = opts

        this.rawResponse = rawResponse
        this._req = axios.create({
            baseURL: `https://${env}.root.co.za/${version}/insurance`,
            auth: {
                username: key,
                password: ''
            }
        })
    }

    /**
     * Get supported model names.
     * @param {Object=} [config={}] config additional request configuration
     *
     * @returns {Promise}
     *
     * @example
     * client.getGadgets().then(console.log).catch(console.error)
     */
    getGadgets(config = {}) {
        return this._req
            .get('modules/root_gadgets/models', config)
            .then(this._processResponse.bind(this))
    }

    /**
     * Generate quote for chosen device make and model.
     *
     * @param {String} modelName device make and model,
     * @param {Object=} [config={}] config additional request configuration
     *
     * @returns {Promise}
     *
     * @example
     * client.generateGadgetQuote('Redmi 3 32GB LTE - Gold').then(console.log).catch(console.error)
     */
    generateGadgetQuote(modelName = '', config = {}) {
        if (!modelName || typeof modelName !== 'string') {
            return Promise.reject(new Error('RootInsuranceAPI: Please provide valid model name.'))
        }

        return this._req
            .post('quotes', { type: 'root_gadgets', model_name: modelName }, config)
            .then(this._processResponse.bind(this))
    }

    /**
     * Generate a quote for funeral cover.
     *
     * @param {Object} opts options for generated funeral quote
     * @param {Number} opts.coverAmount amount to cover in cents (R10 000 and R50 000, inclusive)
     * @param {Boolean} opts.hasSpouse should a spouse also be covered
     * @param {Number} opts.children number of children
     * @param {Array} opts.extendedFamilyAges ages of extended family members to cover
     * @param {Object=} [config={}] config additional request configuration
     *
     * @returns {Promise}
     *
     * @example
     * client.generateFuneralQuote({coverAmount: 15000}).then(console.log).catch(console.error)
     */
    generateFuneralQuote(opts = {}, config = {}) {
        const body = {
            type: 'root_funeral',
            cover_amount: opts.coverAmount || 0,
            has_spouse: opts.hasSpouse || false,
            number_of_children: opts.number_of_children || 0,
            extended_family_ages: opts.extendedFamilyAges || []
        }

        return this._req.post('quotes', body, config).then(this._processResponse.bind(this))
    }

    /**
     * Generate a quote for life term cover that is only valid for a certain period of time.
     *
     * @param {Object} opts options for generating life term quote
     * @param {Number} opts.coverAmount amount to cover in cents (between R100 000 and R5 000 000, inclusive)
     * @param {Stirng} opts.coverPeriod duration to cover (`1_year`, `2_years`, `5_years`, `10_years`, `15_years`, `20_years` or `whole_life`)
     * @param {Number} opts.monthyBasicIncome policyholder's basic monthly income in cents
     * @param {String} opts.educationStatus policyholder’s education class (`grade_12_no_matric`, `grade_12_matric`, `diploma_or_btech`, `undergraduate_degree` or `professional_degree`)
     * @param {Boolean} opts.smoker is the policyholder a smoker
     * @param {String} opts.gender gender of policyholder (`male` or `female`)
     * @param {String} opts.age age of policyholder (between 18 and 63, inclusive)
     * @param {Object=} [config={}] config additional request configuration
     *
     * @returns {Promise}
     *
     * @example
     * client.generateLifeQuote({
     *  coverAmount: 1000000,
     *  coverPeriod: '1_year',
     *  smoker: false,
     *  monthyBasicIncome: 15000,
     *  educationStatus: 'diploma_or_btech',
     *  gender: 'female',
     *  age: 26
     *  }).then(console.log).catch(res => console.log(res.response.data))
     */
    generateLifeQuote(opts = {}, config = {}) {
        const body = {
            type: 'root_term',
            cover_amount: opts.coverAmount || 0,
            cover_period: opts.coverPeriod || 'whole_life',
            basic_income_per_month: opts.monthyBasicIncome || 0,
            education_status: opts.educationStatus || 'grade_12_no_matric',
            smoker: opts.smoker || false,
            gender: opts.gender || '',
            age: opts.age || 0
        }

        return this._req.post('quotes', body, config).then(this._processResponse.bind(this))
    }

    /**
     * Create a policyholder.
     * 
     * @param {Object} opts options for creating a policyholder
     * @param {String} opts.idType either `id` or `passport` (default `id`)
     * @param {String} opts.idNumber either ID or passport number
     * @param {String} opts.idCountry a ISO Alpha-2 country code (default `ZA`)
     * @param {String} opts.firstName policyholder's legal first name
     * @param {String} opts.lastName policyholder's legal last name
     * @param {String} opts.dateOfBirth policyholder's date of birth in the format `YYYYMMDD` (optional if type `id`)
     * @param {String} opts.email policyholder's contact email address (optional)
     * @param {String} opts.cellphoneNumber policyholder's cellphone number
     * @param {String} opts.cellphoneCountry policyholder's cellphone number's ISO Alpha-2 country code (default `ZA`)
     * @param {Object} opts.data object containing additional custom data for the policyholder
     * @param {Object=} [config={}] config additional request configuration
     *
     * @returns {Promise}
     *
     * @example
     * client.createPolicyholder({
     *  idNumber: '3703264836087',
     *  firstName: 'Tiaan',
     *  lastName: 'du Plessis',
     *  email: 'tiaanduplessis@hotmail.com',
     *  data: {
     *      hobbies: ['eating']
     *  }
     * }).then(console.log).catch(console.log)
     *
     */
    createPolicyholder(opts = {}, config = {}) {
        let body = {
            id: {
                type: opts.idType || 'id',
                number: opts.idNumber || '',
                country: opts.idCountry || 'ZA'
            },
            first_name: opts.firstName,
            last_name: opts.lastName
        }

        if (opts.dateOfBirth) {
            body.date_of_birth = opts.dateOfBirth
        }

        if (opts.email) {
            body.email = opts.email
        }

        if (opts.cellphoneNumber && opts.cellphoneCountry) {
            body.cellphone = {
                number: opts.cellphoneNumber,
                country: opts.cellphoneCountry || 'ZA'
            }
        }

        if (opts.data && typeof opts.data === 'object') {
            body.app_data = opts.data
        }

        return this._req.post('policyholders', body, config).then(this._processResponse.bind(this))
    }

    /**
     * Create application for gadget.
     * 
     * @param {Object} opts options for creating gadget application
     * @param {String} opts.packageId ID of quote package retrieved
     * @param {String} opts.policyholderId ID of the policyholder that is applying
     * @param {Number} opts.monthlyPremium premium amount, in cents, to write on policy
     * @param {String} opts.serial device to insure's serial number
     * @param {Object=} [config={}] config additional request configuration
     * 
     * @returns {Promise}
     */
    createGadgetApplication(opts = {}, config = {}) {
        const body = {
            quote_package_id: opts.packageId,
            policyholder_id: opts.policyholderId,
            monthly_premium: opts.monthlyPremium || 0,
            serial_number: opts.serial
        }

        return this._req.post('applications', body, config).then(this._processResponse.bind(this))
    }

    /**
     * Create a funeral application.
     * 
     * @param {Object} opts options for creating funeral applicaiton
     * @param {String} opts.packageId ID of quote package retrieved
     * @param {String} opts.policyholderId ID of the policyholder that is applying
     * @param {Number} opts.monthlyPremium premium amount, in cents, to write on policy
     * @param {String} opts.spouseId SA ID number of the policyholder's spouse. Required if `hasSpouse` is true on the quote
     * @param {Array} opts.childrenIds SA ID numbers of the policyholder's children. Required if `children` is greater than 0 on the quote
     * @param {Array} opts.extendedFamilyIds SA ID numbers of the policyholder's extended family members. Required if the length of `extendedFamilyAges` is greater than 0 on the quote
     * @param {Object=} [config={}] config additional request configuration
     *
     * @returns {Promise}
     */
    createFuneralApplication(opts = {}, config = {}) {
        const body = {
            quote_package_id: opts.packageId,
            policyholder_id: opts.policyholderId,
            monthly_premium: opts.monthlyPremium || 0,
        }

        if (opts.spouseId) {
            body.spouse_id = spouseId
        }

        if (opts.childrenIds && Array.isArray(opts.childrenIds)) {
            body.children_ids = opts.children_ids
        }

        if (opts.extendedFamilyIds && Array.isArray(opts.extendedFamilyIds)) {
            body.extended_famliy_ids = opts.extendedFamilyIds
        }

        return this._req.post('applications', body, config).then(this._processResponse.bind(this))
    }

    /**
     * Create a life term application.
     * 
     * @param {Object} opts options for creating life term application
     * @param {String} opts.packageId ID of quote package retrieved
     * @param {String} opts.policyholderId ID of the policyholder that is applying
     * @param {Number} opts.monthlyPremium premium amount, in cents, to write on policy
     * @param {Object=} [config={}] config additional request configuration
     * 
     * @returns [Promise]
     */
    createLifeApplication (opts = {}, config = {}) {

        const body = {
            quote_package_id: opts.packageId,
            policyholder_id: opts.policyholderId,
            monthly_premium: opts.monthlyPremium || 0,
        }

        return this._req.post('applications', body, config).then(this._processResponse.bind(this))
    }

    /**
     * Issue a policy
     * 
     * @param {Object|String} opts options for issuing policy or `applicationID`
     * @param {String} opts.applicationId ID of created application
     * @param {Object} opts.data an object containing additional custom data for the policy.
     * @param {Object=} [config={}] config additional request configuration
     * 
     * @returns {Promise}
     */
    issuePolicy (opts = {}, config = {}) {
        let body = {}

        if (typeof opts === 'string') {
            body.application_id = opts
        } else {
            body = {
                application_id: opts.applicationId,
                app_data: opts.data || {}
            }
        }

        return this._req.post('policies', body, config).then(this._processResponse.bind(this))
    }


    /**
     * @private
     * @param {Object} res response to process
     */
    _processResponse(res) {
        if (this.rawResponse) {
            return res
        }

        return res.data
    }
}

module.exports = RootInsuranceAPI