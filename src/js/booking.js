App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    // Load listings.
    $.getJSON('../properties.json', function (data) {
      var listingsRow = $('#listingsRow');
      var listingTemplate = $('#listingTemplate');

      for (i = 0; i < data.length; i++) {
        listingTemplate.find('.panel-title').text(data[i].title);
        listingTemplate.find('img').attr('src', data[i].picture);
        listingTemplate.find('.listing-type').text(data[i].type);
        listingTemplate.find('.listing-address').text(data[i].address);
        listingTemplate.find('.listing-surface').text(data[i].surface);
        listingTemplate.find('.btn-book').attr('data-id', data[i].id);

        listingsRow.append(listingTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function () {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
    
  },

  initContract: function () {
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
    });    

    return App.bindEvents();    


  },

  bindEvents: function () {
    $(document).on('click', '.btn-book', App.handleBooking);
  },

  markAdopted: function (adopters, account) {
    /*
     * Replace me...
     
    var espaceInstance;
    
    App.contracts.Espace.deployed().then(function(instance) {
      espaceInstance = instance;
    
      return espaceInstance.getSomething();
    }).then(function(something) {
      console.log(something);
      
    }).catch(function(err) {
      console.log(err.message);
    });    
    */
  },

  handleBooking: function () {
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
    
      var account = accounts[1];
    
      App.contracts.Espace.deployed().then(function(instance) {
        espaceInstance = instance;
    
        //working ok
        //        function addSpace(bytes32 theCode, bytes32 theType, bytes32 theName, bytes32 theLocation, uint theStart, uint thePrice,
          //      uint theEnd, bytes32 theFacilities, bytes32 thePhoto) returns (uint id) 
        //return espaceInstance.addSpace("1","Office", "50 Lonsdale", "50 Lonsdale St", 1, 10, 2, "10 desks", "WIP", {from: account});
        
        //var amount = web3.toWei("5", "ether") 


        //return espaceInstance.bookItem(1, {from: account, value: amount});
        return espaceInstance.doSomething(1, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });     
  }

};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
