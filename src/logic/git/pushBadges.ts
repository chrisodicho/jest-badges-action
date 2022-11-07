import { getInput } from '@actions/core';
import { exec } from '@actions/exec';
import { context } from '@actions/github';

export const pushBadges = async (): Promise<void> => {
  await exec('git add', ['./badges']);
  await exec('git commit', ['-m', getInput('commit-message')]);

  const githubToken = getInput('github-token');

  if (githubToken) {
    await exec(
      `git push https://${githubToken}@github.com/${context.repo.owner}/${context.repo.repo}.git`,
    );
  } else {
    await exec('git push');
  }
};
