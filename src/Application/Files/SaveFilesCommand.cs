using FilesUploader.Application.Common.Interfaces;
using FilesUploader.Application.Files;
using FilesUploader.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FilesUploader.Application.Files
{
    public class SaveFilesCommand: IRequest<int>
    {
        public List<FileVm> files { get; set; }
    }

    public class SaveFilesCommandHandler : IRequestHandler<SaveFilesCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly IEmaiService _emaiService;
        public SaveFilesCommandHandler(IApplicationDbContext context, IEmaiService emailService)
        {
            _context = context;
            this._emaiService = emailService;
        }

        public async Task<int> Handle(SaveFilesCommand request, CancellationToken cancellationToken)
        {

            var entitys = request.files.Select(x => x.ToEntity());
            if (entitys.FirstOrDefault(x=>x.FileSize > 100 * 1024 * 1024) != null)
            {
                this._emaiService.SendEmail("aa@dd.com", "קובץ מעל 100MB", "ראו הוזהרתם");
            }

            _context.FileItems.AddRange(entitys);

            await _context.SaveChangesAsync(cancellationToken);
            return 1;

        }
    }
}
