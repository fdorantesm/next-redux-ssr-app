export type UserState = {
  uuid: string | null;
  email: string | null;
  profile: UserProfile;
};

type UserProfile = {
  name: string | null;
  phone: string | null;
};
