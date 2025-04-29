export interface Tender {
  id: number;
  date: string;
  deadline_date: string;
  deadline_length_days: string;
  title: string;
  category: string;
  sid: string;
  src_url: string;
  purchaser: {
    id: string;
    sid: string | null;
    name: string | null;
  };
  type: {
    id: string;
    name: string;
    slug: string;
  };
  notices: {
    generaldocument: {
      id: string;
      type: string;
      name: string;
      doc_id: string;
      doc_url: string;
      doc_size: string | null;
      doc_pages: string | null;
      doc_accept: string;
    }[];
  };
  awarded: {
    date: string;
    suppliers_id: string;
    count: string;
    value: string;
    suppliers_name: string;
    suppliers: {
      id: string;
      slug: string;
      name: string;
    }[];
    offers_count: number;
    offers_count_data: {
      [key: string]: {
        count: number;
        value: string;
      };
    };
    value_for_one: number;
    value_for_two: number;
    value_for_three: number;
  }[];
  country?: string; // (optional) if available in some data
  description?: string; // (optional) if available in some data
  cpv?: string; // (optional) if available in some data
}
