import { prisma, getTokenPayload } from '../helpers/utils';

const checkToken: any = async (request: any, reply: any, next: any) => {
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
    request.userId = userId.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId.userId),
      },
    });
    if (!user) {
      reply.status(401).send({
        message: 'Unauthorized!',
      });
      return Promise.reject(new Error());
    }
    request.user = user;
  }
};

const checkAuthor: any = async (request: any, reply: any, next: any) => {
  const token: string = request.headers['x-access-token'];
  if (!token) {
    reply.status(403).send({
      message: 'No token provided!',
    });
    return Promise.reject(new Error());
  }

  const userId: string = getTokenPayload(token);
  if (!userId) {
    reply.status(401).send({
      message: 'Unauthorized!',
    });
    return Promise.reject(new Error());
  }
  const user: any = prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
  if (user.userType !== 'AUTHOR') {
    reply.status(401).send({
      message: 'Unauthorized!',
    });
    return Promise.reject(new Error());
  }
};

const checkSignup = async (request: any, reply: any) => {
  const { email }: any = request.body;
  const isExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isExist) {
    reply.status(400).send({
      message: 'Failed! Username is already in use!',
    });
    return Promise.reject(new Error());
  }
};
export { checkToken, checkSignup, checkAuthor };
