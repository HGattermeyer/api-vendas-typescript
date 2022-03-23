import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = request.user.id;
    const user = await showProfile.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateUser = new UpdateProfileService();

    const user = await updateUser.execute({
      user_id,
      email,
      name,
      old_password,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
