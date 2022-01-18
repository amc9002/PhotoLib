using Microsoft.EntityFrameworkCore;

namespace TestTask.Models
{
    public class ImageContext : DbContext
    {
        public DbSet<Image> Images { get; set; }
        public ImageContext(DbContextOptions<ImageContext> options)
            : base(options)
        {
            Database.EnsureCreated(); 
        }
    }
}
