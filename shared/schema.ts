import { pgTable, text, serial, integer, real, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const kpiData = pgTable("kpi_data", {
  id: serial("id").primaryKey(),
  brandName: text("brand_name").notNull(),
  
  // Time Metrics
  avgHandleTime: text("avg_handle_time").notNull(),
  avgHoldTime: text("avg_hold_time").notNull(),
  
  // Experience & Satisfaction
  acxScore: real("acx_score").notNull(),
  acxResponses: integer("acx_responses").notNull(),
  csatScore: real("csat_score").notNull(),
  csatResponses: integer("csat_responses").notNull(),
  cesScore: real("ces_score"),
  cesResponses: integer("ces_responses"),
  fcrScore: real("fcr_score"),
  perfectScores: real("perfect_scores"),
  overallExperience: text("overall_experience"),
  
  // Agent Attributes
  agentFriendly: real("agent_friendly"),
  friendlyResponses: integer("friendly_responses"),
  agentCommunicated: real("agent_communicated"),
  communicationResponses: integer("communication_responses"),
  agentKnowledgeable: real("agent_knowledgeable"),
  knowledgeResponses: integer("knowledge_responses"),
  
  // Operational Metrics
  callsPresented: integer("calls_presented"),
  callsAccepted: integer("calls_accepted"),
  attendance: real("attendance"),
  shrinkage: real("shrinkage"),
  
  // Performance Analysis
  analysisText: text("analysis_text"),
  
  // Weekly Data (stored as JSON array)
  weeklyData: json("weekly_data").$type<WeeklyEntry[]>(),
});

export const weeklyEntrySchema = z.object({
  week: z.number(),
  presented: z.number(),
  accepted: z.number(),
  aht: z.string(),
  hold: z.string(),
  quality: z.string().optional(),
  csat: z.number(),
  comm: z.number(),
  knowledge: z.number(),
  acx: z.number(),
  adherence: z.string().optional(),
});

export type WeeklyEntry = z.infer<typeof weeklyEntrySchema>;

export const insertKpiDataSchema = createInsertSchema(kpiData).omit({
  id: true,
}).extend({
  weeklyData: z.array(weeklyEntrySchema),
});

export type InsertKpiData = z.infer<typeof insertKpiDataSchema>;
export type KpiData = typeof kpiData.$inferSelect;
