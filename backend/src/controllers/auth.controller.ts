import { RouteHandler, FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const APP_SECRET = process.env.APP_SECRET || 'patrone';
import { prisma } from '../helpers/utils';
import { User } from '../types/models';
import { ISignupBody, ILoginBody } from '../types/authParams';

const signup: RouteHandler<{ Body: ISignupBody }> = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<User> => {
  const { name, email, password }: any = request.body;

  const hash: string = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
    },
  });

  return reply.send(result);
};

const login: RouteHandler<{ Body: ILoginBody }> = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<{ user: User; token: string }> => {
  const { email, password }: any = request.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return reply.status(404).send({ message: 'User not found.' });
  }
  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) {
    return reply.status(401).send({
      message: 'Invalid Password!',
    });
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: 86400 * 30 });
  return reply.status(200).send({ user, token });
};

export default { login, signup };
