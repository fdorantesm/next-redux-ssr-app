import { User } from 'src/store/types/user.type';

export function unsetUser(state: User) {
  state.uuid = null;
}
