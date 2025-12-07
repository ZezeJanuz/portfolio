using System.ComponentModel.DataAnnotations;

namespace Api.Dtos;

public class CreateProjectRequest
{
    [Required, MaxLength(100)]
    public string Identifier { get; set; } = string.Empty;

    [Required, MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(500)]
    public string ShortDescription { get; set; } = string.Empty;

    public string? LongDescription { get; set; }

    public List<string> Technologies { get; set; } = new();

    [Url]
    public string? GithubUrl { get; set; }

    [Url]
    public string? LiveUrl { get; set; }

    public bool IsFeatured { get; set; }
    public List<string> Images { get; set; } = new();
}