namespace Service.Review
{
    public class Review
    {
        private int? _rating;

        public int? Rating
        {
            get { return _rating; }
            set { _rating = value == 0 ? null : value; }
        }

        public string Comment { get; set; }
        public int ProductId { get; set; }
    }
}
