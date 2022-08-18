export interface LoginRta {
  access_token: string;
  user:User;
}
export interface Token {
  access_token: string;  
}

export interface User {
  id: string;
  name: string;
  email: string;
}
export interface UserInfo {
  email: string;
  alias: string;
  fullName: string;
}
