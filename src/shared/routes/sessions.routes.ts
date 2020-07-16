import { Router } from 'express';
import AuthenticateUserService from '../../modules/users/services/AuthenticateUserService';

const sessionsRoute = Router();

sessionsRoute.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateuser = new AuthenticateUserService();

  const { user, token } = await authenticateuser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRoute;
