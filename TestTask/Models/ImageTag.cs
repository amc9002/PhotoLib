namespace TestTask.Models
{
    public class ImageTag
    {
        public long ImageId { get; set; }
        public Image Image { get; set; }

        public long TagId { get; set; }
        public Tag Tag { get; set; }

    }

}
