import { kpiData, type KpiData, type InsertKpiData } from "@shared/schema";

export interface IStorage {
  getKpiData(id: number): Promise<KpiData | undefined>;
  getAllKpiData(): Promise<KpiData[]>;
  createKpiData(data: InsertKpiData): Promise<KpiData>;
  updateKpiData(id: number, data: Partial<InsertKpiData>): Promise<KpiData | undefined>;
  deleteKpiData(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private kpiData: Map<number, KpiData>;
  currentId: number;

  constructor() {
    this.kpiData = new Map();
    this.currentId = 1;
  }

  async getKpiData(id: number): Promise<KpiData | undefined> {
    return this.kpiData.get(id);
  }

  async getAllKpiData(): Promise<KpiData[]> {
    return Array.from(this.kpiData.values());
  }

  async createKpiData(insertData: InsertKpiData): Promise<KpiData> {
    const id = this.currentId++;
    const data: KpiData = { ...insertData, id };
    this.kpiData.set(id, data);
    return data;
  }

  async updateKpiData(id: number, updateData: Partial<InsertKpiData>): Promise<KpiData | undefined> {
    const existing = this.kpiData.get(id);
    if (!existing) return undefined;
    
    const updated: KpiData = { ...existing, ...updateData };
    this.kpiData.set(id, updated);
    return updated;
  }

  async deleteKpiData(id: number): Promise<boolean> {
    return this.kpiData.delete(id);
  }
}

export const storage = new MemStorage();
