using SberAnaliticsWebApp.Models.OtherClasses;
using SberAnaliticsWebApp.Models.Tables;
using OfficeOpenXml;
using Microsoft.AspNetCore.Mvc;
using System;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace SberAnaliticsWebApp.Models
{
    public class UserContext
    {
        public List<Sber> Sbers { get; set; } = new List<Sber>();
        public UserContext()
        {

        }
        public async Task LoadDataFromExcel(IFormFile file)
        {
            ImportExcelFileToSber import = new ImportExcelFileToSber(file);
            Sbers = await import.ReadDataFromExcel();
            await DefaultBetweenDate();
        }
        public BetweenDate BetweenDate { get; set; } = new BetweenDate();
        async Task DefaultBetweenDate()
        {
            BetweenDate = new BetweenDate() 
            { 
                DateBegin = Sbers.Min(c => c.DateOnly),
                DateEnd = Sbers.Max(c => c.DateOnly),
            };
        }
        public async Task<List<object>> GetStatisticsGroupYear()
        {
            return Sbers.GroupBy(c => c.DateOnly.Year).Select(s => new {
                Year = s.Key,
                TotalExpenses = s.Where(c=> c.Summ < 0).Sum(c=> c.Summ),
                TotalProfit = s.Where(c=> c.Summ > 0).Sum(c => c.Summ)
            }).Cast<object>().ToList();
        }
        public async Task<List<Sber>> FilterSbers()
        {
            return Sbers.Where(c => c.DateOnly >= BetweenDate.DateBegin && c.DateOnly <= BetweenDate.DateEnd).ToList();
        }
    }
}


