using Microsoft.EntityFrameworkCore;

namespace TestTask.Models
{
    public class ImageContext : DbContext
    {
        public DbSet<Image> Image { get; set; }
        public ImageContext(DbContextOptions<ImageContext> options)
            : base(options)
        {
            Database.EnsureCreated(); 
        }

        public DbSet<Image> TodoItems { get; set; }
    }
}
