// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.CollectionView.extend({

  $el: $('ul'),

  selectable : true,
  sortable : true,
  modelView: SongQueueEntryView,
  //collection: this.collection,

  // initialize: function() {
  //   this.render();
  //   this.collection.on('add remove', function() {
  //     this.render();
  //   }, this);
  //   if (this.collection.length > 0) {
  //     // this.collection.playFirst();
  //   }
  // },

  // render: function(){
  //   // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
  //   // see http://api.jquery.com/detach/
  //   this.$el.children().detach();

  //   this.$el.append(
  //     this.collection.map(function(song) {
  //      return new SongQueueEntryView( {model: song} ).render();
  //     })
  //   );
  // }

});


// var collectionView = new Backbone.CollectionView( {
//   el : $( "ul#demoSortableList" ),
//   selectable : true,
//   sortable : true,
//   collection : employeeCollection,
//   modelView : EmployeeView
// } );
