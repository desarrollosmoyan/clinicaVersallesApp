import {
  ObservacioneInput,
  useCreateObservacioneMutation,
} from '../generated/graphql';

export const useObservacionesServices = () => {
  // UPDATE OBSERVACION
  const [createObservacioneMutation, {loading: loadingUpdate}] =
    useCreateObservacioneMutation();
  return {
    loadingUpdate,
    CreateObservacion: async (data: ObservacioneInput) => {
      try {
        const res = await createObservacioneMutation({
          variables: {data},
        });

        return {res: true, response: !!res.data?.createObservacione};
      } catch (error) {
        return {res: false, response: 'Hubo un error'};
      }
    },
  };
};
