// load data before page is rendered
import { getInvoiceById } from '$lib/stores/invoiceStore';

interface Props {
  params: {
    id: string;
  };
}
export function load({ params }: Props) {
  // we use id because we have [id] in the folder name
  const id = params?.id;
  const invoice = getInvoiceById(id);
  return { invoice };
}
