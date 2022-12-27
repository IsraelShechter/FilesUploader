using System;
using System.Collections.Generic;
using System.Text;

namespace FilesUploader.Application.Common.Interfaces
{
    public interface IEmaiService
    {
        void SendEmail(string to, string subject, string content);
    }
}
