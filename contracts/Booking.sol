pragma solidity ^0.4.4;

contract Booking {
    /*address[16] public adopters;

    // Adopting a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId <= 15);

        adopters[petId] = msg.sender;

        return petId;
    }

    // Retrieving the adopters
    function getAdopters() public returns (address[16]) {
        return adopters;
    }*/


    struct ItemStruct {
        uint someNumber;
        string someString;
    }

    //ItemStruct[] theItems;
    mapping(address => ItemStruct[]) public items;

    function addItem(uint aNumber,  string aString) returns (bool success) {
        //ItemStruct memory someStruct = ItemStruct(aNumber, aString);
        //theItems.push(someStruct);
     
        items[msg.sender].push(ItemStruct({
            someNumber: aNumber,
            someString: aString
        }));  
        return true;      
    }    

  
}