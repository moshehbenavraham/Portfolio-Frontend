export interface DetailCard {
  id: string;
  title: string;
  content: string | string[];
}

export interface AboutData {
  headline: string;
  description: string;
  details: DetailCard[];
}
