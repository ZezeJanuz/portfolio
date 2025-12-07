using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class Project
{
    public Guid Id { get; set; }

    [Required, MaxLength(100)]
    public string Identifier { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(500)]
    public string ShortDescription { get; set; } = string.Empty;

    public string? LongDescription { get; set; }

    public List<string> Technologies { get; set; } = new();

    public string? GithubUrl { get; set; }

    public string? LiveUrl { get; set; }

    public bool IsFeatured { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<string> Images { get; set; } = new();
}