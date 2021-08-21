import { prisma, getTokenPayload } from '../helpers/utils';

const checkPayment: any = async (request: any, reply: any, next: any) => {
  const token: string = request.headers['x-access-token'];
  if (!token) {
    reply.status(403).send({
      message: 'No token provided!',
    });
    return Promise.reject(new Error());
  }

  const userId: any = getTokenPayload(token);
  if (!userId) {
    reply.status(401).send({
      message: 'Unauthorized!',
    });
    return Promise.reject(new Error());
  } else {
    const user: any = await prisma.user.findUnique({
      where: {
        id: Number(userId.userId),
      },
    });
    if (!user) {
      reply.status(401).send({
        message: 'No such a user!',
      });
      return Promise.reject(new Error());
    }
    if (!user.until) {
      reply.status(401).send({
        message: 'No such a payment!',
      });
      return Promise.reject(new Error());
    } else if (Date.parse(user.until) < Date.now()) {
      reply.status(401).send({
        message: 'User payment expired!',
      });
      return Promise.reject(new Error());
    }
  }
};

export { checkPayment };
