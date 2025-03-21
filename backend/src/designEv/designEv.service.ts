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

    try {
      return await prisma.event.create({
        data: {
          event_name: event.event_name,
          title: event.title || 'Без названия',
          event_date: event.event_date ? new Date(event.event_date) : null,
          location: event.location || null,
          description: event.description || null,
          category_name: categoryName,
          favorite: event.favorite ? 1 : null,
        },
      });
    } catch (error) {
      console.error('Ошибка при создании события:', error);
      throw new Error('Ошибка при создании события');
    }
  }

  async getEventsByPeriod(startDate: string, endDate: string) {
    return await prisma.event.findMany({
      where: {
        event_date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      select: {
        event_name: true,
        event_date: true,
        location: true,
        description: true,
        favorite: true,
        category: {
          select: {
            category_name: true,
          },
        },
        Favorites: {
          select: {
            User: {
              select: {
                user_name: true,
              },
            },
          },
        },
      },
    });
  }
  
  async getEventsByCategory(categoryName: string) {
    return await prisma.event.findMany({
      where: {
        category_name: categoryName,
      },
      select: {
        event_name: true,
        event_date: true,
        location: true,
        description: true,
        favorite: true,
        category: {
          select: {
            category_name: true,
          },
        },
        Favorites: {
          select: {
            User: {
              select: {
                user_name: true,
              },
            },
          },
        },
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
          title: eventData.title || "Без названия",
          event_date: eventData.event_date ? new Date(eventData.event_date) : null,
          location: eventData.location || null,
          description: eventData.description || null,
          category_name: categoryName,
          favorite: eventData.favorite ? 1 : null,
        },
      });
    } catch (error) {
      console.error('Ошибка при обновлении события:', error);
      return null;
    }
  }

  async updateCategory(currentName: string, newName: string) {
    try {
      const existingCategory = await prisma.category.findUnique({
        where: { category_name: currentName }, 
      });
  
      if (!existingCategory) {
        throw new Error("Category not found");
      }
  
      const categoryExists = await prisma.category.findUnique({
        where: { category_name: newName },
      });
  
      if (categoryExists) {
        throw new Error("Category name already exists");
      }
  
      return await prisma.category.update({
        where: { category_name: currentName }, 
        data: { category_name: newName }, 
      });
      
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error);
      throw new Error(`Error updating category: ${error}`);
    }
  }
  

  async deleteCategory(categoryName: string) {
    try {
      const deletedCategory = await prisma.category.delete({
        where: { category_name: categoryName }, 
      });
      return deletedCategory;
    } catch (error) {
      console.error('Ошибка при удалении категории:', error);
      return null;
    }
  }
  

  async updateEventFavoriteStatus(id: number, favorite: boolean) {
    try {
      return await prisma.event.update({
        where: { event_id: id },
        data: {
          favorite: favorite ? 1 : 0,  
        },
      });
    } catch (error) {
      console.error('Ошибка при обновлении статуса избранного:', error);
      throw new Error('Ошибка при обновлении статуса избранного');
    }
  }

  async deleteEvent(id: number) {
    try {
      const deletedEvent = await prisma.event.delete({
        where: { event_id: id },
      });
      return deletedEvent;
    } catch (error) {
      console.error('Ошибка при удалении события:', error);
      return null;
    }
  }

  async getUserInfo(userId: number) {
    try {
      return await prisma.user.findUnique({
        where: { user_id: userId }, 
        select: {
          login: true,
          email: true,
        },
      });
    } catch (error) {
      console.error('Ошибка при получении информации о пользователе:', error);
      throw new Error('Ошибка при получении информации о пользователе');
    }
  }

  async getAllEvents() {
    return await prisma.event.findMany({
      select: {
        event_id: true,
        event_name: true,
        event_date: true,
        location: true,
        description: true,
        title: true,
        favorite: true,
        category_name: true,
        category: {
          select: {
            category_name: true,
          },
        },
      },
    });
  }
}
