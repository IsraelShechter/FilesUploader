using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using FilesUploader.Application.Common.Interfaces;
using FilesUploader.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;
using FilesUploader.Application.Files;
using System.Linq;

namespace FilesUploader.Application.Files
{
    public class GroupFilesCommand : IRequest<List<FileVm>>
    {
        public List<FileVm> files { get; set; }
    }

    public class GroupFilesCommandHandler : IRequestHandler<GroupFilesCommand, List<FileVm>>
    {
        public async Task<List<FileVm>> Handle(GroupFilesCommand request, CancellationToken cancellationToken)
        {

            return FileProccessor.PrepareDistribution(request.files.Select(x=>x.ToEntity()).ToList())
                .Select(x=>new FileVm(x)).ToList();
        }
    }

}
