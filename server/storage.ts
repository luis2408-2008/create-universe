import { users, type User, type InsertUser, theories, videos, expertOpinions, type Theory, type Video, type ExpertOpinion, type InsertTheory, type InsertVideo, type InsertExpertOpinion } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Theories methods
  getTheories(): Promise<Theory[]>;
  getTheoryById(id: number): Promise<Theory | undefined>;
  getTheoriesByCategory(category: string): Promise<Theory[]>;
  createTheory(theory: InsertTheory): Promise<Theory>;
  
  // Videos methods
  getVideos(): Promise<Video[]>;
  getVideoById(id: number): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  
  // Expert opinions methods
  getExpertOpinions(): Promise<ExpertOpinion[]>;
  getExpertOpinionById(id: number): Promise<ExpertOpinion | undefined>;
  createExpertOpinion(opinion: InsertExpertOpinion): Promise<ExpertOpinion>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private theories: Map<number, Theory>;
  private videos: Map<number, Video>;
  private expertOpinions: Map<number, ExpertOpinion>;
  sessionStore: session.SessionStore;
  currentId: number;
  currentTheoryId: number;
  currentVideoId: number;
  currentOpinionId: number;

  constructor() {
    this.users = new Map();
    this.theories = new Map();
    this.videos = new Map();
    this.expertOpinions = new Map();
    this.currentId = 1;
    this.currentTheoryId = 1;
    this.currentVideoId = 1;
    this.currentOpinionId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every day
    });
    
    // Add sample data
    this.seedDemoData();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Theories methods
  async getTheories(): Promise<Theory[]> {
    return Array.from(this.theories.values());
  }

  async getTheoryById(id: number): Promise<Theory | undefined> {
    return this.theories.get(id);
  }

  async getTheoriesByCategory(category: string): Promise<Theory[]> {
    return Array.from(this.theories.values()).filter(
      (theory) => theory.category === category
    );
  }

  async createTheory(theory: InsertTheory): Promise<Theory> {
    const id = this.currentTheoryId++;
    const newTheory: Theory = { ...theory, id };
    this.theories.set(id, newTheory);
    return newTheory;
  }

  // Videos methods
  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values());
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    return this.videos.get(id);
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const id = this.currentVideoId++;
    const newVideo: Video = { ...video, id };
    this.videos.set(id, newVideo);
    return newVideo;
  }

  // Expert opinions methods
  async getExpertOpinions(): Promise<ExpertOpinion[]> {
    return Array.from(this.expertOpinions.values());
  }

  async getExpertOpinionById(id: number): Promise<ExpertOpinion | undefined> {
    return this.expertOpinions.get(id);
  }

  async createExpertOpinion(opinion: InsertExpertOpinion): Promise<ExpertOpinion> {
    const id = this.currentOpinionId++;
    const newOpinion: ExpertOpinion = { ...opinion, id };
    this.expertOpinions.set(id, newOpinion);
    return newOpinion;
  }

  private seedDemoData() {
    // Seed theories
    this.createTheory({
      title: "La Teoría del Big Bang",
      description: "Propuesta que sugiere que el universo comenzó hace aproximadamente 13.8 mil millones de años como una singularidad infinitamente densa y caliente que se ha expandido desde entonces.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
      source: "Georges Lemaître",
      year: "1929"
    });

    this.createTheory({
      title: "Teoría de la Inflación Cósmica",
      description: "Explica cómo el universo se expandió exponencialmente en una fracción de segundo después del Big Bang, resolviendo problemas como la homogeneidad del cosmos.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1543722530-d2c3201371e7",
      source: "Alan Guth",
      year: "1980"
    });

    this.createTheory({
      title: "Teoría de Cuerdas",
      description: "Modelo que sugiere que las partículas fundamentales son en realidad minúsculas cuerdas vibrantes que existen en un espacio de 10 o 11 dimensiones.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1635070636690-d887c1a70f3b",
      source: "Múltiples científicos",
      year: "1970s"
    });
    
    this.createTheory({
      title: "La Teoría del Multiverso",
      description: "El concepto del multiverso propone que nuestro universo es sólo uno de los muchos universos que existen en paralelo. Cada universo podría tener sus propias leyes físicas y constantes fundamentales, creando un vasto panorama de posibilidades cósmicas.",
      category: "featured",
      imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
      source: "Científicos modernos",
      year: "2000s"
    });

    // Seed videos
    this.createVideo({
      title: "El Big Bang: Explicado",
      description: "Un recorrido visual por los primeros momentos del universo y cómo evolucionó hasta lo que conocemos hoy.",
      thumbnailUrl: "https://img.youtube.com/vi/wNDGgL73ihY/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/wNDGgL73ihY",
      duration: "15:42",
      views: 1200000
    });

    this.createVideo({
      title: "Multiverso: ¿Realidad o Ficción?",
      description: "Explorando las teorías científicas detrás del concepto de múltiples universos paralelos.",
      thumbnailUrl: "https://img.youtube.com/vi/dai_GzPpP04/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/dai_GzPpP04",
      duration: "22:18",
      views: 897000
    });

    this.createVideo({
      title: "Agujeros Negros y Materia Oscura",
      description: "Los misterios más profundos del cosmos explicados: qué son los agujeros negros y cómo se relacionan con la materia oscura.",
      thumbnailUrl: "https://img.youtube.com/vi/QAa2O_8wBUQ/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/embed/QAa2O_8wBUQ",
      duration: "18:35",
      views: 1500000
    });

    // Seed expert opinions
    this.createExpertOpinion({
      expertName: "Dra. Elena Rodríguez",
      position: "Astrofísica, Universidad de Barcelona",
      opinion: "La teoría del Big Bang sigue siendo nuestro mejor modelo para explicar el origen del universo, respaldada por múltiples líneas de evidencia como la radiación cósmica de fondo y la abundancia de elementos ligeros. Sin embargo, aún quedan preguntas fundamentales sobre lo que ocurrió en los primeros instantes, antes de la era de Planck, donde nuestras teorías físicas actuales no son suficientes para describir completamente lo que sucedió.",
      imageUrl: "https://images.unsplash.com/photo-1601582589907-f92af5ed9db8"
    });

    this.createExpertOpinion({
      expertName: "Dr. Javier González",
      position: "Físico Teórico, CERN",
      opinion: "La teoría del multiverso es fascinante desde una perspectiva teórica, pero debemos reconocer que actualmente se encuentra en los límites de lo que podemos probar experimentalmente. El desafío para la próxima generación de físicos será encontrar formas de obtener evidencia observable que pueda confirmar o refutar estas ideas, posiblemente a través de sutiles señales en la radiación cósmica de fondo o mediante predicciones matemáticas verificables.",
      imageUrl: "https://images.unsplash.com/photo-1566753323558-f4e0952af115"
    });
  }
}

export const storage = new MemStorage();
