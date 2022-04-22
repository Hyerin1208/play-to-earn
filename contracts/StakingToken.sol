// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./AmusementArcadeToken.sol";
import "./CreateNFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// import "hardhat/console.sol";

contract StakingToken is Ownable, ReentrancyGuard {
        using Counters for Counters.Counter;
    Counters.Counter private _StakerIds;

    // using SafeERC20 for IERC20;

    // Interfaces for ERC20 and ERC721
    AmusementArcadeToken public immutable rewardsToken;
    CreateNFT public immutable nftCollection;

    // Staker info
    struct Staker {
        address stakerAddress;
        // Amount of ERC721 Tokens staked
        uint256 amountStaked;
        // Last time of details update for this User
        uint256 timeOfLastUpdate;
        // Calculated, but unclaimed rewards for the User. The rewards are
        // calculated each time the user writes to the Smart Contract
        uint256 unclaimedRewards;
    }

        event addStaker (
      uint256 indexed stakerId,
      address stakerAddress,
      uint256 amount
    );

        event withdrawAmount (
      uint256 indexed stakerId,
      address stakerAddress,
      uint256 amount
    );

        event totalunclaimedRewards (
      uint256 amount
    );

    // Rewards per hour per token deposited in wei.
    // Rewards are cumulated once every hour.
    uint256 private rewardsPercent = 1;

    // Mapping of User Address to Staker info
    mapping(uint256 => Staker) public stakers;
        mapping(address => uint256) private StakerId;
        mapping(address => bool) public approve;


    // Constructor function
    constructor(CreateNFT _nftCollection, AmusementArcadeToken _rewardsToken) {
        nftCollection = _nftCollection;
        rewardsToken = _rewardsToken;
    }

    // If address already has ERC721 Token/s staked, calculate the rewards.
    // For every new Token Id in param transferFrom user to this Smart Contract,
    // increment the amountStaked and map msg.sender to the Token Id of the staked
    // Token to later send back on withdrawal. Finally give timeOfLastUpdate the
    // value of now.


modifier checkNFT() {
    require(nftCollection.balanceOf(msg.sender)!=0);
    _;
}


    function stake(uint256 _amount) external checkNFT nonReentrant {
        require(_amount>= 500*10**18);
            require(rewardsToken.balanceOf(msg.sender)>=_amount);
                      _StakerIds.increment();
      uint256 makeStakerId = _StakerIds.current();
        if(StakerId[msg.sender]==0){
StakerId[msg.sender] = makeStakerId;
        }
        if (stakers[StakerId[msg.sender]].amountStaked > 0) {
            uint256 rewards = calculateRewards(msg.sender);
            stakers[StakerId[msg.sender]].unclaimedRewards += rewards;
        }

            rewardsToken.transferFrom(msg.sender, address(this), _amount);
             stakers[StakerId[msg.sender]].stakerAddress = msg.sender;
stakers[StakerId[msg.sender]].amountStaked+=_amount;
            stakers[StakerId[msg.sender]].timeOfLastUpdate = block.timestamp;
            emit addStaker(StakerId[msg.sender],msg.sender,stakers[StakerId[msg.sender]].amountStaked);

    }

    // Check if user has any ERC721 Tokens Staked and if he tried to withdraw,
    // calculate the rewards and store them in the unclaimedRewards and for each
    // ERC721 Token in param: check if msg.sender is the original staker, decrement
    // the amountStaked of the user and transfer the ERC721 token back to them.
    function withdraw(uint256 _amount) external nonReentrant {
        require(StakerId[msg.sender]!=0);
        require(
            stakers[StakerId[msg.sender]].amountStaked > 0,
            "You have no tokens staked"
        );
        uint256 rewards = calculateRewards(msg.sender);
        stakers[StakerId[msg.sender]].unclaimedRewards += rewards;
        rewardsToken.transfer(msg.sender , _amount);
        stakers[StakerId[msg.sender]].amountStaked -= _amount;
        stakers[StakerId[msg.sender]].timeOfLastUpdate = block.timestamp;
        emit withdrawAmount(StakerId[msg.sender],msg.sender,stakers[StakerId[msg.sender]].amountStaked);
    }

    // Calculate rewards for the msg.sender, check if there are any rewards
    // claim, set unclaimedRewards to 0 and transfer the ERC20 Reward token
    // to the user.

    function claimRewards() external {
        uint256 rewards = stakers[StakerId[msg.sender]].unclaimedRewards;
        // uint256 rewards = calculateRewards(msg.sender) +
        //     stakers[msg.sender].unclaimedRewards;
        require(rewards > 0, "You have no rewards to claim");
        require(approve[msg.sender]==true,"not approve");
        stakers[StakerId[msg.sender]].timeOfLastUpdate = block.timestamp;
        stakers[StakerId[msg.sender]].unclaimedRewards = 0;
        rewardsToken.transfer(msg.sender, rewards);
        approve[msg.sender]=false;
    }

function findStakerId(address _userAddress) public view onlyOwner returns(uint256){
    return StakerId[_userAddress];
}

    
function resettimer (uint256[] calldata _stakerIds) public onlyOwner returns(bool){
uint256 len = _stakerIds.length;
uint256 unclaimedRewards = 0;
for(uint256 i=0; i < len; i++){
    Staker memory checkstakers = stakers[_stakerIds[i]];
            require(
            checkstakers.amountStaked > 0,
            "You have no tokens staked or unclaimedRewards");
                    uint256 rewards = calculateRewards(checkstakers.stakerAddress);
        stakers[_stakerIds[i]].unclaimedRewards += rewards;
        stakers[_stakerIds[i]].timeOfLastUpdate = block.timestamp;
        approve[checkstakers.stakerAddress] = true;
        unclaimedRewards+=stakers[_stakerIds[i]].unclaimedRewards;
}
 emit totalunclaimedRewards(unclaimedRewards);
    return true;
}


    // Set the rewardsPerHour variable
    function setRewardsPercent(uint256 _newValue) public onlyOwner {
        rewardsPercent = _newValue;
    }

    //////////
    // View //
    //////////

    function userStakeInfo(address _user)
        public
        view
        returns (uint256 _tokensStaked, uint256 _availableRewards)
    {
        return (stakers[StakerId[_user]].amountStaked, availableRewards(_user));
    }

    function availableRewards(address _user) internal view returns (uint256) {
                require(StakerId[_user]!=0);
        require(stakers[StakerId[_user]].amountStaked > 0||stakers[StakerId[_user]].unclaimedRewards>0, "User has no tokens staked");
        uint256 _rewards = stakers[StakerId[_user]].unclaimedRewards +
            calculateRewards(_user);
        return _rewards;
    }

    /////////////
    // Internal//
    /////////////

    // Calculate rewards for param _staker by calculating the time passed
    // since last update in hours and mulitplying it to ERC721 Tokens Staked
    // and rewardsPerHour.
    function calculateRewards(address _staker)
        internal
        view
        returns (uint256 _rewards)
    {
        return ((((stakers[StakerId[_staker]].amountStaked*rewardsPercent)/100)/86400)*(block.timestamp - stakers[StakerId[_staker]].timeOfLastUpdate));
    }
}