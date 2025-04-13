import { createConnection } from 'typeorm';
import { dbConfig } from '../config/database.js';
import { User } from '../entities/User.js';

export async function initializeUserRepository() {
    try {
        const connection = await createConnection(dbConfig);
        return connection.getRepository(User);
    } catch (error) {
        console.error('User repository initialization error:', error);
        throw error;
    }
}

export async function createUser(username, email) {
    const userRepository = await initializeUserRepository();
    const user = new User();
    user.username = username;
    user.email = email;
    return await userRepository.save(user);
}

export async function findUserById(id) {
    const userRepository = await initializeUserRepository();
    return await userRepository.findOne({ where: { id } });
}