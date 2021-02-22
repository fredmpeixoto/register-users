using ManagerUsers.Domain.Entitys;
using ManagerUsers.Infra.EntityConfig;
using Microsoft.EntityFrameworkCore;

namespace ManagerUsers.Infra.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>();

            modelBuilder.ApplyConfiguration(new UserMap());
        }
    }
}
