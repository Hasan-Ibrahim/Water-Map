namespace Service.Search
{
    public class SearchQuery
    {
        public int CategoryId { get; set; }
        public string Query { get; set; }
        public int StartIndex { get; set; }
        public int PageSize { get; set; }
    }
}
