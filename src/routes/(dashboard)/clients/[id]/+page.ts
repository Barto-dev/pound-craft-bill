import { loadClient } from '../../../../api/client';

interface Props {
  params: {
    id: string;
  };
}

export const load = async ({ params }: Props) => {
  const id = params?.id;
  const client = await loadClient(id);
  return { client };
};
