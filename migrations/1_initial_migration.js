const Kyc = artifacts.require("Kyc");

module.exports = function (deployer) {
  deployer.deploy(Kyc);
};
