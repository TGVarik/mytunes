// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
  // your code here!
  //tagName: 'li',

  template: _.template('<%= title %> - <%= artist %>'),

  events: {
    'click': function() {
      this.model.dequeue();
    }
  },

  render: function(){
    console.log('rendered');
    var song = this.model.toJSON();
    var html = this.template(song);
    this.$el.append(html);
    //return this.$el.html(this.template(this.model.attributes));
  }
});
