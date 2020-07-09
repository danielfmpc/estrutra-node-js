import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

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
    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRoute;
