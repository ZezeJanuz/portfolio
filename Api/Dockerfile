# ====== Build ======
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copie le csproj et restore
COPY *.csproj ./
RUN dotnet restore

# Copie le reste et build
COPY . .
RUN dotnet publish -c Release -o /app/publish

# ====== Run ======
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

# L'API écoutera sur le port 8080 dans le conteneur
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Api.dll"]