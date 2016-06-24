Topics = new Mongo.Collection('topics');

let schema = new SimpleSchema({
  text: {
    type: String,
    max: 500
  },
  dateCreated: {
    type: Date,
    optional: true
  },
  duration: {
    type: Number,
    min: 1,
    max: 24
  }
});

Topics.attachSchema(schema);
Topics.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Topics.before.insert(function(userId, doc) {
  doc.dateCreated = new Date();
});