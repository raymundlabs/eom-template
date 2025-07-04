import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertKpiDataSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all KPI data
  app.get("/api/kpi", async (req, res) => {
    try {
      const data = await storage.getAllKpiData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch KPI data" });
    }
  });

  // Get KPI data by ID
  app.get("/api/kpi/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = await storage.getKpiData(id);
      
      if (!data) {
        return res.status(404).json({ message: "KPI data not found" });
      }
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch KPI data" });
    }
  });

  // Create new KPI data
  app.post("/api/kpi", async (req, res) => {
    try {
      const validatedData = insertKpiDataSchema.parse(req.body);
      const created = await storage.createKpiData(validatedData);
      res.status(201).json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data format",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create KPI data" });
    }
  });

  // Update KPI data
  app.put("/api/kpi/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertKpiDataSchema.partial().parse(req.body);
      const updated = await storage.updateKpiData(id, validatedData);
      
      if (!updated) {
        return res.status(404).json({ message: "KPI data not found" });
      }
      
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data format",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to update KPI data" });
    }
  });

  // Delete KPI data
  app.delete("/api/kpi/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteKpiData(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "KPI data not found" });
      }
      
      res.json({ message: "KPI data deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete KPI data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
