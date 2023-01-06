const FantiumMetaToken = artifacts.require("FantiumMetaToken");

module.exports = function (deployer) {
  deployer.deploy(FantiumMetaToken);
};