export const abi = [
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
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
					}
				],
				"internalType": "struct PetitionContract.User",
				"name": "_u",
				"type": "tuple"
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
];