import { User } from '../entities/user/user';

export class UserProfileDto {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: Partial<User>) {
    this.id = user.id!;
    this.username = user.username!;
    this.email = user.email!;
    this.createdAt = user.createdAt!;
    this.updatedAt = user.updatedAt!;
  }
}
