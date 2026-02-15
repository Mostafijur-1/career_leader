export type UserType = 'student' | 'mentor' | 'admin';

export interface BaseUser {
  _id?: string;
  email: string;
  password: string;
  type: UserType;
  name: string;
}

export interface StudentUser extends BaseUser {
  type: 'student';
}

export interface MentorUser extends BaseUser {
  type: 'mentor';
  expertise: string[];
  active: boolean;
}

export interface AdminUser extends BaseUser {
  type: 'admin';
  role: string;
}

export type User = StudentUser | MentorUser | AdminUser;
