using Microsoft.AspNetCore.Mvc;
using SberAnaliticsWebApp.Models;
using SberAnaliticsWebApp.Models.OtherClasses;
using System.Diagnostics;

namespace SberAnaliticsWebApp.Controllers
{
    public class HomeController : Controller
    {
        UserContext _userContext;
        public HomeController(UserContext userContext)
        {
            _userContext = userContext;
        }

        public IActionResult LineChartPage()
        {
            return View();
        }

        public async Task<IActionResult> ImportAndGetSbers([FromForm] IFormFile file)
        {
            await _userContext.LoadDataFromExcel(file);
            return Ok();
        }

        public async Task<IActionResult> GetSbers() 
        {
            var Sbers = _userContext.Sbers;
            return Json(_userContext.Sbers.OrderBy(c=>c.Datetime));
        }
        public async Task<IActionResult> GetDateBetween()
        {
            return Json(_userContext.BetweenDate);
        }
        public async Task<IActionResult> ChangeDateBetween([FromBody] BetweenDate betweenDate)
        {
            _userContext.BetweenDate = betweenDate;
            return Json(_userContext.FilterSbers());
        }

        public async Task<IActionResult> GetStatisticsGroupYear()
        {
            return Json(await _userContext.GetStatisticsGroupYear()); 
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}