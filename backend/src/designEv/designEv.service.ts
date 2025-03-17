import { PrismaClient } from "@prisma/client";
import { designEv } from "./designEv.types";

const prisma = new PrismaClient();

export class designEvService {
  async createEvent(event: designEv) {
    let categoryName = event.category || null;

    if (categoryName) {
      const categoryExists = await prisma.category.findUnique({
        where: { category_name: categoryName },
      });

      if (!categoryExists) {
        categoryName = null;
      }
    }

    return await prisma.event.create({
      data: {
        event_name: event.event_name,
        title: event.title || 'Без названия',
        event_date: event.event_date ? new Date(event.event_date).toISOString() : null,
        location: event.location || null,
        description: event.description || null,
        category_name: categoryName,
        favorite: event.favorite ? 1 : null,
      },
    });
  }

  async createCategory(name: string) {
    const existingCategory = await prisma.category.findUnique({
      where: { category_name: name },
    });

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    return await prisma.category.create({
      data: {
        category_name: name,
      },
    });
  }

  async getCategoryByName(name: string) {
    return await prisma.category.findUnique({
      where: { category_name: name },
    });
  }

  async getAllCategories() {
    return await prisma.category.findMany({
      select: {
        category_name: true, 
      },
    });
  }

  async updateEvent(id: number, eventData: designEv) {
    let categoryName = eventData.category || null;

    if (categoryName) {
      const categoryExists = await prisma.category.findUnique({
        where: { category_name: categoryName },
      });

      if (!categoryExists) {
        categoryName = null;
      }
    }

    try {
      return await prisma.event.update({
        where: { event_id: id },
        data: {
          event_name: eventData.event_name,
          title: eventData.title || 'Без названия',
          event_date: eventData.event_date ? new Date(eventData.event_date).toISOString() : null,
          location: eventData.location || null,
          description: eventData.description || null,
          category_name: categoryName,
          favorite: eventData.favorite ? 1 : null,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async deleteEvent(id: number) {
    try {
      const deletedEvent = await prisma.event.delete({
        where: { event_id: id },
      });
      return deletedEvent;
    } catch (error) {
      return null;
    }
  }

  async getAllEvents() {
    return await prisma.event.findMany({
      include: {
        category: true,
      },
    });
  }
}
