const { execSync } = require('child_process');

const [ , , ...args ] = process.argv;

const command = [ 'ts-node --transpileOnly', './src/lib', ...args ].join(' ');
execSync(command, { stdio: 'inherit', cwd: `${ __dirname }/..` });
