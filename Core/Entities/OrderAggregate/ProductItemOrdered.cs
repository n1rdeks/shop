namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        // Entity Framework needed all constructors (with noparams too)
        public ProductItemOrdered() {}

        public ProductItemOrdered(int productItemId, string productName, string pictureUrl)
        {
            ProductItemId = productItemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
        }

        public int ProductItemId { get; set; }
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }
    }
}
