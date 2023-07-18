import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  debug: true,
  verbose: true,
  overwrite: true,
  schema: 'https://f261-179-32-228-75.ngrok-free.app/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/generated/graphql.tsx': {
      config: {withHooks: true},
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
