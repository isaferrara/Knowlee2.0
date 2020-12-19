const { Schema, model } = require('mongoose');


const suscriptionSchema = new Schema(
  {
    suscribers:
    [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    suscriptions:
    [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
},
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Suscription', suscriptionSchema);

