import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function addOrderToDB(userId, stock, exchange, quantity) {
    const order = await prisma.orders.create({
        data: {
            userId: userId,
            stock: stock,
            exchange: exchange,
            quantity: quantity
        }
    })
    console.log(order);
}

export async function getOrdersFromDB(userId) {
    const orders = await prisma.orders.findMany({
        where: {
            userId: userId
        } 
    });
    console.log(orders);
    return orders;
}
