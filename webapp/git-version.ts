import { writeFileSync } from 'fs';
import { gitDescribeSync } from 'git-describe';
import { resolve } from 'path';

const gitInfo = gitDescribeSync();
const versionInfoJson = JSON.stringify(gitInfo, null, 2);

writeFileSync(resolve(__dirname, 'src', 'app', 'shared', 'git-version.json'), versionInfoJson);
