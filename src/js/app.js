App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load listings.
    $.getJSON('../properties.json', function(data) {
      var listingsRow = $('#listingsRow');
      var listingTemplate = $('#listingTemplate');

      for (i = 0; i < data.length; i ++) {
        listingTemplate.find('.panel-title').text(data[i].title);
        listingTemplate.find('img').attr('src', data[i].picture);
        listingTemplate.find('.listing-type').text(data[i].type);
        listingTemplate.find('.listing-address').text(data[i].address);
        listingTemplate.find('.listing-surface').text(data[i].surface);
        listingTemplate.find('.listing-price').text('ETH ' + data[i].price * 3600);
        listingTemplate.find('.listing-facilities').text(data[i].facilities);
        
        listingTemplate.find('.btn-book').attr('data-id', data[i].id);
        
        listingTemplate.find('.panel-default').attr('data-target', '#modalListing' + data[i].id);
        listingTemplate.find('.panel-default').attr('id', 'panel' + data[i].id);
        
        listingTemplate.find('.modal-listing').attr('id', 'modalListing' + data[i].id);
        listingTemplate.find('.modal-map').attr('id', "listingMap" + data[i].id);
        
        listingsRow.append(listingTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    /*
     * Replace me...
     */

    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-book', App.handleBooking);
  },

  markAdopted: function(adopters, account) {
    /*
     * Replace me...
     */
  },

  handleBooking: function() {
    event.preventDefault();

    var listingId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
	document.location.href = 'booking.html';
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
