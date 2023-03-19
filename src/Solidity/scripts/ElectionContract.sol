// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.4;

contract ElectionContract {

    struct vote{
        string pvn;
        string voter_id;
        address meta_address;
        string candidate_id;
        bool isValue; 
    }
    uint currentVoting = 1;
    string[] votes;
    string[] verifiedUsers;

    mapping(uint => mapping(string => vote)) idToVote;
    
    function castVote(string memory pvn, string memory voter_id, string memory candidate, bool isVerified) external{
        for (uint i = 0; i < verifiedUsers.length; i++) {
            if (keccak256(abi.encodePacked(verifiedUsers[i])) == keccak256(abi.encodePacked(voter_id))) {
                if(!isVerified){
                    return;
                }
                if(idToVote[currentVoting][voter_id].isValue){
                    return;
                }
                idToVote[currentVoting][voter_id] = vote(pvn, voter_id, msg.sender, candidate, true);
                votes.push(candidate);
                return;
            }
        }
        return;
    }

    function verfiyUser(string memory voter_id) external{
       verifiedUsers.push(voter_id);
    }

    function getYourVote(string memory voter_id) public view returns(vote memory){
        return idToVote[currentVoting][voter_id];
    }

    function getAllVotes() external view returns (string[] memory) {
        return votes;
    }

    function deleteElection() external{
        delete votes;
        currentVoting = currentVoting + 1;
    }
}