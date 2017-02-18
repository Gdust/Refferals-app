Template.commentItem.helpers({
  submittedText: function() {
    return this.submitted.toString();
  },
  momentDate: function() {
  	return moment().format('MMMM Do YYYY, h:mm:ss a');
  }
});