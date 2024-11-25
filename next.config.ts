import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
      hostname:"via.placeholder.com" 
      },
      {
      hostname:"fakestoreapi.com"
      }
    
    ], // Adicione o domínio aqui
  },
};

export default nextConfig;
