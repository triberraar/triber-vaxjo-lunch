window.matchMedia = window.matchMedia || function() {
  console.log('sdf');
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};