var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = require('sinon');
