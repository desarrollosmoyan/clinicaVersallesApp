import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  debug: true,
  verbose: true,
  overwrite: true,
  schema: 'http://192.168.1.18:1337/graphql',
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
