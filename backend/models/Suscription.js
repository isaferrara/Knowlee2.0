const { Schema, model } = require('mongoose');


const suscriptionSchema = new Schema(
  {
    me: String, 
    user:
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    paths:
    [{
      type: Schema.Types.ObjectId,
      ref: 'Path'
    }]
},
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Suscription', suscriptionSchema);

