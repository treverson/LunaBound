pragma solidity ^0.4.21;

contract StakePension {
    address public owner;
    address public manager;
    
    uint public recoveryThreshold;
    address[] public recoverers;
    mapping(address => address) public proposedNewOwner;
    
    struct adhockWithdraw{
        uint amount;
        address recipient;    
    }
    
    struct recurringWithdraw{
        uint amount;
        address recipient;    
        uint period;
        uint lastWithdraw;
    }
    
    adhockWithdraw public pendingAdhocWithdraw = adhockWithdraw(0,0x0);
    adhockWithdraw public approvedAdhocWithdraw = adhockWithdraw(0,0x0);
    
    recurringWithdraw public pendingRecurringWithdraw = recurringWithdraw(0,0x0,0,0);
    recurringWithdraw public approvedRecurringWithdraw = recurringWithdraw(0,0x0,0,0);
    
    function StakePension(address[] _recoverers, uint _recoveryThreshold, address _fundManager) public payable {
        owner = msg.sender;
        recoverers = _recoverers;
        manager = _fundManager;
        recoveryThreshold = _recoveryThreshold;
    }
    
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
    
    modifier isManager() {
        require(msg.sender == manager);
        _;
    }
    
    modifier isRecoverer() {
        bool recovererFound = false;
        for (uint i = 0; i < recoverers.length; i ++) {
            if (msg.sender == recoverers[i]) {
                recovererFound = true;
            }
        }
        require(recovererFound);
        _;
    }
    
    function requestAdhocWithdraw(uint  _amount, address _recipient) external isOwner {
        require(_amount <= address(this).balance);
        pendingAdhocWithdraw.amount = _amount;
        pendingAdhocWithdraw.recipient = _recipient;
        emit NewWithdrawRequest(_amount, _recipient);
    }
    
    function requestRecurringWithdraw(uint _amount, address _recipient, uint _period) external isOwner {
        require(_amount <= address(this).balance);
        pendingRecurringWithdraw.amount = _amount;
        pendingRecurringWithdraw.recipient = _recipient;
        pendingRecurringWithdraw.period = _period;
        emit NewRecurringWithdrawRequest(_amount, _recipient, _period);
    }
    
    function approveAdhocWithdraw() external isManager {
        approvedAdhocWithdraw = pendingAdhocWithdraw;
        pendingAdhocWithdraw = adhockWithdraw(0,0x0);
        emit WithdrawApproved(msg.sender, approvedAdhocWithdraw.amount);
    }
    
    function approveRecurringWithdraw() external isManager {
        approvedRecurringWithdraw = pendingRecurringWithdraw;
        pendingRecurringWithdraw = recurringWithdraw(0,0x0,0,0);
        emit RecurringWithdrawApproved(msg.sender, approvedRecurringWithdraw.amount, approvedRecurringWithdraw.period);
    }
    
    function executeAdhocWithdraw() external isManager {
        approvedAdhocWithdraw.recipient.transfer(approvedAdhocWithdraw.amount);
        //Adhoc only occurs once, so we need to remove the ability to execute another tx
        approvedAdhocWithdraw = adhockWithdraw(0,0x0); 
        
    }

    function executeRecurringWithdraw(uint _time) external isManager {
        require(_time>approvedRecurringWithdraw.lastWithdraw);
        approvedRecurringWithdraw.recipient.transfer(approvedRecurringWithdraw.amount);
        approvedRecurringWithdraw.lastWithdraw = _time;
    }
    
    function proposeNewOwner(address _address) external isRecoverer {
        proposedNewOwner[msg.sender] = _address;
    }
    
    function transferOwner() external returns(bool){
        for(uint i = 0; i < recoverers.length - 1; i++) {
            uint foundCount = 0;
            for(uint j = i; j<recoverers.length; j++) {
                if(proposedNewOwner[recoverers[i]]==proposedNewOwner[recoverers[j]] && proposedNewOwner[recoverers[j]] != 0x0) {
                    foundCount++;
                    if(foundCount>=recoveryThreshold) {
                        owner = proposedNewOwner[recoverers[i]];
                        return true;
                    }
                }                
            }
        }
        return false;
    }

    function contribute() external payable {
        emit NewContribution(msg.sender, msg.value, address(this));
    }

    function forgetMe() external isOwner {
        selfdestruct(manager);
        emit PensionDeleted(owner, block.number, address(this), address(this).balance);
    }

    event NewContribution(address _contributor, uint _amount, address _pensionContract);
    event PensionDeleted(address _owner, uint _blockNumber, address _pensionContract, uint balancePension);
    event NewWithdrawRequest(uint _amount, address _recipient);
    event NewRecurringWithdrawRequest(uint _amount, address _recipient, uint _period);
    event WithdrawApproved(address _manager, uint _amount);
    event RecurringWithdrawApproved(address _manager, uint _amount, uint _period);

}
