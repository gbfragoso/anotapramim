import { pgTable, uuid, varchar, timestamp, foreignKey, date, numeric, smallint, boolean, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: varchar({ length: 32 }).notNull(),
	email: varchar({ length: 72 }).notNull(),
	password: varchar({ length: 60 }).notNull(),
	role: varchar({ length: 30 }).notNull(),
	referrer: uuid(),
	apikey: varchar({ length: 100 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
});

export const customers = pgTable("customers", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	phone: varchar({ length: 50 }).notNull(),
	address: varchar({ length: 200 }),
	email: varchar({ length: 100 }),
	birthday: date(),
	parent: varchar({ length: 100 }),
	cpf: varchar({ length: 11 }),
	userId: uuid("user_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "customers_users_fk"
		}),
]);

export const events = pgTable("events", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	description: varchar({ length: 200 }),
	serviceId: uuid("service_id").notNull(),
	professionalId: uuid("professional_id").notNull(),
	customerId: uuid("customer_id").notNull(),
	status: varchar({ length: 20 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	start: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
	end: timestamp({ withTimezone: true, mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.customerId],
			foreignColumns: [customers.id],
			name: "events_customers_fk"
		}),
	foreignKey({
			columns: [table.professionalId],
			foreignColumns: [professionals.id],
			name: "events_professionals_fk"
		}),
	foreignKey({
			columns: [table.serviceId],
			foreignColumns: [services.id],
			name: "events_services_fk"
		}),
]);

export const professionals = pgTable("professionals", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	phone: varchar({ length: 50 }),
	email: varchar({ length: 100 }),
	userId: uuid("user_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "professionals_users_fk"
		}),
]);

export const services = pgTable("services", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 200 }),
	cash: numeric({ precision: 10, scale:  2 }).notNull(),
	creditcard: numeric({ precision: 10, scale:  2 }).notNull(),
	duration: smallint().notNull(),
	userId: uuid("user_id").notNull(),
	status: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "services_users_fk"
		}),
]);

export const sessions = pgTable("sessions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	token: varchar({ length: 256 }).notNull(),
	userId: uuid("user_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`(now() AT TIME ZONE 'utc'::text)`).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_users_fk"
		}).onDelete("cascade"),
]);

export const serviceHasProfessional = pgTable("service_has_professional", {
	service: uuid().notNull(),
	professional: uuid().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.professional],
			foreignColumns: [professionals.id],
			name: "service_has_professional_professionals_fk"
		}),
	foreignKey({
			columns: [table.service],
			foreignColumns: [services.id],
			name: "service_has_professional_services_fk"
		}),
	primaryKey({ columns: [table.service, table.professional], name: "service_has_professional_pk"}),
]);
