const { Schema, model } = require('mongoose');


const favsSchema = new Schema(
  {
    paths:
    [{
      type: Schema.Types.ObjectId,
      ref: 'Path'
    }],
    topics:
    [{
      type: Schema.Types.ObjectId,
      ref: 'Topic'
    }],
    users:[
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]    
},
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = model('Fav', favsSchema);

