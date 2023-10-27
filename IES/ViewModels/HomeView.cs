using IES.Models;

namespace IES.ViewModels;

public class HomeView
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public List<Document> Documents { get; set; } = new();
}
