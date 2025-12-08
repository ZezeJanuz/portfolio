using Api.Data;
using Api.Dtos;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public ProjectsController(ApplicationDbContext db)
    {
        _db = db;
    }

    // GET /api/projects
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetAll()
    {
        var projects = await _db.Projects
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();

        return Ok(projects);
    }

    // GET /api/projects/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Project>> GetOne(Guid id)
    {
        var project = await _db.Projects.FindAsync(id);
        if (project is null) return NotFound();
        return Ok(project);
    }

    // POST /api/projects
    [HttpPost]
    public async Task<ActionResult<Project>> Create([FromBody] CreateProjectRequest req)
    {
        var project = new Project
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
            Images = req.Images
        };

        _db.Projects.Add(project);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOne), new { id = project.Id }, project);
    }

    // PUT /api/projects/{id}
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<Project>> Update(Guid id, [FromBody] UpdateProjectRequest req)
    {
        var project = await _db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        project.Identifier = req.Identifier;
        project.Title = req.Title;
        project.ShortDescription = req.ShortDescription;
        project.LongDescription = req.LongDescription;
        project.Technologies = req.Technologies;
        project.GithubUrl = req.GithubUrl;
        project.LiveUrl = req.LiveUrl;
        project.IsFeatured = req.IsFeatured;
        project.Images = req.Images;

        await _db.SaveChangesAsync();

        return Ok(project);
    }

    // DELETE /api/projects/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var project = await _db.Projects.FindAsync(id);
        if (project is null) return NotFound();

        _db.Projects.Remove(project);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}