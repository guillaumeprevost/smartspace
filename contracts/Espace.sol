pragma solidity ^0.4.4;

contract Espace {
    
/*
* PX commented out on sunday morning
    enum ItemTypes { House, MeetingRoom, Apartment, StorageCage }
    enum ItemStatus {Created, UnderReview, Posted, Booked, Cancelled}

    struct LogData {
        uint spaceId;
        address owner;
        bytes32 code; //move to log
        bytes32 itemType;  //move to log
        bytes32 name; //move to log
        bytes32 location; //move to log
        bytes32 itemFacilities; //move to log
        bytes32 photoUrl; //move to log
    }    

    struct SpaceStruct {
        uint spaceId;
        address owner;
        address renter;
        uint fromDatetime;
        uint toDatetime;
        uint itemPrice;
        bool itemBooked;
    }

    uint public spaceCount;

    SpaceStruct[] public spaces;
    //mapping(uint => SpaceStruct[]) public spaces;
    mapping (address => uint) balances;
*/
    address[16] public bookers;

  // Adopting a pet
    function doBooking(uint theId) payable returns (uint id) {
        require(theId >= 0 && theId <= 15);

        bookers[theId] = msg.sender;

        address receiver = 0x390ceab2be5d1e7d44d546a5767103c018467190;
        //receiver.transfer(10);
        //msg.sender.transfer(10);
        sendPayment(receiver,msg.value);

        return theId;
    }    

    // Retrieving the adopters
    function getBookings() public returns (address[16]) {
        return bookers;
    }    
/*
* PX commented out on sunday morning
    event SpaceCreated( uint spaceId,
        address owner,
        bytes32 code,
        bytes32 itemType,
        bytes32 name,
        bytes32 location,
        bytes32 itemFacilities,
        bytes32 photoUrl);

    function doSomething(uint something)
        returns (bool success)
        {
            return true;
        }

    function getSomething ()
        returns (string aString)
        {
            return "something";
        }

    function addSpace(bytes32 theCode, bytes32 theType, bytes32 theName, bytes32 theLocation, uint theStart, uint thePrice,
            uint theEnd, bytes32 theFacilities, bytes32 thePhoto) returns (uint id) 
    {
        uint theId = spaceCount;
            
        spaces.push(SpaceStruct({         
            spaceId : theId,
            owner : msg.sender,
            renter : 0x00,
            fromDatetime : theStart,
            toDatetime : theEnd,
            itemPrice : thePrice,
            itemBooked : false
        }));

        LogData (theId, msg.sender, theCode,theType, theName, theLocation, theFacilities, thePhoto);

        spaceCount++;
        return theId;      
        
    }   
*/     


/*
    function getItem(uint id)
        public returns (SpaceStruct space) 
    {   
        return spaces[id];
        //spaces[id].itemPrice = 1;
        //return true;
        //return "not working";
    }*/

/*
* PX commented out on sunday morning
    function bookItem(uint id) payable
         public returns (bool success) 
    {
        if (spaces[id].itemBooked == true)
            return false;
        
        spaces[id].itemBooked = true;
        spaces[id].renter = msg.sender;

        require(id >= 0 && id <= 15);

        bookers[id] = msg.sender;
        
        
        sendPayment(spaces[id].owner, spaces[id].itemPrice);
        return true;
                
    }    
*/
    //address public recipient;
    //mapping (address => uint) public balances;

    // Events allow light clients to react on
    // changes efficiently.
    event BookingPaid(address from, address to, uint amount );

    function sendPayment(address receiver, uint amount) payable {
       
        //msg.sender.transfer(amount); //need to figure out how to force it to send it to the poster
//        bool status = receiver.send(amount);
        
        /*msg.sender.transfer(amount);
        return BookingPaid(msg.sender, receiver, amount);*/
        //msg.sender.transfer(msg.value);
        receiver.transfer(amount);
        return BookingPaid(msg.sender, receiver, amount);
    }    
    
    // Retrieving the bookers
    function getBookers() public returns (address[16]) {
        return bookers;
    }    

      // Retrieving the items
    /*function getMyItemName(address myAddress) public returns (string) {
      //  return items[myAddress].photoUrl;   
      return "dummy";
    } */

/*
 struct VoterStruct {
    address voterAddress;
    uint256 tokensBought;
    mapping (bytes32 => uint256) tokensUsed;
    bytes32[] tokenIndex; // a list of mapping keys that exist for the voter
  }

  mapping (address => VoterStruct) public voterStructs;

  // client can discover how may tokens are in the list for one voter
function getVoterTokenCount(address voter) returns(uint tokenCount) {
    return voterStructs[voter].tokenIndex.length;}

// client can discover the tokenId for a voter in a given row
function getVoterTokenAtIndex(address voter, uint index) returns(bytes32 tokenId) {
    return tokenUsed[voter].tokenIndex[index];}

// client can discover token used by voter and tokenId
function getVoterTokenUsed(address voter, bytes32 tokenId) returns(uint tokensUsed) {
    return voterStructs[voter].tokenUsed[tokenId];}

// append keys to the list as you go
function insertVoterToken(address voter, bytes32 tokenId) returns(bool success) {
    voterStructs[voter].tokenIndex.push(tokenId);
    return true;}    

    */

  
}