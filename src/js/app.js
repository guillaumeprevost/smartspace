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
        
        
        listingTemplate.find('.panel-default img').attr('data-target', '#modalListing' + data[i].id);
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


    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();     

  },

  initContract: function() {
    /*
     * Replace me...
     */
    $.getJSON('Espace.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var EspaceArtifact = data;
      App.contracts.Espace = TruffleContract(EspaceArtifact);
    
      // Set the provider for our contract
      App.contracts.Espace.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      return App.markBooked();
    });    

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-book', App.handleBooking);
  },

  markBooked: function(bookings, account) {
    /*
     * Replace me...
     */
    var espaceInstance;

    
    App.contracts.Espace.deployed().then(function(instance) {
      espaceInstance = instance;
    
      return espaceInstance.getBookings.call();
    }).then(function(bookings) {
      console.log(bookings);
          //console.log(bookings[i]);
          //console.log('found');

          var myAccount=null;
          web3.eth.getAccounts(function(error, accounts) {
            if (error) {
              console.log(error);
            }                     
            myAccount= accounts[0];       
            
            for (z = 0; z < bookings.length - 1; z++) {
              if (bookings[z] !== '0x0000000000000000000000000000000000000000') {
                //console.log(z); 
                //console.log(bookings[z]); 
                //console.log(myAccount); 
                if (bookings[z] ==  myAccount) 
                {
                  //console.log('it was booked by me');
                  //console.log($('#panel'+ z + ' button'));
                  /*$('#panel'+ z + ' button').on('click', function(event) {
                    event.preventDefault();
                    document.location.href = 'booking.html?id=' + z;
                  });*/

                  $('#panel'+ z).find('a.btn-book')
                  .unbind("click")
                  .text('View Booking')
                  .addClass('btn-success')
                  .removeClass('btn-book')
                  .attr('href', 'booking.html?id=' + z);
                }
              }
              }
            });
      
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleBooking: function (event) {
    event.preventDefault();

    var listingId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */

    var espaceInstance;
    
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

          
      var account = accounts[0];

      
   
    
    
      App.contracts.Espace.deployed().then(function(instance) {
        espaceInstance = instance;

    
        var amount = web3.toWei(1, "ether")    
        espaceInstance.doBooking(listingId, {from: account, value: amount});//,value: web3.toWei(1, 'ether')});
        
        

      }).then(function(result) {
        //window.location.href = "booking.html?id="+ listingId;
        return App.markBooked();
      }).catch(function(err) {
        console.log(err.message);
      });
    });     
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
