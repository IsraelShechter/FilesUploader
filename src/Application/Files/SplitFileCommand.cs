using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace FilesUploader.Application.Files
{
    public class SplitFileCommand : IRequest<List<FileVm>>
    {
        public FileVm file { get; set; }
    }

    public class SplitFileCommandHandler : IRequestHandler<SplitFileCommand, List<FileVm>>
    {
        public async Task<List<FileVm>> Handle(SplitFileCommand request, CancellationToken cancellationToken)
        {

            return FileProccessor.SplitFile(request.file);
        }
    }

}
