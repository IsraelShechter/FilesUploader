using FilesUploader.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace FilesUploader.Infrastructure.Services
{
    public class EmailService : IEmaiService
    {
        public void SendEmail(string to, string subject, string content)
        {
            // TODO implement some cloud service for email
        }
    }
}
