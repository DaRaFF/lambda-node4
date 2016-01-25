// THIS SCRIPT SHOULD BE EXECUTABLE LOCALLY
var srcNodePath = './node';
var tmpNodePath = '/tmp/node';
var copyFileSync = require('./helper.js').copyFileSync
copyFileSync(srcNodePath, tmpNodePath);

// Require spawn from the child process module
var spawn = require('child_process').spawn;
// Run node with the child.js file as an argument
var child = spawn(tmpNodePath, ['child.js']);

// Send data to the child process via its stdin stream
child.stdin.write(JSON.stringify({
  "message": "sending messages is cool",
  "type": "response"
}));

// Listen for any response from the child:
child.stdout.on('data', function (data) {
    console.log('data sent child->parent: ' + data);
    obj = JSON.parse(data.toString());
    if(obj.type == 'response') {
      console.log('context succeed');
    }
});

// Listen for any errors:
child.stderr.on('data', function (data) {
    console.log('There was an error: ' + data);
    console.log('context succeed');
});
