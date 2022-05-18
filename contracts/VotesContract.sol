// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract VotesContract {
    uint public votesCounter = 0;

    event VotesCreated(
        uint id,
        string candidateId,
        string electionId,
        uint createAt
    );

    struct Vote {
        uint256 id;
        string candidateId;
        string electionId;
        uint256 createAt;
    }
    
    mapping (uint256 => Vote) public votes;

    function createVote(string memory _candidateId, string memory _electionId) public{
        votesCounter++;
        votes[votesCounter] = Vote(votesCounter,_candidateId,_electionId,block.timestamp);
        emit VotesCreated(votesCounter,_candidateId,_electionId,block.timestamp);
    }

}