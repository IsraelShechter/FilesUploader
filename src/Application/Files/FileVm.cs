using FilesUploader.Application.Files.Queries;
using FilesUploader.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FilesUploader.Application.Files
{
    public class FileVm
    {
        const int kb = 1024;
        const int mb = 1024 * 1024;
        const int gb = 1024 * 1024 * 1024;
        public FileVm()
        {

        }

        public FileVm(FileItem ent)
        {
            Serial = ent.Id;
            FileName = ent.FileName;
            FileType = (FileType)ent.FileType;
            Author = ent.Author;
            DateCreated = ent.DateCreated;
            IsEncoded = ent.IsEncoded;
            Serial = ent.Id;
            var fileSize = GetSize(ent.FileSize);
            FileSize = fileSize.Item1;
            FileSizeUnit = fileSize.Item2;
            UserCreated = ent.UserCreated;
            PackageId = ent.PackageId;
        }
        public int Serial { get; set; }
        public string FileName { get; set; }
        public FileType FileType { get; set; }
        public decimal FileSize { get; set; }
        public FileSizeUnit FileSizeUnit { get; set; }
        public string Author { get; set; }
        public  DateTime? DateCreated { get; set; }
        public bool IsEncoded { get; set; }
        public string UserCreated { get; set; }
        public int PackageId { get; set; }
        public int SizeFactor { get 
            {
                switch (FileSizeUnit)
                {
                    case FileSizeUnit.KB:
                        return kb;
                    case FileSizeUnit.MB:
                        return mb;
                    case FileSizeUnit.GB:
                        return gb;
                    case FileSizeUnit.Byte:
                    default:
                        return 1;
                }
            } 
        }
        public FileItem ToEntity()
        {
            
            return new FileItem()
            {
                Author = Author,
                DateCreated = DateCreated,
                FileName = FileName,
                FileSize = FileSize * SizeFactor,
                FileType = (int)FileType,
                IsEncoded = IsEncoded,
                Id = Serial,
                UserCreated = UserCreated,
                PackageId = PackageId
            };
        }

        private (decimal, FileSizeUnit) GetSize(decimal size)
        {
            if (size < kb)
            {
                return (size, FileSizeUnit.Byte);
            } else if(size < mb)
            {
                return (size / kb, FileSizeUnit.KB);
            }
            else if (size < gb)
            {
                return (size / mb, FileSizeUnit.MB);
            } else
            {
                return (size / gb, FileSizeUnit.GB);
            }
        }
    }
}
