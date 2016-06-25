Template.topics.helpers({
  topics: () => Topics.find({}, {sort: {'dateCreated': -1}}),
  // votes: function() {
  //   return Votes.find({proposalId: this._id}).count();
  // },
  sinceCreated: function() {
    return moment(this.dateCreated).fromNow();
  }
});

Template.topics.events({
  'click .create.button': function() {
    Router.go('topicCreate');
  },
  'click .card .edit.item': function(e) {
    Session.set('editTopic', this._id);
    Router.go('topicEdit');
    return false;
  },
  'click .card .delete.item': function(e) {
    // Meteor.call('notify', 'serverMessage:' , "ABC", "T", {
    //         userCloseable: true,
    //         timeout: 10
    //       });
    if (confirm('Are you sure you want to delete this topic?')) {
      Topics.remove(this._id);
    }
    return false;
  },
  'click .topics .ui.card': function(e, template) {
    // open decision view

    if ($(e.target).parent('a.item').length === 0 && !$(e.target).is('a.item')) {
      Router.go('topics', {_id: this._id});
      return false;
    }
  },
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
  }
});
