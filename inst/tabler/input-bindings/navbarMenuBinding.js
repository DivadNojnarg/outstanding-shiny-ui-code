$(function() {
  // Input binding
  let navbarMenuBinding = new Shiny.InputBinding();
  $.extend(navbarMenuBinding, {
    find: function(scope) {
      return $(scope).find('.navbar-nav');
    },
    initialize: function(el) {
      let menuId = '#' + $(el).attr('id');
      let activeTab = $(`${menuId} .nav-link.active`);
      // if multiple items are found
      if (activeTab.length > 0) {
        let tabId = $(activeTab).attr('data-value');
        $(activeTab).tab('show');
        $(`#${tabId}`).addClass('show active');
      } else {
        $(`${menuId} .nav-link`)
        .first()
        .tab('show');
      }
    },
    // Given the DOM element for the input, return the value
    getValue: function(el) {
      let activeTab = $(el).find('a').filter('.nav-link.active');
      return $(activeTab).attr('data-value');
    },
    setValue: function(el, value) {
      let hrefVal = '#' + value;
      let menuId = $(el).attr('id');
      $(`#${menuId} a[data-target="${hrefVal}"]`).tab('show');
    },
    receiveMessage: function(el, data) {
      this.setValue(el, data);
    },
    subscribe: function(el, callback) {
      $(el).on('shown.bs.tab.navbarMenuBinding', function(event) {
        callback();
      });
    },
    unsubscribe: function(el) {
      $(el).off('.navbarMenuBinding');
    }
  });

  Shiny.inputBindings.register(navbarMenuBinding, 'navbar-menu');
});
