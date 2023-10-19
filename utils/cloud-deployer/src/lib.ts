/* eslint-disable no-console, @typescript-eslint/no-explicit-any*/
import { execSync } from 'child_process';
import fs from 'fs';

import deploymentConfig from './configs';

const ROOT_PATH = '../..';
const CONFIGS_ENVS_PATH = `${ ROOT_PATH }/configs/envs/`;

const { deployment } = deploymentConfig.target;

const projectId = deployment.projectId;
const region = deployment.region;

const [ , , ...args ] = process.argv;
const network = args.find(arg => arg.startsWith('network='))?.split('network=')[1];

const getAvailableNetworks = () => {
  try {
    const files = fs.readdirSync(CONFIGS_ENVS_PATH);
    return files.filter(file => file.startsWith('.env.')).map(network => network.replace('.env.', ''));
  } catch (error) {
    throw new Error(`⛔ Directory configs/envs/ was not found.\n Error: ${ error }`);
  }
};

const validateNetwork = (network: string | undefined, availableNetworks: Array<string>) => {
  if (!network) {
    console.warn(`
      ⛔ Network argument not provided!\n
      Example usage: network=${ availableNetworks[0] }\n
      Available networks: ${ availableNetworks.join(', ') }
    `);
    process.exit();
  } else if (!availableNetworks.includes(network)) {
    console.warn(`
      ⛔ Unknown network provided.\n
      Available networks: ${ availableNetworks.join(', ') }
    `);
    process.exit();
  }
};

// Obtain deployment options
if (!projectId || !region) {
  throw Error('⛔ gcloud projectId or region not found in ./configs.ts');
}

const getEnvsFromFile = (network: string | undefined): string => {
  if (!network) {
    return '';
  }
  const envFilePath = `${ CONFIGS_ENVS_PATH }.env.${ network }`;

  try {
    const data = fs.readFileSync(envFilePath, 'utf8');
    const lines = data.split('\n');

    const envs: Array<string> = [];
    for (const line of lines) {
      if (!line.startsWith('#') && line.trim() !== '') {
        envs.push(line.trim());
      }
    }

    return envs.join('\n');
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      throw new Error(`⛔ ${ network } env was not found.`);
    } else {
      console.error(err);
    }
  }

  return '';
};

const availableNetworks = getAvailableNetworks();

validateNetwork(network, availableNetworks);

// Format envs and create env YAML File
const envObj = getEnvsFromFile(network).trim().split('\n').reduce((acc, line) => ({ ...acc, [line.split('=')[0]]: line.split('=')[1] }), {});
const formatedEnvs = Object.entries(envObj).map(([ key, value ]) => `${ key }: "${ value }"`).join('\n');

console.log(formatedEnvs);

try {
  fs.writeFileSync(`${ ROOT_PATH }/env.yaml`, formatedEnvs, { encoding: 'utf-8' });
} catch (error) {
  throw new Error(`⛔ Failed to create env.yaml`);
}

console.log(`📝 env.yaml has been created.`);

// Prepare cloud run service name and service account id
const baseServiceName = `${ deploymentConfig.name }--${ network }`.substring(0, 49); // max size for cloud run = 49
const serviceAccountId = baseServiceName.substring(0, 30); // max size for service account = 30
const serviceName = baseServiceName;

const deploymentLogMessage = [
  '🚀 Deploying...',
  `\x1b[36m${ deploymentConfig.name }\x1b[0m`,
  '>',
  `[network \x1b[31m${ network }\x1b[0m]`,
];

console.log(...deploymentLogMessage);
console.log(
  '🌏 [Google Cloud] project',
  `\x1b[32m'${ projectId }'\x1b[0m`,
  '|',
  'region',
  `\x1b[32m'${ region }'\x1b[0m`,
  '|',
  'service',
  `\x1b[35m\x1b[32m${ baseServiceName }'\x1b[0m`,
);

console.log('🔎 Checking service account...\x1b[33m', serviceAccountId, '\x1b[0m');
const existingSAs = JSON.parse(
  execSync(
    `gcloud iam service-accounts list --filter ${ serviceAccountId }@${ projectId }.iam.gserviceaccount.com --format json --project ${ projectId }`,
  ).toString(),
) as any;

let serviceAccountEmail: string;
if (existingSAs.length === 0) {
  console.log('✨ Creating service account...');
  const displayName = `${ deploymentConfig.name } (${ network })`;
  const newSA = JSON.parse(
    execSync(
      `gcloud iam service-accounts create ${ serviceAccountId } --display-name "${ displayName }" --format json --project ${ projectId }`,
    ).toString(),
  ) as any;
  console.log('✅ Service account ready:\x1b[32m', newSA.email, '\x1b[0m');
  serviceAccountEmail = newSA.email;
} else {
  if (existingSAs[0].disabled) {
    throw Error(`Service account disabled ${ existingSAs[0].email }`);
  }
  console.log('✅ Service account ready:\x1b[32m', existingSAs[0].email, '\x1b[0m');
  serviceAccountEmail = existingSAs[0].email;
}

const substitutions = {
  _DOCKER_FILE: `gcp/Dockerfile`,
  _SERVICE_ACCOUNT: serviceAccountEmail,
  _REGION: region,
  _SHORT_NAME: deploymentConfig.name,
  _SERVICE_NAME: serviceName,
};
console.log('🌩️ [cloudbuild]');
console.log(substitutions);

const gcloudBuildCommand = [
  'gcloud builds submit ../../',
  '--config',
  '../../gcp/cloudbuild.yml',
  '--substitutions',
  Object.entries(substitutions)
    .map(([ key, value ]) => `${ key }=${ value }`)
    .join(','),
  '--project',
  projectId,
].join(' ');
console.log('🚥\x1b[33m', gcloudBuildCommand, '\x1b[0m');

execSync(gcloudBuildCommand, { stdio: 'inherit' });

console.log('✅ Deployed');
