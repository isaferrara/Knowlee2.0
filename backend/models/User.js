const { Schema, model } = require('mongoose');
//const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    email: String,
    username: String,
    password: String,
    name: String,
    suscribers:[{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    image: {
      type: String,
      default: 'https://coa.pe/public/assets/img/default-user.png'
    },
  paths:
    [{
      type: Schema.Types.ObjectId,
      ref: 'Path'
    }],
  suscriptions:
  [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  favorites:
  [{
    type: Schema.Types.ObjectId,
    ref: 'Fav'
  }]
},
  {
    timestamps: true,
    versionKey: false
  }
);

//userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
