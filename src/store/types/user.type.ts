export type User = {
  uuid: string | null;
  email: string;
  profile: {
    name: string;
    phone: string;
  };
};
