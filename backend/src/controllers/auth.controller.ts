import { RouteHandler } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const APP_SECRET = process.env.APP_SECRET || 'prisma';
import { prisma } from '../helpers/utils';

const signup: RouteHandler<{ Params: any }> = async (request: any, reply) => {
  const { name, email, password }: any = request.body;

  const hash = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
    },
  });

  return reply.send(result);
};

const login: RouteHandler<{ Params: any }> = async (request: any, reply) => {
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

  const token: any = jwt.sign({ userId: user.id }, APP_SECRET, { expiresIn: 86400 * 30 });
  return reply.status(200).send({ user, token });
};

export default { login, signup };
