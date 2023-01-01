// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract PetitionContract {

    struct User{
        address addr;
        string userHash;// contains name and bio
    }

    struct Comment{
        uint commentID;
        address userAddress;
        string commentHash;// contains comment content, comment time created
    }

    struct Petition{
        uint petitionID;
        address owner;
        address[] signedUsersAddress;
        string petitionHash;// contains petition title, content, timecreated, tags and image maybe
        // string petitionImageHash;
        uint[] commentsID;// comments
    }

    constructor(){}

    uint cID=0;// comments id
    Petition[] internal petitions;
    Comment[] internal comments;
    User[] internal users;
    mapping(address => uint) internal petitionsPerUser;
    mapping(address => bool) public userExists;

    // get all petitions 
    function getAllPetitions() public view returns(Petition[] memory) {
        Petition[] memory returnArray = new Petition[](petitions.length);
        for(uint _i=0; _i<petitions.length; ++_i){
            Petition storage p = petitions[_i];
            returnArray[_i] = p;
        }
        return returnArray;
    }

    // get all users for testing
    function getAllUsers() public view returns(User[] memory) {
        User[] memory returnArray = new User[](users.length);
        for(uint _i=0; _i<users.length; ++_i){
            User storage u = users[_i];
            returnArray[_i] = u;
        }
        return returnArray;
    }

    // get all 

    // get number of petitions 
    function getNumberOfPetitions() public view returns(uint){
        return petitions.length;
    }

    // get petitions by an user 
    function getPetitionByUser(address _userAddress) public view returns(Petition[] memory){
        Petition[] memory returnArray = new Petition[](petitionsPerUser[_userAddress]);
        uint _j = 0;
        for(uint _i=0; _i<petitions.length; ++_i){
            if(petitions[_i].owner == _userAddress){
                Petition storage p = petitions[_i];
                returnArray[_j] = p;
                _j++;
            }
        }
        return returnArray;
    }

    // ADD A NEW USER
    function addUser(address _userAddr, string memory _userHash) public {
        if(userExists[_userAddr]==false){
            User memory _u = User(_userAddr,_userHash);
            users.push(_u);
            userExists[_userAddr]=true;
        }
    }

     // add a petition by an user 
    function addPetition(string memory _petitionHash) public {
        address[] memory _signedUsersAddress;
        uint[] memory _commentsID;
        uint _pid = petitions.length;
        // addUser(msg.sender);
        require(userExists[msg.sender],"user does not exist");
        petitions.push(Petition(_pid,msg.sender,_signedUsersAddress,_petitionHash,_commentsID));
        petitionsPerUser[msg.sender]++;
    }

     // add comment to a petition
    function addComment(string memory _commentHash, uint _petitionID) public {
        Comment memory _c = Comment(cID,msg.sender,_commentHash);
        comments.push(_c);
        petitions[_petitionID].commentsID.push(cID);
        cID++;
    }

     // add a new user who signs a petition
    function signPetition(uint _petitionID) public {
        bool _signed=false;
        for(uint _i=0;_i<petitions[_petitionID].signedUsersAddress.length;++_i){
            if(msg.sender == petitions[_petitionID].signedUsersAddress[_i]){
                _signed = true;
            }
        }
        if(!_signed){
            petitions[_petitionID].signedUsersAddress.push(msg.sender);
        }
    }

    // get petition by tag 
    // modify title of petition by an user 
    // modify description of petition by an user 
    // modify imageHash of a petition by an user 
    // add a tag to a petition 
    // get total number of users
    // get user details by ID
    // get id of a user by name
}