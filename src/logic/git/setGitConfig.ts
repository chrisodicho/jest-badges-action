import { getInput } from '@actions/core';
import { exec } from '@actions/exec';
import { context } from '@actions/github';

export const setGitConfig = async (): Promise<void> => {
  const userName = getInput('github-user-name');
  const userEmail = getInput('github-user-email');

  await exec('git config', [
    '--global',
    'user.name',
    userName || context.actor,
  ]);
  await exec('git config', [
    '--global',
    'user.email',
    `${userEmail || context.actor}@users.noreply.github.com`,
  ]);
};
