import { sql } from 'drizzle-orm';
import {
	boolean,
	date,
	numeric,
	pgTable,
	primaryKey,
	smallint,
	timestamp,
	uuid,
	varchar
} from 'drizzle-orm/pg-core';

export const instances = pgTable('instances', {
	id: uuid().primaryKey().notNull(),
	name: varchar({ length: 70 }).notNull(),
	userId: uuid('user_id').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull()
});

export const users = pgTable('users', {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: varchar({ length: 32 }).notNull(),
	email: varchar({ length: 72 }).notNull(),
	password: varchar({ length: 100 }).notNull(),
	referrer: uuid(),
	apikey: varchar({ length: 100 }),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull()
});

export const customers = pgTable('customers', {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	phone: varchar({ length: 50 }).notNull(),
	address: varchar({ length: 200 }),
	email: varchar({ length: 100 }),
	birthday: date(),
	parent: varchar({ length: 100 }),
	cpf: varchar({ length: 11 }),
	userId: uuid('user_id').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull()
});

export const events = pgTable('events', {
	id: uuid().defaultRandom().primaryKey().notNull(),
	description: varchar({ length: 200 }),
	serviceId: uuid('service_id').notNull(),
	professionalId: uuid('professional_id').notNull(),
	customerId: uuid('customer_id').notNull(),
	status: varchar({ length: 20 }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull(),
	start: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	end: timestamp({ withTimezone: true, mode: 'string' }).notNull()
});

export const professionals = pgTable('professionals', {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	phone: varchar({ length: 50 }),
	email: varchar({ length: 100 }),
	userId: uuid('user_id').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull()
});

export const services = pgTable('services', {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 200 }),
	cash: numeric({ precision: 10, scale: 2 }).notNull(),
	creditcard: numeric({ precision: 10, scale: 2 }).notNull(),
	duration: smallint().notNull(),
	userId: uuid('user_id').notNull(),
	status: boolean().default(true).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull()
});

export const sessions = pgTable('sessions', {
	id: uuid().defaultRandom().primaryKey().notNull(),
	token: varchar({ length: 256 }).notNull(),
	userId: uuid('user_id').notNull(),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull(),
	createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
		.default(sql`(now() AT TIME ZONE 'utc'::text)`)
		.notNull()
});

export const serviceHasProfessional = pgTable(
	'service_has_professional',
	{
		service: uuid().notNull(),
		professional: uuid().notNull()
	},
	(table) => [
		primaryKey({
			columns: [table.service, table.professional],
			name: 'service_has_professional_pk'
		})
	]
);
