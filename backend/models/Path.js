const { Schema, model } = require('mongoose');


const pathSchema = new Schema(
  {
    title: String,
    description: String,
    shortDesc: String,
    isFav: {
      type: Boolean,
      default:false
    },
    progress: {
      type: Number,
      default: 0
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced']
  },
    category: {
        type: String,
        enum: ['Web Dev', 'Ux/Ui', 'Dev Ops', 'Data Science', 'Cyber Security']
    },
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

module.exports = model('Path', pathSchema);
