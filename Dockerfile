# Use a imagem Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o container
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para rodar o servidor Next.js
CMD ["npm", "run", "dev"]
