import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  debug: true,
  verbose: true,
  overwrite: true,
  schema: 'https://c4a1-190-66-99-88.ngrok-free.app/graphql',
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
