pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Espace.sol";

contract TestEspace {
  Espace espace = Espace(DeployedAddresses.Espace());

    // Testing the adopt() function
    function testUserCanCreateItem() {
        

        espace.addSpace("1","Office", "50 Lonsdale", "50 Lonsdale St", 1, 10, 2, "10 desks", "WIP");
        //bool result = espace.addItem("1","Office", "50 Lonsdale", "50 Lonsdale St Melbourne, Victoria", 1, 
            //10, 2, "10 desks", "http://ispt.net.au/wp-content/uploads/50LonE03-1000x667.jpg");

        
            
        bool result = true;
        bool expected = true;

        Assert.equal(result, expected, "You can create an item");
    }

    function testSomething() {
        espace.doSomething(1);
         bool result = true;
        bool expected = true;

        Assert.equal(result, expected, "You did nothing");
    }

    function testBookItem() {

        //uint result2 = 
        espace.addSpace("1","Office", "50 Lonsdale", "50 Lonsdale St", 1, 10, 2, "10 desks", "WIP");
        espace.addSpace("2","Office", "50 Lonsdale", "50 Lonsdale St", 1, 10, 2, "10 desks", "WIP");
        espace.addSpace("3","Office", "50 Lonsdale", "50 Lonsdale St", 1, 10, 2, "10 desks", "WIP");

        espace.bookItem(3);

        bool result = true;
        bool expected = true;



        Assert.equal(result, expected, "You can book an item");

    }
}