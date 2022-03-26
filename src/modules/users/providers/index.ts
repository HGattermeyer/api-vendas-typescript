import { container } from 'tsyringe';
import BCryptHashProvider from './HashProvider/Fakes/implementations/BcryptHashProvider';
import { IHashProvider } from './HashProvider/Fakes/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
