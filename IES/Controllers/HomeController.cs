using System.Diagnostics;
using IES.Models;
using IES.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace IES.Controllers;

public class HomeController : Controller
{
    private readonly IWebHostEnvironment _hostEnvironment;

    public HomeController(IWebHostEnvironment hostEnvironment)
    {
        _hostEnvironment = hostEnvironment;
    }

    public IActionResult Index()
    {
        DocumentJson documentJson = ReadDocuments("dev");

        HomeView homeView = new() {
            Title = documentJson.Title,
            Description = documentJson.Description,
            Documents = documentJson.Documents
        };

        return View(homeView);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    private DocumentJson ReadDocuments(string mode = "prod")
    {
        string rootPath = _hostEnvironment.ContentRootPath;

        string fullPath = Path.Combine(rootPath, $"wwwroot/json/documents.{mode}.json");

        string jsonData = System.IO.File.ReadAllText(fullPath);

        if (string.IsNullOrWhiteSpace(jsonData)) return new DocumentJson();

        DocumentJson? documentJson = JsonConvert.DeserializeObject<DocumentJson>(jsonData);

        return documentJson ?? new DocumentJson();
    }
}
