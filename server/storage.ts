import { users, type User, type InsertUser, theories, videos, expertOpinions, type Theory, type Video, type ExpertOpinion, type InsertTheory, type InsertVideo, type InsertExpertOpinion } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import connectPg from "connect-pg-simple";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

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

// DB client setup
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client);

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;
  
  constructor() {
    // Initialize the session store with PostgreSQL
    this.sessionStore = new PostgresSessionStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production'
      },
      createTableIfMissing: true
    });
    
    // Seed demo data if needed
    this.seedDemoDataIfNeeded();
  }

  private async seedDemoDataIfNeeded() {
    // Check if there's already data in the database
    const existingTheories = await this.getTheories();
    if (existingTheories.length === 0) {
      console.log("Seeding initial demo data...");
      await this.seedDemoData();
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getTheories(): Promise<Theory[]> {
    return db.select().from(theories);
  }

  async getTheoryById(id: number): Promise<Theory | undefined> {
    const result = await db.select().from(theories).where(eq(theories.id, id));
    return result[0];
  }

  async getTheoriesByCategory(category: string): Promise<Theory[]> {
    return db.select().from(theories).where(eq(theories.category, category));
  }

  async createTheory(theory: InsertTheory): Promise<Theory> {
    const result = await db.insert(theories).values(theory).returning();
    return result[0];
  }

  async getVideos(): Promise<Video[]> {
    return db.select().from(videos);
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    const result = await db.select().from(videos).where(eq(videos.id, id));
    return result[0];
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const result = await db.insert(videos).values(video).returning();
    return result[0];
  }

  async getExpertOpinions(): Promise<ExpertOpinion[]> {
    return db.select().from(expertOpinions);
  }

  async getExpertOpinionById(id: number): Promise<ExpertOpinion | undefined> {
    const result = await db.select().from(expertOpinions).where(eq(expertOpinions.id, id));
    return result[0];
  }

  async createExpertOpinion(opinion: InsertExpertOpinion): Promise<ExpertOpinion> {
    const result = await db.insert(expertOpinions).values(opinion).returning();
    return result[0];
  }

  private async seedDemoData() {
    // Add sample theories
    await this.createTheory({
      title: "Big Bang",
      description: "La teoría del Big Bang es el modelo cosmológico predominante que explica el origen y evolución del universo. Según esta teoría, el universo comenzó como una singularidad extremadamente caliente y densa hace aproximadamente 13.8 mil millones de años, y se ha estado expandiendo desde entonces.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1504333638930-c8787321eee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Georges Lemaître"
    });
    await this.createTheory({
      title: "Teoría de Cuerdas",
      description: "La teoría de cuerdas propone que las partículas fundamentales en nuestro universo son en realidad pequeñas cuerdas vibrantes. Según esta perspectiva, las diferentes vibraciones de estas cuerdas corresponden a diferentes partículas y fuerzas fundamentales que observamos.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Leonard Susskind"
    });
    await this.createTheory({
      title: "Multiverso",
      description: "La teoría del multiverso sugiere que nuestro universo es solo uno de muchos universos que existen simultáneamente en diferentes dimensiones o regiones del espacio-tiempo. Cada universo podría tener diferentes leyes físicas y constantes fundamentales.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      author: "Hugh Everett III"
    });
    await this.createTheory({
      title: "Inflación Cósmica",
      description: "La teoría de la inflación cósmica propone que el universo experimentó una expansión extremadamente rápida momentos después del Big Bang. Esta expansión explicaría por qué el universo parece ser homogéneo y plano a gran escala.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1566345984367-57cef5CF6132?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      author: "Alan Guth"
    });
    await this.createTheory({
      title: "Multiverso: Un Viaje a Múltiples Realidades",
      description: "Adéntrate en el fascinante concepto del multiverso, donde nuestro universo es solo uno de infinitos universos posibles, cada uno con sus propias leyes físicas y posibilidades. Desde la interpretación de muchos mundos en la mecánica cuántica hasta los universos burbuja y las implicaciones para nuestra comprensión de la realidad, esta teoría desafía todo lo que creemos saber sobre el cosmos.",
      category: "featured",
      imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      author: "Varios Científicos"
    });
    
    // Teorías de conspiración
    await this.createTheory({
      title: "Universo Holográfico",
      description: "Esta teoría propone que todo nuestro universo tridimensional podría ser en realidad una proyección holográfica de información almacenada en una superficie bidimensional. En esencia, nuestra realidad sería como un holograma complejo, codificado en los límites del universo.",
      category: "conspiracy",
      imageUrl: "https://images.unsplash.com/photo-1506703719100-a0b3a494befc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Gerard 't Hooft"
    });
    
    await this.createTheory({
      title: "Tierra Hueca",
      description: "La teoría de la Tierra Hueca sostiene que nuestro planeta no es sólido, sino que contiene vacíos internos significativos, incluso civilizaciones enteras. Algunos proponentes sugieren que existen entradas ocultas en los polos que conducen a un mundo interior, posiblemente con su propio sol central.",
      category: "conspiracy",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      author: "John Cleves Symmes Jr."
    });
    
    await this.createTheory({
      title: "Simulación Cósmica",
      description: "Esta fascinante teoría propone que nuestra realidad es en realidad una simulación por computadora ultraavanzada creada por una civilización avanzada. Los proponentes argumentan que si la tecnología continúa desarrollándose, eventualmente será posible simular universos enteros con seres conscientes, y estadísticamente, es más probable que estemos dentro de una de esas simulaciones que en la única realidad base.",
      category: "conspiracy",
      imageUrl: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Nick Bostrom"
    });
    
    // Curiosidades cósmicas
    await this.createTheory({
      title: "El Sonido del Universo Primigenio",
      description: "El fondo cósmico de microondas, la radiación residual del Big Bang, puede convertirse en sonido. Cuando los científicos traducen estas variaciones de temperatura a ondas sonoras, emerge un 'sonido primordial' que es el eco del nacimiento del universo, permitiéndonos 'escuchar' las condiciones del cosmos apenas 380,000 años después del Big Bang.",
      category: "fun-fact",
      imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      author: "Equipo NASA/WMAP"
    });
    
    await this.createTheory({
      title: "El Olor del Espacio",
      description: "Los astronautas que regresan de caminatas espaciales han reportado consistentemente que el espacio tiene un olor distintivo. Describen este aroma como una mezcla de metal caliente, carne asada, y un toque de dulce, similar a frambuesas o ron. Este olor proviene de partículas de alta energía, plasma y reacciones químicas en el vacío espacial.",
      category: "fun-fact",
      imageUrl: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      author: "Astronautas NASA"
    });
    
    await this.createTheory({
      title: "La Nube de Alcohol en el Espacio",
      description: "A 6,500 años luz de la Tierra existe una nube interestelar gigante llena de alcohol etílico. La nube, llamada G34.3, contiene suficiente alcohol para llenar 400 trillones de trillones de botellas de whisky. Sin embargo, este alcohol no es potable ya que está mezclado con sustancias tóxicas como el propanol y el cianuro de vinilo.",
      category: "fun-fact",
      imageUrl: "https://images.unsplash.com/photo-1502481851512-e93e25e4d8f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      author: "Astrónomo Phil Plait"
    });

    // Add sample videos
    await this.createVideo({
      title: "El Origen del Universo: Big Bang",
      description: "Documental completo que explora cómo surgió nuestro universo a partir del Big Bang y la evidencia científica que respalda esta teoría.",
      thumbnailUrl: "https://images.unsplash.com/photo-1501862700950-18382cd41497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2219&q=80",
      videoUrl: "https://example.com/video1",
      duration: "45:30",
      author: "José Maza",
      views: 1245789
    });
    await this.createVideo({
      title: "Agujeros Negros: Los Devoradores de Estrellas",
      description: "Un fascinante viaje al interior de los agujeros negros, los objetos más misteriosos y poderosos del universo.",
      thumbnailUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80",
      videoUrl: "https://example.com/video2",
      duration: "52:17",
      author: "Canal Ciencia",
      views: 897532
    });
    await this.createVideo({
      title: "Multiverso: ¿Realidad o Ficción?",
      description: "Explorando la teoría del multiverso y sus implicaciones para nuestra comprensión del cosmos.",
      thumbnailUrl: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      videoUrl: "https://example.com/video3",
      duration: "37:42",
      author: "Astrofísica Hoy",
      views: 563421
    });

    // Add sample expert opinions
    await this.createExpertOpinion({
      expertName: "Dr. María Rodríguez",
      title: "Implicaciones Filosóficas del Multiverso",
      content: "El concepto del multiverso no solo transforma nuestra comprensión del cosmos sino que también tiene profundas implicaciones filosóficas sobre la naturaleza de la realidad, la causalidad y nuestro lugar en el universo. Si existieran infinitas versiones de nosotros mismos en universos paralelos, ¿qué significaría esto para nuestro sentido de identidad y libre albedrío?",
      institution: "Instituto de Astrofísica Avanzada",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
      date: "2023-05-15"
    });
    await this.createExpertOpinion({
      expertName: "Dr. Carlos Jiménez",
      title: "Los Límites de la Teoría del Big Bang",
      content: "Aunque la teoría del Big Bang ha sido increíblemente exitosa al explicar muchas observaciones astronómicas, enfrenta desafíos cuando intentamos extrapolar hacia atrás hasta el momento mismo del inicio. La gravedad cuántica y otros fenómenos aún no comprendidos completamente podrían revelar un panorama más complejo sobre los primeros instantes del universo.",
      institution: "Universidad Nacional Autónoma",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      date: "2023-02-28"
    });
  }
}

// Memory storage implementation (kept for backward compatibility and fallback)
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
    // Add sample theories
    this.createTheory({
      title: "Big Bang",
      description: "La teoría del Big Bang es el modelo cosmológico predominante que explica el origen y evolución del universo. Según esta teoría, el universo comenzó como una singularidad extremadamente caliente y densa hace aproximadamente 13.8 mil millones de años, y se ha estado expandiendo desde entonces.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1504333638930-c8787321eee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Georges Lemaître"
    });
    this.createTheory({
      title: "Teoría de Cuerdas",
      description: "La teoría de cuerdas propone que las partículas fundamentales en nuestro universo son en realidad pequeñas cuerdas vibrantes. Según esta perspectiva, las diferentes vibraciones de estas cuerdas corresponden a diferentes partículas y fuerzas fundamentales que observamos.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Leonard Susskind"
    });
    this.createTheory({
      title: "Multiverso",
      description: "La teoría del multiverso sugiere que nuestro universo es solo uno de muchos universos que existen simultáneamente en diferentes dimensiones o regiones del espacio-tiempo. Cada universo podría tener diferentes leyes físicas y constantes fundamentales.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      author: "Hugh Everett III"
    });
    this.createTheory({
      title: "Inflación Cósmica",
      description: "La teoría de la inflación cósmica propone que el universo experimentó una expansión extremadamente rápida momentos después del Big Bang. Esta expansión explicaría por qué el universo parece ser homogéneo y plano a gran escala.",
      category: "scientific",
      imageUrl: "https://images.unsplash.com/photo-1566345984367-57cef5CF6132?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
      author: "Alan Guth"
    });
    this.createTheory({
      title: "Multiverso: Un Viaje a Múltiples Realidades",
      description: "Adéntrate en el fascinante concepto del multiverso, donde nuestro universo es solo uno de infinitos universos posibles, cada uno con sus propias leyes físicas y posibilidades. Desde la interpretación de muchos mundos en la mecánica cuántica hasta los universos burbuja y las implicaciones para nuestra comprensión de la realidad, esta teoría desafía todo lo que creemos saber sobre el cosmos.",
      category: "featured",
      imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      author: "Varios Científicos"
    });
    
    // Teorías de conspiración
    this.createTheory({
      title: "Universo Holográfico",
      description: "Esta teoría propone que todo nuestro universo tridimensional podría ser en realidad una proyección holográfica de información almacenada en una superficie bidimensional. En esencia, nuestra realidad sería como un holograma complejo, codificado en los límites del universo.",
      category: "conspiracy",
      imageUrl: "https://images.unsplash.com/photo-1506703719100-a0b3a494befc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Gerard 't Hooft"
    });
    
    this.createTheory({
      title: "Tierra Hueca",
      description: "La teoría de la Tierra Hueca sostiene que nuestro planeta no es sólido, sino que contiene vacíos internos significativos, incluso civilizaciones enteras. Algunos proponentes sugieren que existen entradas ocultas en los polos que conducen a un mundo interior, posiblemente con su propio sol central.",
      category: "conspiracy",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      author: "John Cleves Symmes Jr."
    });
    
    this.createTheory({
      title: "Simulación Cósmica",
      description: "Esta fascinante teoría propone que nuestra realidad es en realidad una simulación por computadora ultraavanzada creada por una civilización avanzada. Los proponentes argumentan que si la tecnología continúa desarrollándose, eventualmente será posible simular universos enteros con seres conscientes, y estadísticamente, es más probable que estemos dentro de una de esas simulaciones que en la única realidad base.",
      category: "conspiracy",
      imageUrl: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: "Nick Bostrom"
    });
    
    // Curiosidades cósmicas
    this.createTheory({
      title: "El Sonido del Universo Primigenio",
      description: "El fondo cósmico de microondas, la radiación residual del Big Bang, puede convertirse en sonido. Cuando los científicos traducen estas variaciones de temperatura a ondas sonoras, emerge un 'sonido primordial' que es el eco del nacimiento del universo, permitiéndonos 'escuchar' las condiciones del cosmos apenas 380,000 años después del Big Bang.",
      category: "fun-fact",
      imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      author: "Equipo NASA/WMAP"
    });
    
    this.createTheory({
      title: "El Olor del Espacio",
      description: "Los astronautas que regresan de caminatas espaciales han reportado consistentemente que el espacio tiene un olor distintivo. Describen este aroma como una mezcla de metal caliente, carne asada, y un toque de dulce, similar a frambuesas o ron. Este olor proviene de partículas de alta energía, plasma y reacciones químicas en el vacío espacial.",
      category: "fun-fact",
      imageUrl: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      author: "Astronautas NASA"
    });
    
    this.createTheory({
      title: "La Nube de Alcohol en el Espacio",
      description: "A 6,500 años luz de la Tierra existe una nube interestelar gigante llena de alcohol etílico. La nube, llamada G34.3, contiene suficiente alcohol para llenar 400 trillones de trillones de botellas de whisky. Sin embargo, este alcohol no es potable ya que está mezclado con sustancias tóxicas como el propanol y el cianuro de vinilo.",
      category: "fun-fact",
      imageUrl: "https://images.unsplash.com/photo-1502481851512-e93e25e4d8f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      author: "Astrónomo Phil Plait"
    });

    // Add sample videos
    this.createVideo({
      title: "El Origen del Universo: Big Bang",
      description: "Documental completo que explora cómo surgió nuestro universo a partir del Big Bang y la evidencia científica que respalda esta teoría.",
      thumbnailUrl: "https://images.unsplash.com/photo-1501862700950-18382cd41497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2219&q=80",
      videoUrl: "https://example.com/video1",
      duration: "45:30",
      author: "José Maza",
      views: 1245789
    });
    this.createVideo({
      title: "Agujeros Negros: Los Devoradores de Estrellas",
      description: "Un fascinante viaje al interior de los agujeros negros, los objetos más misteriosos y poderosos del universo.",
      thumbnailUrl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80",
      videoUrl: "https://example.com/video2",
      duration: "52:17",
      author: "Canal Ciencia",
      views: 897532
    });
    this.createVideo({
      title: "Multiverso: ¿Realidad o Ficción?",
      description: "Explorando la teoría del multiverso y sus implicaciones para nuestra comprensión del cosmos.",
      thumbnailUrl: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      videoUrl: "https://example.com/video3",
      duration: "37:42",
      author: "Astrofísica Hoy",
      views: 563421
    });

    // Add sample expert opinions
    this.createExpertOpinion({
      expertName: "Dr. María Rodríguez",
      title: "Implicaciones Filosóficas del Multiverso",
      content: "El concepto del multiverso no solo transforma nuestra comprensión del cosmos sino que también tiene profundas implicaciones filosóficas sobre la naturaleza de la realidad, la causalidad y nuestro lugar en el universo. Si existieran infinitas versiones de nosotros mismos en universos paralelos, ¿qué significaría esto para nuestro sentido de identidad y libre albedrío?",
      institution: "Instituto de Astrofísica Avanzada",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
      date: "2023-05-15"
    });
    this.createExpertOpinion({
      expertName: "Dr. Carlos Jiménez",
      title: "Los Límites de la Teoría del Big Bang",
      content: "Aunque la teoría del Big Bang ha sido increíblemente exitosa al explicar muchas observaciones astronómicas, enfrenta desafíos cuando intentamos extrapolar hacia atrás hasta el momento mismo del inicio. La gravedad cuántica y otros fenómenos aún no comprendidos completamente podrían revelar un panorama más complejo sobre los primeros instantes del universo.",
      institution: "Universidad Nacional Autónoma",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      date: "2023-02-28"
    });
  }
}

// Choose storage implementation based on environment
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage()
  : new MemStorage();