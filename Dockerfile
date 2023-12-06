# Base image
FROM node:18

# Instalar pnpm
RUN npm install -g pnpm

# Criar diretório do app
WORKDIR /usr/src/app

# Copiar package.json e pnpm-lock.yaml e instalar dependências
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install

# Copiar o restante dos arquivos do app
COPY . .

# Construir a aplicação
RUN pnpm run build

# Expor a porta que o app roda
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["pnpm", "run", "start:prod"]
