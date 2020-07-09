import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/Users';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, 'fe613891b971853f7e41d315dc799ee2', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user };
  }
}

export default AuthenticateUserService;
