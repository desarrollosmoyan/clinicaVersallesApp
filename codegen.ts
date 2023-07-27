import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  debug: true,
  verbose: true,
  overwrite: true,
  schema: 'https://cb96-190-66-111-99.ngrok-free.app/graphql',
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
