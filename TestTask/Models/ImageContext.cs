using Microsoft.EntityFrameworkCore;

namespace TestTask.Models
{
    public class ImageContext : DbContext
    {
        public DbSet<Image> Images { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public ImageContext(DbContextOptions<ImageContext> options)
            : base(options)
        {
            Database.EnsureCreated(); 
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            {
                modelBuilder.Entity<ImageTag>().HasKey(sc => new { sc.ImageId, sc.TagId });
            }
        }

    }

}
