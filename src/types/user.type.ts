export type User = {
  uuid: string;
  email: string;
  profile: {
    name: string;
    phone: string;
  };
  isActive: boolean;
};
