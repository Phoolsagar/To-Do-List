# ==========================================
# Build Stage
# ==========================================

# Use Maven with Java 17 to build the application
FROM maven:3.9-eclipse-temurin-17 AS build

# Set the working directory
WORKDIR /app

# Copy pom.xml
COPY pom.xml .

# Download Maven dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the Spring Boot application
RUN mvn clean package -DskipTests


# ==========================================
# Runtime Stage
# ==========================================

# Use Java 17 JRE to run the application
FROM eclipse-temurin:17-jre

# Set the working directory
WORKDIR /app

# Copy the generated JAR from the build stage
COPY --from=build /app/target/todo-backend-1.0.0.jar app.jar

# Expose Spring Boot port
EXPOSE 8080

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]