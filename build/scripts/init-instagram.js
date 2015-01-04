(function() {
  setTimeout((function() {
    var feed, loadButton;
    loadButton = document.getElementById('load-more');
    feed = new Instafeed({
      get: 'user',
      userId: 522307946,
      accessToken: '522307946.467ede5.101cf0f1132f4e868b24b048ca3abbfc',
      clientId: '7c97ccb1c4ca488f891827d57e2fd1fe',
      template: '<a href="{{link}}"><img src="{{image}}" title="View on Instagram" /></a>',
      limit: 2,
      resolution: 'standard_resolution',
      after: function() {
        if (!this.hasNext()) {
          return loadButton.style.display = 'none';
        }
      }
    });
    loadButton.addEventListener('click', function() {
      return feed.next();
    });
    return feed.run();
  }), 0);

}).call(this);
