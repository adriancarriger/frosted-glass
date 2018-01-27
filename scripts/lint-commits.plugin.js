const { format, load, lint } = require('@commitlint/core');
const SemanticReleaseError = require('@semantic-release/error');

const CONFIG = {
  extends: ['@commitlint/config-conventional']
};

function verifyRelease(repoData, data) {
  return validateCommits(data.commits);
}

async function validateCommits(commits) {
  const opts = await load(CONFIG);
  await Promise.all(commits.map((commit) => validateCommit(commit, opts)));
}

async function validateCommit(commitMeta, opts) {
  const report = await lint(`${commitMeta.message}`, opts.rules, opts.parserPreset ? {parserOpts: opts.parserPreset.parserOpts} : {});
  if (!report.valid) {
    const detail = commitMeta.commit.short ? ` ${commitMeta.commit.short}` : '';
    console.error('😞   Errors found with commit' + detail);
    console.error(`💬   ${commitMeta.message}`);
    const formated = format({errors: report.errors});
    formated.forEach(item => console.log(item));
    throw new SemanticReleaseError(
      `The commit message is not formatted correctly`,
      'EINVALIDCOMMIT'
    );
  }
}

module.exports = verifyRelease;
