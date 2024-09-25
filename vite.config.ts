import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Especifica el directorio de salida
    sourcemap: false, // Habilita los sourcemaps si los necesitas
  },
  resolve: {
    alias: {
      // Asegúrate de que tus alias de ruta sean correctos
      "@": "/src",
    },
  },
});
