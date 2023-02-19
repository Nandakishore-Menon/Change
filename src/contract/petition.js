export const abi = 
[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_commentHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_petitionID",
				"type": "uint256"
			}
		],
		"name": "addComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_tokenURI",
				"type": "string"
			}
		],
		"name": "addNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_petitionHash",
				"type": "string"
			}
		],
		"name": "addPetition",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_userHash",
				"type": "string"
			}
		],
		"name": "addUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "setPetitionMinted",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_petitionID",
				"type": "uint256"
			}
		],
		"name": "signPetition",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContractAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "commentedBy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "commentID",
				"type": "uint256"
			}
		],
		"name": "CommentAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "addedBy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "petitionID",
				"type": "uint256"
			}
		],
		"name": "PetitionAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "upvotedBy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "petitionID",
				"type": "uint256"
			}
		],
		"name": "PetitionUpvoted",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllPetitions",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "petitionID",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "signedUsersAddress",
						"type": "address[]"
					},
					{
						"internalType": "string",
						"name": "petitionHash",
						"type": "string"
					},
					{
						"internalType": "uint256[]",
						"name": "commentsID",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "nftMinted",
						"type": "bool"
					}
				],
				"internalType": "struct PetitionContract.Petition[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "userHash",
						"type": "string"
					},
					{
						"internalType": "uint256[]",
						"name": "petitionNFTIDs",
						"type": "uint256[]"
					}
				],
				"internalType": "struct PetitionContract.User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "getCommentsByID",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "commentID",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "commentHash",
						"type": "string"
					}
				],
				"internalType": "struct PetitionContract.Comment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumberOfPetitions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "getPetitionByPid",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "petitionID",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "signedUsersAddress",
						"type": "address[]"
					},
					{
						"internalType": "string",
						"name": "petitionHash",
						"type": "string"
					},
					{
						"internalType": "uint256[]",
						"name": "commentsID",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "nftMinted",
						"type": "bool"
					}
				],
				"internalType": "struct PetitionContract.Petition",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getPetitionByUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "petitionID",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "signedUsersAddress",
						"type": "address[]"
					},
					{
						"internalType": "string",
						"name": "petitionHash",
						"type": "string"
					},
					{
						"internalType": "uint256[]",
						"name": "commentsID",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "nftMinted",
						"type": "bool"
					}
				],
				"internalType": "struct PetitionContract.Petition[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "addr",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "userHash",
						"type": "string"
					},
					{
						"internalType": "uint256[]",
						"name": "petitionNFTIDs",
						"type": "uint256[]"
					}
				],
				"internalType": "struct PetitionContract.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "getVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pid",
				"type": "uint256"
			}
		],
		"name": "isMinted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nftContract",
		"outputs": [
			{
				"internalType": "contract FactoryNFT",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]