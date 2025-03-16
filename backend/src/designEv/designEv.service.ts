import { PrismaClient } from "@prisma/client";
import { designEv } from "./designEv.types";

const prisma = new PrismaClient();

export class designEvService {
  async createEvent(event: designEv) {
    let categoryName = event.category || null;

    let category;
    if (categoryName) {
      category = await prisma.category.findUnique({
        where: { category_name: categoryName },
      });

      if (!category) {
        category = await prisma.category.create({
          data: {
            category_name: categoryName,
          },
        });
      }
    }

    return await prisma.event.create({
      data: {
        event_name: event.event_name,
        title: event.title || 'Без названия',
        event_date: event.event_date ? new Date(event.event_date).toISOString() : null,
        location: event.location || null,
        description: event.description || null,
        category_name: category ? category.category_name : null, 
        favorite: event.favorite === true ? 1 : 0, 
      },
    });
  }

  async getAllEvents() {
    return await prisma.event.findMany({
      include: {
        category: true, 
      },
    });
  }
}
