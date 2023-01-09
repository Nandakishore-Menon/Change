// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract PetitionContract {

    struct User{
        address addr;
        string userHash;// contains name, image and bio
        uint[] petitionNFTIDs;
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
        bool nftMinted;
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

    // get user from address
    function getUser(address _addr) public view returns(User memory){
        User memory retU;
        // =User(msg.sender,"nonexistent");
        retU.addr = msg.sender;
        for(uint _i=0; _i<users.length; ++_i){
            User storage u = users[_i];
            if(u.addr==_addr){
                retU = u;
                break;
            }
        }
        return retU;
    }

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


    // get petitions by petitionID 
    function getPetitionByPid(uint _pid) public view returns(Petition memory){
        require(_pid < petitions.length);
        Petition memory p = petitions[_pid];
        return p;
    }

    // ADD A NEW USER
    function addUser(address _userAddr, string memory _userHash) public {
        if(userExists[_userAddr]==false){
            User memory _u ;
            // = User(_userAddr,_userHash);
            _u.addr = _userAddr;
            _u.userHash = _userHash;
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
        petitions.push(Petition(_pid,msg.sender,_signedUsersAddress,_petitionHash,_commentsID,false));
        petitionsPerUser[msg.sender]++;
    }

     // add comment to a petition
    function addComment(string memory _commentHash, uint _petitionID) public {
        Comment memory _c = Comment(cID,msg.sender,_commentHash);
        comments.push(_c);
        petitions[_petitionID].commentsID.push(cID);
        cID++;
    }

    // get number of votes for a contract 
    function getVotes(uint _pid)public view returns(uint){
        return petitions[_pid].signedUsersAddress.length;
    }
    // check if user has voted
    function hasVoted(uint _pid) public view returns(bool){
        for(uint _i=0;_i<petitions[_pid].signedUsersAddress.length;++_i){
            if((petitions[_pid].signedUsersAddress)[_i] == msg.sender){
                return true;
            }
        }
        return false;
    }
    // get comments for a Petition
    function getCommentsByID(uint _pid)public view returns(Comment[] memory){
        require(_pid<petitions.length);
        Petition memory _p = petitions[_pid];
        Comment[] memory _returnArray= new Comment[](_p.commentsID.length);
        uint _j = 0;
        for(uint _i=0;_i<comments.length;++_i){
            if(_p.commentsID[_j] == comments[_i].commentID){
                _returnArray[_j]=comments[_i];
                ++_j;
            }
        }
        return _returnArray;
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

    // add nft to user profile 
    function addNFT(uint _id) public {
        require(userExists[msg.sender]==true);
        for(uint _i = 0;_i<users.length;++_i){
            if(users[_i].addr == msg.sender){
                users[_i].petitionNFTIDs.push(_id);
                break;
            }
        }
    }

    // set that petition is minted
    function setPetitionMinted(uint _pid) public {
        petitions[_pid].nftMinted = true;
    }

    // check if nft is minted for that petition
    function isMinted(uint _pid) public view returns(bool){
        return petitions[_pid].nftMinted;
    }
}