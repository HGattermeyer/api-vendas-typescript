import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../infra/typeorm/entities/Order';
import { OrderRepository } from '../infra/typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrderRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Could not find any order with the given id.');
    }

    return order;
  }
}

export default ShowOrderService;
