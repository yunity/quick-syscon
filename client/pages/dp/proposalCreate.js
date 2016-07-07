AutoForm.addHooks(['createProposal'],{
    before: {
        insert: function(doc) {
            console.log("insert");
            doc.topicId = Session.get("dp");
            doc.noRes = [];
            doc.someRes = [];
            doc.hiRes = [];
            return doc;
        }
    },
    onSuccess: function(formType, result) {
        console.log("onSuccess");
      Router.go('dp');
    }
});

Template.proposalCreate.events({
  "click .cancel": function(event, template){
      Router.go('dp');
  }
});
