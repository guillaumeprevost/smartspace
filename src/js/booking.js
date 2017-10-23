App = {
  spaceId: null,
  web3Provider: null,
  contracts: {},

  init: function(itemId) {
    spaceId = itemId;
    // Load listings.
    /*$.getJSON('../properties.json', function(data) {
      var listingsRow = $('#listingsRow');
      var listingTemplate = $('#listingTemplate');

      for (i = 0; i < data.length; i ++) {
        listingTemplate.find('.panel-title').text(data[i].title);
        listingTemplate.find('img').attr('src', data[i].picture);
        listingTemplate.find('.listing-type').text(data[i].type);
        listingTemplate.find('.listing-address').text(data[i].address);
        listingTemplate.find('.listing-surface').text(data[i].surface);
        listingTemplate.find('.btn-book').attr('data-id', data[i].id);

        listingsRow.append(listingTemplate.html());
      }
    });
*/
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
      //return App.markAdopted();
      return App.getHash();
    });        

  },

  getHash: function() {

    var espaceInstance;
    App.contracts.Espace.deployed().then(function(instance) {
      espaceInstance = instance;
    
      return espaceInstance.getBookings.call();
    }).then(function(bookings) {
      //console.log(bookings);
      //var spaceId = document.url.searchParams.get("id");
      var aHash = "";
      var myAccount = null;
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
        myAccount= accounts[0];                
      
        if (bookings[spaceId] ==  myAccount) {
            var QREncode = new QRious({
                  element: document.getElementById('qr'),
                  value: bookings[spaceId],
              size: 300
            });
        }
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    var url = new URL(window.location.href);
    var spaceId = url.searchParams.get("id");
    App.init(spaceId);
  });
});
