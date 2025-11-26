export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: {
    url: string;
    label: string;
  };
  website: {
    url: string;
    label: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
