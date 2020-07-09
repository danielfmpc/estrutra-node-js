import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';
import ensureAuthentidated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRoute = Router();
const upload = multer(uploadConfig);

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

usersRoute.patch(
  '/avatar',
  ensureAuthentidated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatar = new UpdateUserAvatarService();
      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

export default usersRoute;
