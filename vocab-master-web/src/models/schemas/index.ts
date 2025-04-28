import _word, { WordDTO, IWord } from "./Word";
import _list, { VocabularyListDTO, IVocabularyList } from "./VocabularyList";
import _verification, {
  UserVerificationDTO,
  IUserVerification,
} from "./UserVerification";
import _user, { UserDTO, IUser } from "./User";
import _userItem, { UserItemDTO, IUserItem } from "./UserItem";
import _profile, { ProfileDTO, IProfile } from "./Profile";
import _counter, { CounterDTO, ICounter } from "./Counter";

namespace Db {
  export namespace Dto {
    export type Word = WordDTO;
    export type VocabularyList = VocabularyListDTO;
    export type UserVerification = UserVerificationDTO;
    export type User = UserDTO;
    export type UserItem = UserItemDTO;
    export type Profile = ProfileDTO;
    export type Counter = CounterDTO;
  }
  export namespace IModel {
    export type Word = IWord;
    export type VocabularyList = IVocabularyList;
    export type UserVerification = IUserVerification;
    export type User = IUser;
    export type UserItem = IUserItem;
    export type Profile = IProfile;
    export type Counter = ICounter;
  }
  export namespace Model {
    export const Word = _word;
    export const VocabularyList = _list;
    export const UserVerification = _verification;
    export const User = _user;
    export const UserItem = _userItem;
    export const Profile = _profile;
    export const Counter = _counter;
  }
}
export default Db;
