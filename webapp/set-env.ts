const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

const environment = argv.environment;
const isProduction = environment === 'prod';

const targetProdPath = './src/environments/environment.prod.ts';
const targetDevPath = './src/environments/environment.ts';

const prodEnvConfigFile = `export const environment = {
  production: true,
  firebaseConfig: ${process.env['firebaseConfig']},
  squareBasePath: '${process.env['squareBasePath']}',
  squareScopes: [${process.env['squareScopes'].split(' ')}],
  SQ_ENVIRONMENT: '${process.env['SQ_ENVIRONMENT']}',
  SQ_APPLICATION_ID: '${process.env['SQ_APPLICATION_ID']}',
  apiUrl: '${process.env['apiUrl']}',
};
`;
const devEnvConfigFile = `export const environment = {
  production: false,
  firebaseConfig: ${process.env['firebaseConfig']},
  squareBasePath: '${process.env['squareBasePath']}',
  squareScopes: [${process.env['squareScopes'].split(' ')}],
  SQ_ENVIRONMENT: '${process.env['SQ_ENVIRONMENT']}',
  SQ_APPLICATION_ID: '${process.env['SQ_APPLICATION_ID']}',
  apiUrl: '${process.env['apiUrl']}',
};
`;

writeFile(targetDevPath, devEnvConfigFile, function (err: any) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      `Angular environment.ts file generated correctly at ${targetDevPath} \n`
    );
  }
});

if (isProduction) {
  writeFile(targetProdPath, prodEnvConfigFile, function (err: any) {
    if (err) {
      throw console.error(err);
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetDevPath} \n`
      );
    }
  });
}
