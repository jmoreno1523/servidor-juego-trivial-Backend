/// db/mongo.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resuelve la ruta del .env SIEMPRE relativa al proyecto
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// .env está en la raíz del proyecto (un nivel arriba de /db)
const envPath = path.join(__dirname, "..", ".env");

// Carga variables de entorno desde esa ruta fija
dotenv.config({ path: envPath });

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri || typeof uri !== "string") {
    console.error("❌ MONGO_URI no está definido. Path .env usado:", envPath);
    throw new Error("MONGO_URI is undefined");
  }

  try {
    await mongoose.connect(uri, {
      // estas opciones ya no son necesarias en mongoose 6+, pero no estorban
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
