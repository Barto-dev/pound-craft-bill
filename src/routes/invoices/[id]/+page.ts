import { error } from '@sveltejs/kit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const load = ({ params }) => {
  if (params.id) {
    return { id: params.id };
  }
  throw error(404, 'Not Found');
};
