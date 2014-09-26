// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    var localStorageSongs = JSON.parse(localStorage.getItem('queuedSongs')) || [];
    var queuedSongs = [];

    localStorageSongs.forEach(function(val) {
      var ans = params.library.find(function(value) {
        return value.get('title') === val;
      });
      if (!!ans) {
        queuedSongs.push(ans);
      }
    });
    this.set('currentSong', new SongModel());
    if (queuedSongs.length > 0) {
      this.set('songQueue', new SongQueue(queuedSongs));
      this.set('currentSong', this.get('songQueue').at(0));
    } else {
      this.set('songQueue', new SongQueue());
    }
    // params.library.sync('read', params.library);
    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

    params.library.on('play', function(song){
      this.set('currentSong', song);
    }, this);
    params.library.on('enqueue', function(song) {
      this.get('songQueue').add(song);
      var queuedSongs = JSON.parse(localStorage.getItem('queuedSongs')) || [];
      if (queuedSongs.indexOf(song.get('title')) === -1) {
        queuedSongs.push(song.get('title'));
        queuedSongs = JSON.stringify(queuedSongs);
        localStorage.setItem('queuedSongs', queuedSongs);
      }
    }, this);
    params.library.on('dequeue ended', function(song) {
      this.get('songQueue').remove(song);
      var queuedSongs = JSON.parse(localStorage.getItem('queuedSongs'));
      queuedSongs.splice(queuedSongs.indexOf(song.get('title')), 1);
      queuedSongs = JSON.stringify(queuedSongs);

      localStorage.setItem('queuedSongs', queuedSongs);
    }, this);
    params.library.on('change:playCount', function(song) {
    });
  }
});
