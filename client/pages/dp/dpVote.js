Template.dpVote.helpers({
  title: function() {
    return Proposals.findOne({_id: Session.get("dpVote")}).title;
  },
  proposition: function() {
    return Proposals.findOne({_id: Session.get("dpVote")}).proposition;
  },
  noColor: function() {
    var p = Proposals.findOne({_id: Session.get("dpVote")});
    if (p.noRes && p.noRes.indexOf(Meteor.userId()) >= 0)
      return "no-resistance";
  },
  someColor: function() {
    var p = Proposals.findOne({_id: Session.get("dpVote")});
    if (p.someRes && p.someRes.indexOf(Meteor.userId()) >= 0)
      return "some-resistance";
  },
  hiColor: function() {
    var p = Proposals.findOne({_id: Session.get("dpVote")});
    if (p.hiRes && p.hiRes.indexOf(Meteor.userId()) >= 0)
      return "hi-resistance";
  }
});


Template.dpVote.events({
  "click .none": function(event, template){
    var proposal = Proposals.findOne({_id : Session.get('dpVote')});
    // Find and remove item from an array - from all 3 voting states
    var i = proposal.noRes.indexOf(Meteor.userId());
    if(i != -1) proposal.noRes.splice(i, 1);
    i = proposal.someRes.indexOf(Meteor.userId());
    if(i != -1) proposal.someRes.splice(i, 1);
    i = proposal.hiRes.indexOf(Meteor.userId());
    if(i != -1) proposal.hiRes.splice(i, 1);

    var noResUpdate = proposal.noRes;
    var someResUpdate = proposal.someRes;
    var hiResUpdate = proposal.hiRes;
    // add current user to noRes votes
    noResUpdate.push(Meteor.userId());
    Proposals.update({_id: proposal._id}, { $set: { noRes: noResUpdate, someRes: someResUpdate, hiRes: hiResUpdate } });

    if (proposalVotingComplete()) {
      console.log("all users voted on this prop");
    };
    if (allProposalsVotingComplete()) {
      Topics.update({_id : Session.get('dp')}, { $set: { votingState: "archive" } });
      Router.go('result');
      return false;
      console.log("all proposals have been voted on");
    };
    Router.go('dp');
  },
  "click .some": function(event, template){
    var proposal = Proposals.findOne({_id : Session.get('dpVote')});
    // Find and remove item from an array - from all 3 voting states
    var i = proposal.noRes.indexOf(Meteor.userId());
    if(i != -1) proposal.noRes.splice(i, 1);
    i = proposal.someRes.indexOf(Meteor.userId());
    if(i != -1) proposal.someRes.splice(i, 1);
    i = proposal.hiRes.indexOf(Meteor.userId());
    if(i != -1) proposal.hiRes.splice(i, 1);

    var noResUpdate = proposal.noRes;
    var someResUpdate = proposal.someRes;
    var hiResUpdate = proposal.hiRes;
    // add current user to noRes votes
    someResUpdate.push(Meteor.userId());
    Proposals.update({_id: proposal._id}, { $set: { noRes: noResUpdate, someRes: someResUpdate, hiRes: hiResUpdate } });

    if (proposalVotingComplete()) {
      console.log("prop complete");
    };
    if (allProposalsVotingComplete()) {
      Topics.update({_id : Session.get('dp')}, { $set: { votingState: "archive" } });
      Router.go('result');
      return false;
      console.log("all proposals have been voted on");
    };
      Router.go('dp');
  },
  "click .high": function(event, template){
    var proposal = Proposals.findOne({_id : Session.get('dpVote')});
    // Find and remove item from an array - from all 3 voting states
    var i = proposal.noRes.indexOf(Meteor.userId());
    if(i != -1) proposal.noRes.splice(i, 1);
    i = proposal.someRes.indexOf(Meteor.userId());
    if(i != -1) proposal.someRes.splice(i, 1);
    i = proposal.hiRes.indexOf(Meteor.userId());
    if(i != -1) proposal.hiRes.splice(i, 1);

    var noResUpdate = proposal.noRes;
    var someResUpdate = proposal.someRes;
    var hiResUpdate = proposal.hiRes;
    // add current user to noRes votes
    hiResUpdate.push(Meteor.userId());
    Proposals.update({_id: proposal._id}, { $set: { noRes: noResUpdate, someRes: someResUpdate, hiRes: hiResUpdate } });

    if (proposalVotingComplete()) {
      console.log("prop complete");
    };
    if (allProposalsVotingComplete()) {
      Topics.update({_id : Session.get('dp')}, { $set: { votingState: "archive" } });
      Router.go('result');
      return false;
      console.log("all proposals have been voted on");
    };
      Router.go('dp');
  }
});



function proposalVotingComplete() {
  var topic = Topics.findOne({_id: Session.get("dp")});
  var proposal = Proposals.findOne({_id : Session.get('dpVote')});

  // if the sum of no, some, hi proposal votes somes up all others then this proposal has received full votes
  return isSameSet(proposal.someRes.concat(proposal.hiRes.concat(proposal.noRes)), topic.votingUsers);
}

function allProposalsVotingComplete() {
  var topic = Topics.findOne({_id: Session.get("dp")});
  var proposals = Proposals.find({topicId : Session.get('dp')});

  var proposalVotingComplete = 0;
  proposals.forEach(function(p){
    if (isSameSet(p.someRes.concat(p.hiRes.concat(p.noRes)), topic.votingUsers)) {
      proposalVotingComplete += 1;
    };
  });
  return (proposalVotingComplete == proposals.count());
}

function isSameSet(arr1, arr2) {
  return  $(arr1).not(arr2).length === 0 && $(arr2).not(arr1).length === 0;
}

function alreadyVotedOnProposal(proposal) {
  return ((proposal.noRes.indexOf(Meteor.userId()) >= 0) || (proposal.someRes.indexOf(Meteor.userId()) >= 0)
  || (proposal.hiRes.indexOf(Meteor.userId()) >= 0));
}
