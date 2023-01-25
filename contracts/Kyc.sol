// SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.17;

contract Kyc {
    //Owner of the contract
    address owner;

    constructor() {
        owner = msg.sender;
    }

    enum KycStatus {
        PENDING,
        VERIFIED,
        REJECTED
    }

    struct UserKyc {
        address userAddress;
        string fullName;
        string dob;
        string ssn;
        string email;
        string phone;
        string occupationalStatus;
        string company;
        KycStatus status;
        bool isActive;
        bool isExist;
    }

    UserKyc[] public kycList;
    /* COLLECTIONS */
    mapping(address => uint256) public usersKyc;

    /* Start: EVENTS */
    event UserKycCreated(
        address userAddress,
        string fullName,
        string dob,
        string ssn,
        string email,
        string phone,
        string occupationalStatus,
        string company
    );
    event UserKycUpdated(
        address userAddress,
        string email,
        string phone,
        string occupationalStatus,
        string company
    );
    event UserKycDeleted(address userAddress);

    /* End: EVENTS */

    /* Add user KYC details to block chain */
    function addUserKyc(
        address userAddress,
        string memory fullName,
        string memory dob,
        string memory ssn,
        string memory email,
        string memory phone,
        string memory occupationalStatus,
        string memory company
    ) public {
        require(
            msg.sender == userAddress || msg.sender == owner,
            "You must be the the owner to access the contract"
        );
        UserKyc memory _userKyc = UserKyc(
            userAddress,
            fullName,
            dob,
            ssn,
            email,
            phone,
            occupationalStatus,
            company,
            KycStatus.PENDING,
            true,
            true
        );
        kycList.push(_userKyc);
        usersKyc[userAddress] = kycList.length - 1;
        emit UserKycCreated(
            userAddress,
            fullName,
            dob,
            ssn,
            email,
            phone,
            occupationalStatus,
            company
        );
    }

    /* Update user details to block chain */
    function updateUserKyc(
        address userAddress,
        string memory _email,
        string memory _phone,
        string memory _occupationalStatus,
        string memory _company
    ) public {
        require(
            msg.sender == userAddress,
            "You must be the the owner of the record to update"
        );
        require(
            isUserKycExist(userAddress) == true,
            "kYC record doesn't exist"
        );
        uint256 index = usersKyc[userAddress];
        kycList[index].email = _email;
        kycList[index].phone = _phone;
        kycList[index].occupationalStatus = _occupationalStatus;
        kycList[index].company = _company;
        kycList[index].status = KycStatus.PENDING;
        emit UserKycUpdated(
            userAddress,
            kycList[index].email,
            kycList[index].phone,
            kycList[index].occupationalStatus,
            kycList[index].company
        );
    }

    /* Update user Kyc Status */
    function updateUserKycStatus(address userAddress, KycStatus status) public {
        require(
            msg.sender == owner,
            "You must be the the owner of the contract to update"
        );
        require(
            isUserKycExist(userAddress) == true,
            "kYC record doesn't exist"
        );
        uint256 index = usersKyc[userAddress];
        kycList[index].status = status;
    }

    /* Get the user KYC details */
    function getUserKycDetails(address userAddress)
        external
        view
        returns (UserKyc memory)
    {
        require(
            isUserKycExist(userAddress) == true,
            "kYC record doesn't exist"
        );
        uint256 index = usersKyc[userAddress];
        return kycList[index];
    }

    /* Get the user KYC details */
    function getAllUserKycDetails() external view returns (UserKyc[] memory) {
        return kycList;
    }

    /* Get the user KYC details */
    function getPendingStatusUserKycDetails()
        external
        view
        returns (UserKyc[] memory)
    {
        UserKyc[] memory pendingKycList = new UserKyc[](kycList.length);
        for (uint256 i = 0; i < kycList.length; i++) {
            UserKyc memory kyc = kycList[i];
            if (kyc.status == KycStatus.PENDING) {
                pendingKycList[i] = kyc;
            }
        }
        return pendingKycList;
    }

    /* Delete user KYC details */
    function deleteUserKycDetails(address userAddress) public {
        require(
            isUserKycExist(userAddress) == true,
            "kYC record doesn't exist"
        );
        uint256 index = usersKyc[userAddress];
        kycList[index].isActive = false;
        emit UserKycDeleted(userAddress);
    }

    /* To check the KYC record if it exist in block chain or not */
    function isUserKycExist(address userAddress)
        public
        view
        returns (bool exist)
    {
        uint256 index = usersKyc[userAddress];
        if (
            kycList[index].userAddress == userAddress && kycList[index].isExist
        ) {
            return true;
        }
        return false;
    }

    /* To check the KYC record if it exist in block chain or not */
    function isContractOwner(address userAddress)
        public
        view
        returns (bool exist)
    {
        if (userAddress == owner) {
            return true;
        }
        return false;
    }
}
