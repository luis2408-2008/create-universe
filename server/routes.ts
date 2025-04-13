import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Content API routes
  app.get("/api/theories", async (req, res) => {
    try {
      const theories = await storage.getTheories();
      res.json(theories);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener teorías" });
    }
  });

  app.get("/api/theories/:id", async (req, res) => {
    try {
      const theory = await storage.getTheoryById(Number(req.params.id));
      if (!theory) {
        return res.status(404).json({ message: "Teoría no encontrada" });
      }
      res.json(theory);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la teoría" });
    }
  });

  app.get("/api/theories/category/:category", async (req, res) => {
    try {
      const theories = await storage.getTheoriesByCategory(req.params.category);
      res.json(theories);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las teorías por categoría" });
    }
  });

  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener videos" });
    }
  });

  app.get("/api/videos/:id", async (req, res) => {
    try {
      const video = await storage.getVideoById(Number(req.params.id));
      if (!video) {
        return res.status(404).json({ message: "Video no encontrado" });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el video" });
    }
  });

  app.get("/api/expert-opinions", async (req, res) => {
    try {
      const opinions = await storage.getExpertOpinions();
      res.json(opinions);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener opiniones de expertos" });
    }
  });

  app.get("/api/expert-opinions/:id", async (req, res) => {
    try {
      const opinion = await storage.getExpertOpinionById(Number(req.params.id));
      if (!opinion) {
        return res.status(404).json({ message: "Opinión no encontrada" });
      }
      res.json(opinion);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la opinión" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
