using FilesUploader.Application.Files;
using FilesUploader.Application.Files.Queries;
using FilesUploader.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using System.Linq;

namespace FilesUploader.Application.Files
{
    public static class FileProccessor
    {
        public static List<FileVm> SplitFile(FileVm flleVm)
        {
            FileItem file = flleVm.ToEntity();
            return file.Split().Select(x => new FileVm(x)).ToList();
        }

        public static List<FileItem> PrepareDistribution(List<FileItem> files)
        {
            return new PackageGrouper().GroupFilesIntoPackages(files);
        }

        public class PackageGroup
        {
            public int PackageId { get; set; }
            public decimal TotalSize { get; set; }
            public List<FileItem> Files { get; set; }
        }

        public class PackageGrouper
        {
            // The maximum size for each package
            private const int MaxPackageSize = 1024 * 1024 * 1024;

            public List<FileItem> GroupFilesIntoPackages(List<FileItem> files)
            {
                // Initialize a list of package groups
                var packageGroups = new List<PackageGroup>();

                // Iterate through the list of files
                foreach (var file in files)
                {
                    // Try to find an existing package group that has enough space for the file
                    var group = packageGroups.FirstOrDefault(g => g.TotalSize + file.FileSize <= MaxPackageSize);

                    // If a suitable package group was found, add the file to it
                    if (group != null)
                    {
                        group.TotalSize += file.FileSize;
                        group.Files.Add(file);
                        file.PackageId = group.PackageId;
                    }
                    else
                    {
                        // Otherwise, create a new package group and add the file to it
                        packageGroups.Add(new PackageGroup
                        {
                            PackageId = packageGroups.Count + 1,
                            TotalSize = file.FileSize,
                            Files = new List<FileItem> { file }
                        });
                        file.PackageId = packageGroups.Count;
                    }
                }

                return files;
            }
        }
    }
}
