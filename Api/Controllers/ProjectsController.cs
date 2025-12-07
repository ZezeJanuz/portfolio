using Api.Dtos;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Api.Dtos;
using Api.Models;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private static readonly List<Project> Projects = new()
    {
        new Project
        {
            Id = Guid.NewGuid(),
            Identifier = "egonet-v4",
            Title = "EgoNet V4",
            ShortDescription = "Application de gestion de réseau.",
            Technologies = new() { "C#", "React", "PostgreSQL" },
            IsFeatured = true,
            Images = new() 
            { 
            "/projects/egonet-v4-1.png",
        },

        GithubUrl = "https://github.com/tonrepo/egonet-v4",
        LiveUrl = "https://egonet-v4.demo"
        }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Project>> GetAll(
        [FromQuery] bool? featured,
        [FromQuery] string? tech,
        [FromQuery] string? search)
    {
        var q = Projects.AsQueryable();

        if (featured.HasValue)
            q = q.Where(p => p.IsFeatured == featured.Value);

        if (!string.IsNullOrWhiteSpace(tech))
            q = q.Where(p => p.Technologies.Any(t => t.Equals(tech, StringComparison.OrdinalIgnoreCase)));

        if (!string.IsNullOrWhiteSpace(search))
            q = q.Where(p =>
                p.Title.Contains(search, StringComparison.OrdinalIgnoreCase) ||
                p.ShortDescription.Contains(search, StringComparison.OrdinalIgnoreCase));

        return Ok(q.ToList());
    }

    [HttpGet("{id:guid}")]
    public ActionResult<Project> GetById(Guid id)
    {
        var p = Projects.FirstOrDefault(p => p.Id == id);
        return p is null ? NotFound() : Ok(p);
    }

    [HttpGet("by-identifier/{identifier}")]
    public ActionResult<Project> GetByIdentifier(string identifier)
    {
        var p = Projects.FirstOrDefault(x =>
            x.Identifier.Equals(identifier, StringComparison.OrdinalIgnoreCase));
        return p is null ? NotFound() : Ok(p);
    }

    [HttpPost]
    public ActionResult<Project> Create(CreateProjectRequest req)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        if (Projects.Any(p => p.Identifier.Equals(req.Identifier, StringComparison.OrdinalIgnoreCase)))
        {
            ModelState.AddModelError(nameof(req.Identifier), "Identifier already used.");
            return ValidationProblem(ModelState);
        }

        var p = new Project
        {
            Id = Guid.NewGuid(),
            Identifier = req.Identifier,
            Title = req.Title,
            ShortDescription = req.ShortDescription,
            LongDescription = req.LongDescription,
            Technologies = req.Technologies,
            GithubUrl = req.GithubUrl,
            LiveUrl = req.LiveUrl,
            IsFeatured = req.IsFeatured,
            CreatedAt = DateTime.UtcNow,
            Images = req.Images, 
        };

        Projects.Add(p);
        return CreatedAtAction(nameof(GetById), new { id = p.Id }, p);
    }

    [HttpPut("{id:guid}")]
    public ActionResult<Project> Update(Guid id, UpdateProjectRequest req)
    {
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        var p = Projects.FirstOrDefault(p => p.Id == id);
        if (p is null) return NotFound();

        if (Projects.Any(x =>
                x.Id != id &&
                x.Identifier.Equals(req.Identifier, StringComparison.OrdinalIgnoreCase)))
        {
            ModelState.AddModelError(nameof(req.Identifier), "Identifier already used.");
            return ValidationProblem(ModelState);
        }

        p.Identifier = req.Identifier;
        p.Title = req.Title;
        p.ShortDescription = req.ShortDescription;
        p.LongDescription = req.LongDescription;
        p.Technologies = req.Technologies;
        p.GithubUrl = req.GithubUrl;
        p.LiveUrl = req.LiveUrl;
        p.IsFeatured = req.IsFeatured;
        p.Images = req.Images; 

        return Ok(p);
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        var p = Projects.FirstOrDefault(p => p.Id == id);
        if (p is null) return NotFound();

        Projects.Remove(p);
        return NoContent();
    }
}