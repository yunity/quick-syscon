// on startup we publish all collections - // Meteor.startup() runs AFTER this code!
Meteor.publish("proposals", () => {
  return Proposals.find();
});
Meteor.publish("votes", () => {
  return Votes.find();
});