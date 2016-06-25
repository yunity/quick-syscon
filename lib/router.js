Router.configure({
  layoutTemplate: 'mainLayout',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    header: {
      to: 'header'
    },
    footer: {
      to: 'footer'
    }
  }
});

Meteor.startup(function() {
  Router.route('/', function() {
    Router.go('/topics');
  });
});

Router.route('topics', function(){
  this.render('topics');
});
Router.route('topicCreate', function(){
  this.render('topicCreate');
});
Router.route('topicEdit', function(){
  this.render('topicEdit');
});
Router.route('topicVote', function(){
  this.render('topicVote');
});
Router.route('topicQuickResult', function(){
  this.render('topicQuickResult');
});
//
//
// Router.route('proposal', {
//   path: '/proposal/:_id',
//   template: 'proposal',
//   controller: BaseController,
//   data: function() {
//     return {
//       doc: Proposals.findOne({_id: this.params._id})
//     };
//   }
// });