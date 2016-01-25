#!/usr/bin/env node

'use strict'


// Unpause the stdin stream:
process.stdin.resume();
// Listen for incoming data:
process.stdin.on('data', function (data) {
  console.log(JSON.stringify({
    "child-process-node-version": process.release.sourceUrl
  }));
  // pipe received message from parent back to the parent
  console.log(data.toString());
});
