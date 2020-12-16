const { Schema, model } = require('mongoose');


const suscriptionSchema = new Schema(
  {
    users:
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

