using System;
using System.Collections.Generic;
using System.Text;

namespace FilesUploader.Domain.Entities
{
    public class FileItem
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public int FileType { get; set; }
        public decimal FileSize { get; set; }
        public string Author { get; set; }
        public DateTime? DateCreated { get; set; }
        public bool IsEncoded { get; set; }
        public string UserCreated { get; set; }
        public int PackageId { get; set; }
        public List<FileItem> Split()
        {
            const int gbSize = 1024 * 1024 * 1024;
            int gbCount = (int)((UInt64)FileSize / gbSize);
            decimal smallFile = FileSize % gbSize;
            var counter = 1;
            List<FileItem> result = new List<FileItem>();

            for (int i = 1; i <= gbCount; i++)
            {
                result.Add(ChangeSize(gbSize, counter));
                counter++;
            }
            if (smallFile > 0)
            {
                result.Add(ChangeSize(smallFile, counter));
            }
            return result;
        }

        private FileItem ChangeSize(decimal size, int count)
        {
            return new FileItem()
            {
                Author = Author,
                DateCreated = DateCreated,
                FileName = $"{FileName}{count}",
                FileSize = size,
                FileType = FileType,
                IsEncoded = IsEncoded,
                Id = Id + count,
                UserCreated = UserCreated
            };
        }


    }
}
