using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using SberAnaliticsWebApp.Models.Tables;

namespace SberAnaliticsWebApp.Models.OtherClasses
{
    public class ImportExcelFileToSber
    {
        readonly IFormFile _file;
        public ImportExcelFileToSber(IFormFile file)
        {
            _file = file;
        }
        async Task<int> GetColumnIndex(ExcelWorksheet worksheet, string columnName)
        {
            for (int col = 1; col <= worksheet.Dimension.Columns; col++)
            {
                var cellValue = worksheet.Cells[1, col].Value?.ToString();

                if (cellValue == columnName)
                {
                    return col;
                }
            }

            // Если столбец с заданным именем не найден, вернуть -1 или бросить исключение
            return -1;
        }
        public async Task<List<Sber>> ReadDataFromExcel()
        {
            try
            {
                List<Sber> sbers = new List<Sber>();
                ExcelPackage excelPackage = await ConvertToExcelPackage(_file);
                using (var worksheet = excelPackage.Workbook.Worksheets[0])
                { 
                    int rowCount = worksheet.Dimension.Rows;
                    int columnDatetime = await GetColumnIndex(worksheet, "Дата операции");
                    int columnName = await GetColumnIndex(worksheet, "Описание операции");
                    int columnCategory = await GetColumnIndex(worksheet, "Категория");
                    int columnSumm = await GetColumnIndex(worksheet, "Сумма в валюте счёта");
                    // Пропускаем заголовок, начинаем с 2 строки
                    for (int row = 2; row <= rowCount; row++)
                    {
                        // Создание объекта Person
                        var sber = new Sber
                        {
                            Name = worksheet.Cells[row, columnName].Value.ToString(),
                            Datetime = DateTime.FromOADate(double.Parse(worksheet.Cells[row, columnDatetime].Value.ToString())),
                            Category = worksheet.Cells[row, columnCategory].Value.ToString(),
                            Summ = float.Parse(worksheet.Cells[row, columnSumm].Value.ToString())
                        };
                        // Добавление объекта Person в список
                        sbers.Add(sber);
                    }
                };
                return sbers;
            }
            catch (Exception ex)
            {
                using (var sw = new StreamWriter("C:\\Users\\gidin\\OneDrive\\Рабочий стол\\Errors.txt"))
                {
                    sw.WriteLine(ex.Message);
                    return new List<Sber>();
                }
            }
        }

        async Task<ExcelPackage> ConvertToExcelPackage([FromForm] IFormFile file)
        {
            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                return new ExcelPackage(stream);
            }
        }
    }
}
