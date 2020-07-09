import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthentidated from '../middlewares/ensureAuthenticated';

const usersRoute = Router();

usersRoute.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      email,
      name,
      password,
    });
    delete user.password;
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

usersRoute.patch('/avatar', ensureAuthentidated, async (request, response) => {
  return response.json({ ok: true });
});

export default usersRoute;
