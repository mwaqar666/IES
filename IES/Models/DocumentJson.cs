namespace IES.Models;

public class DocumentJson
{
    public string Title { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;

    public List<Document> Documents { get; set; } = new();
}
