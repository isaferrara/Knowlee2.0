const { Schema, model } = require('mongoose');


const pathSchema = new Schema(
  {
    title: String,
    unit_price: Number,
    quantity: Number, 
   currency_id: {
       type: String,
       default: 'MXN'
   }
},
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Path', pathSchema);