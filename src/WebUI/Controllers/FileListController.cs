using FilesUploader.Application.Files;
using FilesUploader.Application.Files.Queries;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FilesUploader.WebUI.Controllers
{

    public class FileListController : ApiController
    {
        [HttpPost()]
        [Route("Split")]
        public async Task<ActionResult<List<FileVm>>> Split(SplitFileCommand splitCommand)
        {
            return await Mediator.Send(splitCommand);
        }

        [HttpPost()]
        [Route("Group")]
        public async Task<ActionResult<List<FileVm>>> Group(GroupFilesCommand groupCommand)
        {
            return await Mediator.Send(groupCommand);
        }


        [HttpPost()]
        [Route("Save")]
        public async Task<ActionResult<int>> Save(SaveFilesCommand cmd)
        {
            return await Mediator.Send(cmd);
        }
    }
}
