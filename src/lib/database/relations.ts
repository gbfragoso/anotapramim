import { relations } from "drizzle-orm/relations";
import { users, customers, events, professionals, services, sessions, serviceHasProfessional } from "./schema";

export const customersRelations = relations(customers, ({one, many}) => ({
	user: one(users, {
		fields: [customers.userId],
		references: [users.id]
	}),
	events: many(events),
}));

export const usersRelations = relations(users, ({many}) => ({
	customers: many(customers),
	professionals: many(professionals),
	services: many(services),
	sessions: many(sessions),
}));

export const eventsRelations = relations(events, ({one}) => ({
	customer: one(customers, {
		fields: [events.customerId],
		references: [customers.id]
	}),
	professional: one(professionals, {
		fields: [events.professionalId],
		references: [professionals.id]
	}),
	service: one(services, {
		fields: [events.serviceId],
		references: [services.id]
	}),
}));

export const professionalsRelations = relations(professionals, ({one, many}) => ({
	events: many(events),
	user: one(users, {
		fields: [professionals.userId],
		references: [users.id]
	}),
	serviceHasProfessionals: many(serviceHasProfessional),
}));

export const servicesRelations = relations(services, ({one, many}) => ({
	events: many(events),
	user: one(users, {
		fields: [services.userId],
		references: [users.id]
	}),
	serviceHasProfessionals: many(serviceHasProfessional),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const serviceHasProfessionalRelations = relations(serviceHasProfessional, ({one}) => ({
	professional: one(professionals, {
		fields: [serviceHasProfessional.professional],
		references: [professionals.id]
	}),
	service: one(services, {
		fields: [serviceHasProfessional.service],
		references: [services.id]
	}),
}));