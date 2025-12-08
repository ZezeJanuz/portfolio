using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects => Set<Project>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var project = modelBuilder.Entity<Project>();

        // Optionnel mais propre : unique sur Identifier
        project.HasIndex(p => p.Identifier).IsUnique();

        // Pour que List<string> soit stocké en tableau de texte Postgres
        project.Property(p => p.Technologies)
            .HasColumnType("text[]");

        project.Property(p => p.Images)
            .HasColumnType("text[]");
    }
}