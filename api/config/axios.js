const axios = require('axios')
require('dotenv').config()
const { DOG_API_KEY } = process.env

axios.defaults.headers.common['x-api-key'] = DOG_API_KEY
