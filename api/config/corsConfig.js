const whitelist = [
  'http://localhost:3000',
  'http://localhost:5001',
  'https://balanh-ecommerce-m86o.vercel.app',
  'https://admin-balanh-ecommerce.vercel.app'
]

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};

export default corsOptions;