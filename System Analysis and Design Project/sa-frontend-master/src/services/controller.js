import axios from 'axios'

// END POINT
// 'https://repair-invoice-system-api.herokuapp.com'
// 'http://localhost:9000'
const SERVER_URL = 'http://localhost:9000'

const instance = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000
})

export default {
    getTool: () => instance.get('tool/name', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    getToolType: () => instance.get('tool/type', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    getBrand: () => instance.get('computer/brand', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    getComputerType: () => instance.get('computer/type', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    loginCustomer: (data) => instance.post('customer/login', {
        email: data.email,
        password: data.password
    }),

    // incomplete
    register: (data) => instance.post('customer/register', {
        ...data
    }),

    findRequestAll: () => instance.get('request/menu', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    findRequestById: (id) => instance.get('request/menu/' + id, {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    findRequestByCustomer: (id) => instance.get('request/customer/' + id, {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    addRequest: (data) => instance.post('request/repair/' + data.tools, {
        brand: data.brand,
        computerType: data.computerType,
        email: data.email,
        phone: data.phone,
        symptom: data.symptom,
        customer: data.customer,
        sentDate: data.sentDate
    }),

    findByRequest: (data) => instance.get('tool/request/' + data, {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),
    // -------------------------------------------------------------------------- 

    newEvaluation: (data) => instance.post('evaluation/' + data.request + '/' + data.repairman + '/' + data.satisfaction, {
        suggestion: data.suggestion
    }),

    getSatisfaction: () => instance.get('satisfaction', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    getRepairman: () => instance.get('repairman/member', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    // --------------------------------------------------------------------------

    getGender: () => instance.get('gender', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    getCustomerType: () => instance.get('customertype', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    getProvince: () => instance.get('province', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),
    // ------------------------------------------------------------

    getExpertise: () => instance.get('expertise/expert', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    getPosition: () => instance.get('position', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    addRepairman: (data) => instance.post('repairman/register', {
        ...data
    }),

    // ------------------------------------------------------------------
    addPayment: (data) => instance.post(`payment/${data.paymentType}/${data.request}/${data.repairman}`, {
        fee: data.fee
    }),

    getAllPaymentType: () => instance.get('payment/type', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),
    // ------------------------------------------------------------------
    getAllProductReceiveTypes: () => instance.get('product', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    getCancelationCauses: () => instance.get('cause', {
        transformResponse: (response) => {
            return JSON.parse(response)
        }
    }),

    addCancelRepair: (data) => instance.post(`cancel/${data.request}/${data.cancelationCause}/${data.productReceive}/${data.customerId}`),
}