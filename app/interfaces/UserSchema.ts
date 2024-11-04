export default interface UserSchema {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  location: string | null;
  github_link: string | null;
  linkedin_link: string | null;
  password: string;
}
