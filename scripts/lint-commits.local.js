const { execSync } = require('child_process');

const verifyCommits = require('./lint-commits.plugin');

const commits = [{
  message: lastCommitMessage(),
  commit: {}
}];

verifyCommits({}, {commits}).catch(console.error);

function lastCommitMessage() {
  if (process.env.COMMIT_HOOK) {
    return require('fs').readFileSync('.git/COMMIT_EDITMSG', 'utf8');
  } else {
    return execSync('git log -1 --pretty=%B').toString();
  }
}
