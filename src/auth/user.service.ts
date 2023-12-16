// user.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    if (Object.keys(user).length === 0) {
      throw new BadRequestException('Please provide a valid user object with key names.');
    }
    var data = {}
    if (user.username === '') {
      data["username"] = "Username cannot be empty."
      throw new BadRequestException(data);
    }
    if (user.email === '') {
      throw new BadRequestException('Email cannot be empty.');
    }
    if (user.password === '') {
      throw new BadRequestException('Password cannot be empty.');
    }
    // Check if the username already exists
    const existingUser = await this.userRepository.findOne({ where: { username: user.username } } as any);
    if (existingUser) {
      throw new BadRequestException('Username already exists.');
    }
    // Check if the username already exists
    const existingEmail = await this.userRepository.findOne({ where: { email: user.email } } as any);
    if (existingEmail) {
      throw new BadRequestException('Email already exists.');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { ...user, password: hashedPassword };
    return this.userRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}
