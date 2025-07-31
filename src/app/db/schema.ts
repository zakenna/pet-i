import { pgTable, text, integer, timestamp, boolean, decimal, uuid, jsonb, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const petTypeEnum = pgEnum('pet_type', ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'reptile', 'other']);
export const activityTypeEnum = pgEnum('activity_type', ['walk', 'play', 'sleep', 'eat', 'exercise', 'rest']);
export const healthStatusEnum = pgEnum('health_status', ['excellent', 'good', 'normal', 'warning', 'critical']);
export const notificationTypeEnum = pgEnum('notification_type', ['meal', 'walk', 'medicine', 'checkup', 'grooming', 'reminder']);

// Users 테이블 (Clerk 사용자와 연동)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  profileImage: text('profile_image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Pets 테이블
export const pets = pgTable('pets', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(),
  type: petTypeEnum('type').notNull(),
  breed: text('breed'),
  gender: text('gender'), // 'male', 'female', 'unknown'
  birthDate: timestamp('birth_date'),
  weight: decimal('weight', { precision: 5, scale: 2 }), // kg
  color: text('color'),
  microchipId: text('microchip_id'),
  profileImage: text('profile_image'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Voice Commands 테이블
export const voiceCommands = pgTable('voice_commands', {
  id: uuid('id').primaryKey().defaultRandom(),
  petId: uuid('pet_id').references(() => pets.id, { onDelete: 'cascade' }).notNull(),
  command: text('command').notNull(),
  audioUrl: text('audio_url'), // 음성 파일 URL
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Activity Records 테이블
export const activityRecords = pgTable('activity_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  petId: uuid('pet_id').references(() => pets.id, { onDelete: 'cascade' }).notNull(),
  date: timestamp('date').notNull(),
  steps: integer('steps').default(0),
  activeMinutes: integer('active_minutes').default(0), // 분 단위
  sleepMinutes: integer('sleep_minutes').default(0), // 분 단위
  calories: integer('calories').default(0),
  distance: decimal('distance', { precision: 8, scale: 2 }).default('0'), // km
  activityType: activityTypeEnum('activity_type'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Health Records 테이블
export const healthRecords = pgTable('health_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  petId: uuid('pet_id').references(() => pets.id, { onDelete: 'cascade' }).notNull(),
  recordDate: timestamp('record_date').notNull(),
  temperature: decimal('temperature', { precision: 4, scale: 1 }), // 체온 (°C)
  heartRate: integer('heart_rate'), // 심박수 (BPM)
  weight: decimal('weight', { precision: 5, scale: 2 }), // 체중 (kg)
  bloodPressure: text('blood_pressure'), // 혈압 (예: "120/80")
  status: healthStatusEnum('status').default('normal').notNull(),
  symptoms: text('symptoms'), // 증상
  medications: jsonb('medications'), // 복용 중인 약물 정보
  vetNotes: text('vet_notes'), // 수의사 소견
  nextCheckup: timestamp('next_checkup'), // 다음 검진 날짜
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Location Records 테이블
export const locationRecords = pgTable('location_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  petId: uuid('pet_id').references(() => pets.id, { onDelete: 'cascade' }).notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }).notNull(),
  longitude: decimal('longitude', { precision: 11, scale: 8 }).notNull(),
  altitude: decimal('altitude', { precision: 8, scale: 2 }), // 고도 (m)
  accuracy: decimal('accuracy', { precision: 6, scale: 2 }), // 정확도 (m)
  address: text('address'), // 주소
  placeName: text('place_name'), // 장소명 (예: "집", "공원", "동물병원")
  recordedAt: timestamp('recorded_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Notifications 테이블
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  petId: uuid('pet_id').references(() => pets.id, { onDelete: 'cascade' }),
  type: notificationTypeEnum('type').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  scheduledAt: timestamp('scheduled_at'), // 예약된 알림 시간
  sentAt: timestamp('sent_at'), // 실제 발송 시간
  isRead: boolean('is_read').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  metadata: jsonb('metadata'), // 추가 데이터 (반복 설정 등)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Vaccinations 테이블 (예방접종 기록)
export const vaccinations = pgTable('vaccinations', {
  id: uuid('id').primaryKey().defaultRandom(),
  petId: uuid('pet_id').references(() => pets.id, { onDelete: 'cascade' }).notNull(),
  vaccineName: text('vaccine_name').notNull(),
  vaccinationDate: timestamp('vaccination_date').notNull(),
  nextDueDate: timestamp('next_due_date'),
  veterinarian: text('veterinarian'), // 수의사명
  clinic: text('clinic'), // 병원명
  batchNumber: text('batch_number'), // 백신 로트 번호
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations 정의
export const usersRelations = relations(users, ({ many }) => ({
  pets: many(pets),
  notifications: many(notifications),
}));

export const petsRelations = relations(pets, ({ one, many }) => ({
  user: one(users, {
    fields: [pets.userId],
    references: [users.id],
  }),
  voiceCommands: many(voiceCommands),
  activityRecords: many(activityRecords),
  healthRecords: many(healthRecords),
  locationRecords: many(locationRecords),
  notifications: many(notifications),
  vaccinations: many(vaccinations),
}));

export const voiceCommandsRelations = relations(voiceCommands, ({ one }) => ({
  pet: one(pets, {
    fields: [voiceCommands.petId],
    references: [pets.id],
  }),
}));

export const activityRecordsRelations = relations(activityRecords, ({ one }) => ({
  pet: one(pets, {
    fields: [activityRecords.petId],
    references: [pets.id],
  }),
}));

export const healthRecordsRelations = relations(healthRecords, ({ one }) => ({
  pet: one(pets, {
    fields: [healthRecords.petId],
    references: [pets.id],
  }),
}));

export const locationRecordsRelations = relations(locationRecords, ({ one }) => ({
  pet: one(pets, {
    fields: [locationRecords.petId],
    references: [pets.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  pet: one(pets, {
    fields: [notifications.petId],
    references: [pets.id],
  }),
}));

export const vaccinationsRelations = relations(vaccinations, ({ one }) => ({
  pet: one(pets, {
    fields: [vaccinations.petId],
    references: [pets.id],
  }),
}));