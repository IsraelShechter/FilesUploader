using FilesUploader.Domain.Entities;
using FilesUploader.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace FilesUploader.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<FileItem> FileItems { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
