FROM oven/bun:1.1 AS base
WORKDIR /app

# Step 1: Install dependencies
FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Step 2: Build the application
FROM base AS build
COPY --from=install /app/node_modules ./node_modules
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Build the app using node-server preset for Docker compatibility
# This generates the .output directory
RUN NITRO_PRESET=node-server bun run build

# Step 3: Production runtime
FROM base AS runtime
WORKDIR /app

# Copy the built output from the build stage
COPY --from=build /app/.output ./.output
# Copy package.json to help with any runtime checks (optional but good practice)
COPY --from=build /app/package.json ./package.json

# Standard environment variables for Nitro/TanStack Start
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Expose the port Coolify will look for
EXPOSE 3000

# Start the server using the built index
CMD ["bun", "./.output/server/index.mjs"]
