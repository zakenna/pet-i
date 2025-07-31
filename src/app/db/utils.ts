import { eq, desc, and, gte, lte } from 'drizzle-orm';
import { db } from './index';
import { users, pets, activityRecords, healthRecords, locationRecords, voiceCommands, notifications } from './schema';

// 사용자 관련 함수들
export const userQueries = {
  // Clerk ID로 사용자 찾기 또는 생성
  async findOrCreateUser(clerkId: string, userData: {
    email: string;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
  }) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
    });

    if (existingUser) {
      return existingUser;
    }

    const [newUser] = await db.insert(users).values({
      clerkId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profileImage: userData.profileImage,
    }).returning();

    return newUser;
  },

  // 사용자 프로필 업데이트
  async updateUser(clerkId: string, userData: Partial<typeof users.$inferInsert>) {
    const [updatedUser] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.clerkId, clerkId))
      .returning();

    return updatedUser;
  },

  // 사용자의 모든 반려동물 조회
  async getUserPets(clerkId: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.clerkId, clerkId),
      with: {
        pets: {
          where: eq(pets.isActive, true),
          orderBy: [desc(pets.createdAt)],
        },
      },
    });

    return user?.pets || [];
  },
};

// 반려동물 관련 함수들
export const petQueries = {
  // 반려동물 생성
  async createPet(userId: string, petData: Omit<typeof pets.$inferInsert, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    const [newPet] = await db.insert(pets).values({
      userId,
      ...petData,
    }).returning();

    return newPet;
  },

  // 반려동물 정보 조회 (상세 정보 포함)
  async getPetWithDetails(petId: string) {
    return await db.query.pets.findFirst({
      where: eq(pets.id, petId),
      with: {
        voiceCommands: {
          where: eq(voiceCommands.isActive, true),
        },
        healthRecords: {
          orderBy: [desc(healthRecords.recordDate)],
          limit: 10,
        },
        activityRecords: {
          orderBy: [desc(activityRecords.date)],
          limit: 30,
        },
        locationRecords: {
          orderBy: [desc(locationRecords.recordedAt)],
          limit: 50,
        },
      },
    });
  },

  // 반려동물 정보 업데이트
  async updatePet(petId: string, petData: Partial<typeof pets.$inferInsert>) {
    const [updatedPet] = await db
      .update(pets)
      .set({ ...petData, updatedAt: new Date() })
      .where(eq(pets.id, petId))
      .returning();

    return updatedPet;
  },
};

// 활동 기록 관련 함수들
export const activityQueries = {
  // 활동 기록 생성
  async createActivityRecord(petId: string, activityData: Omit<typeof activityRecords.$inferInsert, 'id' | 'petId' | 'createdAt' | 'updatedAt'>) {
    const [newRecord] = await db.insert(activityRecords).values({
      petId,
      ...activityData,
    }).returning();

    return newRecord;
  },

  // 특정 날짜의 활동 기록 조회
  async getActivityByDate(petId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await db.query.activityRecords.findMany({
      where: and(
        eq(activityRecords.petId, petId),
        gte(activityRecords.date, startOfDay),
        lte(activityRecords.date, endOfDay)
      ),
      orderBy: [desc(activityRecords.date)],
    });
  },

  // 주간 활동 통계
  async getWeeklyStats(petId: string, startDate: Date, endDate: Date) {
    return await db.query.activityRecords.findMany({
      where: and(
        eq(activityRecords.petId, petId),
        gte(activityRecords.date, startDate),
        lte(activityRecords.date, endDate)
      ),
      orderBy: [desc(activityRecords.date)],
    });
  },
};

// 건강 기록 관련 함수들
export const healthQueries = {
  // 건강 기록 생성
  async createHealthRecord(petId: string, healthData: Omit<typeof healthRecords.$inferInsert, 'id' | 'petId' | 'createdAt' | 'updatedAt'>) {
    const [newRecord] = await db.insert(healthRecords).values({
      petId,
      ...healthData,
    }).returning();

    return newRecord;
  },

  // 최신 건강 기록 조회
  async getLatestHealthRecord(petId: string) {
    return await db.query.healthRecords.findFirst({
      where: eq(healthRecords.petId, petId),
      orderBy: [desc(healthRecords.recordDate)],
    });
  },

  // 건강 기록 히스토리
  async getHealthHistory(petId: string, limit: number = 30) {
    return await db.query.healthRecords.findMany({
      where: eq(healthRecords.petId, petId),
      orderBy: [desc(healthRecords.recordDate)],
      limit,
    });
  },
};

// 위치 기록 관련 함수들
export const locationQueries = {
  // 위치 기록 생성
  async createLocationRecord(petId: string, locationData: Omit<typeof locationRecords.$inferInsert, 'id' | 'petId' | 'createdAt'>) {
    const [newRecord] = await db.insert(locationRecords).values({
      petId,
      ...locationData,
    }).returning();

    return newRecord;
  },

  // 최신 위치 조회
  async getLatestLocation(petId: string) {
    return await db.query.locationRecords.findFirst({
      where: eq(locationRecords.petId, petId),
      orderBy: [desc(locationRecords.recordedAt)],
    });
  },

  // 위치 히스토리 조회
  async getLocationHistory(petId: string, limit: number = 100) {
    return await db.query.locationRecords.findMany({
      where: eq(locationRecords.petId, petId),
      orderBy: [desc(locationRecords.recordedAt)],
      limit,
    });
  },
};

// 음성 명령 관련 함수들
export const voiceQueries = {
  // 음성 명령 생성
  async createVoiceCommand(petId: string, commandData: Omit<typeof voiceCommands.$inferInsert, 'id' | 'petId' | 'createdAt' | 'updatedAt'>) {
    const [newCommand] = await db.insert(voiceCommands).values({
      petId,
      ...commandData,
    }).returning();

    return newCommand;
  },

  // 반려동물의 활성 음성 명령 조회
  async getActiveVoiceCommands(petId: string) {
    return await db.query.voiceCommands.findMany({
      where: and(
        eq(voiceCommands.petId, petId),
        eq(voiceCommands.isActive, true)
      ),
      orderBy: [desc(voiceCommands.createdAt)],
    });
  },

  // 음성 명령 업데이트
  async updateVoiceCommand(commandId: string, commandData: Partial<typeof voiceCommands.$inferInsert>) {
    const [updatedCommand] = await db
      .update(voiceCommands)
      .set({ ...commandData, updatedAt: new Date() })
      .where(eq(voiceCommands.id, commandId))
      .returning();

    return updatedCommand;
  },
};

// 알림 관련 함수들
export const notificationQueries = {
  // 알림 생성
  async createNotification(userId: string, notificationData: Omit<typeof notifications.$inferInsert, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
    const [newNotification] = await db.insert(notifications).values({
      userId,
      ...notificationData,
    }).returning();

    return newNotification;
  },

  // 사용자의 읽지 않은 알림 조회
  async getUnreadNotifications(userId: string) {
    return await db.query.notifications.findMany({
      where: and(
        eq(notifications.userId, userId),
        eq(notifications.isRead, false),
        eq(notifications.isActive, true)
      ),
      orderBy: [desc(notifications.createdAt)],
    });
  },

  // 알림 읽음 처리
  async markAsRead(notificationId: string) {
    const [updatedNotification] = await db
      .update(notifications)
      .set({ isRead: true, updatedAt: new Date() })
      .where(eq(notifications.id, notificationId))
      .returning();

    return updatedNotification;
  },
};