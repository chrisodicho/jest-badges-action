import { getInput } from '@actions/core';
import { exec } from '@actions/exec';
import { mocked } from 'jest-mock';

import { pushBadges } from './pushBadges';

jest.mock('@actions/core');
jest.mock('@actions/exec');

describe('pushBadges function', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should push changes', async () => {
    mocked(getInput).mockReturnValueOnce(
      'chore(badges): update jest coverage badges [skip-ci]',
    );
    await pushBadges();

    expect(exec).toHaveBeenCalledTimes(3);
    expect(exec).toHaveBeenNthCalledWith(1, 'git add', ['./badges']);
    expect(exec).toHaveBeenNthCalledWith(2, 'git commit', [
      '-m',
      'chore(badges): update jest coverage badges [skip-ci]',
    ]);
    expect(exec).toHaveBeenNthCalledWith(3, 'git push');
  });
});
