namespace SberAnaliticsWebApp.Models.Tables
{
    public class Sber
    {
        public DateTime Datetime { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public float Summ { get; set; }

        public DateOnly DateOnly { get { return DateOnly.FromDateTime(Datetime);}}
    }
}
