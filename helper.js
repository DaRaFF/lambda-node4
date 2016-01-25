var fs = require('fs');

copyFileSync = function(srcFile, destFile) {
  var BUF_LENGTH, buff, bytesRead, fdr, fdw, pos;
  BUF_LENGTH = 64 * 1024;
  buff = new Buffer(BUF_LENGTH);
  fdr = fs.openSync(srcFile, 'r');
  fdw = fs.openSync(destFile, 'w');
  bytesRead = 1;
  pos = 0;
  while (bytesRead > 0) {
    bytesRead = fs.readSync(fdr, buff, 0, BUF_LENGTH, pos);
    fs.writeSync(fdw, buff, 0, bytesRead);
    pos += bytesRead;
  }
  fs.closeSync(fdr);
  return fs.closeSync(fdw);
};

module.exports.copyFileSync = function(srcFile, destFile) {
  var nodeExist = false

  try {
    fs.statSync(destFile);
    nodeExist = true
  } catch (e) {}

  console.log('node binary ' + destFile + ' exists?: ' + nodeExist)

  if (nodeExist === false) {
    console.log('copy node binary to ' + destFile)
    copyFileSync(srcFile, destFile);
    fs.chmodSync(destFile, '755');
  }
}
