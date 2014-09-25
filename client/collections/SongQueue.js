// SongQueue.js - Defines a backbone model class for the song queue.
window.SongQueue = window.Songs.extend({
  initialize: function(params){
    this.on('add', function() {
      if (this.length === 1) {
        this.playFirst();
      }
    }, this);

    this.on('remove', function() {
      if (this.length > 0) {
        this.playFirst();
      }
    }, this);

    this.on('dequeue', function(song) {
      this.remove(song);
    }, this);

    this.on('ended', function(song) {
      song.set('playCount', song.get('playCount') + 1 );
      this.remove(song);
      localStorage.setItem(song.attributes.title, JSON.stringify(song.attributes));
    }, this);
  },
  playFirst: function() {
    this.at(0).play();
  }
});
